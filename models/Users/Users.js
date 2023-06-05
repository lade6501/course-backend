const mongoose = require("mongoose");
const valid = require("validator");

const usersSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: [5, "name should be of at least 5 characters"],
    maxLength: [15, "name cann't be more than 15 characters"],
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return valid.isEmail(v);
      },
      message: (props) => `${props.value} is not a valid email!`,
    },
  },
  password: { type: String, required: true },
  phone: {
    type: Number,
    required: true,
    validate: {
      validator: function (v) {
        return /^[6-9]\d{9}$/.test(v);
      },
      message: (props) => `${props.value} is not a valid phone number!`,
    },
  },
  bioInfo: {
    type: String,
    default: "Some bio",
    maxLength: [20, "bio cann't be greater than 20 charecters"],
  },
});

module.exports = usersSchema;
