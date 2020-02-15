const keys = require("../config/keys");
const stripe = require("stripe")(keys.stripeSecretKey);
const requireLogin = require("../middlewares/requireLogin");

module.exports = app => {
  app.post("/api/stripe", requireLogin, async (req, res) => {
    //token info is available in req.body.id (from body-parser) sent to this route by handleToken action in StripBilling
    // stripe object returns charge object
    const charge = await stripe.charges.create({
      //makes request to stripe API to charge user
      amount: 500,
      currency: "usd",
      description: "purchasing credits",
      source: req.body.id
    });
    req.user.credits += 5; //req.user setup by passport
    const user = await req.user.save();
    res.send(user);
  });
};
