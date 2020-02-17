const requireLogin = require("../middlewares/requireLogin");
const requireCredits = require("../middlewares/requireCredits");
const mongoose = require("mongoose");
const Survey = mongoose.model("surveys");
const Mailer = require("../services/Mailer");
const surveyTemplate = require("../services/emailTemplates/SurveyTemplate");

module.exports = async app => {
  app.get("/api/surveys/thanks", (req, res) => {
    res.send("Thank you for your feedback");
  });

  app.post("/api/surveys", requireLogin, requireCredits, async (req, res) => {
    const { title, subject, body, recipients } = req.body;

    const survey = new Survey({
      title: title,
      subject: subject,
      body: body,
      recipients: recipients.split(",").map(email => {
        return { email: email.trim() };
      }),

      _user: req.user.id,
      dateSent: Date.now()
    });
    //attempt to create and send email
    const mailer = new Mailer(survey, surveyTemplate(survey)); //second arg is html content

    try {
      await mailer.send();
      //email sent succesfully so save survey
      await survey.save();
      req.user.credits -= 1;
      const user = await req.user.save();

      res.send(user); //updates user model in authReducer to update header
    } catch (err) {
      res.status(422).send(err);
    }
  });
};
