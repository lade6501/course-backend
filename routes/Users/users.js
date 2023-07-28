const express = require("express");
const {
  getAllUsers,
  getUserByEmail,
  addUser,
  updateUserByEmail,
  login,
  passwordChange,
  addCourse,
} = require("../../controllers/Users/UsersController");
const usersRouter = express.Router();

usersRouter.get("/getAllUsers", getAllUsers);
usersRouter.get("/getUserByEmail", getUserByEmail);
usersRouter.post("/addUser", addUser);
usersRouter.put("/updateUserByEmail", updateUserByEmail);
usersRouter.post("/login", login);
usersRouter.put("/passwordChange", passwordChange);
usersRouter.put("/addCourse", addCourse);

module.exports = usersRouter;
