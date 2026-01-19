import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
// import { verifyRecaptcha } from "../utils/verifyRecaptcha.js";

/* ================= REGISTER ================= */
export const register = async (req, res) => {
  try {
    const { name, username, email, password } = req.body;

    /* ===== BASIC VALIDATION ===== */
    if (!name || !username || !email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    if (email === "admin@projectx.com") {
      return res.status(403).json({ message: "Admin email reserved" });
    }

    /* ===== CHECK EXISTING USER ===== */
    const existing = await User.findOne({ email });

    if (existing) {
      // 🛑 If user signed up via Google
      if (existing.provider === "google") {
        return res.status(400).json({
          message: "This email is registered using Google Sign-In",
        });
      }

      return res.status(400).json({ message: "Email already exists" });
    }

    /* ===== HASH PASSWORD ===== */
    const hashedPassword = await bcrypt.hash(password, 10);

    /* ===== CREATE USER ===== */
    const user = await User.create({
      name,
      username,
      email,
      password: hashedPassword,
      provider: "local",
      role: "user",
      tokens: 100,
    });

    /* ===== RESPONSE ===== */
    res.status(201).json({
      user: {
        id: user._id,
        name: user.name,
        username: user.username,
        email: user.email,
        role: user.role,
        tokens: user.tokens,
      },
    });
  } catch (err) {
    console.error("REGISTER ERROR:", err);
    res.status(500).json({ message: "Signup failed" });
  }
};

/* ================= LOGIN ================= */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    /* ===== BASIC VALIDATION ===== */
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    /* ===== USER CHECK ===== */
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    /* ===== GOOGLE ACCOUNT BLOCK ===== */
    if (user.provider === "google") {
      return res.status(400).json({
        message: "Please sign in using Google",
      });
    }

    /* ===== PASSWORD CHECK ===== */
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    /* ===== JWT TOKEN ===== */
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    /* ===== RESPONSE ===== */
    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        username: user.username,
        email: user.email,
        role: user.role,
        tokens: user.tokens,
      },
    });
  } catch (err) {
    console.error("LOGIN ERROR:", err);
    res.status(500).json({ message: "Login failed" });
  }
};
