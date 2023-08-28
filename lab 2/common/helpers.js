const fs = require("fs");
const filePath = "./db.json";

function createFileIfNotExist() {
  const exists = fs.existsSync(filePath);
  if (!exists) {
    fs.writeFileSync(filePath, JSON.stringify([]));
  }
}

function retriveAllTodos() {
  let todos = fs.readFileSync(filePath, "utf8");
  todos = JSON.parse(todos);
  todos.map((todo) => {
    todo.toString = () => {
      return `{id: ${todo.id}, title: ${todo.title}, body: ${todo.body}, checked: ${todo.checked}}`;
    };
    return todo;
  });
  return todos;
}

function getNextTodoID() {
  const todos = retriveAllTodos();
  const lastID = todos.length <= 0 ? 0 : todos[todos.length - 1].id;
  return lastID + 1;
}

function changeTodoState(id, state) {
  let todos = retriveAllTodos();
  todos = todos.map((element) => {
    if (element.id == id) {
      element.checked = state;
    }
    return element;
  });

  return todos;
}

module.exports = {
  getNextTodoID,
  retriveAllTodos,
  createFileIfNotExist,
  changeTodoState,
};
