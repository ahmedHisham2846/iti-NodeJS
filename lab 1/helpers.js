const fs = require("fs");
const filePath = "./db.json";

function createFileIfNotExist() {
  const exists = fs.existsSync(filePath);
  if (!exists) {
    fs.writeFileSync(filePath, JSON.stringify([]));
  }
}

function retriveAllTodos() {
  const todos = fs.readFileSync(filePath, "utf8");
  return JSON.parse(todos);
}

function retriveOneTodo(id) {
  const jsonTodos = fs.readFileSync(filePath, "utf8");
  const todos = JSON.parse(jsonTodos);
  let requiredTot = todos.filter((element) => element.id == id)[0];

  if (requiredTot) return requiredTot;
  else throw "Todo isn't found";
}

function getNextTodoID() {
  const todos = retriveAllTodos();
  const lastID = todos.length <= 0 ? 0 : todos[todos.length - 1].id;
  return lastID + 1;
}

function add(todo) {
  let todos = retriveAllTodos();

  todo = {
    ...todo,
    id: getNextTodoID(),
  };
  if (!todo.checked) todo.checked = false;

  todos.push(todo);
  fs.writeFileSync(filePath, JSON.stringify(todos));
}

function edit(todo) {
  if (isNaN(Number(todo.id))) {
    throw "id must be a number";
  }
  
  let todos = retriveAllTodos();
  todos = todos.map((element) => {
    if (element.id == todo.id) {
      element.title = todo.title;
      element.body = todo.body;
      
    }
    return element;
  });
  
  fs.writeFileSync(filePath, JSON.stringify(todos));
}

function remove(id) {
  if (isNaN(Number(id))) {
    throw "id must be a number";
  }

  let todos = retriveAllTodos();
  todos = todos.filter((element) => Number(element.id) != Number(id));

  fs.writeFileSync(filePath, JSON.stringify(todos));

  console.log("Todo has been Deleted");
}

function changeCheckState(id, checkState) {
  let todo = retriveOneTodo(id);
  todo.checked = checkState;
  edit(todo);
}

module.exports = {
  createFileIfNotExist,
  add,
  edit,
  remove,
  retriveAllTodos,
  changeCheckState,
};


