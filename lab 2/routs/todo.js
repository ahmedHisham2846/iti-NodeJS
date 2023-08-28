const express = require("express");
const helpers = require("../common/helpers");
const fs = require("fs");
const filePath = "./db.json";

const router = express.Router();

router.get("/", (req, res) => {
  let strAllTodos = "";
  helpers.retriveAllTodos().forEach((todo) => {
    strAllTodos += `${todo.toString()}\n`;
  });
  res.send(strAllTodos);
});

router.get("/checked", (req, res) => {
  let strAllTodos = "";
  helpers.retriveAllTodos().forEach((todo) => {
    if (todo.checked) {
      strAllTodos += `${todo.toString()}\n`;
    }
  });
  res.send(strAllTodos);
});

router.get("/unchecked", (req, res) => {
  let strAllTodos = "";
  helpers.retriveAllTodos().forEach((todo) => {
    if (!todo.checked) {
      strAllTodos += `${todo.toString()}\n`;
    }
  });
  res.send(strAllTodos);
});

router.post("/", (req, res) => {
  let todos = helpers.retriveAllTodos();
  const newTodo = {
    ...req.body,
    id: helpers.getNextTodoID(),
  };
  if (!newTodo.checked) newTodo.checked = false;

  todos.push(newTodo);
  fs.writeFileSync(filePath, JSON.stringify(todos));
  res.send(`add new todo with ID: ${newTodo.id}`);
});

router.put("/", (req, res) => {
  const newTodo = req.body;
  let todos = helpers.retriveAllTodos();
  todos = todos.map((element) => {
    if (element.id == newTodo.id) {
      element.title = newTodo.title;
      element.body = newTodo.body;
    }
    return element;
  });

  fs.writeFileSync(filePath, JSON.stringify(todos));

  res.send("update todo with ID " + newTodo.id);
});

router.put("/check/:id", (req, res) => {
  const id = req.params.id;
  const todos = helpers.changeTodoState(id, true);
  fs.writeFileSync(filePath, JSON.stringify(todos));

  res.send("check todo with ID: " + id);
});

router.put("/uncheck/:id", (req, res) => {
  const id = req.params.id;
  const todos = helpers.changeTodoState(id, false);
  fs.writeFileSync(filePath, JSON.stringify(todos));

  res.send("uncheck todo with ID: " + id);
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  let todos = helpers.retriveAllTodos();
  todos = todos.filter((element) => Number(element.id) != Number(id));
  fs.writeFileSync(filePath, JSON.stringify(todos));
  res.send("delete todo with ID: " + id);
});

module.exports = router;
