import { storage } from "./storage";
import type { Booking } from "@shared/schema";

export async function scheduleRemindersForBooking(booking: Booking) {
  const appointmentDate = new Date(booking.preferredDate);

  if (isNaN(appointmentDate.getTime())) {
    console.warn(`Invalid appointment date for booking ${booking.id}: ${booking.preferredDate}`);
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
      console.error(`Failed to create ${reminder.reminderType} reminder for booking ${booking.id}:`, err);
    }
  }

  console.log(`Scheduled ${remindersToCreate.length} reminder(s) for booking #${booking.id}`);
}

export async function processReminders() {
  try {
    const pendingReminders = await storage.getPendingReminders();

    for (const reminder of pendingReminders) {
      try {
        if (reminder.channel === "email") {
          console.log(`[REMINDER] Email to ${reminder.customerEmail}: Your ${reminder.serviceTitle} appointment is coming up on ${reminder.appointmentDate}`);
        } else if (reminder.channel === "sms") {
          console.log(`[REMINDER] SMS to ${reminder.customerPhone}: Your ${reminder.serviceTitle} appointment is coming up on ${reminder.appointmentDate}`);
        }

        await storage.markReminderSent(reminder.id);
      } catch (err) {
        console.error(`Failed to process reminder ${reminder.id}:`, err);
      }
    }

    if (pendingReminders.length > 0) {
      console.log(`Processed ${pendingReminders.length} reminder(s)`);
    }
  } catch (err) {
    console.error("Reminder processing error:", err);
  }
}

let reminderInterval: ReturnType<typeof setInterval> | null = null;

export function startReminderEngine() {
  reminderInterval = setInterval(processReminders, 60 * 1000);
  console.log("Reminder engine started (checks every 60 seconds)");
}

export function stopReminderEngine() {
  if (reminderInterval) {
    clearInterval(reminderInterval);
    reminderInterval = null;
  }
}
