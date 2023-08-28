const userController = require("../controllers/userController");
const express = require("express");
const varifyToken = require("../middlewares/auth");

const router = express.Router();

router.post("/register", userController.regiter);

router.post("/login", userController.login);

router.get("/", userController.retriveUSers);

router.get("/:id", userController.retriveOneUser);

router.put("/:id", userController.editUser);

router.delete("/:id", varifyToken, userController.deleteUser);
// router.delete("/:id", userController.deleteUser);

module.exports = router;
