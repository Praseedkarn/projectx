import express from "express";
import { submitFeedback } from "../controllers/feedback.controller.js";
import { sendFeedbackEmail } from "../utils/sendEmail.js";

console.log("🔥 feedback.routes.js loaded");

const router = express.Router();

router.post("/", submitFeedback);

router.get("/email-test", async (req, res) => {
  try {
    await sendFeedbackEmail({
      message: "Brevo Render test",
      email: "test@test.com",
      source: "Manual",
    });
    res.json({ ok: true });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: e.message });
  }
});

export default router;
