import type { Request, Response, NextFunction } from "express";
import { storage } from "../storage";
import { contactReplySchema, createAdminInvoiceSchema, softDeleteSchema } from "@shared/schema";
import { AppError } from "../utils/errors";
import { sendReplyEmail } from "../services/email";

function parseIdParam(rawId: string | string[] | undefined, label: string) {
  const value = Array.isArray(rawId) ? rawId[0] : rawId;
  const id = parseInt(value ?? "", 10);
  if (Number.isNaN(id)) {
    throw AppError.validation(`Invalid ${label} id`);
  }
  return id;
}

function generateInvoiceNumber() {
  const now = new Date();
  const stamp = now
    .toISOString()
    .replace(/[-:TZ.]/g, "")
    .slice(0, 14);
  return `INV-${stamp}`;
}

function normalizeDecimal(value: string | number) {
  return Number(value).toFixed(2);
}

function amountToCents(value: string | number) {
  if (typeof value === "number") {
    return Number.isInteger(value) ? value : Math.round(value * 100);
  }

  const parsed = Number(value);
  if (!Number.isFinite(parsed)) {
    throw AppError.validation("Invalid amount");
  }

  return Math.round(parsed * 100);
}

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const submittedPassword =
      typeof req.body?.password === "string" ? req.body.password.trim() : "";
    const configuredPassword = (process.env.ADMIN_PASSWORD ?? "").trim();

    if (!configuredPassword) {
      throw AppError.internal("ADMIN_PASSWORD is not configured on the server");
    }

    if (!submittedPassword || submittedPassword !== configuredPassword) {
      throw AppError.unauthorized("Invalid password");
    }

    // Set the admin flag
    (req.session as any).isAdmin = true;
    
    // Save session
    req.session.save((err) => {
      if (err) {
        return next(err);
      }
      res.json({ success: true });
    });
  } catch (err) {
    next(err);
  }
}

export async function logout(req: Request, res: Response, next: NextFunction) {
  try {
    req.session.destroy(() => {
      res.json({ success: true });
    });
  } catch (err) {
    next(err);
  }
}

export async function getMe(req: Request, res: Response) {
  const isAdmin = (req.session as any)?.isAdmin ?? false;
  console.log("getMe called, session ID:", req.session.id, "isAdmin:", isAdmin);
  res.json({ isAdmin });
}

export async function getStats(_req: Request, res: Response, next: NextFunction) {
  try {
    const stats = await storage.getDashboardStats();
    res.json(stats);
  } catch (err) {
    next(err);
  }
}

export async function getBookings(_req: Request, res: Response, next: NextFunction) {
  try {
    const allBookings = await storage.getBookings();
    res.json(allBookings);
  } catch (err) {
    next(err);
  }
}

export async function updateBookingStatus(req: Request, res: Response, next: NextFunction) {
  try {
    const id = parseIdParam(req.params.id, "booking");

    const { status } = req.body;
    if (!status || !["pending", "confirmed", "completed", "cancelled"].includes(status)) {
      throw AppError.validation("Invalid status");
    }

    const booking = await storage.updateBookingStatus(id, status);
    if (!booking) {
      throw AppError.notFound("Booking not found");
    }

    res.json(booking);
  } catch (err) {
    next(err);
  }
}

export async function deleteBooking(req: Request, res: Response, next: NextFunction) {
  try {
    const id = parseIdParam(req.params.id, "booking");
    const deletion = softDeleteSchema.parse(req.body ?? {});

    const booking = await storage.softDeleteBooking(id, {
      reason: deletion.reason,
      deletedBy: deletion.deletedBy ?? "admin",
    });
    if (!booking) {
      throw AppError.notFound("Booking not found");
    }

    return res.json({
      success: true,
      message: "Booking deleted",
      booking,
    });
  } catch (err) {
    next(err);
  }
}

