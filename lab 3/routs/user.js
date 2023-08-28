const express = require("express");
const userModel = require("../models/user");

const router = express.Router();

function getUserModel(userObject) {
  return new userModel({
    firstName: userObject.firstName,
    lastName: userObject.lastName,
    email: userObject.email,
    password: userObject.password,
    age: userObject.age,
  });
}

router.post("/", (req, res) => {
  const user = getUserModel(req.body);

  user
    .save()
    .then((user) => {
      res.json(user);
    })
    .catch((error) => {
      console.log(error.message);
    });
});

router.get("/", (req, res) => {
  userModel
    .find()
    .then((user) => {
      res.json(user);
    })
    .catch((error) => {
      console.log(error.message);
    });
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  userModel
    .findById(id)
    .then((user) => {
      res.json(user);
    })
    .catch((error) => console.log(error.message));
});

router.put("/", (req, res) => {
  const newUser = req.body;
  const filter = { _id: newUser._id };
  userModel
    .findOneAndUpdate(filter, newUser)
    .then(() => res.json(newUser))
    .catch((error) => console.log(error.message));
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  userModel
    .findByIdAndDelete(id)
    .then(() => {
      res.send("user deleted, ID: " + id);
    })
    .catch((error) => console.log(error.message));
});

module.exports = router;
