import mongoose from "mongoose";

const tokenHistorySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  change: {
    type: Number, // +20 or -5
    required: true,
  },
  reason: {
    type: String, // SEARCH, QUIZ_REWARD
    required: true,
  },
  balanceAfter: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("TokenHistory", tokenHistorySchema);
