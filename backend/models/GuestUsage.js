import mongoose from "mongoose";

const guestUsageSchema = new mongoose.Schema({
  ip: { type: String, required: true },
  count: { type: Number, default: 0 },
  lastUsed: { type: Date, default: Date.now },
});

export default mongoose.model("GuestUsage", guestUsageSchema);