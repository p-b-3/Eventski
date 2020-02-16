const mongoose = require("mongoose");
const { Schema } = mongoose;
const RecipientSchema = require("./Recipient");

const surveySchema = new Schema({
  title: String,
  subject: String,
  body: String,
  recipients: [RecipientSchema], //subdocument
  yesResponses: { type: Number, default: 0 },
  noResponses: { type: Number, default: 0 },
  _user: { type: Schema.Types.ObjectId, ref: "User" }, //record belongs to Users collection
  dateSent: Date,
  lastResponded: Date
});

mongoose.model("surveys", surveySchema);
