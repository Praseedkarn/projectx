import Feedback from "../models/feedback.model.js";
import { sendFeedbackEmail } from "../utils/sendEmail.js";

export const submitFeedback = async (req, res) => {
  try {
    const { message, email, source } = req.body;

    if (!message) {
      return res.status(400).json({
        success: false,
        message: "Feedback message is required",
      });
    }

    const feedback = await Feedback.create({
      message,
      email,
      source,
    });

    // ✅ SEND EMAIL ALERT (non-blocking)
    sendFeedbackEmail({ message, email, source })
      .catch(err => console.error("Email error:", err));

    return res.status(201).json({
      success: true,
      message: "Feedback submitted successfully",
      feedback,
    });
  } catch (error) {
    console.error("Feedback error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while submitting feedback",
    });
  }
};
