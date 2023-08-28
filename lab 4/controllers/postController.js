const postModel = require("../models/post");

async function insertPost(req, res) {
  const post = new postModel({
    body: req.body.body,
    date: req.body.date,
    user: req.body.user,
  });
  try {
    const postAferAdd = await post.save();
    res.status(201).json(postAferAdd);
  } catch (error) {
    console.log(error.message);
  }
}

async function retrivePosts(req, res) {
  try {
    const user = await postModel.find().populate("user");
    res.json(user);
  } catch (error) {
    console.log(error.message);
  }
}

async function retriveOnePost(req, res) {
  try {
    const id = req.params.id;
    const post = await postModel.findById(id).populate("user");
    res.json(post);
  } catch (error) {
    console.log(error.message);
  }
}

async function editPost(req, res) {
  try {
    const newPost = req.body;
    const id = req.params.id;
    const post = await postModel.findOneAndUpdate({ _id: id }, newPost, {
      new: true,
    });
    res.json(post);
  } catch (error) {
    console.log(error.message);
  }
}

async function deletePost(req, res) {
  try {
    const id = req.params.id;
    await postModel.findByIdAndDelete(id);
    res.send("post deleted, ID: " + id);
  } catch (error) {
    console.log(error.message);
  }
}

module.exports = {
  insertPost,
  retrivePosts,
  retriveOnePost,
  editPost,
  deletePost,
};
