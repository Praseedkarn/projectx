import express from "express";
import { generateItinerary } from "../services/ai.service.js";

const router = express.Router();

router.post("/itinerary", async (req, res) => {
  try {
    const { description, detailLevel } = req.body;

    if (!description) {
      return res.status(400).json({ error: "Description required" });
    }

    const result = await generateItinerary(description, detailLevel);
    res.json(result);

  } catch (error) {
    console.error("❌ Route error:", error.message);
    res.status(500).json({ error: "AI failed" });
  }
});

export default router;
