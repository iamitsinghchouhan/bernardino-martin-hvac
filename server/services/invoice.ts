import { desc, eq } from "drizzle-orm";

import { db } from "../db";
import { invoices, invoiceLineItems } from "../../shared/schema";
import { sendInvoiceEmail as deliverInvoiceEmail } from "./email";

export interface CreateInvoiceData {
  bookingId?: number;
  clientName: string;
  clientEmail: string;
  clientPhone?: string;
  serviceType: string;
  description: string;
  lineItems: Array<{
    description: string;
    quantity: number;
    unitPrice: number;
  }>;
  taxPercent?: number;
  dueDate: string;
  paymentInstructions?: string;
  warrantyInfo?: string;
  notes?: string;
  createdBy: string;
}

function toDecimalString(value: number) {
  return value.toFixed(2);
}

function formatInvoiceNumber(sequence: number) {
  return `INV-${String(sequence).padStart(4, "0")}`;
}

export async function createInvoice(data: CreateInvoiceData) {
  try {
    const subtotal = data.lineItems.reduce(
      (sum, item) => sum + item.quantity * item.unitPrice,
      0,
    );
    const taxPercent = data.taxPercent ?? 0;
    const totalWithTax = subtotal + subtotal * (taxPercent / 100);
    const amountInCents = Math.round(totalWithTax * 100);

    const [latestInvoice] = await db
      .select({ invoiceNumber: invoices.invoiceNumber })
      .from(invoices)
      .orderBy(desc(invoices.createdAt))
      .limit(1);

    let nextNumber = 1;
    if (latestInvoice?.invoiceNumber) {
      const lastDigits = parseInt(
        latestInvoice.invoiceNumber.replace(/^INV-/, ""),
        10,
      );
      if (!Number.isNaN(lastDigits)) {
        nextNumber = lastDigits + 1;
      }
    }

    const [invoice] = await db
      .insert(invoices)
      .values({
        invoiceNumber: formatInvoiceNumber(nextNumber),
        customerName: data.clientName,
        customerEmail: data.clientEmail,
        clientName: data.clientName,
        clientEmail: data.clientEmail,
        serviceTitle: data.serviceType || data.description || "General Service",
        amount: amountInCents,
        dueDate: data.dueDate,
        status: "draft",
      })
      .returning();

    if (data.lineItems.length > 0) {
      await db.insert(invoiceLineItems).values(
        data.lineItems.map((item) => ({
          invoiceId: invoice.id,
          description: item.description,
          quantity: toDecimalString(item.quantity),
          unitPrice: toDecimalString(item.unitPrice),
        })),
      );
    }

    console.log(`Invoice ${invoice.invoiceNumber} created by ${data.createdBy}`);
    return invoice;
  } catch (error: any) {
    console.error("Failed to create invoice:", error.message);
    throw new Error(`Invoice creation failed: ${error.message}`);
  }
}

export async function getInvoices() {
  try {
    return await db.select().from(invoices).orderBy(desc(invoices.createdAt));
  } catch (error: any) {
    console.error("Failed to fetch invoices:", error.message);
    throw new Error(`Failed to fetch invoices: ${error.message}`);
  }
}

export async function getInvoiceById(id: number) {
  try {
    const [invoice] = await db.select().from(invoices).where(eq(invoices.id, id));
    return invoice ?? null;
  } catch (error: any) {
    console.error("Failed to fetch invoice:", error.message);
    throw new Error(`Failed to fetch invoice: ${error.message}`);
  }
}

export async function markInvoiceAsSent(invoiceId: number) {
  try {
    await db
      .update(invoices)
      .set({ status: "sent" })
      .where(eq(invoices.id, invoiceId));
    console.log(`Invoice ${invoiceId} marked as sent`);
  } catch (error: any) {
    console.error("Failed to update invoice:", error.message);
    throw new Error(`Invoice update failed: ${error.message}`);
  }
}

export async function markInvoiceAsPaid(invoiceId: number) {
  try {
    await db
      .update(invoices)
      .set({ status: "paid", paidAt: new Date() })
      .where(eq(invoices.id, invoiceId));
    console.log(`Invoice ${invoiceId} marked as paid`);
  } catch (error: any) {
    console.error("Failed to update invoice:", error.message);
    throw new Error(`Invoice update failed: ${error.message}`);
  }
}

export async function deleteInvoice(invoiceId: number) {
  try {
    await db.transaction(async (tx) => {
      await tx.delete(invoiceLineItems).where(eq(invoiceLineItems.invoiceId, invoiceId));
      await tx.delete(invoices).where(eq(invoices.id, invoiceId));
    });
    console.log(`Invoice ${invoiceId} deleted`);
  } catch (error: any) {
    console.error("Failed to delete invoice:", error.message);
    throw new Error(`Invoice deletion failed: ${error.message}`);
  }
}

export async function getInvoiceLineItems(invoiceId: number) {
  try {
    return await db
      .select()
      .from(invoiceLineItems)
      .where(eq(invoiceLineItems.invoiceId, invoiceId));
  } catch (error: any) {
    console.error("Failed to fetch line items:", error.message);
    throw new Error(`Failed to fetch line items: ${error.message}`);
  }
}

export async function sendInvoiceEmail(
  to: string,
  name: string,
  invoiceNumber: string,
  message?: string,
) {
  return deliverInvoiceEmail(to, name, invoiceNumber, message);
}
