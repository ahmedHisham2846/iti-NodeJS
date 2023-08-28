const express = require("express");
const postModel = require("../models/post");

const router = express.Router();

function getPostModel(postObject) {
  return new postModel({
    body: postObject.body,
    date: postObject.date,
    user: postObject.user,
  });
}

router.post("/", (req, res) => {
  const user = getPostModel(req.body);

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
  postModel
    .find()
    .populate("user")
    .then((user) => {
      res.json(user);
    })
    .catch((error) => {
      console.log(error.message);
    });
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  postModel
    .findById(id)
    .populate("user")
    .then((user) => {
      res.json(user);
    })
    .catch((error) => console.log(error.message));
});

router.put("/", (req, res) => {
  const newPost = req.body;
  const filter = { _id: newPost._id };
  postModel
    .findOneAndUpdate(filter, newPost, {new: true})
    .then((p) => res.json(p))
    .catch((error) => console.log(error.message));
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  postModel
    .findByIdAndDelete(id)
    .then(() => {
      res.send("post deleted, ID: " + id);
    })
    .catch((error) => console.log(error.message));
});

module.exports = router;
