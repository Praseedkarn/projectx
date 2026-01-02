import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import aiRoutes from "./routes/ai.routes.js";
import connectDB from "./config/db.js";
import blogRoutes from "./routes/blog.routes.js";
import authRoutes from "./routes/auth.routes.js";
import itineraryRoutes from "./routes/itinerary.routes.js";


dotenv.config();

const app = express();
//Connect database
connectDB();

app.use(cors());
app.use(express.json());
app.use("/api/auth",authRoutes);
app.use("/api/itineraries", itineraryRoutes);


// API routes
app.use("/api/ai", aiRoutes);
app.use("/api/blogs",blogRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("✅ Backend is running");
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`✅ Backend running on http://localhost:${PORT}`);
});
