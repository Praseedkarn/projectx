import mongoose from "mongoose";

const quizQuestionSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
    },
    options: {
      type: [String],
      required: true,
      validate: v => v.length === 4,
    },
    correctIndex: {
      type: Number,
      required: true,
      min: 0,
      max: 3,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("QuizQuestion", quizQuestionSchema);
