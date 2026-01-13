import mongoose from "mongoose";

/* ================= DAY SCHEMA ================= */
const daySchema = new mongoose.Schema(
  {
    day: Number,
    title: String,
    places: { type: [String], default: [] },
    activities: { type: [String], default: [] },
    accommodation: String,
    meals: String,
  },
  { _id: false }
);

/* ================= ITINERARY SCHEMA ================= */
const itinerarySchema = new mongoose.Schema(
  {
    legacyId: Number,

    title: { type: String, required: true },
    location: String,
    duration: String,
    difficulty: String,
    priceRange: String,
    bestTime: String,
    description: String,
    image: String,

    highlights: { type: [String], default: [] },

    highlight360Views: {
      type: [
        {
          label: String,
          place: String,
        },
      ],
      default: [],
    },

    // ✅ FIXED HERE
    days: { type: [daySchema], default: [] },

    inclusions: { type: [String], default: [] },
    exclusions: { type: [String], default: [] },
    tips: { type: [String], default: [] },

    budget: {
      flights: String,
      accommodation: String,
      food: String,
      activities: String,
      transport: String,
      total: String,
    },

    source: {
      type: String,
      enum: ["static", "ai", "admin"],
      default: "ai",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Itinerary", itinerarySchema);
