import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import QuizQuestion from "../models/QuizQuestion.js";

const router = express.Router();

router.post("/add", authMiddleware, async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Admin only" });
  }

  const { question, options, correctIndex } = req.body;

  if (!question || !options || options.length !== 4) {
    return res.status(400).json({ message: "Invalid quiz data" });
  }

  const q = await QuizQuestion.create({
    question,
    options,
    correctIndex,
  });

  res.json({ message: "Question added", q });
});

export default router;
