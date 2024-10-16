const express = require('express');
const { 
    createRestaurant, 
    getRestaurantsByProximity, 
    getRestaurantsInRange,
    updateRestaurant,
    deleteRestaurant, // Import the updateRestaurant function
} = require('../controllers/restaurantController');

const router = express.Router();

// Create a new restaurant
router.post('/', createRestaurant);

// Get restaurants by proximity
router.post('/proximity', getRestaurantsByProximity);

// Get restaurants within a range
router.post('/range', getRestaurantsInRange);

// Update a restaurant
router.put('/:restaurantId', updateRestaurant); // Add the update route


//delelte
router.delete('/:restaurantId', deleteRestaurant);
module.exports = router;
