const express = require("express");
const {
  getAllCourses,
  getCourseById,
  saveCourse,
} = require("../../controllers/Courses/CoursesController");

const coursesRouter = express.Router();

coursesRouter.get("/allCourses", getAllCourses);
coursesRouter.get("/:id", getCourseById);
coursesRouter.post("/", saveCourse);

module.exports = coursesRouter;
