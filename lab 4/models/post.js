const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  body: { type: String, require: true, minLength: 5 },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  date: { type: Date, require: true },
});

module.exports = mongoose.model("post", postSchema);
