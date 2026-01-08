import express from "express";
import { submitFeedback } from "../controllers/feedback.controller.js";
console.log("🔥 feedback.routes.js loaded");

const router = express.Router();

router.post("/", submitFeedback);

// 🔴 TEMP TEST ROUTE (add this for now)
router.get("/test", (req, res) => {
  res.json({ ok: true });
});

export default router;
