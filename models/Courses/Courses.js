const mongoose = require("mongoose");

const coursesSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  rating: { type: Number, required: true },
  image: { type: String, required: true },
});

module.exports = coursesSchema;
