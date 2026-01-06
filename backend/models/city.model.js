import mongoose from "mongoose";

const CitySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true }, // "dubai"
    country: String,
    tagline: String,
    heroImage: String,

    quickFacts: {
      timezone: String,
      region: String,
      budget: String,
      bestFor: [String],
    },

    about: String,

    bestTime: [
      {
        season: String,
        months: String,
        temp: String,
        desc: String,
      },
    ],

    avgTemp: {
      summer: String,
      winter: String,
    },

    bestForPeople: {
      couples: String,
      families: String,
      friends: String,
      solo: String,
    },

    neighborhoods: [
      {
        name: String,
        desc: String,
      },
    ],

    transport: [String],
    thingsToDo: [String],

    nearbyCities: [
      {
        name: String,
        distance: String,
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("City", CitySchema);
