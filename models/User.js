const mongoose = require("mongoose");
const { Schema } = mongoose; //const Schema = mongoose.Schema;

const userSchema = new Schema({
  googleId: String
});

//create a new collection 'users'
mongoose.model("users", userSchema);
