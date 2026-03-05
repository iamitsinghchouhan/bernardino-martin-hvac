import type { Request, Response, NextFunction } from "express";
import { storage } from "../storage";
import { insertQuoteSchema } from "@shared/schema";

export async function createQuote(req: Request, res: Response, next: NextFunction) {
  try {
    const data = insertQuoteSchema.parse(req.body);
    const quote = await storage.createQuote(data);
    res.status(201).json(quote);
  } catch (err) {
    next(err);
  }
}
