import express from "express";
import {
  saveOrGetQrTrip,
  getQrTripById,
  getMyQrTrips,
} from "../controllers/qrTrip.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

/* ================================
   QR TRIP ROUTES
================================ */

// 🔐 Save / reuse QR (LOGIN REQUIRED)
router.post("/", authMiddleware, saveOrGetQrTrip);

// 🔐 Get my saved QRs
router.get("/my", authMiddleware, getMyQrTrips);

// 🔓 Fetch QR (PUBLIC – via QR scan)
router.get("/:id", getQrTripById);




export default router;
