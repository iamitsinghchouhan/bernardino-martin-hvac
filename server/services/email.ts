import nodemailer from "nodemailer";

// Gmail SMTP configuration
const createTransporter = () => {
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });
};

export async function sendReplyEmail(
  toEmail: string,
  customerName: string,
  replyMessage: string
) {
  const transporter = createTransporter();

  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: toEmail,
    subject: `Response to your Bernardino Martin HVAC inquiry - ${new Date().toLocaleDateString()}`,
    html: `
      <h2>Hi ${customerName},</h2>
      <p>Thank you for contacting Bernardino Martin HVAC. Here's our response to your inquiry:</p>
      <div style="background-color: #f5f5f5; padding: 15px; border-left: 4px solid #2563eb;">
        <p>${replyMessage.replace(/\n/g, "<br>")}</p>
      </div>
      <p>If you have any further questions, please don't hesitate to contact us at:</p>
      <p>
        <strong>Phone:</strong> (818) 400-0227<br>
        <strong>Email:</strong> martinsolarstar@gmail.com
      </p>
      <p>Best regards,<br>Bernardino Martin HVAC Team</p>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`✓ Email sent to ${toEmail}: ${info.messageId}`);
    return info;
  } catch (error: any) {
    console.error(`❌ Failed to send email to ${toEmail}:`, error.message);
    throw new Error(`Email sending failed: ${error.message}`);
  }
}

export async function sendInvoiceEmail(
  toEmail: string,
  clientName: string,
  invoiceNumber: string,
  invoiceData: {
    totalAmount: number;
    dueDate: string;
    description: string;
    serviceType: string;
  }
) {
  const transporter = createTransporter();

  const pdfUrl = `https://bernardinomartinhvac.com/api/admin/invoices/${invoiceNumber}/pdf`;

  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: toEmail,
    subject: `Invoice ${invoiceNumber} - Bernardino Martin HVAC`,
    html: `
      <h2>Invoice ${invoiceNumber}</h2>
      <p>Hi ${clientName},</p>
      <p>Thank you for choosing Bernardino Martin HVAC for your ${invoiceData.serviceType} needs.</p>
      
      <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd;"><strong>Service</strong></td>
          <td style="padding: 8px; border: 1px solid #ddd;">${invoiceData.serviceType}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd;"><strong>Description</strong></td>
          <td style="padding: 8px; border: 1px solid #ddd;">${invoiceData.description}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd;"><strong>Total Amount</strong></td>
          <td style="padding: 8px; border: 1px solid #ddd;"><strong>$${(invoiceData.totalAmount / 100).toFixed(2)}</strong></td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd;"><strong>Due Date</strong></td>
          <td style="padding: 8px; border: 1px solid #ddd;">${invoiceData.dueDate}</td>
        </tr>
      </table>
      
      <p><a href="${pdfUrl}" style="background-color: #2563eb; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">View Invoice PDF</a></p>
      
      <h3>Payment Instructions:</h3>
      <p>We accept checks, credit cards, and wire transfers.</p>
      <p>To pay by credit card, please call us at (818) 400-0227.</p>
      
      <h3>Warranty:</h3>
      <p>• 1-year warranty on parts<br>• 90-day warranty on labor</p>
      
      <p>Questions? Contact us at (818) 400-0227</p>
      
      <p>Best regards,<br>Bernardino Martin HVAC Team</p>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`✓ Invoice email sent to ${toEmail}: ${info.messageId}`);
    return info;
  } catch (error: any) {
    console.error(`❌ Failed to send invoice email to ${toEmail}:`, error.message);
    throw new Error(`Invoice email sending failed: ${error.message}`);
  }
}

export async function sendBookingConfirmation(
  toEmail: string,
  customerName: string,
  bookingData: {
    serviceTitle: string;
    preferredDate: string;
    address: string;
  }
) {
  const transporter = createTransporter();

  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: toEmail,
    subject: `Appointment Confirmed - ${bookingData.serviceTitle} - Bernardino Martin HVAC`,
    html: `
      <h2>Hi ${customerName},</h2>
      <p>Your appointment has been confirmed!</p>
      
      <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd;"><strong>Service</strong></td>
          <td style="padding: 8px; border: 1px solid #ddd;">${bookingData.serviceTitle}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd;"><strong>Date</strong></td>
          <td style="padding: 8px; border: 1px solid #ddd;">${bookingData.preferredDate}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd;"><strong>Address</strong></td>
          <td style="padding: 8px; border: 1px solid #ddd;">${bookingData.address}</td>
        </tr>
      </table>
      
      <p><strong>What to expect:</strong></p>
      <ul>
        <li>Our technician will arrive at the scheduled time</li>
        <li>Please ensure someone is available at the property</li>
        <li>Have the area accessible for service</li>
      </ul>
      
      <p>Need to reschedule? Call us at (818) 400-0227</p>
      
      <p>Best regards,<br>Bernardino Martin HVAC Team</p>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`✓ Booking confirmation sent to ${toEmail}: ${info.messageId}`);
    return info;
  } catch (error: any) {
    console.error(`❌ Failed to send booking confirmation to ${toEmail}:`, error.message);
    throw new Error(`Email sending failed: ${error.message}`);
  }
}