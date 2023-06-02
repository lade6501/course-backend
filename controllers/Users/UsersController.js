const connectToDb = require("../../config/db");
const usersSchema = require("../../models/Users/Users");

const con = connectToDb("users");
const Users = con.model("users", usersSchema);
con.on("open", () => {
  console.log(`✔  User Database Started`);
});

const getAllUsers = async (req, res, next) => {
  try {
    const users = await Users.find({});
    return res.status(200).json(users);
  } catch (error) {
    res.json({ message: error }).status(500);
  }
};

const getUserByEmail = async (req, res, next) => {
  const { email } = req.query;
  try {
    const user = await Users.find({ email: email });
    return res.status(200).json(user);
  } catch (error) {
    res.json({ message: error }).status(500);
  }
};

const addUser = async (req, res, next) => {
  const { user } = req.body;
  console.log(user);
  const userObj = new Users(user);
  try {
    const user = await userObj.save();
    res.status(200).json(user);
  } catch (error) {
    res.json({ message: error }).status(500);
  }
};

const updateUserByEmail = async (req, res, next) => {
  try {
    res.send(`Hello Courses ${id}`);
  } catch (error) {
    res.json({ message: error }).status(500);
  }
};

module.exports = { getAllUsers, getUserByEmail, addUser, updateUserByEmail };
