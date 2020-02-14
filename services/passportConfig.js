const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys = require("../config/keys");
const mongoose = require("mongoose");

// User is model class, can use to create a new model instance
const User = mongoose.model("users");

// add cookie to user
passport.serializeUser((user, done) => {
  //user from line 32, what we pulled from mongoDB
  done(null, user.id); //putting user's id as the cookie
});

//turn id into user
passport.deserializeUser((id, done) => {
  User.findById(id)
    //user pulled out of mongoDB from query above
    .then(user => {
      done(null, user);
    });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: keys.callbackURI,
      proxy: true
    },
    // callback function with user profile and accessToken from google
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ googleId: profile.idea });
      //called with user found, if none then equal to null
      if (existingUser) {
        // pass in error and user record to passport done function
        return done(null, existingUser);
      }

      const user = await new User({ googleId: profile.id }).save(); //creates mongoose model instance
      done(null, user);
    }
  )
);
