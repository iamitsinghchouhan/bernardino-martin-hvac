import { db } from "../db";
import { invoices, invoiceLineItems } from "../../shared/schema";
import { eq, desc } from "drizzle-orm";
import { sendInvoiceEmail as sendEmail } from "./email";

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

export async function createInvoice(data: CreateInvoiceData) {
  try {
    // Calculate totals
    const subtotal = data.lineItems.reduce(
      (sum, item) => sum + item.quantity * item.unitPrice,
      0
    );
    const taxPercent = data.taxPercent || 0;
    const tax = Math.round(subtotal * (taxPercent / 100));
    const total = subtotal + tax;

    // Generate invoice number (INV-0001, INV-0002, etc.)
    const lastInvoice = await db
      .select()
      .from(invoices)
      .orderBy(desc(invoices.createdAt))
      .limit(1);

    let nextNumber = 1;
    if (lastInvoice.length > 0) {
      const lastNum = lastInvoice[0].invoiceNumber.replace("INV-", "");
      const parsed = parseInt(lastNum, 10);
      if (!isNaN(parsed)) {
        nextNumber = parsed + 1;
      }
    }
    const invoiceNumber = `INV-${String(nextNumber).padStart(4, "0")}`;

    // Create invoice
    const [invoice] = await db
      .insert(invoices)
      .values({
        invoiceNumber,
        bookingId: data.bookingId,
        customerName: data.clientName,
        customerEmail: data.clientEmail,
        customerPhone: data.clientPhone,
        serviceType: data.serviceType,
        description: data.description,
        subtotal,
        taxAmount: tax,
        taxRate: taxPercent,
        totalAmount: total,
        paymentInstructions: data.paymentInstructions,
        warrantyInfo: data.warrantyInfo,
        notes: data.notes,
        dueDate: data.dueDate,
        status: "DRAFT",
      })
      .returning();

    // Add line items
    for (const item of data.lineItems) {
      await db.insert(invoiceLineItems).values({
        invoiceId: invoice.id,
        description: item.description,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        lineTotal: item.quantity * item.unitPrice,
      });
    }

    console.log(`✓ Invoice ${invoiceNumber} created by ${data.createdBy}`);
    return invoice;
  } catch (error: any) {
    console.error("❌ Failed to create invoice:", error.message);
    throw new Error(`Invoice creation failed: ${error.message}`);
  }
}

export async function getInvoices() {
  try {
    const invoiceList = await db
      .select()
      .from(invoices)
      .orderBy(desc(invoices.createdAt));
    return invoiceList;
  } catch (error: any) {
    console.error("❌ Failed to fetch invoices:", error.message);
    throw new Error(`Failed to fetch invoices: ${error.message}`);
  }
}

export async function getInvoiceById(id: number) {
  try {
    const [invoice] = await db
      .select()
      .from(invoices)
      .where(eq(invoices.id, id));
    return invoice || null;
  } catch (error: any) {
    console.error("❌ Failed to fetch invoice:", error.message);
    throw new Error(`Failed to fetch invoice: ${error.message}`);
  }
}

export async function markInvoiceAsSent(invoiceId: number) {
  try {
    await db
      .update(invoices)
      .set({
        status: "SENT",
        sentDate: new Date(),
      })
      .where(eq(invoices.id, invoiceId));

    console.log(`✓ Invoice ${invoiceId} marked as sent`);
  } catch (error: any) {
    console.error("❌ Failed to update invoice:", error.message);
    throw new Error(`Invoice update failed: ${error.message}`);
  }
}

export async function markInvoiceAsPaid(invoiceId: number) {
  try {
    await db
      .update(invoices)
      .set({
        status: "PAID",
        paidDate: new Date(),
      })
      .where(eq(invoices.id, invoiceId));

    console.log(`✓ Invoice ${invoiceId} marked as paid`);
  } catch (error: any) {
    console.error("❌ Failed to update invoice:", error.message);
    throw new Error(`Invoice update failed: ${error.message}`);
  }
}

export async function deleteInvoice(invoiceId: number) {
  try {
    await db
      .delete(invoices)
      .where(eq(invoices.id, invoiceId));

    console.log(`✓ Invoice ${invoiceId} deleted`);
  } catch (error: any) {
    console.error("❌ Failed to delete invoice:", error.message);
    throw new Error(`Invoice deletion failed: ${error.message}`);
  }
}

export async function getInvoiceLineItems(invoiceId: number) {
  try {
    const items = await db
      .select()
      .from(invoiceLineItems)
      .where(eq(invoiceLineItems.invoiceId, invoiceId));
    return items;
  } catch (error: any) {
    console.error("❌ Failed to fetch line items:", error.message);
    throw new Error(`Failed to fetch line items: ${error.message}`);
  }
}

// Re-export sendInvoiceEmail from email service for convenience
export { sendEmail as sendInvoiceEmail };