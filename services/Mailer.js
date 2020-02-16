const sendgrid = require("sendgrid");
const helper = sendrgrid.mail;
const keys = require("../config/keys");

class Mailer extends helper.Mail {}
