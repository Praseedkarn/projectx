import express from "express";
import {
  saveOrGetQrTrip,
  getQrTripById,
} from "../controllers/qrTrip.controller.js";

const router = express.Router();

/* ================================
   QR TRIP ROUTES
================================ */

// Save / reuse QR trip
router.post("/", saveOrGetQrTrip);

// Fetch QR trip
router.get("/:id", getQrTripById);

export default router;
