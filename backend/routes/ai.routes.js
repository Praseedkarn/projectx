import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import User from "../models/User.js";
import SearchHistory from "../models/SearchHistory.js";
import TokenHistory from "../models/TokenHistory.js";
import { generateItinerary } from "../services/ai.service.js";

const router = express.Router();
const TOKEN_COST = 25;

router.post("/itinerary", authMiddleware, async (req, res) => {
  try {
    const { description } = req.body;
    const { id, role } = req.user;

    const user = await User.findById(id);
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    // ADMIN → no token deduction
    if (role === "admin") {
      const result = await generateItinerary(description);
      return res.json({ text: result.text });
    }

    if (user.tokens < TOKEN_COST) {
      return res.status(403).json({ message: "Not enough tokens" });
    }

    const result = await generateItinerary(description);

    user.tokens -= TOKEN_COST;
    await user.save();

    await SearchHistory.create({
      user: user._id,
      place: description.slice(0, 120),
      tokensUsed: TOKEN_COST,
    });

    await TokenHistory.create({
      user: user._id,
      change: -TOKEN_COST,
      reason: "AI_ITINERARY",
      balanceAfter: user.tokens,
    });

    res.json({
      text: result.text,
      remainingTokens: user.tokens,
    });
  } catch (err) {
    console.error("AI ERROR:", err);
    res.status(500).json({ message: "AI generation failed" });
  }
});

export default router;
