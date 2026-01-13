import express from "express";

const router = express.Router();

/**
 * GET /api/wiki?query=cityName
 */
router.get("/", async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) return res.json({ available: false });

    // 1️⃣ Get summary (text)
    const summaryRes = await fetch(
      `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query)}`
    );

    if (!summaryRes.ok) return res.json({ available: false });
    const summary = await summaryRes.json();

    // 2️⃣ Get HD image (MediaWiki API — FIXED)
    const imageRes = await fetch(
    `https://en.wikipedia.org/w/api.php?` +
    `action=query` +
    `&titles=${encodeURIComponent(query)}` +
    `&prop=pageimages` +
    `&format=json` +
    `&pithumbsize=2000` + // 👈 BIGGER
    `&origin=*`          // 👈 REQUIRED
    );



    const imageData = await imageRes.json();
    const page = Object.values(imageData.query.pages)[0];
    const image = page?.thumbnail?.source || null;

    res.json({
      available: true,
      title: summary.title,
      description: summary.extract,
      image, // ✅ HD IMAGE
      wikipediaUrl: summary.content_urls?.desktop?.page,
    });
  } catch (err) {
    console.error("Wiki error:", err);
    res.status(500).json({ available: false });
  }
});

export default router;
