import { storage } from "./storage";
import type { Booking } from "@shared/schema";
import { logger } from "./logger";

export async function scheduleRemindersForBooking(booking: Booking) {
  const appointmentDate = new Date(booking.preferredDate);

  if (isNaN(appointmentDate.getTime())) {
    logger.warn({ bookingId: booking.id, date: booking.preferredDate }, "Invalid appointment date for booking");
    return;
  }

  const now = new Date();
  const remindersToCreate = [];

  const oneDayBefore = new Date(appointmentDate.getTime() - 24 * 60 * 60 * 1000);
  if (oneDayBefore > now) {
    remindersToCreate.push({
      bookingId: booking.id,
      customerName: booking.fullName,
      customerEmail: booking.email,
      customerPhone: booking.phone,
      serviceTitle: booking.serviceTitle,
      appointmentDate: booking.preferredDate,
      reminderType: "24h_before",
      channel: "email",
      status: "pending",
      scheduledFor: oneDayBefore,
    });
  }

  const oneHourBefore = new Date(appointmentDate.getTime() - 60 * 60 * 1000);
  if (oneHourBefore > now) {
    remindersToCreate.push({
      bookingId: booking.id,
      customerName: booking.fullName,
      customerEmail: booking.email,
      customerPhone: booking.phone,
      serviceTitle: booking.serviceTitle,
      appointmentDate: booking.preferredDate,
      reminderType: "1h_before",
      channel: "sms",
      status: "pending",
      scheduledFor: oneHourBefore,
    });
  }

  for (const reminder of remindersToCreate) {
    try {
      await storage.createReminder(reminder);
    } catch (err) {
      logger.error({ err, bookingId: booking.id, type: reminder.reminderType }, "Failed to create reminder");
    }
  }

  logger.info({ bookingId: booking.id, count: remindersToCreate.length }, "Scheduled reminders for booking");
}

export async function processReminders() {
  try {
    const pendingReminders = await storage.getPendingReminders();

    for (const reminder of pendingReminders) {
      try {
        if (reminder.channel === "email") {
          logger.info(
            { channel: "email", to: reminder.customerEmail, service: reminder.serviceTitle, date: reminder.appointmentDate },
            "Sending email reminder",
          );
        } else if (reminder.channel === "sms") {
          logger.info(
            { channel: "sms", to: reminder.customerPhone, service: reminder.serviceTitle, date: reminder.appointmentDate },
            "Sending SMS reminder",
          );
        }

        await storage.markReminderSent(reminder.id);
      } catch (err) {
        logger.error({ err, reminderId: reminder.id }, "Failed to process reminder");
      }
    }

    if (pendingReminders.length > 0) {
      logger.info({ count: pendingReminders.length }, "Processed reminders");
    }
  } catch (err) {
    logger.error({ err }, "Reminder processing error");
  }
}

let reminderInterval: ReturnType<typeof setInterval> | null = null;

export function startReminderEngine() {
  reminderInterval = setInterval(processReminders, 60 * 1000);
  logger.info("Reminder engine started (checks every 60 seconds)");
}

export function stopReminderEngine() {
  if (reminderInterval) {
    clearInterval(reminderInterval);
    reminderInterval = null;
  }
}
