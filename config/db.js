const mongoose = require("mongoose");

dynamic mongo uri getting from docker env variable
const courses_uri = `${process.env.mongouri}/courses`;
const users_uri = `${process.env.mongouri}/users`;


const connectToDb = (db) => {
  const uri = db === "courses" ? courses_uri : users_uri;

  const connection = mongoose.createConnection(uri, { useNewUrlParser: true });
  return connection;
};

module.exports = connectToDb;
