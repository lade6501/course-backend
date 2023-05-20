const mongoose = require("mongoose");
require("dotenv").config();

courses_uri = process.env.COURSES_MONGO_URI;
users_uri = process.env.USERS_MONGO_URI;

const connectToDb = (db) => {
  const uri = db === "courses" ? courses_uri : users_uri;

  const connection = mongoose.createConnection(uri, { useNewUrlParser: true });
  return connection;
};

module.exports = connectToDb;
