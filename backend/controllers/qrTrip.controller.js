import crypto from "crypto";
import QrTrip from "../models/QrTrip.js";

/* ================================
   SAVE OR REUSE QR TRIP
   (Generate QR button)
================================ */
const EXPIRY_DAYS = 7;

export const saveOrGetQrTrip = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ message: "Trip text is required" });
    }

    const hash = crypto
      .createHash("sha256")
      .update(text)
      .digest("hex");

    const existing = await QrTrip.findOne({ hash });

    if (existing) {
      return res.json({
        qrTripId: existing.qrTripId,
        reused: true,
        expiresAt: existing.expiresAt,
      });
    }

    const qrTripId = crypto.randomUUID();

    // 🔥 expiry date
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + EXPIRY_DAYS);

    await QrTrip.create({
      qrTripId,
      hash,
      text,
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

    // 🔥 STEP 4: EXPIRY CHECK
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

