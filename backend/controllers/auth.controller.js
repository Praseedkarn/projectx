import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

/* =====================================================
   REGISTER (USER ONLY)
   ===================================================== */
export const register = async (req, res) => {
  try {
    const { name, username, email, password } = req.body;

    if (!name || !username || !email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    // ❌ BLOCK ADMIN EMAIL REGISTRATION
    if (email === "admin@projectx.com") {
      return res.status(403).json({ message: "Admin email reserved" });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      username,
      email,
      password: hashedPassword,
      role: "user",
      tokens: 100,
    });

    res.status(201).json({
      message: "User created",
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
    console.error("REGISTER ERROR:", err.message);
    res.status(500).json({ message: "Signup failed" });
  }
};

/* =====================================================
   LOGIN (ADMIN + USER)
   ===================================================== */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    /* ================= ADMIN LOGIN ================= */
    if (email === "admin@projectx.com" && password === "admin123") {
      const token = jwt.sign(
        { id: "admin-id", role: "admin" },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      );

      return res.json({
        token,
        user: {
          id: "admin-id",
          name: "Admin",
          username: "admin",
          email: "admin@projectx.com",
          role: "admin",
          tokens: Infinity,
        },
      });
    }

    /* ================= USER LOGIN ================= */
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

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
    console.error("LOGIN ERROR:", err.message);
    res.status(500).json({ message: "Login failed" });
  }
};
