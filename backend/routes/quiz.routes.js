import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import { getQuiz, submitQuiz } from "../controllers/quiz.controller.js";

const router = express.Router();

router.get("/", authMiddleware, getQuiz);
router.post("/submit", authMiddleware, submitQuiz);

export default router;
