import User from "../models/User.js";
import QuizQuestion from "../models/QuizQuestion.js";
import TokenHistory from "../models/TokenHistory.js";
const QUIZ_REWARD = 20;
const QUIZ_COOLDOWN_HOURS = 12;
const QUIZ_SIZE = 5;

/* ================= GET QUIZ ================= */
export const getQuiz = async (req, res) => {
  try {
    // 🚫 Admin should not play quiz
    if (req.user.role === "admin") {
      return res.status(403).json({ message: "Admin does not need quiz" });
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    // ⏳ Cooldown check
    if (user.lastQuizAttempt) {
      const diff = Date.now() - user.lastQuizAttempt.getTime();
      const cooldownMs = QUIZ_COOLDOWN_HOURS * 60 * 60 * 1000;

      if (diff < cooldownMs) {
        return res.status(429).json({
          code: "QUIZ_COOLDOWN",
          remainingMs: cooldownMs - diff,
        });
      }
    }

    // 🎲 Get random 5 questions (hide correctIndex)
    const questions = await QuizQuestion.aggregate([
      { $match: { isActive: true } },
      { $sample: { size: QUIZ_SIZE } },
      { $project: { correctIndex: 0 } },
    ]);

    res.json({ questions });
  } catch (err) {
    console.error("QUIZ GET ERROR:", err);
    res.status(500).json({ message: "Quiz error" });
  }
};

/* ================= SUBMIT QUIZ ================= */
export const submitQuiz = async (req, res) => {
  try {
    // 🚫 Admin cannot submit quiz
    // if (req.user.role === "admin") {
    //   return res.status(403).json({ message: "Admin cannot submit quiz" });
    // }

    const { answers, questionIds } = req.body;

    if (!answers || !questionIds || answers.length !== questionIds.length) {
      return res.status(400).json({ message: "Invalid quiz submission" });
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    // 🔍 Fetch questions from DB
    const questions = await QuizQuestion.find({
      _id: { $in: questionIds },
    });

    let score = 0;
    questions.forEach((q, index) => {
      if (answers[index] === q.correctIndex) {
        score++;
      }
    });

    // ⏳ Update last attempt
    user.lastQuizAttempt = new Date();

    const nextQuizAt =
      user.lastQuizAttempt.getTime() +
      QUIZ_COOLDOWN_HOURS * 60 * 60 * 1000;

    // 🪙 Reward
    if (score >= 3) {
      user.tokens += QUIZ_REWARD;

       await TokenHistory.create({
    user: user._id,
    change: +QUIZ_REWARD,
    reason: "QUIZ_REWARD",
    balanceAfter: user.tokens,
  });
    }

    await user.save();

    res.json({
      passed: score >= 3,
      score,
      reward: score >= 3 ? QUIZ_REWARD : 0,
      tokens: user.tokens,
      nextQuizAt,
    });
  } catch (err) {
    console.error("QUIZ SUBMIT ERROR:", err);
    res.status(500).json({ message: "Quiz submit failed" });
  }
};
