const auth = (req, res, next) => {
  const isUserLoggedIn = true;
  if (isUserLoggedIn) {
    return next();
  }
  res.status("401").send("you have to logged first");
};

const validateTodoId = (req, res, next) => {
  if (Number.isInteger(Number(req.body.id))) {
    return next();
  }

  if (Number.isInteger(Number(req.params.id))) {
    return next();
  }

  res.status("401").send("id must be a number");
};

module.exports = { auth, validateTodoId };
