const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: { type: String, require: true, minLength: 3 },
  lastName: String,
  email: { type: String, require: true, unique: true, match: /.+@.+\..+/ },
  password: { type: String, require: true, minLength: 3 },
  age: Number
});

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
