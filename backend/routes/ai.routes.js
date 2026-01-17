import express from "express";
import { generateItinerary } from "../services/ai.service.js";
import User from "../models/User.js";
import authMiddleware from "../middleware/auth.middleware.js";
import SearchHistory from "../models/SearchHistory.js";
import TokenHistory from "../models/TokenHistory.js";

const router = express.Router();
const TOKEN_COST = 25;

router.post("/itinerary", authMiddleware, async (req, res) => {
  try {
    const { description } = req.body;
    const { id, role } = req.user;


    // ✅ ADMIN: no tokens, no limits
    if (role === "admin") {
      const result = await generateItinerary(description);
      return res.json({ text: result.text });
    }

    const user = await User.findById(id);
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    // ✅ Check balance BEFORE AI call
    if (user.tokens < TOKEN_COST) {
      return res.status(403).json({
        message: "Not enough tokens",
        tokens: user.tokens,
      });
    }


    // ✅ CALL AI FIRST
    const result = await generateItinerary(description);

    // ✅ DEDUCT ONLY AFTER SUCCESS
    user.tokens -= TOKEN_COST;
    await user.save();

        await SearchHistory.create({
      user: user._id,
      place: description.slice(0, 100), // store search text
      tokensUsed: TOKEN_COST,
    });

    // 🪙 SAVE TOKEN HISTORY
    await TokenHistory.create({
      user: user._id,
      change: -TOKEN_COST,
      reason: "AI_ITINERARY",
      balanceAfter: user.tokens,
    });

  

    return res.json({
      text: result.text,
      remainingTokens: user.tokens,
    });
  } catch (err) {
    console.error("AI ERROR:", err.message);
    return res.status(500).json({
      message: "AI generation failed",
    });
  }
});

export default router;
