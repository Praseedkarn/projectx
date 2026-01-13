import mongoose from "mongoose";

const guideSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    city: {
      type: String,
      required: true,
      lowercase: true,
      index: true, // 🔥 important for search
    },

    phone: {
      type: String,
    },

    email: {
      type: String,
    },

    languages: {
      type: [String],
      default: [],
    },

    verified: {
      type: Boolean,
      default: false, // 👈 YOU control this
    },

    active: {
      type: Boolean,
      default: true,
    },

    notes: {
      type: String, // internal notes (admin)
    },
  },
  { timestamps: true }
);

export default mongoose.model("Guide", guideSchema);
