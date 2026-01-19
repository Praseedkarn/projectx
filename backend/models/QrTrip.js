import mongoose from "mongoose";

const qrTripSchema = new mongoose.Schema(
  {
    qrTripId: {
      type: String,
      required: true,
      unique: true,
    },

    // 🔐 USER OWNERSHIP
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    // 🧠 HASH (for reuse)
    hash: {
      type: String,
      required: true,
    },

    // 📄 AI itinerary text
    text: {
      type: String,
      required: true,
    },

    // ⏳ AUTO EXPIRY
    expiresAt: {
      type: Date,
      required: true,
      index: { expires: 0 }, // TTL
    },

        place: {
      type: String,
      required: true,
    },

    searchedAt: {
      type: Date,
      required: true,
    },


    source: {
      type: String,
      default: "ai",
    },
  },
  { timestamps: true }
);

// ✅ Same itinerary allowed for different users
qrTripSchema.index({ hash: 1, userId: 1 }, { unique: true });

export default mongoose.model("QrTrip", qrTripSchema);
