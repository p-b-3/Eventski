const requireLogin = require("../middlewares/requireLogin");
const requireCredits = require("../middlewares/requireCredits");
const mongoose = require("mongoose");
const Survey = mongoose.model("surveys");
const Mailer = require("../services/Mailer");
const surveyTemplate = require("../services/emailTemplates/SurveyTemplate");

module.exports = async app => {
  app.post("/api/survey", requireLogin, requireCredits, (req, res) => {
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
    mailer.send();
    //email sent succesfully so save survey
  });
};
