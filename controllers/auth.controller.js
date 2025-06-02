const bcrypt = require("bcrypt");
const Auth = require("../module/auth.module");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const registerUser = async (req, res) => {
  const { name, email, password } = req.body.userData;

  try {
    // check if user is alredy present in DB
    const existingUser = await Auth.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "User alredy exist with this email",
      });
    }

    // generate a salt for hashing
    const salt = await bcrypt.genSalt(10);
    // generate a hased password
    const hasedPassword = await bcrypt.hash(password, salt);

    // save new user
    const newUser = new Auth({
      name,
      email,
      password: hasedPassword,
    });

    await newUser.save();

    return res.status(201).json({
      message: "User registered Successfully",
      user: newUser,
    });
  } catch (error) {
    console.error("Registration Error:", error);
    res.status(500).json({ message: "Server Error. Please try again." });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    // find the user in DB
    const User = await Auth.findOne({ email }).select(-"password");

    // check user is present or not in DB
    if (!User) {
      return res.status(404).json({
        message: "User Not Found",
      });
    }

    // if user present generate a json token
    const token = jwt.sign({ id: User._id }, process.env.SECREAT_KEY);

    return res.status(200).json({
      message: "User logined Successfully",
      user: User,
      token,
    });
  } catch (error) {
    console.error("Registration Error:", error);
    res.status(500).json({ message: "Server Error. Please try again." });
  }
};

module.exports = { registerUser, loginUser };
