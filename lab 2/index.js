const express = require("express");
const todoRout = require("./routs/todo"); 
const helpers = require("./common/helpers"); 
const auth = require("./middlewares/auth");
const port = process.env.SERVER_PORT || 5000;

function main() {
  const app = express();
  app.use(express.json());
  app.use("/todo", auth.auth);
  app.put("/todo", auth.validateTodoId);
  app.put("/todo/check/:id", auth.validateTodoId);
  app.put("/todo/uncheck/:id", auth.validateTodoId);
  app.delete("/todo/:id", auth.validateTodoId);
  app.use("/todo", todoRout);
  app.listen(port, listenHandler);
}

function listenHandler(err) {
  if (!err) {
    helpers.createFileIfNotExist();
    return console.log("server listening on port: " + port);
  }
  console.log("Error occerd");
}

main();
