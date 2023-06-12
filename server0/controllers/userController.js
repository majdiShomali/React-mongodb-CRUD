// 1- calling the model
const User = require("../models/user");

const allUsers = (req, res) => {
  // select * from users  = find();
  User.find()
    .then((data) => {
      console.log(data);
      res.json(data);
    })
    .catch((error) => {
      errorHandler(error, req, res);
    });
};

const oneUser =  async (req, res) => {
  // User.save .....
  const id = req.params.id;
  const user = await User.find({ _id: id });
  console.log(user);
  res.json(user);
};


const newUser =  async (req, res) => {
    const { firstName, lastName, age } = req.body;
    const user = new User({ firstName: firstName, lastName: lastName, age: age});
    const addUser = await user.save();
    // console.log(addUser);
    res.json(addUser);
};

const updateUser = async (req, res) => {
    const userId  = req.params.id;
    const updatedUserData = req.body;
    const user = await User.findByIdAndUpdate(userId, updatedUserData, { new: true });
    const updatedUser = await user.save();
    res.json(updatedUser);
};

const deleteUser = async (req, res) => {
   const userId = req.params.id;
    await User.findByIdAndDelete(userId);
    res.status(204).json(User);
};

module.exports = {
  allUsers,
  newUser,
  oneUser,
  updateUser,
  deleteUser,
}; 