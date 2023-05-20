const express = require("express");
const {
  getAllUsers,
  getUserByEmail,
  addUser,
  updateUserByEmail,
} = require("../../controllers/Users/UsersController");
const usersRouter = express.Router();

usersRouter.get("/getAllUsers", getAllUsers);
usersRouter.get("/getUserByEmail", getUserByEmail);
usersRouter.post("/addUser", addUser);
usersRouter.put("/updateUserByEmail", updateUserByEmail);

module.exports = usersRouter;
