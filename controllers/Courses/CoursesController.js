const connectToDb = require("../../config/db");
const coursesSchema = require("../../models/Courses/Courses");

const con = connectToDb("courses");
const Courses = con.model("courses", coursesSchema);
con.on("open", () => {
  console.log(`✔  Course Database Started`);
});

//Controller for getting all courses from db
const getAllCourses = async (req, res, next) => {
  try {
    const courses = await Courses.find({});
    return res.status(200).json(courses);
  } catch (error) {
    return res.status(400).json(error);
  }
};

//Controller for getting course from db with specified id
const getCourseById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const courses = await Courses.find({ _id: id });
    return res.status(200).json(courses);
  } catch (error) {
    return res.status(400).json(error);
  }
};

//Controller for adding a new course to db
const saveCourse = async (req, res, next) => {
  const courseObj = new Courses({
    name: req.body.name,
    description: req.body.description,
    rating: req.body.rating,
    image: req.body.image,
  });
  try {
    const course = await courseObj.save();
    res.status(201).json(course);
  } catch (error) {
    res.json({ message: error }).status(400);
  }
};
module.exports = { getAllCourses, getCourseById, saveCourse };
