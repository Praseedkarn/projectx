import nodemailer from "nodemailer";

export const sendFeedbackEmail = async ({ message, email, source }) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST, // smtp-relay.brevo.com
      port: Number(process.env.SMTP_PORT), // 587
      secure: false,
      auth: {
        user: process.env.SMTP_USER, // 9f99f3001@smtp-brevo.com
        pass: process.env.SMTP_PASS, // xsmtpsib-xxxx
      },
    });

    const info = await transporter.sendMail({
      from: `"PROJECT X" <${process.env.ADMIN_EMAIL}>`,
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

    console.log("✅ Brevo email sent:", info.messageId);
    return info;
  } catch (err) {
    console.error("❌ Brevo email error:", err);
    throw err;
  }
};
