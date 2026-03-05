import type { Request, Response, NextFunction } from "express";
import { storage } from "../storage";
import { insertBookingSchema } from "@shared/schema";
import { scheduleRemindersForBooking } from "../reminder-engine";

export async function createBooking(req: Request, res: Response, next: NextFunction) {
  try {
    const data = insertBookingSchema.parse(req.body);
    const booking = await storage.createBooking(data);
    await scheduleRemindersForBooking(booking);
    res.status(201).json(booking);
  } catch (err) {
    next(err);
  }
}

export async function getBookings(req: Request, res: Response, next: NextFunction) {
  try {
    const email = req.query.email as string | undefined;
    const bookings = email
      ? await storage.getBookingsByEmail(email)
      : await storage.getBookings();
    res.json(bookings);
  } catch (err) {
    next(err);
  }
}
