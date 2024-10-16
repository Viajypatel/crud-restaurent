# Restaurant Management API

This is a RESTful API for managing restaurants, allowing users to perform CRUD operations, user authentication, and restaurant searches based on proximity and range.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [License](#license)

## Features

- User registration and login with JWT authentication.
- Create, read, update, and delete restaurants.
- Search for restaurants within a certain radius from a given location.
- Search for restaurants within a specified minimum and maximum distance.

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Tokens (JWT)
- Bcrypt for password hashing
- CORS for cross-origin requests

## Getting Started

Follow these steps to set up and run the application locally.

### Prerequisites

Make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (v12 or higher)
- [MongoDB](https://www.mongodb.com/) (You can use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) for a cloud-based solution)

### Installation

1. **Clone the repository**:

   ```bash
   git clone <repository-url>
   cd restaurant-management-api
npm install
MONGO_URI=<your-mongodb-connection-string>
JWT_SECRET=<your-secret-key>
PORT=5000
Replace <your-mongodb-connection-string> with your actual MongoDB connection string.
Set <your-secret-key> to a strong, random string to use as your JWT secret.

npm start

he server will run on http://localhost:5000 by default.

To test the API, you can use tools like Postman or Thunder Client.

API Endpoints
Authentication

POST /api/auth/register


Request Body: { "username": "string", "password": "string" }
Response: {"message": "User registered successfully"}
POST /api/auth/login

Request Body: { "username": "string", "password": "string" }
Response: {"token": "JWT_TOKEN"}
Restaurants
POST /api/restaurants


Request Body: { "name": "string", "description": "string", "coordinates": [longitude, latitude] }
Response: {"_id": "someMongoId", "name": "string", "description": "string", "location": {"type": "Point", "coordinates": [longitude, latitude]}}
GET /api/restaurants/proximity


Request Body: { "latitude": latitude, "longitude": longitude, "radius": 5000 }
Response: [{...}, {...}] (Array of restaurants)
GET /api/restaurants/range


Request Body: { "latitude": latitude, "longitude": longitude, "minimumDistance": 0, "maximumDistance": 5000 }
Response: [{...}, {...}] (Array of restaurants)
PUT /api/restaurants/<restaurantId>


Request Body: { "description": "Updated description" }
Response: {"_id": "someMongoId", "name": "Restaurant A", "description": "Updated description", ...}
DELETE /api/restaurants/<restaurantId>

Response: {"message": "Restaurant deleted successfully"}