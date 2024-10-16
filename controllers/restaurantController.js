const Restaurant = require('../models/restaurantModel');

// Create a new restaurant
exports.createRestaurant = async (req, res) => {
  try {
    const { name, description, coordinates } = req.body;

    if (!coordinates || coordinates.length !== 2) {
      return res.status(400).json({ message: 'Coordinates must contain [longitude, latitude].' });
    }

    const restaurant = new Restaurant({
      name,
      description,
      location: {
        type: 'Point',
        coordinates, // [longitude, latitude]
      },
    });

    await restaurant.save();
    res.status(201).json(restaurant);
  } catch (err) {
    console.error('Error creating restaurant:', err);
    res.status(400).json({ error: err.message });
  }
};

// Get restaurants within a certain radius from given coordinates
exports.getRestaurantsByProximity = async (req, res) => {
  try {
    const { latitude, longitude, radius = 5000 } = req.body;

    if (!latitude || !longitude) {
      return res.status(400).json({ message: 'Latitude and longitude are required.' });
    }

    const restaurants = await Restaurant.find({
      location: {
        $near: {
          $geometry: { type: 'Point', coordinates: [longitude, latitude] },
          $maxDistance: Number(radius), // Radius in meters
        },
      },
    });

    if (!restaurants.length) {
      return res.status(404).json({ message: 'No restaurants found within the specified radius.' });
    }

    res.json(restaurants);
  } catch (error) {
    console.error('Error fetching restaurants by proximity:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Get restaurants within a minimum and maximum range
exports.getRestaurantsInRange = async (req, res) => {
  try {
    const { latitude, longitude, minimumDistance = 0, maximumDistance = 5000 } = req.body;

    console.log('Input parameters:', { latitude, longitude, minimumDistance, maximumDistance });

    if (!latitude || !longitude) {
      return res.status(400).json({ message: 'Latitude and longitude are required.' });
    }

    const restaurants = await Restaurant.find({
      location: {
        $near: {
          $geometry: { type: 'Point', coordinates: [longitude, latitude] },
          $minDistance: Number(minimumDistance),
          $maxDistance: Number(maximumDistance),
        },
      },
    });

    console.log('Found restaurants:', restaurants);

    if (!restaurants.length) {
      return res.status(404).json({ message: 'No restaurants found in the specified range.' });
    }

    res.json(restaurants);
  } catch (error) {
    console.error('Error fetching restaurants by range:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

///update
exports.updateRestaurant = async (req, res) => {
  const { restaurantId } = req.params; // Extract restaurant ID from the request parameters
  const { description } = req.body; // Extract new description from the request body

  try {
    const updatedRestaurant = await Restaurant.findByIdAndUpdate(
      restaurantId,
      { description }, // Update the description
      { new: true, runValidators: true } // Return the updated document and run validators
    );

    if (!updatedRestaurant) {
      return res.status(404).json({ message: 'Restaurant not found.' });
    }

    res.json(updatedRestaurant);
  } catch (error) {
    console.error('Error updating restaurant:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Delete a restaurant
exports.deleteRestaurant = async (req, res) => {
  const { restaurantId } = req.params; // Get the restaurant ID from the URL parameters

  try {
    // Find the restaurant by ID and remove it
    const deletedRestaurant = await Restaurant.findByIdAndDelete(restaurantId);

    if (!deletedRestaurant) {
      return res.status(404).json({ message: 'Restaurant not found.' });
    }

    res.json({ message: 'Restaurant deleted successfully.' });
  } catch (error) {
    console.error('Error deleting restaurant:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};