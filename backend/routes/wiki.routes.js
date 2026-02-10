import express from "express";
import { generateCityInfo } from "../services/aiCityFallback.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) return res.json({ available: false });

    /* ================= 1️⃣ TRY WIKIPEDIA ================= */
    const summaryRes = await fetch(
      `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query)}`,
      {
        headers: {
          "User-Agent": "ExpeditioTravelApp/1.0 (contact@expeditio.app)",
          "Accept": "application/json",
        },
      }
    );

    const contentType = summaryRes.headers.get("content-type") || "";

    if (summaryRes.ok && contentType.includes("application/json")) {
      const summary = await summaryRes.json();

      // 🔒 Safety check
      if (!summary?.title || !summary?.extract) {
        throw new Error("Invalid Wikipedia JSON");
      }

      /* ================= IMAGE FETCH ================= */
      const imageRes = await fetch(
        `https://en.wikipedia.org/w/api.php` +
          `?action=query` +
          `&titles=${encodeURIComponent(summary.title)}` +
          `&prop=pageimages` +
          `&format=json` +
          `&pithumbsize=2000` +
          `&origin=*`
      );

      let image =
        "https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/World_map_-_low_resolution.svg/1024px-World_map_-_low_resolution.svg.png";

      if (imageRes.ok) {
        const imageData = await imageRes.json();
        const page = Object.values(imageData?.query?.pages || {})[0];
        if (page?.thumbnail?.source) {
          image = page.thumbnail.source;
        }
      }

      return res.json({
        available: true,
        source: "wiki",
        title: summary.title,
        description: summary.extract,
        image,
        wikipediaUrl: summary.content_urls?.desktop?.page || null,
      });
    }

    /* ================= 2️⃣ AI FALLBACK ================= */
    console.warn(`Wikipedia unavailable for "${query}", using AI fallback`);

    const aiDescription = await generateCityInfo(query);

    return res.json({
      available: true,
      source: "ai",
      title: query,
      description: aiDescription,
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/World_map_-_low_resolution.svg/1024px-World_map_-_low_resolution.svg.png",
      wikipediaUrl: null,
    });

  } catch (err) {
    console.error("Wiki + AI fallback error:", err.message);
    res.status(500).json({ available: false });
  }
});

export default router;
