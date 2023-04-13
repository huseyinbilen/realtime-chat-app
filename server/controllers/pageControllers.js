const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const User = require("../models/User");

exports.register = async (req, res) => {
  try {
    const user = await User.create(req.body);
    user.password = await argon2.hash(user.password);
    user.save();
    res.status(200).json({
      status: "success",
      desc: "User Created",
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};

exports.login = async (req, res, next) => {
  let { email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch {
    const error = new Error("User not found.");
    return next(error);
  }

  if (!(await argon2.verify(existingUser.password, password))) {
    return next(error);
  }
  try {
    //Creating jwt token
    token = jwt.sign(
      { id: existingUser.id, email: existingUser.email },
      process.env.TOKEN_SECRET,
      { expiresIn: "1h" }
    );
  } catch (err) {
    console.log(err);
    const error = new Error("Error! Something went wrong.");
    return next(error);
  }

  res.status(200).json({
    success: true,
    data: {
      userId: existingUser.id,
      email: existingUser.email,
      token: token,
    },
  });
};

exports.friendsAdd = async (req, res) => {
    try {
        let user = await User.findById(req.user.id);
        user.friends.push(req.body.friends);
        user.save();
        res.status(200).json({
            status: "success",
            description: "Friends Added"
        });
    } catch (error) {
        res.status(400).json({
            status: "fail",
            error,
        })
    }
}