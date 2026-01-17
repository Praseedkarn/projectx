import mongoose from "mongoose";

const searchHistorySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  place: {
    type: String,
    required: true,
  },
  tokensUsed: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("SearchHistory", searchHistorySchema);
