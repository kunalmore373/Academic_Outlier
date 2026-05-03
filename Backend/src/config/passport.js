const passport = require('passport');
const User = require('../models/user.model');


const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:3000/api/auth/google/callback'
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
        const email = profile.emails[0].value;
        let user = await User.findOne({ email });

        if (user) {
            if (!user.googleId) {
                user.googleId = profile.id;
                await user.save();
            }
            return done(null, user);
        } else {
            user = await User.create({
                email: email,
                googleId: profile.id,
                isVerified: true, // Google accounts are pre-verified
                profile: {
                    name: profile.displayName,
                    currentDegree: 'Other', 
                    annualBudget: 0
                }
            });
            return done(null, user);
        }
    } catch (error) {
        return done(error, null);
    }
  }
));

module.exports = passport;
