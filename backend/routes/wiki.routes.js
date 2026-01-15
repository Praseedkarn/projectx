import express from "express";

const router = express.Router();

/**
 * GET /api/wiki?query=cityName
 */
router.get("/", async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) return res.json({ available: false });

    // 1️⃣ Wikipedia summary (auto-resolves title)
    const summaryRes = await fetch(
      `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query)}`
    );

    if (!summaryRes.ok) return res.json({ available: false });
    const summary = await summaryRes.json();

    // 2️⃣ Use RESOLVED title for image
    const imageRes = await fetch(
      `https://en.wikipedia.org/w/api.php?` +
        `action=query` +
        `&titles=${encodeURIComponent(summary.title)}` +
        `&prop=pageimages` +
        `&format=json` +
        `&pithumbsize=2000` +
        `&origin=*`
    );

    const imageData = await imageRes.json();
    const page = Object.values(imageData.query.pages)[0];

    const image =
      page?.thumbnail?.source ||
      "https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/World_map_-_low_resolution.svg/1024px-World_map_-_low_resolution.svg.png";

    res.json({
      available: true,
      title: summary.title,
      description: summary.extract,
      image,
      wikipediaUrl: summary.content_urls?.desktop?.page,
    });
  } catch (err) {
    console.error("Wiki error:", err);
    res.status(500).json({ available: false });
  }
});


export default router;
