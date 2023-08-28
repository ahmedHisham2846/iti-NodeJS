const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const userRouter = require("./routs/user");
const postRouter = require("./routs/post");
const port = process.env.SERVER_PORT || 5000;
const mongoUrl =
  process.env.MONGODB_URL || "mongodb://127.0.0.1:27017/FacultySystemV2";

const app = express();
app.use(express.json());
app.use(morgan(':method, :url, :date'));
app.use("/user", userRouter);
app.use("/post", postRouter);

try {
  mongoose.connect(mongoUrl);
  console.log("Connected to MongoDB successfully");
} catch (error) {
  console.log(error.message);
}

app.listen(port, portListnerHandler);

function portListnerHandler(err) {
  if (!err) return console.log("server listening on port: " + port);
  console.log("Error occerd");
}
