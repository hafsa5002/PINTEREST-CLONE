// controllers/pinController.js
const Pin = require('../models/pinModel');

/**
 * @desc    Create a new pin
 * @route   POST /api/pins/create
 * @access  Private (requires login)
 */
const createPin = async (req, res) => {
  try {
    const { title, description, image, category } = req.body;

    // Check for required fields
    if (!title || !image || !category) {
      return res.status(400).json({
        success: false,
        message: 'Title, image, and category are required fields.',
      });
    }

    // Optional: Validate image URL if you're using image.url
    if (!image.url || typeof image.url !== 'string') {
      return res.status(400).json({
        success: false,
        message: 'Invalid image URL format.',
      });
    }

    // Make sure the user is authenticated
    if (!req.user || !req.user._id) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized. Please log in to create a pin.',
      });
    }

    // Create and save pin
    const newPin = await Pin.create({
      title,
      description,
      image,
      category,
      createdBy: req.user._id, // Attach current user
    });

    return res.status(201).json({
      success: true,
      message: 'Pin created successfully.',
      data: newPin,
    });

  } catch (err) {
    console.error('Error creating pin:', err.message);
    return res.status(500).json({
      success: false,
      message: 'Server error. Please try again later.',
    });
  }
};

module.exports = {
  createPin,
};
