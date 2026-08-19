import nodemailer from "nodemailer";

function getTransporter() {
  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASS;

  if (!user || !pass) {
    throw new Error("EMAIL_USER and EMAIL_PASS must be configured to send email");
  }

  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user,
      pass,
    },
  });
}

export function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function sendReplyEmail(to: string, name: string, message: string) {
  const transporter = getTransporter();
  const safeName = escapeHtml(name);
  const safeMessage = escapeHtml(message).replace(/\n/g, "<br />");

  return transporter.sendMail({
    from: process.env.EMAIL_USER,
    to,
    subject: "Response from Bernardino Martin HVAC",
    html: `<p>Hi ${safeName},</p><p>${safeMessage}</p><p>Best regards,<br />Bernardino Martin HVAC</p>`,
  });
}

/** Owner-addressed send, used by notifications.ts to alert the business of new leads. */
export async function sendOwnerEmail(subject: string, html: string) {
  const transporter = getTransporter();
  const to = process.env.OWNER_NOTIFICATION_EMAIL || process.env.EMAIL_USER;

  if (!to) {
    throw new Error("OWNER_NOTIFICATION_EMAIL or EMAIL_USER must be set to send owner notifications");
  }

  return transporter.sendMail({
    from: process.env.EMAIL_USER,
    to,
    subject,
    html,
  });
}

export async function sendInvoiceEmail(
  to: string,
  name: string,
  invoiceNumber: string,
  message?: string,
) {
  const transporter = getTransporter();
  const safeName = escapeHtml(name);
  const safeMessage = message
    ? `<p>${escapeHtml(message).replace(/\n/g, "<br />")}</p>`
    : "<p>Your invoice is ready for review.</p>";

  return transporter.sendMail({
    from: process.env.EMAIL_USER,
    to,
    subject: `Invoice ${invoiceNumber} from Bernardino Martin HVAC`,
    html: `<p>Hi ${safeName},</p>${safeMessage}<p>Invoice Number: <strong>${escapeHtml(
      invoiceNumber,
    )}</strong></p><p>Best regards,<br />Bernardino Martin HVAC</p>`,
  });
}
