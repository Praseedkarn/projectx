import express from "express";
import Guide from "../models/guide.model.js";

const router = express.Router();

/* ===============================
   GET GUIDE BY CITY (PUBLIC)
   =============================== */
router.get("/", async (req, res) => {
  try {
    const { city } = req.query;

    if (!city) {
      return res.status(400).json({ message: "City is required" });
    }

    const guide = await Guide.findOne({
      city: city.toLowerCase(),
      verified: true,
      active: true,
    }).select("-notes");

    res.json({
      available: !!guide,
      guide,
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch guide" });
  }
});

/* ===============================
   ADD GUIDE (ADMIN / MANUAL)
   =============================== */
router.post("/", async (req, res) => {
  try {
    const guide = await Guide.create(req.body);
    res.status(201).json(guide);
  } catch (err) {
    res.status(400).json({ message: "Failed to create guide" });
  }
});

export default router;
// http://localhost:5001/api/guides
// {
//   "name": "Rahul Sharma",
//   "city": "Goa",
//   "phone": "91XXXXXXXXXX",
//   "languages": ["English", "Hindi"],
//   "verified": true
// }
