import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import User from "../models/User.js";

const router = express.Router();

/**
 * GET /api/admin/stats
 */
router.get("/stats", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Admin only" });
    }

    const totalUsers = await User.countDocuments({ role: "user" });

    const tokenAgg = await User.aggregate([
      { $match: { role: "user" } },
      { $group: { _id: null, total: { $sum: "$tokens" } } },
    ]);

    const totalTokens = tokenAgg[0]?.total || 0;

    res.json({
      totalUsers,
      totalTokens,
    });
  } catch (err) {
    console.error("ADMIN STATS ERROR:", err);
    res.status(500).json({ message: "Admin stats failed" });
  }
});

/**
 * GET /api/admin/users
 */
router.get("/users", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Admin only" });
    }

    const users = await User.find(
      { role: "user" },
      "name email tokens createdAt"
    ).sort({ createdAt: -1 });

    res.json(users);
  } catch (err) {
    console.error("ADMIN USERS ERROR:", err);
    res.status(500).json({ message: "Admin users failed" });
  }
});

export default router;
