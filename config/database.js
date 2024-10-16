// Import the mongoose library for MongoDB interactions
const mongoose = require('mongoose');

// Define an asynchronous function to connect to the MongoDB database
const connectDB = async () => {
  try {
    // Attempt to connect to the database using the URI stored in environment variables
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected...'); // Log a success message if the connection is established
  } catch (err) {
    // If an error occurs during the connection attempt, log the error message
    console.error(err.message);
    // Exit the process with a failure code (1) to indicate an error
    process.exit(1);
  }
};

// Export the connectDB function so it can be used in other modules
module.exports = connectDB;
