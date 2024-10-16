// Import the necessary libraries
const express = require('express'); // Framework for building web applications in Node.js
const connectDB = require('./config/database'); // Function to connect to MongoDB
const authRoutes = require('./routes/authRoutes'); // Routes for user authentication
const restaurantRoutes = require('./routes/restaurantRoutes'); // Routes for restaurant management
const dotenv = require('dotenv'); // Library for loading environment variables from a .env file
const cors = require('cors'); // Middleware for enabling Cross-Origin Resource Sharing

// Initialize dotenv to load environment variables
dotenv.config();

// Create an instance of the Express application
const app = express();

// Connect to the MongoDB database
connectDB();

// Middleware to enable CORS for all routes
app.use(cors());

// Middleware to parse incoming JSON requests
app.use(express.json());

// Define the authentication routes
app.use('/api/auth', authRoutes);

// Define the restaurant management routes
app.use('/api/restaurants', restaurantRoutes);

// Define the port for the server to listen on
const PORT = process.env.PORT || 5000;

// Start the server and log a message indicating it's running
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
