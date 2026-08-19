import type { Booking, Quote, ContactMessage } from "@shared/schema";
import { logger } from "../logger";
import { sendOwnerEmail, escapeHtml } from "./email";

const SITE_URL = "https://bernardinomartinhvac.com";

/** Fire-and-forget wrapper: guarantees no synchronous throw and no unhandled rejection can ever
 *  escape back to a controller. This is what makes it safe to call from createBooking/createQuote/
 *  createContact without wrapping the call site — a broken notification must never cost a lead. */
function fireAndForget(work: () => Promise<void>, context: { type: string; id: number }): void {
  try {
    void work().catch((err) => {
      logger.error({ err, ...context }, "Owner notification failed");
    });
  } catch (err) {
    logger.error({ err, ...context }, "Owner notification dispatch threw synchronously");
  }
}

export function notifyNewBooking(booking: Booking): void {
  fireAndForget(async () => {
    const html = `
      <h2>New Booking Request</h2>
      <p><strong>Name:</strong> ${escapeHtml(booking.fullName)}</p>
      <p><strong>Phone:</strong> ${escapeHtml(booking.phone)}</p>
      <p><strong>Email:</strong> ${escapeHtml(booking.email)}</p>
      <p><strong>Service:</strong> ${escapeHtml(booking.serviceTitle)}</p>
      <p><strong>Preferred date:</strong> ${escapeHtml(booking.preferredDate)}</p>
      <p><strong>Address:</strong> ${escapeHtml(booking.address)}</p>
      ${booking.notes ? `<p><strong>Notes:</strong> ${escapeHtml(booking.notes)}</p>` : ""}
      <p>Booking #${booking.id}</p>
      <p><a href="${SITE_URL}/admin/cms/bookings">View in admin dashboard</a></p>`;

    await sendOwnerEmail(`New Booking Request — ${booking.serviceTitle} (#${booking.id})`, html);
    logger.info({ type: "booking", id: booking.id }, "Owner notification sent");
  }, { type: "booking", id: booking.id });
}

export function notifyNewQuote(quote: Quote): void {
  fireAndForget(async () => {
    const html = `
      <h2>New Quote Request</h2>
      <p><strong>Name:</strong> ${escapeHtml(quote.fullName)}</p>
      <p><strong>Phone:</strong> ${escapeHtml(quote.phone)}</p>
      <p><strong>Email:</strong> ${escapeHtml(quote.email)}</p>
      <p><strong>Service type:</strong> ${escapeHtml(quote.serviceType)}</p>
      <p><strong>Property type:</strong> ${escapeHtml(quote.propertyType)}</p>
      <p><strong>Urgency:</strong> ${escapeHtml(quote.urgency)}</p>
      ${quote.address ? `<p><strong>Address:</strong> ${escapeHtml(quote.address)}</p>` : ""}
      <p><strong>Description:</strong> ${escapeHtml(quote.description)}</p>
      <p>Quote #${quote.id}</p>
      <p><a href="${SITE_URL}/admin/cms/quotes">View in admin dashboard</a></p>`;

    await sendOwnerEmail(`New Quote Request — ${quote.serviceType} (#${quote.id})`, html);
    logger.info({ type: "quote", id: quote.id }, "Owner notification sent");
  }, { type: "quote", id: quote.id });
}

export function notifyNewContact(contact: ContactMessage): void {
  fireAndForget(async () => {
    const html = `
      <h2>New Contact Message</h2>
      <p><strong>Name:</strong> ${escapeHtml(contact.name)}</p>
      ${contact.phone ? `<p><strong>Phone:</strong> ${escapeHtml(contact.phone)}</p>` : ""}
      <p><strong>Email:</strong> ${escapeHtml(contact.email)}</p>
      <p><strong>Message:</strong> ${escapeHtml(contact.message)}</p>
      <p>Contact #${contact.id}</p>
      <p><a href="${SITE_URL}/admin/cms/contacts">View in admin dashboard</a></p>`;

    await sendOwnerEmail(`New Contact Message from ${contact.name}`, html);
    logger.info({ type: "contact", id: contact.id }, "Owner notification sent");
  }, { type: "contact", id: contact.id });
}
