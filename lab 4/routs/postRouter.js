const express = require("express");
const postController = require("../controllers/postController");
const varifyToken = require("../middlewares/auth");

const router = express.Router();

router.post("/", varifyToken, postController.insertPost);

router.get("/", varifyToken, postController.retrivePosts);

router.get("/:id", varifyToken, postController.retriveOnePost);

router.put("/:id", varifyToken, postController.editPost);

router.delete("/:id", varifyToken, postController.deletePost);

module.exports = router;
