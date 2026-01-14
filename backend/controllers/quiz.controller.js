import User from "../models/User.js";

const QUIZ_REWARD = 20;
const QUIZ_COOLDOWN_HOURS = 12;

// Static quiz
const QUESTIONS = [
  {
    id: 1,
    question: "What does this app generate?",
    options: ["Flight tickets", "Travel itineraries", "Hotel bookings", "Maps only"],
    correctIndex: 1,
  },
  {
    id: 2,
    question: "Which is safer while traveling?",
    options: ["Sharing OTPs", "No ID", "Carrying ID", "Public WiFi everywhere"],
    correctIndex: 2,
  },
  {
    id: 3,
    question: "Best time to visit hill stations?",
    options: ["Monsoon", "Winter", "Summer", "Anytime"],
    correctIndex: 1,
  },
  {
    id: 4,
    question: "What helps reduce travel stress?",
    options: ["No planning", "Last-minute booking", "Good itinerary", "Skipping rest"],
    correctIndex: 2,
  },
  {
    id: 5,
    question: "What should you carry at night?",
    options: ["Nothing", "Only cash", "Phone + emergency contacts", "Unknown links"],
    correctIndex: 2,
  },
];

// 👉 GET QUIZ
export const getQuiz = async (req, res) => {
  try {
    // 🚫 HARD BLOCK ADMIN — MUST BE FIRST LINE
    if (req.user.role === "admin") {
      return res.status(403).json({
        message: "Admin does not need quiz",
      });
    }

    // ✅ ONLY NORMAL USERS REACH HERE
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    if (user.lastQuizAttempt) {
      const diff = Date.now() - new Date(user.lastQuizAttempt).getTime();
      const hoursPassed = diff / (1000 * 60 * 60);

      if (hoursPassed < QUIZ_COOLDOWN_HOURS) {
        return res.status(429).json({
          code: "QUIZ_COOLDOWN",
          remainingMs:
            QUIZ_COOLDOWN_HOURS * 60 * 60 * 1000 - diff,
        });
      }
    }

    res.json({
      questions: QUESTIONS.map(({ correctIndex, ...q }) => q),
    });
  } catch (err) {
    console.error("QUIZ GET ERROR:", err);
    res.status(500).json({ message: "Quiz error" });
  }
};



// 👉 SUBMIT QUIZ
export const submitQuiz = async (req, res) => {
  try {

    // 🚫 BLOCK ADMIN FIRST
    if (req.user.role === "admin") {
      return res.status(403).json({
        message: "Admin cannot submit quiz",
      });
    }
    const { answers } = req.body;
    const user = await User.findById(req.user.id);

    if (!user) return res.status(401).json({ message: "User not found" });

    let score = 0;
    QUESTIONS.forEach((q, i) => {
      if (answers[i] === q.correctIndex) score++;
    });

    user.lastQuizAttempt = new Date();

    const nextQuizAt =
      user.lastQuizAttempt.getTime() +
      QUIZ_COOLDOWN_HOURS * 60 * 60 * 1000;

    if (score >= 3) {
      user.tokens += QUIZ_REWARD;
      await user.save();

      return res.json({
        passed: true,
        reward: QUIZ_REWARD,
        tokens: user.tokens,
        nextQuizAt,
      });
    }

    await user.save();

    res.json({
      passed: false,
      score,
      nextQuizAt,
    });
  } catch (err) {
    res.status(500).json({ message: "Quiz submit failed" });
  }
};
