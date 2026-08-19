import type { Request, Response, NextFunction } from "express";
import { storage } from "../storage";
import { insertContactMessageSchema } from "@shared/schema";
import { notifyNewContact } from "../services/notifications";

export async function createContact(req: Request, res: Response, next: NextFunction) {
  try {
    const data = insertContactMessageSchema.parse(req.body);
    const message = await storage.createContactMessage(data);
    notifyNewContact(message);
    res.status(201).json(message);
  } catch (err) {
    next(err);
  }
}
