// Import the necessary libraries
const mongoose = require('mongoose'); // Library for MongoDB object modeling
const bcrypt = require('bcryptjs'); // Library for hashing passwords

// Define the user schema
const userSchema = new mongoose.Schema({
  // Username field - required and must be unique
  username: { type: String, required: true, unique: true },
  
  // Password field - required
  password: { type: String, required: true },
});

// Pre-save hook to hash the password before saving to the database
userSchema.pre('save', async function (next) {
  // Check if the password is modified (not hashed previously)
  if (!this.isModified('password')) return next();
  
  // Hash the password with a salt round of 10
  this.password = await bcrypt.hash(this.password, 10);
  
  // Proceed to the next middleware
  next();
});

// Export the User model based on the user schema
module.exports = mongoose.model('User', userSchema);
