import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import dotenv from "dotenv";
import userModel from "../model/user.model.ts";
dotenv.config();


passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async function (accessToken, refreshToken, profile, done) {
      try {
        const googleId = profile.id;
        const userName = profile.displayName;
        const avatar = profile.photos?.[0]?.value;
        const email = profile.emails[0].value;
        let user = await userModel.findOne({ googleId });

        if (!user) {
          user = await userModel.create({
            email,
            googleId,
            userName,
            avatar,
          });
        }

        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    },
  ),
);

export default passport;
