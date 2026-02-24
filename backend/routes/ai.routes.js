import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import SearchHistory from "../models/SearchHistory.js";
import TokenHistory from "../models/TokenHistory.js";
import GuestUsage from "../models/GuestUsage.js";
import { generateItinerary } from "../services/ai.service.js";

const router = express.Router();
const TOKEN_COST = 25;
const MAX_PROMPT_LENGTH = 2500;
const GUEST_LIMIT = 2;

router.post("/itinerary", async (req, res) => {
  try {
    const { description } = req.body;

    /* ================= VALIDATION ================= */
    if (!description || description.length < 20) {
      return res.status(400).json({ message: "Invalid prompt" });
    }

    if (description.length > MAX_PROMPT_LENGTH) {
      return res.status(400).json({ message: "Prompt too long" });
    }

    let user = null;
    let role = null;

    /* ================= OPTIONAL AUTH ================= */
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith("Bearer ")) {
      try {
        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        user = await User.findById(decoded.id);
        role = decoded.role;
      } catch (err) {
        user = null; // invalid token treated as guest
      }
    }

    /* ================= ADMIN ================= */
    if (user && role === "admin") {
      const result = await generateItinerary(description);

      return res.json({
        text: result.text,
      });
    }

    /* ================= LOGGED-IN USER ================= */
    if (user) {
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
        isGuest: false,
        userAgent: req.headers["user-agent"] || "unknown",
      });

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
    }

    /* ================= GUEST ================= */

    // 🔥 Correct IP detection for Render / proxies
    const ip =
      req.headers["x-forwarded-for"]?.split(",")[0] ||
      req.socket.remoteAddress;

    const guestId = req.headers["x-guest-id"];

      if (!guestId) {
        return res.status(400).json({ message: "Guest ID missing" });
      }

      let guest = await GuestUsage.findOne({ guestId });

    const now = new Date();

    // Reset after 24h
   

    if (!guest) {
      guest = await GuestUsage.create({
        guestId,
        ip,
        count: 0,
        lastUsed: now,
      });
    }

    if (guest.count >= GUEST_LIMIT) {
      return res.status(429).json({
        message: "You’ve used your 2 free travel plans 🎉 Create a free account to unlock 100 travel tokens.",
      });
    }

    const result = await generateItinerary(description);

    guest.count += 1;
    guest.lastUsed = now;
    await guest.save();

    await SearchHistory.create({
      user: null,
      place: description.slice(0, 120),
      tokensUsed: 0,
      isGuest: true,
      userAgent: req.headers["user-agent"] || "unknown",
    });

    return res.json({
      text: result.text,
      guest: true,
      remainingFree: GUEST_LIMIT - guest.count,
    });

  } catch (err) {
    console.error("AI ERROR:", err);
    res.status(500).json({ message: "AI generation failed" });
  }
});

export default router;