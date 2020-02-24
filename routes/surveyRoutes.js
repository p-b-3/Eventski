const requireLogin = require("../middlewares/requireLogin");
const requireCredits = require("../middlewares/requireCredits");
const mongoose = require("mongoose");
const Survey = mongoose.model("surveys");
const Mailer = require("../services/Mailer");
const surveyTemplate = require("../services/emailTemplates/SurveyTemplate");
const _ = require("lodash");
const { Path } = require("path-parser");
const { URL } = require("url");

module.exports = async app => {
  app.get("/api/surveys", requireLogin, async (req, res) => {
    // don't load recipients list to improve response time
    const surveys = await Survey.find({ _user: req.user.id });

    res.send(surveys);
  });

  app.get("/api/surveys/:surveyId/:choice", (req, res) => {
    res.send("Thank you for your feedback");
  });

  app.post("/api/surveys/webhooks", (req, res) => {
    //incoming array of events from sendgrid
    const p = new Path("/api/surveys/:surveyId/:choice");

    _.chain(req.body)
      .map(({ email, url }) => {
        const match = p.test(new URL(url).pathname); // returns object with variables from url or null
        if (match) {
          return {
            email: email,
            surveyId: match.surveyId,
            choice: match.choice
          }; //obj
        }
      })
      .compact() //removes undefined
      .uniqBy("email", "surveyId") //removes duplicates
      .each(event => {
        //mongo query
        Survey.updateOne(
          {
            _id: surveyId,
            recipients: {
              $elemMatch: { email: email, responded: false }
            }
          },
          {
            $inc: { [choice]: 1 },
            $set: { "recipients.$.responded": true },
            lastResponded: new Date()
          }
        ).exec();
      })
      .value();
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
