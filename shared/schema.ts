import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
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

export const insertBookingSchema = createInsertSchema(bookings).omit({
  id: true,
  status: true,
  createdAt: true,
}).extend({
  fullName: z.string().trim().min(1).max(200),
  email: strictEmail,
  phone: z.string().trim().min(7).max(30),
  address: z.string().trim().min(1).max(500),
  serviceId: z.string().trim().min(1).max(100),
  serviceTitle: z.string().trim().min(1).max(200),
  preferredDate: z.string().trim().min(1).max(50),
  notes: z.string().trim().max(2000).optional().nullable(),
});

export const insertContactMessageSchema = createInsertSchema(contactMessages).omit({
  id: true,
  createdAt: true,
}).extend({
  name: z.string().trim().min(1).max(200),
  email: strictEmail,
  phone: z.string().trim().max(30).optional().nullable(),
  message: z.string().trim().min(1).max(5000),
});

export const insertInvoiceSchema = createInsertSchema(invoices).omit({
  id: true,
  paidAt: true,
  createdAt: true,
}).extend({
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

export const insertReminderSchema = createInsertSchema(reminders).omit({
  id: true,
  sentAt: true,
  createdAt: true,
});
export type Reminder = typeof reminders.$inferSelect;
export type InsertReminder = z.infer<typeof insertReminderSchema>;

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

export const insertQuoteSchema = createInsertSchema(quotes).omit({
  id: true,
  status: true,
  createdAt: true,
}).extend({
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