export async function getInvoices(_req: Request, res: Response, next: NextFunction) {
  try {
    const allInvoices = await storage.getAllInvoices();
    res.json(allInvoices);
  } catch (err) {
    next(err);
  }
}

export async function createInvoice(req: Request, res: Response, next: NextFunction) {
  try {
    const data = createAdminInvoiceSchema.parse(req.body);
    const lineItems = data.lineItems ?? [];
    const customerName = data.customerName ?? data.clientName!;
    const customerEmail = data.customerEmail ?? data.clientEmail!;
    const serviceTitle =
      data.serviceTitle?.trim() ||
      lineItems.map((item) => item.description).filter(Boolean).join(", ") ||
      "General Service";

    const calculatedAmount =
      lineItems.length > 0
        ? Math.round(
            lineItems.reduce(
              (total, item) => total + Number(item.quantity) * Number(item.unitPrice),
              0,
            ) * 100,
          )
        : amountToCents(data.amount!);

    const invoice = await storage.createInvoiceWithLineItems({
      invoiceNumber: data.invoiceNumber ?? generateInvoiceNumber(),
      customerEmail,
      customerName,
      clientEmail: data.clientEmail ?? customerEmail,
      clientName: data.clientName ?? customerName,
      serviceTitle,
      amount: calculatedAmount,
      status: data.status?.trim() || "draft",
      dueDate: data.dueDate ?? null,
      lineItems: lineItems.map((item) => ({
        description: item.description,
        quantity: normalizeDecimal(item.quantity),
        unitPrice: normalizeDecimal(item.unitPrice),
      })),
    });

    res.status(201).json(invoice);
  } catch (err) {
    next(err);
  }
}

export async function deleteInvoice(req: Request, res: Response, next: NextFunction) {
  try {
    const id = parseIdParam(req.params.id, "invoice");

    const deleted = await storage.deleteInvoice(id);
    if (!deleted) {
      throw AppError.notFound("Invoice not found");
    }

    return res.json({ success: true, message: "Invoice deleted" });
  } catch (err) {
    next(err);
  }
}

export async function getContacts(_req: Request, res: Response, next: NextFunction) {
  try {
    const messages = await storage.getContactMessages();
    res.json(messages);
  } catch (err) {
    next(err);
  }
}

export async function replyToContact(req: Request, res: Response, next: NextFunction) {
  try {
    const id = parseIdParam(req.params.id, "contact");
    const payload = contactReplySchema.parse(req.body ?? {});
    const contact = await storage.getContactMessageById(id);
    if (!contact) {
      throw AppError.notFound("Contact message not found");
    }

    await sendReplyEmail(contact.email, contact.name, payload.replyMessage);

    const updated = await storage.replyToContactMessage(id, {
      replyMessage: payload.replyMessage,
      repliedBy: payload.repliedBy ?? "admin",
      isResolved: payload.isResolved,
    });

    res.json({ success: true, contact: updated });
  } catch (err) {
    next(err);
  }
}

export async function getReminders(_req: Request, res: Response, next: NextFunction) {
  try {
    const allReminders = await storage.getAllReminders();
    res.json(allReminders);
  } catch (err) {
    next(err);
  }
}

export async function getQuotes(_req: Request, res: Response, next: NextFunction) {
  try {
    const allQuotes = await storage.getQuotes();
    res.json(allQuotes);
  } catch (err) {
    next(err);
  }
}

export async function deleteQuote(req: Request, res: Response, next: NextFunction) {
  try {
    const id = parseIdParam(req.params.id, "quote");
    const deletion = softDeleteSchema.parse(req.body ?? {});
    const quote = await storage.softDeleteQuote(id, {
      reason: deletion.reason,
      deletedBy: deletion.deletedBy ?? "admin",
    });

    if (!quote) {
      throw AppError.notFound("Quote not found");
    }

    res.json({ success: true, quote });
  } catch (err) {
    next(err);
  }
}
