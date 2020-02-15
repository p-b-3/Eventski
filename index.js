const express = require("express");
const cookieSession = require("cookie-session");
const passport = require("passport");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("./models/User"); //require in to run this file and create model class
require("./services/passportConfig");
const keys = require("./config/keys");
const authRoutes = require("./routes/authRoutes");
const billingRoutes = require("./routes/billingRoutes");

mongoose.connect(keys.mongoURI);

const app = express();

//middlewares that operate on incoming request before being passed on to route handlers
app.use(bodyParser.json());
app.use(
  cookieSession({
    maxAge: 1000 * 60 * 60 * 24 * 30,
    keys: [keys.cookieKey]
  })
);

app.use(passport.initialize());
app.use(passport.session());

billingRoutes(app);
authRoutes(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
