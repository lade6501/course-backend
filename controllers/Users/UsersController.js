const connectToDb = require("../../config/db");
const usersSchema = require("../../models/Users/Users");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const JWTSecretKey = process.env.jwtsecret || "course-backend";
const con = connectToDb("users");
const Users = con.model("users", usersSchema);
con.on("open", () => {
  console.log(`✔  User Database Started`);
});

const getAllUsers = async (req, res, next) => {
  try {
    const users = await Users.find({});
    return res.status(200).json(users);
  } catch (error) {
    res.json({ message: error }).status(500);
  }
};

const getUserByEmail = async (req, res, next) => {
  const { email } = req.query;
  try {
    const user = await Users.find({ email: email });
    return res.status(200).json(user);
  } catch (error) {
    res.json({ message: error }).status(500);
  }
};

const addUser = async (req, res, next) => {
  const { user } = req.body;

  //Generating hash using 10 round salt
  const saltRounds = 10;
  const hash = await bcrypt.hash(user.password, saltRounds);
  user["password"] = hash;

  const userObj = new Users(user);
  try {
    const user = await userObj.save();
    res.status(200).json({ message: "User added successfully" });
  } catch (error) {
    res.json({ message: error }).status(500);
  }
};

const updateUserByEmail = async (req, res, next) => {
  let { email } = req.query;
  let { name, phone, bioInfo, isNewEmail, newEmail } = req.body;
  console.log(isNewEmail, newEmail);
  try {
    const user = await Users.find({ email: email });
    name = name || user[0].name;
    phone = phone || user[0].phone;
    bioInfo = bioInfo || user[0].bioInfo;

    if (isNewEmail) {
      const updatedUser = await Users.updateOne(
        { email },
        { $set: { name, phone, bioInfo, email: newEmail } }
      );
    }

    const updatedUser = await Users.updateOne(
      { email },
      { $set: { name, phone, bioInfo } }
    );
    return res.status(200).json({ message: "Updated Successfully" });
  } catch (error) {
    res.status(400).json({ error });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await Users.findOne({ email });
    if (user) {
      const result = await bcrypt.compare(password, user.password);
      if (result) {
        const token = JWT.sign({ user }, JWTSecretKey);
        const { name, email, phone, bioInfo } = user;
        const userObj = {
          name,
          email,
          phone,
          bioInfo,
        };
        return res
          .status(200)
          .json({ message: "Login successful", token, userObj });
      } else {
        return res.status(200).json({ error: "Invalid Password" });
      }
    }

    return res.status(200).json({
      error: `User not found with given email ${email} please check `,
    });
  } catch (error) {
    return res.status(400).json(error);
  }
};
module.exports = {
  getAllUsers,
  getUserByEmail,
  addUser,
  updateUserByEmail,
  login,
};
