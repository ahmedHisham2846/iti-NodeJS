const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
require("dotenv").config();
const userRouter = require("./routs/userRouter");
const postRouter = require("./routs/postRouter");
const port = process.env.SERVER_PORT;
const mongoUrl = process.env.MONGODB_URL;

const app = express();
app.use(express.json());
app.use(morgan(":method, :url, :date"));
app.use("/users", userRouter);
app.use("/posts", postRouter);

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
