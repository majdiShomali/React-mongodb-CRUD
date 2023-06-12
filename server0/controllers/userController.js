// 1- calling the model
const User = require("../models/user");

const allUsers = (req, res) => {
  // select * from users  =     find();
  User.find()
    .then((data) => {
      // console.log(data);
      res.status(200).json(data);
    })
    .catch((error) => {
      errorHandler(error, req, res);
    });
};

const oneUser = (req, res) => {
  // User.save .....
};
const newUser = (req, res) => {};

const updateUser = (req, res) => {};

const deleteUser = (req, res) => {};

module.exports = {
  allUsers,
  newUser,
  oneUser,
  updateUser,
  deleteUser,
};
