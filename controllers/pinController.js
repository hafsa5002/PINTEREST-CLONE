// controllers/pinController.js
const Pin = require('../models/pinModel');
const User = require('../models/userModel');

/**
 * @desc    Create a new pin
 * @route   POST /api/pins/create
 * @access  Private
 */
const createPin = async (req, res) => {
  try {
    const { title, description, category } = req.body;

    // Validate required fields
    if (!title || !category || !req.file) {
      return res.status(400).json({
        success: false,
        message: 'Title, category, and image are required.',
      });
    }
    // Create pin
    const newPin = await Pin.create({
  title,
  description,
  image: {
    url: req.file.path,           // Cloudinary image URL
    filename: req.file.filename,  // Cloudinary public_id
  },
  category,
  createdBy: req.user._id,
});

    // Add pin to user's list
    await User.findByIdAndUpdate(
      req.user._id,
      { $push: { pins: newPin._id } },
      { new: true }
    );

  return res.redirect('/user/home');

    
  } catch (err) {
    console.error('Error creating pin:', err.message);
    return res.status(500).json({
      success: false,
      message: 'Server error. Please try again later.',
    });
  }
};

module.exports = { createPin };
