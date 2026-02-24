// 🔥 LOAD ENV FIRST — MUST BE FIRST
import "./config/env.js";

import express from "express";
import passport from "passport";
import "./config/passport.js";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";

// 🔗 DB
import connectDB from "./config/db.js";

// 🔗 ROUTES
import aiRoutes from "./routes/ai.routes.js";
import blogRoutes from "./routes/blog.routes.js";
import authRoutes from "./routes/auth.routes.js";
import itineraryRoutes from "./routes/itinerary.routes.js";
import cityRoutes from "./routes/city.routes.js";
import feedbackRoutes from "./routes/feedback.routes.js";
import qrTripRoutes from "./routes/qrTrip.routes.js";
import guideRoutes from "./routes/guide.routes.js";
import wikiRoutes from "./routes/wiki.routes.js";
import quizRoutes from "./routes/quiz.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import osmRoutes from "./routes/osm.routes.js";
import quizAdminRoutes from "./routes/quiz.admin.js";
import historyRoutes from "./routes/history.routes.js";
import cityMetaRoutes from "./routes/cityMeta.routes.js";

const app = express();
app.set("trust proxy", 1);

/* =====================================================
   🌍 CORS — MANUAL + GUARANTEED (FIXES PREFLIGHT)
===================================================== */
const allowedOrigins =[
  "http://localhost:3000",
  "https://expeditio-travel.vercel.app",
  "https://projectx-one-pearl.vercel.app",
 "https://expeditio.world",
  "https://www.expeditio.world",

];

app.use((req, res, next) => {
  const origin = req.headers.origin;

  if (origin && allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization, X-Guest-Id"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, OPTIONS"
    );
  }

  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});


/* =====================================================
   🔗 DATABASE
===================================================== */
connectDB();
app.use(cookieParser());

/* =====================================================
   🧩 MIDDLEWARE
===================================================== */
app.use(express.json());
app.use(passport.initialize());

const aiLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 20, // 20 requests per hour per IP
  message: { message: "Too many AI requests. Try later." },
  standardHeaders: true,
  legacyHeaders: false,
});

app.use("/api/ai", aiLimiter);

/* =====================================================
   🛣️ ROUTES
===================================================== */
app.use("/api/auth", authRoutes);
app.use("/api/itineraries", itineraryRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/cities", cityRoutes);
app.use("/api/feedback", feedbackRoutes);
app.use("/api/qr-trips", qrTripRoutes);
app.use("/api/guides", guideRoutes);
app.use("/api/wiki", wikiRoutes);
app.use("/api/quiz", quizRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/osm", osmRoutes);
app.use("/api/admin/quiz", quizAdminRoutes);
app.use("/api/history", historyRoutes);
app.use("/api/city-meta", cityMetaRoutes);

/* =====================================================
   ❤️ HEALTH CHECKS
===================================================== */
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

app.get("/", (req, res) => {
  res.send("✅ Backend is running");
});

/* =====================================================
   🚀 START SERVER
===================================================== */
const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`✅ Backend running on port ${PORT}`);
});
