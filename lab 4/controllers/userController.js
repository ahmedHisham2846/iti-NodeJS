const userModel = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function regiter(req, res) {
  try {
    const { firstName, lastName, email, password, age } = req.body;

    if (!(firstName && lastName && email && password && age))
      return res.status(400).send("All inputs is required");

    const oldUser = await userModel.findOne({ email });
    if (oldUser)
      return res.status(409).send("User already exists, Please login");

    const encrypterPassword = await bcrypt.hash(password, 10);

    const newUser = {
      firstName,
      lastName,
      email,
      age,
      password: encrypterPassword,
    };
    const user = await userModel.create(newUser);
    res.status(201).json(user);
  } catch (error) {
    console.log(error.message);
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;
    if (!(email && password))
      return res.status(400).send("All inputs is required");
    const user = await userModel.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKENN_KEY,
        { expiresIn: "2h" }
      );

      user.token = token;
      res.status(200).json({ email, token });
    }
    res.status(400).send("Invalid credentials");
  } catch (error) {
    console.log(error);
  }
}

async function retriveUSers(req, res) {
  try {
    const users = await userModel.find();
    res.json(users);
  } catch (error) {
    console.log(error.message);
  }
}

async function retriveOneUser(req, res) {
  try {
    const id = req.params.id;
    const user = await userModel.findById(id);
    res.json(user);
  } catch (error) {
    console.log(error.message);
  }
}

async function editUser(req, res) {
  try {
    const id = req.params.id;
    const newUser = req.body;
    const user = await userModel.findOneAndUpdate({ _id: id }, newUser, {
      new: true,
    });
    res.json(user);
  } catch (error) {
    console.log(error.message);
  }
}

async function deleteUser(req, res) {
  try {
    const id = req.params.id;
    await userModel.findByIdAndDelete(id);
    res.send("user deleted, ID: " + id);
  } catch (error) {
    console.log(error.message);
  }
}

module.exports = {
  regiter,
  login,
  retriveUSers,
  retriveOneUser,
  editUser,
  deleteUser,
};
