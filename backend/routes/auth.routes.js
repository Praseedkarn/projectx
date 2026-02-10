import express from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { register, login } from "../controllers/auth.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

/* LOCAL AUTH */
router.post("/register", register);
router.post("/login", login);

/* GOOGLE AUTH */
router.get("/google", (req, res, next) => {
  const from = req.query.from;
  if (from) {
    res.cookie("oauth_from", from, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
    });
  }
  next();
}, passport.authenticate("google", { scope: ["profile", "email"] }));


router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    const token = jwt.sign(
      { id: req.user._id, role: req.user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

const frontend =
  req.cookies?.oauth_from ||
  process.env.CLIENT_URL;

res.redirect(`${frontend}/auth-success?token=${token}`);



  }
);

router.get("/me", authMiddleware, async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  res.json(user);
});

export default router;
