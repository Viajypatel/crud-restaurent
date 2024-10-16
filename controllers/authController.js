// Import necessary libraries
const jwt = require('jsonwebtoken'); // Library for generating JWTs
const User = require('../models/userModel'); // User model for interacting with the database
const bcrypt = require('bcrypt'); // Library for hashing passwords

// Controller function for user registration
exports.register = async (req, res) => {
  try {
    // Create a new user instance using the data from the request body
    const user = new User(req.body);
    
    // Save the user to the database
    await user.save();
    
    // Send a success response if the user is registered successfully
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    // Send an error response if there was a problem during registration
    res.status(400).json({ error: err.message });
  }
};

// Controller function for user login
exports.login = async (req, res) => {
  // Destructure username and password from the request body
  const { username, password } = req.body;
  
  // Find the user by username in the database
  const user = await User.findOne({ username });
  
  // If the user is not found, return a 404 error
  if (!user) return res.status(404).json({ error: 'User not found' });

  // Compare the provided password with the hashed password stored in the database
  const isMatch = await bcrypt.compare(password, user.password);
  
  // If the passwords do not match, return a 400 error
  if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

  // Generate a JWT token for the authenticated user
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  
  // Send the token in the response
  res.json({ token });
};
