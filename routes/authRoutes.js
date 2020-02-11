const passport = require("passport");

module.exports = app => {
  app.get(
    "/auth/google/",
    passport.authenticate("google", {
      scope: ["profile", "email"]
    })
  );

  //send code to google for user info
  app.get("/auth/google/callback/", passport.authenticate("google"));
};
