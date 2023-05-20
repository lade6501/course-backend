const express = require("express");
const coursesRouter = require("../routes/Courses/courses");
const usersRouter = require("../routes/Users/users");

const setRoutes = (server) => {
  server.get("/", (req, res) => {
    res.send("Welcome to the APP");
  });

  server.use("/courses", coursesRouter);
  server.use("/user", usersRouter);
};

module.exports = setRoutes;
