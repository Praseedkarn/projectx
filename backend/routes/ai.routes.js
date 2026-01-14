import express from "express";
import { generateItinerary } from "../services/ai.service.js";
import User from "../models/User.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();
const TOKEN_COST = 25;

router.post("/itinerary", authMiddleware, async (req, res) => {
  try {
    const { description } = req.body;
    const { id, role } = req.user;

    console.log("🔥 AI route hit, role:", role);

    if (role === "admin") {
      const result = await generateItinerary(description);
      return res.json({ text: result.text });
    }

    const user = await User.findById(id);

    console.log("🪙 BEFORE:", user.tokens);

    user.tokens -= TOKEN_COST;
    await user.save();

    console.log("🪙 AFTER:", user.tokens);

    const result = await generateItinerary(description);

    return res.json({
      text: result.text,
      remainingTokens: user.tokens,
    });
  } catch (err) {
    console.error("AI ERROR:", err);
    res.status(500).json({ message: "AI failed" });
  }
});

export default router;
