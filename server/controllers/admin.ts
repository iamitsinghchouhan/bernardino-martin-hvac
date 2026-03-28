import type { Request, Response, NextFunction } from "express";
import { storage } from "../storage";
import { insertInvoiceSchema } from "@shared/schema";
import { AppError } from "../utils/errors";

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const { password } = req.body;
    if (!password || password !== process.env.ADMIN_PASSWORD) {
      throw AppError.unauthorized("Invalid password");
    }
    req.session.isAdmin = true;
    res.json({ success: true });
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
  res.json({ isAdmin: !!req.session?.isAdmin });
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
      throw AppError.validation("Invalid booking id");
    }

    const booking = await storage.deleteBooking(id);
    if (!booking) {
      throw AppError.notFound("Booking not found");
    }

    res.json({ success: true, booking });
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
    const invoice = await storage.createInvoice(data);
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
      throw AppError.validation("Invalid invoice id");
    }

    const invoice = await storage.deleteInvoice(id);
    if (!invoice) {
      throw AppError.notFound("Invoice not found");
    }

    res.json({ success: true, invoice });
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
