// 🔥 LOAD ENV FIRST — MUST BE FIRST LINE
import "./config/env.js";

import express from "express";
import cors from "cors";

// 🔗 DB
import connectDB from "./config/db.js";

// 🔗 Routes
import aiRoutes from "./routes/ai.routes.js";
import blogRoutes from "./routes/blog.routes.js";
import authRoutes from "./routes/auth.routes.js";
import itineraryRoutes from "./routes/itinerary.routes.js";
import cityRoutes from "./routes/city.routes.js";
import feedbackRoutes from "./routes/feedback.routes.js";
import qrTripRoutes from "./routes/qrTrip.routes.js";
import guideRoutes from "./routes/guide.routes.js"
import wikiRoutes from "./routes/wiki.routes.js";
import quizRoutes from "./routes/quiz.routes.js";
import adminRoutes from "./routes/admin.routes.js";
// import osmRoutes from "./routes/osm.routes.js";
import quizAdminRoutes from "./routes/quiz.admin.js";
import historyRoutes from "./routes/history.routes.js";
import otmRoutes from "./routes/otm.routes.js";

// 🔎 DEBUG (SAFE TO KEEP)
// console.log("🔥 THIS IS THE ACTIVE SERVER.JS FILE");
// console.log("SMTP_HOST:", process.env.SMTP_HOST);
// console.log("SMTP_PORT:", process.env.SMTP_PORT);
// console.log("SMTP_USER:", process.env.SMTP_USER);
// console.log("SMTP_PASS:", process.env.SMTP_PASS ? "LOADED" : "MISSING");
// console.log("ADMIN_EMAIL:", process.env.ADMIN_EMAIL);

const app = express();

// 🔗 CONNECT DATABASE (AFTER ENV)
connectDB();

// 🧩 MIDDLEWARE
app.use(cors());
app.use(express.json());

// 🛣️ ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/itineraries", itineraryRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/cities", cityRoutes);
app.use("/api/feedback", feedbackRoutes);
app.use("/api/qr-trips",qrTripRoutes);
app.use("/api/guides",guideRoutes);
app.use("/api/wiki",wikiRoutes);
app.use("/api/quiz", quizRoutes);
app.use("/api/admin", adminRoutes);
// app.use("/api/osm",osmRoutes);
app.use("/api/admin/quiz", quizAdminRoutes);
app.use("/api/history", historyRoutes);
app.use("/api/otm",otmRoutes);

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

// ✅ HEALTH CHECK
app.get("/", (req, res) => {
  res.send("✅ Backend is running");
});

// 🚀 START SERVER
const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`✅ Backend running on http://localhost:${PORT}`);
});
