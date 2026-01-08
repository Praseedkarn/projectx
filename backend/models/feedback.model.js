import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema(
  {
    message: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
    },
    source: {
      type: String, // AI Planner / City Page / Itinerary Page
      default: "AI Planner",
    },
    status: {
      type: String,
      enum: ["pending", "resolved"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Feedback", feedbackSchema);
