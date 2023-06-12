const express = require('express');
const router = express.Router();
const User = require('../models/user'); // Assuming you have a User model defined

router.post('/api/users', async (req, res) => {
  try {
    const userData = req.body;

    // Create a new User instance with the provided data
    const newUser = new User(userData);

    // Save the new user to the database
    const savedUser = await newUser.save();

    res.status(201).json(savedUser);
  } catch (error) {
    console.error('Error inserting data:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});


router.get('/api/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error('Error retrieving data:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});


router.delete('/api/users/:id', async (req, res) => {
  try {
    const userId = req.params.id;

    // Delete the user by their ID
    await User.findByIdAndDelete(userId);

    res.status(204).json();
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});


router.put('/api/users/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const updatedUserData = req.body;

    // Update the user by their ID
    const updatedUser = await User.findByIdAndUpdate(userId, updatedUserData, { new: true });

    res.json(updatedUser);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

module.exports = router;