import express from "express";
import City from "../models/city.model.js";

const router = express.Router();

/* CREATE CITY (Postman / Admin later) */
router.post("/", async (req, res) => {
  try {
    const city = await City.create(req.body);
    res.status(201).json(city);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

/* GET ALL CITIES (ExploreCities page) */
router.get("/", async (req, res) => {
  const cities = await City.find().select(
    "name country slug heroImage tagline"
  );
  res.json(cities);
});

/* GET SINGLE CITY (City Detail page) */
router.get("/:slug", async (req, res) => {
  const city = await City.findOne({ slug: req.params.slug });
  if (!city) {
    return res.status(404).json({ message: "City not found" });
  }
  res.json(city);
});

export default router;
