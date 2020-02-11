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
      callbackURL: keys.callbackURL,
      //callbackURL: "/auth/google/callback",
      proxy: true
    },
    // callback function with user profile and accessToken from google
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ googleId: profile.idea }).then(existingUser => {
        //called with user found, if none the equal to null
        if (existingUser) {
          // pass in error and user record to passport done function
          done(null, existingUser);
        } else {
          new User({ googleId: profile.id }) //creates mongoose model instance
            .save()
            // when user is saved
            .then(user => {
              done(null, user);
            });
        }
      });
    }
  )
);
