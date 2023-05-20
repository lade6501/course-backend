const connectToDb = require("../../config/db");
const coursesSchema = require("../../models/Courses/Courses");

const con = connectToDb("courses");
const Courses = con.model("courses", coursesSchema);
con.on("open", () => {
  console.log(`✔  Course Database Started`);
});

const getAllCourses = async (req, res, next) => {
  try {
    // const response = await ;
    res.send("Hello Courses");
  } catch (error) {}
};

const getCourseById = async (req, res, next) => {
  try {
    // const response = await ;
    const { id } = req.params;
    res.send(`Hello Courses ${id}`);
  } catch (error) {}
};

const saveCourse = async (req, res, next) => {
  const courseObj = new Courses({
    name: req.body.name,
    description: req.body.description,
    rating: req.body.rating,
    image: req.body.image,
  });
  try {
    // const response = await ;
    const course = await courseObj.save();
    res.status(200).json(course);
  } catch (error) {
    res.json({ message: error }).status(500);
  }
};
module.exports = { getAllCourses, getCourseById, saveCourse };
