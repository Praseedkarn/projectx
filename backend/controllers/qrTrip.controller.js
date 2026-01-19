import crypto from "crypto";
import QrTrip from "../models/QrTrip.js";

/* ================================
   SAVE OR REUSE QR TRIP
   (Generate QR button)
================================ */
const EXPIRY_DAYS = 7;

export const saveOrGetQrTrip = async (req, res) => {
  try {
    const { text, place } = req.body;
    const userId = req.user.id; // 🔥 from authMiddleware

    if (!text || !place) {
      return res.status(400).json({
        message: "Trip text and place are required",
      });
    }

    /* ================================
       🟡 DEMO MODE → DO NOT SAVE
    ================================ */
    if (place.toLowerCase().includes("demo")) {
      return res.json({
        qrTripId: `demo-${crypto.randomUUID()}`,
        reused: true,
        expiresAt: null,
        demo: true,
      });
    }

    /* ================================
       REAL TRIP FLOW
    ================================ */

    // 🧠 Create hash from itinerary
    const hash = crypto
      .createHash("sha256")
      .update(text)
      .digest("hex");

    // 🔍 Check if THIS USER already has this QR
    const existing = await QrTrip.findOne({ hash, userId });

    if (existing) {
      return res.json({
        qrTripId: existing.qrTripId,
        reused: true,
        expiresAt: existing.expiresAt,
      });
    }

    // 🆕 Create new QR
    const qrTripId = crypto.randomUUID();

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + EXPIRY_DAYS);

    await QrTrip.create({
      qrTripId,
      hash,
      text,
      userId,
      place,
      searchedAt: new Date(),
      expiresAt,
    });

    res.json({
      qrTripId,
      reused: false,
      expiresAt,
    });
  } catch (error) {
    console.error("QR Trip save error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/* ================================
   GET QR TRIP BY ID
   (Scan QR)
================================ */
export const getQrTripById = async (req, res) => {
  try {
    const qrTrip = await QrTrip.findOne({
      qrTripId: req.params.id,
    });

    if (!qrTrip) {
      return res.status(404).json({ message: "QR Trip not found" });
    }

    // ⏳ Expiry check
    if (qrTrip.expiresAt && qrTrip.expiresAt < new Date()) {
      await QrTrip.deleteOne({ _id: qrTrip._id });

      return res.status(410).json({
        message: "QR Trip has expired",
      });
    }

    res.json(qrTrip);
  } catch (error) {
    console.error("QR Trip fetch error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/* ================================
   GET MY SAVED QR TRIPS
================================ */
export const getMyQrTrips = async (req, res) => {
  try {
    const userId = req.user.id;

    const trips = await QrTrip.find({
      userId,
      expiresAt: { $gt: new Date() }, // only valid trips
    }).sort({ createdAt: -1 });

    res.json(trips);
  } catch (error) {
    console.error("Fetch my QR trips error:", error);
    res.status(500).json({ message: "Failed to fetch saved trips" });
  }
};
