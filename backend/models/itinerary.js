import mongoose from "mongoose";

const daySchema = new mongoose.Schema({
  day: Number,
  title: String,
  places:[String],
  activities: [String],
  accommodation: String,
  meals: String,
});

const itinerarySchema = new mongoose.Schema(
  {
    legacyId:Number,
    title: { type: String, required: true },
    location: String,
    duration: String,
    difficulty: String,
    priceRange: String,
    bestTime: String,
    description: String,

    image: String,

    highlights: [String],
    highlight360Views: [
      {
        label: String,
        place: String,
      },
    ],

    days: [daySchema],

    inclusions: [String],
    exclusions: [String],
    tips: [String],

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
