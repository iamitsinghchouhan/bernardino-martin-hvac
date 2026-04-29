import { db } from "./db";
import { bookings, contactMessages, invoices, invoiceLineItems, reminders, quotes } from "@shared/schema";
import type {
  Booking,
  ContactMessage,
  CreateAdminInvoice,
  InsertBooking,
  InsertContactMessage,
  InsertInvoice,
  InsertReminder,
  Invoice,
  InvoiceLineItem,
  Quote,
  Reminder,
  SoftDeleteInput,
  InsertQuote,
} from "@shared/schema";
import { eq, desc, and, lte, count, sql, isNull, inArray } from "drizzle-orm";

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

type InvoiceWithLineItems = Invoice & {
  lineItems: InvoiceLineItem[];
};

type CreateInvoiceWithLineItemsInput = {
  invoiceNumber: string;
  customerEmail: string;
  customerName: string;
  clientEmail?: string | null;
  clientName?: string | null;
  serviceTitle: string;
  amount: number;
  status?: string | null;
  dueDate?: string | null;
  lineItems: Array<{
    description: string;
    quantity: string;
    unitPrice: string;
  }>;
};

export interface IStorage {
  createBooking(booking: InsertBooking): Promise<Booking>;
  getBookings(): Promise<Booking[]>;
  getBookingsByEmail(email: string): Promise<Booking[]>;
  updateBookingStatus(id: number, status: string): Promise<Booking | undefined>;
  softDeleteBooking(id: number, deletion: SoftDeleteInput): Promise<Booking | undefined>;

  createContactMessage(msg: InsertContactMessage): Promise<ContactMessage>;
  getContactMessages(): Promise<ContactMessage[]>;
  getContactMessageById(id: number): Promise<ContactMessage | undefined>;
  replyToContactMessage(
    id: number,
    payload: { replyMessage: string; repliedBy?: string | null; isResolved?: boolean },
  ): Promise<ContactMessage | undefined>;

  createInvoice(invoice: InsertInvoice): Promise<Invoice>;
  createInvoiceWithLineItems(invoice: CreateInvoiceWithLineItemsInput): Promise<InvoiceWithLineItems>;
  getInvoiceByNumber(invoiceNumber: string): Promise<Invoice | undefined>;
  getInvoicesByEmail(email: string): Promise<Invoice[]>;
  getAllInvoices(): Promise<InvoiceWithLineItems[]>;
  markInvoicePaid(invoiceNumber: string): Promise<Invoice | undefined>;
  deleteInvoice(id: number): Promise<boolean>;

  createReminder(reminder: InsertReminder): Promise<Reminder>;
  getRemindersByBookingId(bookingId: number): Promise<Reminder[]>;
  getPendingReminders(): Promise<Reminder[]>;
  markReminderSent(id: number): Promise<Reminder | undefined>;
  getRemindersByEmail(email: string): Promise<Reminder[]>;
  getAllReminders(): Promise<Reminder[]>;

  createQuote(quote: InsertQuote): Promise<Quote>;
  getQuotes(): Promise<Quote[]>;
  softDeleteQuote(id: number, deletion: SoftDeleteInput): Promise<Quote | undefined>;

  getDashboardStats(): Promise<DashboardStats>;
}

export class DatabaseStorage implements IStorage {
  async createBooking(booking: InsertBooking): Promise<Booking> {
    const [result] = await db.insert(bookings).values(booking).returning();
    return result;
  }

  async getBookings(): Promise<Booking[]> {
    return db
      .select()
      .from(bookings)
      .where(isNull(bookings.deletedAt))
      .orderBy(desc(bookings.createdAt));
  }

  async getBookingsByEmail(email: string): Promise<Booking[]> {
    return db
      .select()
      .from(bookings)
      .where(and(eq(bookings.email, email), isNull(bookings.deletedAt)))
      .orderBy(desc(bookings.createdAt));
  }

  async createContactMessage(msg: InsertContactMessage): Promise<ContactMessage> {
    const [result] = await db.insert(contactMessages).values(msg).returning();
    return result;
  }

  async createInvoice(invoice: InsertInvoice): Promise<Invoice> {
    const [result] = await db.insert(invoices).values(invoice).returning();
    return result;
  }

  async createInvoiceWithLineItems(
    invoice: CreateInvoiceWithLineItemsInput,
  ): Promise<InvoiceWithLineItems> {
    return db.transaction(async (tx) => {
      const [createdInvoice] = await tx
        .insert(invoices)
        .values({
          invoiceNumber: invoice.invoiceNumber,
          customerEmail: invoice.customerEmail,
          customerName: invoice.customerName,
          clientEmail: invoice.clientEmail ?? invoice.customerEmail,
          clientName: invoice.clientName ?? invoice.customerName,
          serviceTitle: invoice.serviceTitle,
          amount: invoice.amount,
          status: invoice.status ?? "draft",
          dueDate: invoice.dueDate ?? null,
        })
        .returning();

      let createdLineItems: InvoiceLineItem[] = [];
      if (invoice.lineItems.length > 0) {
        createdLineItems = await tx
          .insert(invoiceLineItems)
          .values(
            invoice.lineItems.map((item) => ({
              invoiceId: createdInvoice.id,
              description: item.description,
              quantity: item.quantity,
              unitPrice: item.unitPrice,
            })),
          )
          .returning();
      }

      return {
        ...createdInvoice,
        lineItems: createdLineItems,
      };
    });
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
      .where(and(eq(bookings.id, id), isNull(bookings.deletedAt)))
      .returning();
    return result;
  }

