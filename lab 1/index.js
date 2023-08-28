// node index.js add title=title1 body=body1
// node index.js edit id=id title=title1 body=body1
// node index.js delete id=id title=title1 body=body1
// node index.js list
// node index.js check id=id
// node index.js uncheck id=id

const helpers = require("./helpers");

function convertArrayToObject(arr) {
  const objectData = arr.reduce((accumelator, element) => {
    [key, value] = element.split("=");
    accumelator[key] = value;
    return accumelator;
  }, {});
  return objectData;
}

function main(args) {
  const [, , operation, ...data] = args;
  let todo = convertArrayToObject(data);

  helpers.createFileIfNotExist();
  switch (operation) {
    case "add":
      helpers.add(todo);
      break;

    case "edit":
      helpers.edit(todo);
      break;

    case "delete":
      helpers.remove(todo.id);
      break;

    case "list":
      console.log(helpers.retriveAllTodos());
      break;

    case "check":
      helpers.changeCheckState(todo.id, true);
      break;

    case "uncheck":
      helpers.changeCheckState(todo.id, false);
      break;

    case "help":
      console.log(`
      HELP
      ==============================================
      1. node index.js add title=<title> body=<body>
      2. node index.js edit id=id title=<title> body=<body>
      3. node index.js delete id=id
      4. node index.js list
      5. node index.js check id=<id>
      6. node index.js uncheck id=<id>
      `);
      break;

    default:
      throw "unhandeled data format, you can use -help-";
  }
}

main(process.argv);
