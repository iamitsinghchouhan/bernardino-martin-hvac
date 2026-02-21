import { db } from "./db";
import { bookings, contactMessages, invoices, reminders } from "@shared/schema";
import type { Booking, InsertBooking, ContactMessage, InsertContactMessage, Invoice, InsertInvoice, Reminder, InsertReminder } from "@shared/schema";
import { eq, or, desc, and, lte, count, sql } from "drizzle-orm";

export interface DashboardStats {
  totalBookings: number;
  pendingBookings: number;
  totalInvoices: number;
  paidInvoices: number;
  unpaidInvoices: number;
  totalRevenue: number;
  totalContacts: number;
  pendingReminders: number;
}

export interface IStorage {
  createBooking(booking: InsertBooking): Promise<Booking>;
  getBookings(): Promise<Booking[]>;
  getBookingsByEmail(email: string): Promise<Booking[]>;
  updateBookingStatus(id: number, status: string): Promise<Booking | undefined>;

  createContactMessage(msg: InsertContactMessage): Promise<ContactMessage>;
  getContactMessages(): Promise<ContactMessage[]>;

  createInvoice(invoice: InsertInvoice): Promise<Invoice>;
  getInvoiceByNumber(invoiceNumber: string): Promise<Invoice | undefined>;
  getInvoicesByEmail(email: string): Promise<Invoice[]>;
  getAllInvoices(): Promise<Invoice[]>;
  markInvoicePaid(invoiceNumber: string): Promise<Invoice | undefined>;

  createReminder(reminder: InsertReminder): Promise<Reminder>;
  getRemindersByBookingId(bookingId: number): Promise<Reminder[]>;
  getPendingReminders(): Promise<Reminder[]>;
  markReminderSent(id: number): Promise<Reminder | undefined>;
  getRemindersByEmail(email: string): Promise<Reminder[]>;
  getAllReminders(): Promise<Reminder[]>;

  getDashboardStats(): Promise<DashboardStats>;
}

export class DatabaseStorage implements IStorage {
  async createBooking(booking: InsertBooking): Promise<Booking> {
    const [result] = await db.insert(bookings).values(booking).returning();
    return result;
  }

  async getBookings(): Promise<Booking[]> {
    return db.select().from(bookings).orderBy(desc(bookings.createdAt));
  }

  async getBookingsByEmail(email: string): Promise<Booking[]> {
    return db.select().from(bookings).where(eq(bookings.email, email)).orderBy(desc(bookings.createdAt));
  }

  async createContactMessage(msg: InsertContactMessage): Promise<ContactMessage> {
    const [result] = await db.insert(contactMessages).values(msg).returning();
    return result;
  }

  async createInvoice(invoice: InsertInvoice): Promise<Invoice> {
    const [result] = await db.insert(invoices).values(invoice).returning();
    return result;
  }

  async getInvoiceByNumber(invoiceNumber: string): Promise<Invoice | undefined> {
    const [result] = await db.select().from(invoices).where(eq(invoices.invoiceNumber, invoiceNumber));
    return result;
  }

  async getInvoicesByEmail(email: string): Promise<Invoice[]> {
    return db.select().from(invoices).where(eq(invoices.customerEmail, email)).orderBy(desc(invoices.createdAt));
  }

  async markInvoicePaid(invoiceNumber: string): Promise<Invoice | undefined> {
    const [result] = await db
      .update(invoices)
      .set({ status: "paid", paidAt: new Date() })
      .where(eq(invoices.invoiceNumber, invoiceNumber))
      .returning();
    return result;
  }
  async createReminder(reminder: InsertReminder): Promise<Reminder> {
    const [result] = await db.insert(reminders).values(reminder).returning();
    return result;
  }

  async getRemindersByBookingId(bookingId: number): Promise<Reminder[]> {
    return db.select().from(reminders).where(eq(reminders.bookingId, bookingId)).orderBy(desc(reminders.scheduledFor));
  }

  async getPendingReminders(): Promise<Reminder[]> {
    return db.select().from(reminders)
      .where(and(eq(reminders.status, "pending"), lte(reminders.scheduledFor, new Date())))
      .orderBy(reminders.scheduledFor);
  }

  async markReminderSent(id: number): Promise<Reminder | undefined> {
    const [result] = await db
      .update(reminders)
      .set({ status: "sent", sentAt: new Date() })
      .where(eq(reminders.id, id))
      .returning();
    return result;
  }

  async getRemindersByEmail(email: string): Promise<Reminder[]> {
    return db.select().from(reminders).where(eq(reminders.customerEmail, email)).orderBy(desc(reminders.scheduledFor));
  }

  async updateBookingStatus(id: number, status: string): Promise<Booking | undefined> {
    const [result] = await db
      .update(bookings)
      .set({ status })
      .where(eq(bookings.id, id))
      .returning();
    return result;
  }

  async getContactMessages(): Promise<ContactMessage[]> {
    return db.select().from(contactMessages).orderBy(desc(contactMessages.createdAt));
  }

  async getAllInvoices(): Promise<Invoice[]> {
    return db.select().from(invoices).orderBy(desc(invoices.createdAt));
  }

  async getAllReminders(): Promise<Reminder[]> {
    return db.select().from(reminders).orderBy(desc(reminders.scheduledFor));
  }

  async getDashboardStats(): Promise<DashboardStats> {
    const [bookingStats] = await db.select({
      total: count(),
      pending: count(sql`CASE WHEN ${bookings.status} = 'pending' THEN 1 END`),
    }).from(bookings);

    const [invoiceStats] = await db.select({
      total: count(),
      paid: count(sql`CASE WHEN ${invoices.status} = 'paid' THEN 1 END`),
      unpaid: count(sql`CASE WHEN ${invoices.status} != 'paid' THEN 1 END`),
      revenue: sql<number>`COALESCE(SUM(CASE WHEN ${invoices.status} = 'paid' THEN ${invoices.amount} ELSE 0 END), 0)`,
    }).from(invoices);

    const [contactStats] = await db.select({ total: count() }).from(contactMessages);
    const [reminderStats] = await db.select({
      pending: count(sql`CASE WHEN ${reminders.status} = 'pending' THEN 1 END`),
    }).from(reminders);

    return {
      totalBookings: bookingStats.total,
      pendingBookings: bookingStats.pending,
      totalInvoices: invoiceStats.total,
      paidInvoices: invoiceStats.paid,
      unpaidInvoices: invoiceStats.unpaid,
      totalRevenue: Number(invoiceStats.revenue),
      totalContacts: contactStats.total,
      pendingReminders: reminderStats.pending,
    };
  }
}

export const storage = new DatabaseStorage();