  async softDeleteBooking(id: number, deletion: SoftDeleteInput): Promise<Booking | undefined> {
    return db.transaction(async (tx) => {
      const [booking] = await tx
        .update(bookings)
        .set({
          deletedAt: new Date(),
          deletionReason: deletion.reason ?? null,
          deletedBy: deletion.deletedBy ?? "admin",
          status: "cancelled",
        })
        .where(and(eq(bookings.id, id), isNull(bookings.deletedAt)))
        .returning();

      if (!booking) {
        return undefined;
      }

      await tx
        .update(reminders)
        .set({ status: "cancelled" })
        .where(eq(reminders.bookingId, id));

      return booking;
    });
  }

  async getContactMessages(): Promise<ContactMessage[]> {
    return db.select().from(contactMessages).orderBy(desc(contactMessages.createdAt));
  }

  async getContactMessageById(id: number): Promise<ContactMessage | undefined> {
    const [message] = await db
      .select()
      .from(contactMessages)
      .where(eq(contactMessages.id, id));
    return message;
  }

  async replyToContactMessage(
    id: number,
    payload: { replyMessage: string; repliedBy?: string | null; isResolved?: boolean },
  ): Promise<ContactMessage | undefined> {
    const [message] = await db
      .update(contactMessages)
      .set({
        repliedAt: new Date(),
        replyMessage: payload.replyMessage,
        repliedBy: payload.repliedBy ?? "admin",
        isResolved: payload.isResolved ?? true,
        resolvedAt: payload.isResolved === false ? null : new Date(),
      })
      .where(eq(contactMessages.id, id))
      .returning();
    return message;
  }

  async getAllInvoices(): Promise<InvoiceWithLineItems[]> {
    const allInvoices = await db.select().from(invoices).orderBy(desc(invoices.createdAt));
    if (allInvoices.length === 0) {
      return [];
    }

    const allLineItems = await db
      .select()
      .from(invoiceLineItems)
      .where(
        inArray(
          invoiceLineItems.invoiceId,
          allInvoices.map((invoice) => invoice.id),
        ),
      );

    const itemsByInvoiceId = new Map<number, InvoiceLineItem[]>();
    for (const item of allLineItems) {
      const invoiceId = item.invoiceId;
      if (invoiceId == null) continue;
      const bucket = itemsByInvoiceId.get(invoiceId) ?? [];
      bucket.push(item);
      itemsByInvoiceId.set(invoiceId, bucket);
    }

    return allInvoices.map((invoice) => ({
      ...invoice,
      lineItems: itemsByInvoiceId.get(invoice.id) ?? [],
    }));
  }

  async deleteInvoice(id: number): Promise<boolean> {
    const deletedInvoices = await db.transaction(async (tx) => {
      await tx.delete(invoiceLineItems).where(eq(invoiceLineItems.invoiceId, id));
      return tx
        .delete(invoices)
        .where(eq(invoices.id, id))
        .returning({ id: invoices.id });
    });

    return deletedInvoices.length > 0;
  }

  async getAllReminders(): Promise<Reminder[]> {
    return db.select().from(reminders).orderBy(desc(reminders.scheduledFor));
  }

  async createQuote(quote: InsertQuote): Promise<Quote> {
    const [result] = await db.insert(quotes).values(quote).returning();
    return result;
  }

  async getQuotes(): Promise<Quote[]> {
    return db
      .select()
      .from(quotes)
      .where(isNull(quotes.deletedAt))
      .orderBy(desc(quotes.createdAt));
  }

  async softDeleteQuote(id: number, deletion: SoftDeleteInput): Promise<Quote | undefined> {
    const [quote] = await db
      .update(quotes)
      .set({
        deletedAt: new Date(),
        deletionReason: deletion.reason ?? null,
        deletedBy: deletion.deletedBy ?? "admin",
        status: "deleted",
      })
      .where(and(eq(quotes.id, id), isNull(quotes.deletedAt)))
      .returning();

    return quote;
  }

  async getDashboardStats(): Promise<DashboardStats> {
    const [bookingStats] = await db.select({
      total: count(),
      pending: count(sql`CASE WHEN ${bookings.status} = 'pending' THEN 1 END`),
    }).from(bookings).where(isNull(bookings.deletedAt));

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
