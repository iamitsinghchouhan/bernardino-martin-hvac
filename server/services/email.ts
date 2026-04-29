import nodemailer from "nodemailer";

function getTransporter() {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;

  if (!user || !pass) {
    throw new Error("GMAIL_USER and GMAIL_APP_PASSWORD must be configured to send email replies");
  }

  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user,
      pass,
    },
  });
}

function escapeHtml(value: string) {
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
    from: process.env.GMAIL_USER,
    to,
    subject: "Response from Bernardino Martin HVAC",
    html: `<p>Hi ${safeName},</p><p>${safeMessage}</p><p>Best regards,<br />Bernardino Martin HVAC</p>`,
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
    from: process.env.GMAIL_USER,
    to,
    subject: `Invoice ${invoiceNumber} from Bernardino Martin HVAC`,
    html: `<p>Hi ${safeName},</p>${safeMessage}<p>Invoice Number: <strong>${escapeHtml(
      invoiceNumber,
    )}</strong></p><p>Best regards,<br />Bernardino Martin HVAC</p>`,
  });
}
