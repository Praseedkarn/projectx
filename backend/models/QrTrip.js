import mongoose from "mongoose";

const qrTripSchema = new mongoose.Schema(
  {
    qrTripId: {
      type: String,
      required: true,
      unique: true,
    },

    hash: {
      type: String,
      required: true,
      unique: true,
    },

    text: {
      type: String,
      required: true,
    },

     expiresAt: {
      type: Date,
      required: true,
      index: { expires: 0 }, // 🔥 TTL index
    },


    source: {
      type: String,
      default: "ai",
    },
  },
  { timestamps: true }
);

export default mongoose.model("QrTrip", qrTripSchema);
