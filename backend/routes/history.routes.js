import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import SearchHistory from "../models/SearchHistory.js";
import TokenHistory from "../models/TokenHistory.js";

const router = express.Router();

// 🔍 Search history
router.get("/search", authMiddleware, async (req, res) => {
  try {
    // ✅ ADMIN: see all searches with user info
    if (req.user.role === "admin") {
      const history = await SearchHistory.find()
        .populate("user", "name email")
        .sort({ createdAt: -1 })
        .limit(100);

      return res.json(history);
    }

    // ✅ USER: see only own searches
    const history = await SearchHistory.find({
      user: req.user.id,
    })
      .sort({ createdAt: -1 })
      .limit(20);

    res.json(history);
  } catch (err) {
    console.error("SEARCH HISTORY ERROR:", err);
    res.status(500).json({ message: "Failed to load search history" });
  }
});



// 🪙 Token history
router.get("/tokens", authMiddleware, async (req, res) => {
  if (req.user.id === "admin-id") return res.json([]);

  const history = await TokenHistory.find({
    user: req.user.id,
  })
    .sort({ createdAt: -1 })
    .limit(50);

  res.json(history);
});


export default router;
