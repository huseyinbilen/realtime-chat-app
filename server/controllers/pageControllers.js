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
            description: "Friend Added"
        });
    } catch (error) {
        res.status(400).json({
            status: "fail",
            error,
        })
    }
}

exports.friendsRemove = async (req, res) => {
    try {
        let user = await User.findById(req.user.id);
        user.friends.splice(user.friends.indexOf(req.body.friends), 1);
        user.save();
        res.status(200).json({
            status: "success",
            description: "Friend Removed"
        });
    } catch (error) {
        res.status(400).json({
            status: "fail",
            error,
        })
    }
}

exports.friendsGet = async (req, res) => {
  try {
    let user = await User.findById(req.user.id);
    let friends = [];
    for(let i = 0; i < user.friends.length; i++) {
      let friend = await User.findById(user.friends[i]);
      let temp = {
        id: friend.id,
        username: friend.username
      }
      friends.push(temp);
    }
    res.status(200).json({
      friends
    })
  } catch (error) {
      res.status(400).json({
        status: "fail",
        error
      })
  }
}

exports.getAllUser = async (req, res) => {
  try {
    let allUsers = await User.find();
    let users = [];
    for(let i = 0; i < allUsers.length; i++) {
      let temp = {
        id: allUsers[i].id,
        username: allUsers[i].username
      }
      users.push(temp);
    }
    res.status(200).json({
      users
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error
    })
  }
}