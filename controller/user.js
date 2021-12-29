const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { baseModelName } = require("../models/User");
const jw = require("jsonwebtoken");

const newUser = async (req, res) => {
  try {
    const { password, email } = req.body;
    //  let user = await User.find({ email });
    let user = new User(req.body);
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);
    await user.save();
    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    return res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById({ _id: id });
    return res.status(200).json({
      success: true,
      user
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
}

const signUp = async (req, res) => {
  try {
    const { password, email } = req.body;
    let user = new User(req.body);
    const salt = bcrypt.genSaltSync(10);
    user.password = bcrypt.hashSync(password, salt);
    await user.save();

    const token = jw.sign({ id: user._id }, "SECRET", {
      expiresIn: 86400, // 24H
    });
    return res.status(200).json({
      success: true,
      user,
      token
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

const signIn = async (req, res) => {
  res.json("signIn");
};

const updateUser = async (req, res) => {
  try {
    const { email } = req.params;
    const user = req.body;
    let result = await User.findOne({ email: email });
    console.log(result);
    result = await User.findOneAndUpdate({ email: email }, {
      $set: {
        name: user.name || result.name,
        lastName: user.lastName || result.lastName,
        city: user.city || result.city,
        address: user.address || result.address,
        phone: user.phone || result.phone
      }
    });
    return res.status(200).json({
      success: true,
      user: result
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
}

module.exports = {
  newUser,
  getUsers,
  signUp,
  signIn,
  updateUser,
  getUser
};
