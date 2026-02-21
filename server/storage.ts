import { db } from "./db";
import { bookings, contactMessages, invoices } from "@shared/schema";
import type { Booking, InsertBooking, ContactMessage, InsertContactMessage, Invoice, InsertInvoice } from "@shared/schema";
import { eq, or, desc } from "drizzle-orm";

export interface IStorage {
  createBooking(booking: InsertBooking): Promise<Booking>;
  getBookings(): Promise<Booking[]>;
  getBookingsByEmail(email: string): Promise<Booking[]>;

  createContactMessage(msg: InsertContactMessage): Promise<ContactMessage>;

  createInvoice(invoice: InsertInvoice): Promise<Invoice>;
  getInvoiceByNumber(invoiceNumber: string): Promise<Invoice | undefined>;
  getInvoicesByEmail(email: string): Promise<Invoice[]>;
  markInvoicePaid(invoiceNumber: string): Promise<Invoice | undefined>;
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
}

export const storage = new DatabaseStorage();
