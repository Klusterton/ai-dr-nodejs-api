import * as dotenv from 'dotenv'
dotenv.config()
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import passport from 'passport'
import User from './models/user.model.js'

export default passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:8080/auth/google/callback"
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      const user = await User.findOne({ email: profile.emails[0].value });
      if(user) {
        user.googleId = profile.id
        await user.save()
        return done(null, user);
      } else {
        const newUser = new User({ email: profile.emails[0].value, googleId: profile.id, name: profile.displayName })
        const user = await newUser.save()
        return done(null, user);
      }
    } catch (err) {
      return done(err, null);
    }
  }
));

passport.serializeUser((user, done) => {
    // Serialize user data
    done(null, user);
  });
  
  passport.deserializeUser((obj, done) => {
    // Deserialize user data
    done(null, obj);
  });
