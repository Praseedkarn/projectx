import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT), // ✅ FIX
  secure: false, // MUST be false for port 587
  auth: {
    user: process.env.SMTP_USER, // MUST be "apikey"
    pass: process.env.SMTP_PASS, // Brevo SMTP key
  },
});

export const sendFeedbackEmail = async ({ message, email, source }) => {
  await transporter.sendMail({
    from: `"AI Travel App" <${process.env.ADMIN_EMAIL}>`,
    to: process.env.ADMIN_EMAIL,
    subject: "📩 New Feedback Received",
    html: `
      <h3>New Feedback Received</h3>
      <p><strong>Source:</strong> ${source || "Unknown"}</p>
      <p><strong>User Email:</strong> ${email || "Not provided"}</p>
      <p><strong>Message:</strong></p>
      <p>${message}</p>
    `,
  });
};
