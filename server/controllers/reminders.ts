import type { Request, Response, NextFunction } from "express";
import { storage } from "../storage";
import { AppError } from "../utils/errors";

export async function getRemindersByEmail(req: Request, res: Response, next: NextFunction) {
  try {
    const email = req.query.email as string | undefined;
    if (!email) {
      throw AppError.badRequest("Email is required");
    }
    const remindersList = await storage.getRemindersByEmail(email);
    res.json(remindersList);
  } catch (err) {
    next(err);
  }
}

export async function getPendingReminders(_req: Request, res: Response, next: NextFunction) {
  try {
    const pending = await storage.getPendingReminders();
    res.json(pending);
  } catch (err) {
    next(err);
  }
}
