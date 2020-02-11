if (process.env.NODE_ENV == "production") {
  module.exports = require("./prod");
} else {
  // requiredev.js and export it
  module.exports = require("./dev");
}
