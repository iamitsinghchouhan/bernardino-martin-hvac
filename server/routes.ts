import type { Express } from "express";
import { type Server } from "http";
import { requireAdmin } from "./middleware/auth";
import { loginLimiter, formLimiter, paymentLimiter, globalLimiter } from "./middleware/rate-limit";
import * as adminCtrl from "./controllers/admin";
import * as bookingsCtrl from "./controllers/bookings";
import * as contactsCtrl from "./controllers/contacts";
import * as invoicesCtrl from "./controllers/invoices";
import * as quotesCtrl from "./controllers/quotes";
import * as remindersCtrl from "./controllers/reminders";
import * as healthCtrl from "./controllers/health";
import { performBackup } from "./backup";
import { startReminderEngine } from "./reminder-engine";
import { startBackupSchedule } from "./backup";
import { logger } from "./logger";

export async function registerRoutes(
  httpServer: Server,
  app: Express,
): Promise<Server> {

  app.use("/api", globalLimiter);

  app.get("/health", healthCtrl.healthCheck);

  app.post("/api/admin/login", loginLimiter, adminCtrl.login);
  app.post("/api/admin/logout", adminCtrl.logout);
  app.get("/api/admin/me", adminCtrl.getMe);
  app.get("/api/admin/stats", requireAdmin, adminCtrl.getStats);
  app.get("/api/admin/bookings", requireAdmin, adminCtrl.getBookings);
  app.patch("/api/admin/bookings/:id/status", requireAdmin, adminCtrl.updateBookingStatus);
  app.delete("/api/admin/bookings/:id", requireAdmin, adminCtrl.deleteBooking);
  app.get("/api/admin/invoices", requireAdmin, adminCtrl.getInvoices);
  app.post("/api/admin/invoices", requireAdmin, adminCtrl.createInvoice);
  app.delete("/api/admin/invoices/:id", requireAdmin, adminCtrl.deleteInvoice);
  app.get("/api/admin/contacts", requireAdmin, adminCtrl.getContacts);
  app.get("/api/admin/reminders", requireAdmin, adminCtrl.getReminders);
  app.get("/api/admin/quotes", requireAdmin, adminCtrl.getQuotes);

  app.post("/api/admin/backup", requireAdmin, async (_req, res) => {
    const result = await performBackup();
    if (result.success) {
      res.json({ success: true, message: "Backup completed", filename: result.filename });
    } else {
      logger.error({ error: result.error }, "Manual backup failed");
      res.status(500).json({ success: false, message: "Backup failed", errorCode: "INTERNAL_ERROR" });
    }
  });

  app.post("/api/quotes", formLimiter, quotesCtrl.createQuote);
  app.post("/api/bookings", formLimiter, bookingsCtrl.createBooking);
  app.get("/api/bookings", bookingsCtrl.getBookings);
  app.post("/api/contact", formLimiter, contactsCtrl.createContact);
  app.get("/api/invoices/lookup", invoicesCtrl.lookupInvoice);
  app.post("/api/invoices/:invoiceNumber/pay", paymentLimiter, invoicesCtrl.payInvoice);
  app.get("/api/reminders", remindersCtrl.getRemindersByEmail);
  app.get("/api/reminders/pending", remindersCtrl.getPendingReminders);

  startReminderEngine();
  startBackupSchedule();

  return httpServer;
}
