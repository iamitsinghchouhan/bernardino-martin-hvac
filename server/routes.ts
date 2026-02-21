import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertBookingSchema, insertContactMessageSchema, insertInvoiceSchema } from "@shared/schema";
import { z } from "zod";
import { scheduleRemindersForBooking, startReminderEngine } from "./reminder-engine";

function requireAdmin(req: Request, res: Response, next: NextFunction) {
  if (!req.session?.isAdmin) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  next();
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  app.post("/api/admin/login", (req, res) => {
    const { password } = req.body;
    if (password === process.env.ADMIN_PASSWORD) {
      req.session.isAdmin = true;
      return res.json({ success: true });
    }
    res.status(401).json({ message: "Invalid password" });
  });

  app.post("/api/admin/logout", (req, res) => {
    req.session.destroy(() => {
      res.json({ success: true });
    });
  });

  app.get("/api/admin/me", (req, res) => {
    res.json({ isAdmin: !!req.session?.isAdmin });
  });

  app.get("/api/admin/stats", requireAdmin, async (_req, res) => {
    try {
      const stats = await storage.getDashboardStats();
      res.json(stats);
    } catch (error) {
      console.error("Admin stats error:", error);
      res.status(500).json({ message: "Failed to get stats" });
    }
  });

  app.get("/api/admin/bookings", requireAdmin, async (_req, res) => {
    try {
      const allBookings = await storage.getBookings();
      res.json(allBookings);
    } catch (error) {
      console.error("Admin bookings error:", error);
      res.status(500).json({ message: "Failed to get bookings" });
    }
  });

  app.patch("/api/admin/bookings/:id/status", requireAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const { status } = req.body;
      if (!status || !["pending", "confirmed", "completed", "cancelled"].includes(status)) {
        return res.status(400).json({ message: "Invalid status" });
      }
      const booking = await storage.updateBookingStatus(id, status);
      if (!booking) {
        return res.status(404).json({ message: "Booking not found" });
      }
      res.json(booking);
    } catch (error) {
      console.error("Update booking status error:", error);
      res.status(500).json({ message: "Failed to update booking" });
    }
  });

  app.get("/api/admin/invoices", requireAdmin, async (_req, res) => {
    try {
      const allInvoices = await storage.getAllInvoices();
      res.json(allInvoices);
    } catch (error) {
      console.error("Admin invoices error:", error);
      res.status(500).json({ message: "Failed to get invoices" });
    }
  });

  app.post("/api/admin/invoices", requireAdmin, async (req, res) => {
    try {
      const data = insertInvoiceSchema.parse(req.body);
      const invoice = await storage.createInvoice(data);
      res.status(201).json(invoice);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid invoice data", errors: error.errors });
      }
      console.error("Create invoice error:", error);
      res.status(500).json({ message: "Failed to create invoice" });
    }
  });

  app.get("/api/admin/contacts", requireAdmin, async (_req, res) => {
    try {
      const messages = await storage.getContactMessages();
      res.json(messages);
    } catch (error) {
      console.error("Admin contacts error:", error);
      res.status(500).json({ message: "Failed to get contacts" });
    }
  });

  app.get("/api/admin/reminders", requireAdmin, async (_req, res) => {
    try {
      const allReminders = await storage.getAllReminders();
      res.json(allReminders);
    } catch (error) {
      console.error("Admin reminders error:", error);
      res.status(500).json({ message: "Failed to get reminders" });
    }
  });

  app.post("/api/bookings", async (req, res) => {
    try {
      const data = insertBookingSchema.parse(req.body);
      const booking = await storage.createBooking(data);
      await scheduleRemindersForBooking(booking);
      res.status(201).json(booking);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid booking data", errors: error.errors });
      }
      console.error("Booking error:", error);
      res.status(500).json({ message: "Failed to create booking" });
    }
  });

  app.get("/api/bookings", async (req, res) => {
    try {
      const email = req.query.email as string | undefined;
      const bookings = email
        ? await storage.getBookingsByEmail(email)
        : await storage.getBookings();
      res.json(bookings);
    } catch (error) {
      console.error("Get bookings error:", error);
      res.status(500).json({ message: "Failed to get bookings" });
    }
  });

  app.post("/api/contact", async (req, res) => {
    try {
      const data = insertContactMessageSchema.parse(req.body);
      const message = await storage.createContactMessage(data);
      res.status(201).json(message);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid message data", errors: error.errors });
      }
      console.error("Contact error:", error);
      res.status(500).json({ message: "Failed to send message" });
    }
  });

  app.get("/api/invoices/lookup", async (req, res) => {
    try {
      const invoiceNumber = req.query.invoiceNumber as string | undefined;
      const email = req.query.email as string | undefined;

      if (invoiceNumber) {
        const invoice = await storage.getInvoiceByNumber(invoiceNumber);
        if (!invoice) {
          return res.status(404).json({ message: "Invoice not found" });
        }
        return res.json([invoice]);
      }

      if (email) {
        const invoices = await storage.getInvoicesByEmail(email);
        if (invoices.length === 0) {
          return res.status(404).json({ message: "No invoices found for this email" });
        }
        return res.json(invoices);
      }

      res.status(400).json({ message: "Please provide an invoice number or email" });
    } catch (error) {
      console.error("Invoice lookup error:", error);
      res.status(500).json({ message: "Failed to look up invoice" });
    }
  });

  app.post("/api/invoices/:invoiceNumber/pay", async (req, res) => {
    try {
      const invoice = await storage.markInvoicePaid(req.params.invoiceNumber);
      if (!invoice) {
        return res.status(404).json({ message: "Invoice not found" });
      }
      res.json(invoice);
    } catch (error) {
      console.error("Payment error:", error);
      res.status(500).json({ message: "Failed to process payment" });
    }
  });

  app.get("/api/reminders", async (req, res) => {
    try {
      const email = req.query.email as string | undefined;
      if (!email) {
        return res.status(400).json({ message: "Email is required" });
      }
      const remindersList = await storage.getRemindersByEmail(email);
      res.json(remindersList);
    } catch (error) {
      console.error("Get reminders error:", error);
      res.status(500).json({ message: "Failed to get reminders" });
    }
  });

  app.get("/api/reminders/pending", async (_req, res) => {
    try {
      const pending = await storage.getPendingReminders();
      res.json(pending);
    } catch (error) {
      console.error("Get pending reminders error:", error);
      res.status(500).json({ message: "Failed to get pending reminders" });
    }
  });

  startReminderEngine();

  return httpServer;
}
