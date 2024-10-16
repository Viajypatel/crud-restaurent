const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    location: {
      type: {
        type: String,
        enum: ['Point'], // Ensure only 'Point' is allowed
        required: true,
      },
      coordinates: {
        type: [Number], // Array of [longitude, latitude]
        required: true,
        validate: {
          validator: function (value) {
            return value.length === 2; // Ensure exactly 2 coordinates
          },
          message: 'Coordinates must have exactly 2 elements [longitude, latitude].',
        },
      },
    },
    ratings: { type: [Number], default: [] },
  },
  { timestamps: true }
);

// Create 2dsphere index on location for geospatial queries
restaurantSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Restaurant', restaurantSchema);
