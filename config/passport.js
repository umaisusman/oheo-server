const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;  // Facebook strategy imported correctly
const AppleStrategy = require("passport-apple").Strategy;
const mongoose = require("mongoose");
const User = require("../models/User"); // Adjust this if necessary
const jwt = require("jsonwebtoken");

// Helper function to create or find user
const findOrCreateUser = async (profile, platform) => {
  const userId = profile.id;
  let user = await User.findOne({ userId });

  if (!user) {
    const email = profile.emails?.[0]?.value || `${profile.id}@${platform}.com`;
    const username = profile.displayName || `${platform} User`;

    // Create a new user without a password
    user = new User({
      userId,
      username,
      email,
      password: '',  // Set password to an empty string or handle it accordingly
    });
    await user.save();
  }

  return user;
};


// Serialize & Deserialize User
passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

// ✅ Google OAuth Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
      scope: ["profile", "email"], // Define the scope here too
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Find or create the user in your database
        const user = await findOrCreateUser(profile, 'google');
        return done(null, user);
      } catch (error) {
        console.error('Google OAuth error:', error);
        return done(error, false);
      }
    }
  )
);


// ✅ Facebook OAuth Strategy
passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      callbackURL: "/auth/facebook/callback",
      profileFields: ["id", "displayName", "emails"], // Fields you want to retrieve
      scope: ["email", "public_profile"] // Ensure the scope is defined here as well
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const user = await findOrCreateUser(profile, 'facebook');
        return done(null, user);
      } catch (error) {
        console.error('Facebook OAuth error:', error);
        return done(error, false);
      }
    }
  )
);



// ✅ Apple OAuth Strategy
passport.use(
  new AppleStrategy(
    {
      clientID: process.env.APPLE_CLIENT_ID,
      teamID: process.env.APPLE_TEAM_ID,
      keyID: process.env.APPLE_KEY_ID,
      callbackURL: "/auth/apple/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const user = await findOrCreateUser(profile, 'apple');
        return done(null, user);
      } catch (error) {
        console.error('Apple OAuth error:', error);
        return done(error, false);
      }
    }
  )
);

module.exports = passport;
