const mongoose = require("mongoose");

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/challenge-3"
);

module.exports = mongoose.connection;
