import type { Request, Response, NextFunction } from "express";
import { storage } from "../storage";
import { insertInvoiceSchema } from "@shared/schema";
import { AppError } from "../utils/errors";
import { sendReplyEmail } from "../services/email";
import { sendInvoiceEmail as sendInvoiceEmailFunc, markInvoiceAsSent, markInvoiceAsPaid } from "../services/invoice";
import { db } from "../db";
import { bookings, quotes, contactMessages, invoices } from "../../shared/schema";
import { eq } from "drizzle-orm";

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

    // Set the admin flag and let the middleware save it
    (req.session as any).isAdmin = true;
    console.log("Login successful, session ID:", req.session.id, "isAdmin: true");
    
    // Save session and send response
    req.session.save((err) => {
      if (err) {
        console.error("Session save error:", err);
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
    const idParam = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const id = parseInt(idParam, 10);
    if (Number.isNaN(id)) {
      throw AppError.validation("Invalid booking id");
    }

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
    const idParam = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const id = parseInt(idParam, 10);
    if (Number.isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid booking ID",
        errorCode: "INVALID_ID",
      });
    }

    const deleted = await storage.deleteBooking(id);
    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
        errorCode: "NOT_FOUND",
      });
    }

    return res.json({ success: true, message: "Booking deleted" });
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
    const data = insertInvoiceSchema.parse(req.body);
    
    // Use the invoice service to create invoice with line items
    const { createInvoice } = await import("../services/invoice");
    const adminName = (req.session as any)?.adminName || "admin";
    
    const invoice = await createInvoice({
      clientName: data.clientName,
      clientEmail: data.clientEmail,
      clientPhone: data.clientPhone || undefined,
      serviceType: data.serviceType,
      description: data.description || "",
      lineItems: data.lineItems || [],
      taxPercent: data.taxPercent,
      dueDate: data.dueDate,
      paymentInstructions: data.paymentInstructions || undefined,
      warrantyInfo: data.warrantyInfo || undefined,
      notes: data.notes || undefined,
      createdBy: adminName,
    });
    
    res.status(201).json(invoice);
  } catch (err) {
    next(err);
  }
}

export async function deleteInvoice(req: Request, res: Response, next: NextFunction) {
  try {
    const idParam = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const id = parseInt(idParam, 10);
    if (Number.isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid invoice ID",
        errorCode: "INVALID_ID",
      });
    }

    const deleted = await storage.deleteInvoice(id);
    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Invoice not found",
        errorCode: "NOT_FOUND",
      });
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

// Soft delete booking with reason
export async function softDeleteBooking(req: Request, res: Response, next: NextFunction) {
  try {
    const idParam = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const id = parseInt(idParam, 10);
    if (Number.isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid booking ID",
        errorCode: "INVALID_ID",
      });
    }

    const { reason } = req.body;
    if (!reason) {
      return res.status(400).json({
        success: false,
        message: "Deletion reason is required",
        errorCode: "MISSING_REASON",
      });
    }

    const adminName = (req.session as any)?.adminName || "admin";

    await db
      .update(bookings)
      .set({
        deletedAt: new Date(),
        deletionReason: reason,
        deletedBy: adminName,
      })
      .where(eq(bookings.id, id));

    console.log(`✓ Booking ${id} soft-deleted by ${adminName} (reason: ${reason})`);
    return res.json({ success: true, message: "Appointment deleted" });
  } catch (err) {
    next(err);
  }
}

// Soft delete quote with reason
export async function softDeleteQuote(req: Request, res: Response, next: NextFunction) {
  try {
    const idParam = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const id = parseInt(idParam, 10);
    if (Number.isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid quote ID",
        errorCode: "INVALID_ID",
      });
    }

    const { reason } = req.body;
    if (!reason) {
      return res.status(400).json({
        success: false,
        message: "Deletion reason is required",
        errorCode: "MISSING_REASON",
      });
    }

    const adminName = (req.session as any)?.adminName || "admin";

    await db
      .update(quotes)
      .set({
        deletedAt: new Date(),
        deletionReason: reason,
        deletedBy: adminName,
      })
      .where(eq(quotes.id, id));

    console.log(`✓ Quote ${id} soft-deleted by ${adminName} (reason: ${reason})`);
    return res.json({ success: true, message: "Quote deleted" });
  } catch (err) {
    next(err);
  }
}

// Reply to contact message and send email
export async function replyToContact(req: Request, res: Response, next: NextFunction) {
  try {
    const idParam = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const id = parseInt(idParam, 10);
    if (Number.isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid contact ID",
        errorCode: "INVALID_ID",
      });
    }

    const { replyMessage } = req.body;
    if (!replyMessage) {
      return res.status(400).json({
        success: false,
        message: "Reply message is required",
        errorCode: "MISSING_MESSAGE",
      });
    }

    const adminName = (req.session as any)?.adminName || "admin";

    // Get contact message
    const [contact] = await db
      .select()
      .from(contactMessages)
      .where(eq(contactMessages.id, id));

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: "Contact message not found",
        errorCode: "NOT_FOUND",
      });
    }

    // Send email
    await sendReplyEmail(contact.email, contact.name, replyMessage);

    // Update contact message
    await db
      .update(contactMessages)
      .set({
        repliedAt: new Date(),
        replyMessage,
        repliedBy: adminName,
        isResolved: true,
        resolvedAt: new Date(),
      })
      .where(eq(contactMessages.id, id));

    console.log(`✓ Reply sent to contact ${id} by ${adminName}`);
    return res.json({ success: true, message: "Email sent" });
  } catch (err: any) {
    console.error("❌ Failed to send reply email:", err.message);
    return res.status(500).json({
      success: false,
      message: "Failed to send email",
      error: err.message,
    });
  }
}

// Send invoice email
export async function sendInvoice(req: Request, res: Response, next: NextFunction) {
  try {
    const idParam = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const id = parseInt(idParam, 10);
    if (Number.isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid invoice ID",
        errorCode: "INVALID_ID",
      });
    }

    const [invoice] = await db
      .select()
      .from(invoices)
      .where(eq(invoices.id, id));

    if (!invoice) {
      return res.status(404).json({
        success: false,
        message: "Invoice not found",
        errorCode: "NOT_FOUND",
      });
    }

    // Send email
    await sendInvoiceEmailFunc(
      invoice.customerEmail,
      invoice.customerName,
      invoice.invoiceNumber,
      {
        totalAmount: invoice.totalAmount,
        dueDate: invoice.dueDate || "",
        description: invoice.description || "",
        serviceType: invoice.serviceType || "",
      }
    );

    // Mark as sent
    await markInvoiceAsSent(id);

    console.log(`✓ Invoice ${invoice.invoiceNumber} sent to ${invoice.customerEmail}`);
    return res.json({ success: true, message: "Invoice email sent" });
  } catch (err: any) {
    console.error("❌ Failed to send invoice:", err.message);
    return res.status(500).json({
      success: false,
      message: "Failed to send invoice",
      error: err.message,
    });
  }
}

// Mark invoice as paid
export async function markInvoicePaid(req: Request, res: Response, next: NextFunction) {
  try {
    const idParam = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const id = parseInt(idParam, 10);
    if (Number.isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid invoice ID",
        errorCode: "INVALID_ID",
      });
    }

    await markInvoiceAsPaid(id);

    console.log(`✓ Invoice ${id} marked as paid`);
    return res.json({ success: true, message: "Invoice marked as paid" });
  } catch (err: any) {
    console.error("❌ Failed to mark invoice as paid:", err.message);
    return res.status(500).json({
      success: false,
      message: "Failed to update invoice",
      error: err.message,
    });
  }
}
