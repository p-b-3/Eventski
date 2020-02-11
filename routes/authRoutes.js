const passport = require("passport");

module.exports = app => {
  app.get(
    "/auth/google/",
    passport.authenticate("google", {
      scope: ["profile", "email"]
    })
  );

  //send code to google for user info
  app.get("/auth/google/callback", passport.authenticate("google"));

  app.get("/api/logout", (req, res) => {
    //passport attaches user and other items to req obj including logout which removes cookie
    req.logout();
    res.send(req.user);
  });

  app.get("/api/current_user", (req, res) => {
    res.send(req.user);
  });
};
