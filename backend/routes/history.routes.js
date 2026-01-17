import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import SearchHistory from "../models/SearchHistory.js";
import TokenHistory from "../models/TokenHistory.js";

const router = express.Router();

/* ===== SEARCH HISTORY ===== */
router.get("/search", authMiddleware, async (req, res) => {
  try {
    if (req.user.role === "admin") {
      const all = await SearchHistory.find()
        .populate("user", "name email")
        .sort({ createdAt: -1 });
      return res.json(all);
    }

    const history = await SearchHistory.find({ user: req.user.id })
      .sort({ createdAt: -1 });

    res.json(history);
  } catch (err) {
    res.status(500).json({ message: "Search history failed" });
  }
});

/* ===== TOKEN HISTORY ===== */
router.get("/tokens", authMiddleware, async (req, res) => {
  try {
    const history = await TokenHistory.find({ user: req.user.id })
      .sort({ createdAt: -1 });

    res.json(history);
  } catch (err) {
    res.status(500).json({ message: "Token history failed" });
  }
});

export default router;
