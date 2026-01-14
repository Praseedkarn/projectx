import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    // 🔐 ROLE (user / admin)
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    // 🪙 TOKEN SYSTEM
    tokens: {
      type: Number,
      default: 100, // free tokens on signup
      min: 0,
    },

    // ⏱️ QUIZ COOLDOWN TRACKING
    lastQuizAttempt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
export default User;
