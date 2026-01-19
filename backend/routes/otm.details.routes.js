import express from "express";
import fetch from "node-fetch";

const router = express.Router();

router.get("/:xid", async (req, res) => {
  try {
    const { xid } = req.params;
    const apiKey = process.env.OPENTRIPMAP_API_KEY;

    if (!apiKey) {
      throw new Error("OTM API KEY MISSING");
    }

    const url = `https://api.opentripmap.com/0.1/en/places/xid/${xid}?apikey=${apiKey}`;

    const response = await fetch(url);
    const data = await response.json();

    if (!data || data.error) {
      return res.json({ available: false });
    }

    res.json({
      available: true,
      title: data.name,
      description:
        data.wikipedia_extracts?.text ||
        data.info?.descr ||
        "No description available for this place.",
      image: data.preview?.source || null,
      wikipediaUrl: data.wikipedia || null,
    });
  } catch (err) {
    console.error("❌ OTM DETAILS ERROR:", err.message);
    res.json({ available: false });
  }
});

export default router;
