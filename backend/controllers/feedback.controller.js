import Feedback from "../models/feedback.model.js";
import { sendFeedbackEmail } from "../utils/sendEmail.js";

export const submitFeedback = async (req, res) => {
  try {
    const { message, email, source } = req.body;

    // 🔴 Validation
    if (!message || !message.trim()) {
      return res.status(400).json({
        success: false,
        message: "Feedback message is required",
      });
    }

    // ✅ Save feedback to DB
    const feedback = await Feedback.create({
      message,
      email,
      source,
    });

    // ✅ SEND EMAIL (awaited)
    await sendFeedbackEmail({
      message,
      email,
      source,
    });

    return res.status(201).json({
      success: true,
      message: "Feedback submitted successfully",
      feedback,
    });
  } catch (error) {
    console.error("❌ Feedback submit error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error while submitting feedback",
    });
  }
};
