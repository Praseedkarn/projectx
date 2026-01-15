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

    console.log("🪙 BEFORE:", user.tokens);

    // ✅ CALL AI FIRST
    const result = await generateItinerary(description);

    // ✅ DEDUCT ONLY AFTER SUCCESS
    user.tokens -= TOKEN_COST;
    await user.save();

    console.log("🪙 AFTER:", user.tokens);

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
