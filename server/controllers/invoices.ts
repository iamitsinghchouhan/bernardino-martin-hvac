import type { Request, Response, NextFunction } from "express";
import { storage } from "../storage";
import { AppError } from "../utils/errors";

export async function lookupInvoice(req: Request, res: Response, next: NextFunction) {
  try {
    const invoiceNumber = req.query.invoiceNumber as string | undefined;
    const email = req.query.email as string | undefined;

    if (invoiceNumber) {
      const invoice = await storage.getInvoiceByNumber(invoiceNumber);
      if (!invoice) {
        throw AppError.notFound("Invoice not found");
      }
      return res.json([invoice]);
    }

    if (email) {
      const invoices = await storage.getInvoicesByEmail(email);
      if (invoices.length === 0) {
        throw AppError.notFound("No invoices found for this email");
      }
      return res.json(invoices);
    }

    throw AppError.badRequest("Please provide an invoice number or email");
  } catch (err) {
    next(err);
  }
}

export async function payInvoice(req: Request, res: Response, next: NextFunction) {
  try {
    const invoiceNumber = Array.isArray(req.params.invoiceNumber)
      ? req.params.invoiceNumber[0]
      : req.params.invoiceNumber;

    const invoice = await storage.markInvoicePaid(invoiceNumber);
    if (!invoice) {
      throw AppError.notFound("Invoice not found");
    }
    res.json(invoice);
  } catch (err) {
    next(err);
  }
}
