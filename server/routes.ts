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
import * as cmsCtrl from "./controllers/cms";
import * as analyticsCtrl from "./controllers/analytics";
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
  app.delete("/api/admin/quotes/:id", requireAdmin, adminCtrl.softDeleteQuote);

  // Soft delete endpoints
  app.delete("/api/admin/bookings/:id/soft", requireAdmin, adminCtrl.softDeleteBooking);

  // Email reply to contact
  app.post("/api/admin/contacts/:id/reply", requireAdmin, adminCtrl.replyToContact);

  // Invoice email and payment
  app.post("/api/admin/invoices/:id/send", requireAdmin, adminCtrl.sendInvoice);
  app.patch("/api/admin/invoices/:id/mark-paid", requireAdmin, adminCtrl.markInvoicePaid);

  app.get("/api/admin/cms/settings", requireAdmin, cmsCtrl.getSettings);
  app.put("/api/admin/cms/settings/:key", requireAdmin, cmsCtrl.updateSetting);

  app.get("/api/admin/cms/reviews", requireAdmin, cmsCtrl.getReviews);
  app.post("/api/admin/cms/reviews", requireAdmin, cmsCtrl.createReview);
  app.put("/api/admin/cms/reviews/:id", requireAdmin, cmsCtrl.updateReview);
  app.delete("/api/admin/cms/reviews/:id", requireAdmin, cmsCtrl.deleteReview);

  app.get("/api/admin/cms/seo", requireAdmin, cmsCtrl.getSeoPages);
  app.post("/api/admin/cms/seo", requireAdmin, cmsCtrl.createSeoPage);
  app.put("/api/admin/cms/seo/:id", requireAdmin, cmsCtrl.updateSeoPage);

  app.get("/api/admin/cms/media", requireAdmin, cmsCtrl.getMedia);
  app.post("/api/admin/cms/media/upload", requireAdmin, cmsCtrl.uploadMedia);
  app.delete("/api/admin/cms/media/:id", requireAdmin, cmsCtrl.deleteMedia);

  app.get("/api/admin/cms/pages", requireAdmin, cmsCtrl.getCmsPages);
  app.post("/api/admin/cms/pages", requireAdmin, cmsCtrl.createCmsPage);
  app.put("/api/admin/cms/pages/:id", requireAdmin, cmsCtrl.updateCmsPage);
  app.delete("/api/admin/cms/pages/:id", requireAdmin, cmsCtrl.deleteCmsPage);

  app.get("/api/admin/cms/overview", requireAdmin, cmsCtrl.getOverview);

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
  app.post("/api/analytics/track", analyticsCtrl.trackPageView);
  app.post("/api/analytics/event", analyticsCtrl.trackAnalyticsEvent);
  app.get("/api/invoices/lookup", invoicesCtrl.lookupInvoice);
  app.post("/api/invoices/:invoiceNumber/pay", paymentLimiter, invoicesCtrl.payInvoice);
  app.get("/api/reminders", remindersCtrl.getRemindersByEmail);
  app.get("/api/reminders/pending", remindersCtrl.getPendingReminders);
  app.get("/api/cms/reviews", cmsCtrl.getPublicReviews);
  app.get("/api/cms/pages/:slug", cmsCtrl.getPublicPageBySlug);

  app.get("/api/admin/analytics/overview", requireAdmin, analyticsCtrl.getAnalyticsOverview);
  app.get("/api/admin/analytics/pages", requireAdmin, analyticsCtrl.getAnalyticsPages);
  app.get("/api/admin/analytics/devices", requireAdmin, analyticsCtrl.getAnalyticsDevices);
  app.get("/api/admin/analytics/referrers", requireAdmin, analyticsCtrl.getAnalyticsReferrers);
  app.get("/api/admin/analytics/chart", requireAdmin, analyticsCtrl.getAnalyticsChart);
  app.get("/api/admin/analytics/events", requireAdmin, analyticsCtrl.getAnalyticsEvents);
  app.get("/api/admin/analytics/bookings-by-service", requireAdmin, analyticsCtrl.getBookingsByService);
  app.get("/api/admin/analytics/revenue", requireAdmin, analyticsCtrl.getRevenueAnalytics);
  app.get("/api/admin/analytics/realtime", requireAdmin, analyticsCtrl.getRealtimeAnalytics);

  startReminderEngine();
  startBackupSchedule();

  return httpServer;
}
