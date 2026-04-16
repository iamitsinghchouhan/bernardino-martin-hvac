import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, integer, boolean, serial } from "drizzle-orm/pg-core";
import { z } from "zod";

const BLOCKED_DOMAINS = [
  "mailinator.com", "guerrillamail.com", "tempmail.com", "throwaway.email",
  "yopmail.com", "sharklasers.com", "guerrillamailblock.com", "grr.la",
  "dispostable.com", "trashmail.com", "fakeinbox.com", "tempail.com",
  "maildrop.cc", "10minutemail.com", "getnada.com", "temp-mail.org",
  "mohmal.com", "burnermail.io", "mailnesia.com"
];

export const strictEmail = z.string().trim().email().max(320)
  .refine((email) => {
    const domain = email.split("@")[1]?.toLowerCase();
    if (!domain) return false;
    if (BLOCKED_DOMAINS.includes(domain)) return false;
    if (!domain.includes(".")) return false;
    const tld = domain.split(".").pop();
    if (!tld || tld.length < 2) return false;
    return true;
  }, { message: "Please use a valid, non-disposable email address" });

export const bookings = pgTable("bookings", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  serviceId: text("service_id").notNull(),
  serviceTitle: text("service_title").notNull(),
  fullName: text("full_name").notNull(),
  phone: text("phone").notNull(),
  email: text("email").notNull(),
  address: text("address").notNull(),
  preferredDate: text("preferred_date").notNull(),
  notes: text("notes"),
  status: text("status").notNull().default("pending"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const contactMessages = pgTable("contact_messages", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  name: text("name").notNull(),
  phone: text("phone"),
  email: text("email").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const invoices = pgTable("invoices", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  invoiceNumber: text("invoice_number").notNull().unique(),
  customerEmail: text("customer_email").notNull(),
  customerName: text("customer_name").notNull(),
  serviceTitle: text("service_title").notNull(),
  amount: integer("amount").notNull(),
  status: text("status").notNull().default("unpaid"),
  dueDate: text("due_date"),
  paidAt: timestamp("paid_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const reminders = pgTable("reminders", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  bookingId: integer("booking_id").notNull(),
  customerName: text("customer_name").notNull(),
  customerEmail: text("customer_email").notNull(),
  customerPhone: text("customer_phone").notNull(),
  serviceTitle: text("service_title").notNull(),
  appointmentDate: text("appointment_date").notNull(),
  reminderType: text("reminder_type").notNull(),
  channel: text("channel").notNull().default("email"),
  status: text("status").notNull().default("pending"),
  scheduledFor: timestamp("scheduled_for").notNull(),
  sentAt: timestamp("sent_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const siteSettings = pgTable("site_settings", {
  id: serial("id").primaryKey(),
  key: text("key").notNull().unique(),
  value: text("value").notNull(),
  label: text("label").notNull(),
  type: text("type").notNull().default("text"),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const reviews = pgTable("reviews", {
  id: serial("id").primaryKey(),
  customerName: text("customer_name").notNull(),
  location: text("location").notNull(),
  service: text("service").notNull(),
  review: text("review").notNull(),
  rating: integer("rating").notNull().default(5),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const seoPages = pgTable("seo_pages", {
  id: serial("id").primaryKey(),
  pageSlug: text("page_slug").notNull().unique(),
  pageTitle: text("page_title").notNull(),
  metaTitle: text("meta_title").notNull(),
  metaDescription: text("meta_description").notNull(),
  keywords: text("keywords"),
  isIndexed: boolean("is_indexed").notNull().default(true),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const mediaLibrary = pgTable("media_library", {
  id: serial("id").primaryKey(),
  filename: text("filename").notNull(),
  originalName: text("original_name").notNull(),
  url: text("url").notNull(),
  size: integer("size"),
  mimeType: text("mime_type"),
  altText: text("alt_text"),
  uploadedAt: timestamp("uploaded_at").defaultNow(),
});

export const cmsPages = pgTable("cms_pages", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  metaTitle: text("meta_title").notNull(),
  metaDescription: text("meta_description").notNull(),
  h1: text("h1").notNull(),
  content: text("content").notNull(),
  heroImage: text("hero_image"),
  isPublished: boolean("is_published").notNull().default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const pageViews = pgTable("page_views", {
  id: serial("id").primaryKey(),
  page: text("page").notNull(),
  referrer: text("referrer"),
  userAgent: text("user_agent"),
  deviceType: text("device_type"),
  country: text("country"),
  city: text("city"),
  sessionId: text("session_id"),
  ipHash: text("ip_hash"),
  visitedAt: timestamp("visited_at").defaultNow(),
});

export const analyticsEvents = pgTable("analytics_events", {
  id: serial("id").primaryKey(),
  eventType: text("event_type").notNull(),
  eventData: text("event_data"),
  page: text("page"),
  sessionId: text("session_id"),
  occurredAt: timestamp("occurred_at").defaultNow(),
});

export const dailyStats = pgTable("daily_stats", {
  id: serial("id").primaryKey(),
  date: text("date").notNull().unique(),
  totalVisitors: integer("total_visitors").notNull().default(0),
  uniqueVisitors: integer("unique_visitors").notNull().default(0),
  totalPageViews: integer("total_page_views").notNull().default(0),
  bookingsCreated: integer("bookings_created").notNull().default(0),
  contactsCreated: integer("contacts_created").notNull().default(0),
  quotesCreated: integer("quotes_created").notNull().default(0),
  invoicesPaid: integer("invoices_paid").notNull().default(0),
  revenueCollected: integer("revenue_collected").notNull().default(0),
});

export const insertBookingSchema = z.object({
  fullName: z.string().trim().min(1).max(200),
  email: strictEmail,
  phone: z.string().trim().min(7).max(30),
  address: z.string().trim().min(1).max(500),
  serviceId: z.string().trim().min(1).max(100),
  serviceTitle: z.string().trim().min(1).max(200),
  preferredDate: z.string().trim().min(1).max(50),
  notes: z.string().trim().max(2000).optional().nullable(),
});

export const insertContactMessageSchema = z.object({
  name: z.string().trim().min(1).max(200),
  email: strictEmail,
  phone: z.string().trim().max(30).optional().nullable(),
  message: z.string().trim().min(1).max(5000),
});

export const insertInvoiceSchema = z.object({
  invoiceNumber: z.string().trim().min(1).max(50),
  customerEmail: strictEmail,
  customerName: z.string().trim().min(1).max(200),
  serviceTitle: z.string().trim().min(1).max(200),
  amount: z.number().int().positive(),
  status: z.string().trim().max(50).optional(),
  dueDate: z.string().trim().max(50).optional().nullable(),
});

export type Booking = typeof bookings.$inferSelect;
export type InsertBooking = z.infer<typeof insertBookingSchema>;
export type ContactMessage = typeof contactMessages.$inferSelect;
export type InsertContactMessage = z.infer<typeof insertContactMessageSchema>;
export type Invoice = typeof invoices.$inferSelect;
export type InsertInvoice = z.infer<typeof insertInvoiceSchema>;

export const insertReminderSchema = z.object({
  bookingId: z.number().int().positive(),
  customerName: z.string().trim().min(1).max(200),
  customerEmail: strictEmail,
  customerPhone: z.string().trim().min(7).max(30),
  serviceTitle: z.string().trim().min(1).max(200),
  appointmentDate: z.string().trim().min(1).max(50),
  reminderType: z.string().trim().min(1).max(100),
  channel: z.string().trim().max(50).optional(),
  status: z.string().trim().max(50).optional(),
  scheduledFor: z.coerce.date(),
  sentAt: z.coerce.date().optional().nullable(),
});
export type Reminder = typeof reminders.$inferSelect;
export type InsertReminder = z.infer<typeof insertReminderSchema>;

export const insertSiteSettingSchema = z.object({
  key: z.string().trim().min(1).max(100),
  value: z.string().trim().min(1).max(5000),
  label: z.string().trim().min(1).max(200),
  type: z.string().trim().min(1).max(50).default("text"),
});

export const insertReviewSchema = z.object({
  customerName: z.string().trim().min(1).max(200),
  location: z.string().trim().min(1).max(200),
  service: z.string().trim().min(1).max(200),
  review: z.string().trim().min(1).max(5000),
  rating: z.number().int().min(1).max(5).default(5),
  isActive: z.boolean().optional().default(true),
});

export const insertSeoPageSchema = z.object({
  pageSlug: z.string().trim().min(1).max(300),
  pageTitle: z.string().trim().min(1).max(300),
  metaTitle: z.string().trim().min(1).max(300),
  metaDescription: z.string().trim().min(1).max(1000),
  keywords: z.string().trim().max(1000).optional().nullable(),
  isIndexed: z.boolean().optional().default(true),
});

export const insertMediaLibrarySchema = z.object({
  filename: z.string().trim().min(1).max(500),
  originalName: z.string().trim().min(1).max(500),
  url: z.string().trim().min(1).max(1000),
  size: z.number().int().nonnegative().optional().nullable(),
  mimeType: z.string().trim().max(100).optional().nullable(),
  altText: z.string().trim().max(500).optional().nullable(),
});

export const insertCmsPageSchema = z.object({
  slug: z.string().trim().min(1).max(300).regex(/^[a-z0-9-]+$/),
  title: z.string().trim().min(1).max(300),
  metaTitle: z.string().trim().min(1).max(300),
  metaDescription: z.string().trim().min(1).max(1000),
  h1: z.string().trim().min(1).max(300),
  content: z.string().trim().min(1).max(20000),
  heroImage: z.string().trim().max(1000).optional().nullable(),
  isPublished: z.boolean().optional().default(false),
});

export const insertPageViewSchema = z.object({
  page: z.string().trim().min(1).max(500),
  referrer: z.string().trim().max(1000).optional().nullable(),
  userAgent: z.string().trim().max(1000).optional().nullable(),
  deviceType: z.string().trim().max(50).optional().nullable(),
  country: z.string().trim().max(100).optional().nullable(),
  city: z.string().trim().max(100).optional().nullable(),
  sessionId: z.string().trim().max(200).optional().nullable(),
  ipHash: z.string().trim().max(200).optional().nullable(),
});

export const insertAnalyticsEventSchema = z.object({
  eventType: z.string().trim().min(1).max(100),
  eventData: z.string().trim().max(5000).optional().nullable(),
  page: z.string().trim().max(500).optional().nullable(),
  sessionId: z.string().trim().max(200).optional().nullable(),
});

export const insertDailyStatSchema = z.object({
  date: z.string().trim().min(1).max(50),
  totalVisitors: z.number().int().nonnegative().optional().default(0),
  uniqueVisitors: z.number().int().nonnegative().optional().default(0),
  totalPageViews: z.number().int().nonnegative().optional().default(0),
  bookingsCreated: z.number().int().nonnegative().optional().default(0),
  contactsCreated: z.number().int().nonnegative().optional().default(0),
  quotesCreated: z.number().int().nonnegative().optional().default(0),
  invoicesPaid: z.number().int().nonnegative().optional().default(0),
  revenueCollected: z.number().int().nonnegative().optional().default(0),
});

export type SiteSetting = typeof siteSettings.$inferSelect;
export type InsertSiteSetting = z.infer<typeof insertSiteSettingSchema>;
export type Review = typeof reviews.$inferSelect;
export type InsertReview = z.infer<typeof insertReviewSchema>;
export type SeoPage = typeof seoPages.$inferSelect;
export type InsertSeoPage = z.infer<typeof insertSeoPageSchema>;
export type MediaItem = typeof mediaLibrary.$inferSelect;
export type InsertMediaItem = z.infer<typeof insertMediaLibrarySchema>;
export type CmsPage = typeof cmsPages.$inferSelect;
export type InsertCmsPage = z.infer<typeof insertCmsPageSchema>;
export type PageView = typeof pageViews.$inferSelect;
export type InsertPageView = z.infer<typeof insertPageViewSchema>;
export type AnalyticsEvent = typeof analyticsEvents.$inferSelect;
export type InsertAnalyticsEvent = z.infer<typeof insertAnalyticsEventSchema>;
export type DailyStat = typeof dailyStats.$inferSelect;
export type InsertDailyStat = z.infer<typeof insertDailyStatSchema>;

export const quotes = pgTable("quotes", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  serviceType: text("service_type").notNull(),
  propertyType: text("property_type").notNull(),
  description: text("description").notNull(),
  urgency: text("urgency").notNull().default("standard"),
  fullName: text("full_name").notNull(),
  phone: text("phone").notNull(),
  email: text("email").notNull(),
  address: text("address"),
  status: text("status").notNull().default("new"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertQuoteSchema = z.object({
  serviceType: z.string().trim().min(1).max(100),
  propertyType: z.string().trim().min(1).max(100),
  description: z.string().trim().min(1).max(5000),
  urgency: z.string().trim().max(50).optional(),
  fullName: z.string().trim().min(1).max(200),
  phone: z.string().trim().min(7).max(30),
  email: strictEmail,
  address: z.string().trim().max(500).optional().nullable(),
});
export type Quote = typeof quotes.$inferSelect;
export type InsertQuote = z.infer<typeof insertQuoteSchema>;
