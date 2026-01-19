import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../models/User.js";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/api/auth/google/callback",
    },
    async (_, __, profile, done) => {
      try {
        const email = profile.emails[0].value;

        let user = await User.findOne({ email });

        if (!user) {
          user = await User.create({
            name: profile.displayName,
           username: `${email.split("@")[0]}_${Date.now()}`,

            email,
            password: null,          // 👈 important
            provider: "google",
            tokens: 100,
            role: "user",
          });
        }

        done(null, user);
      } catch (err) {
        done(err, null);
      }
    }
  )
);
