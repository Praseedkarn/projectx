import express from "express";
import {
  createItinerary,
  getItineraries,
  getItineraryById,
} from "../controllers/itinerary.controller.js";
import Itinerary from "../models/Itinerary.js";

const router = express.Router();

/* ================================
   CREATE ITINERARY
================================ */
router.post("/", createItinerary);

/* ================================
   GET ALL ITINERARIES
================================ */
router.get("/", getItineraries);

/* ================================
   GET BY MONGODB _id
   (optional / admin use)
================================ */
router.get("/mongo/:id", getItineraryById);

/* ================================
   GET BY legacyId (IMPORTANT)
   THIS FIXES YOUR FRONTEND CLICK
================================ */
router.get("/legacy/:legacyId", async (req, res) => {
  try {
    const itinerary = await Itinerary.findOne({
      legacyId: Number(req.params.legacyId),
    });

    if (!itinerary) {
      return res.status(404).json({ message: "Itinerary not found" });
    }

    res.json(itinerary);
  } catch (error) {
    console.error("Legacy fetch error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
