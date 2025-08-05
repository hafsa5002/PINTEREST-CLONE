// controllers/pinController.js
const pinModel = require('../models/pinModel');
const userModel = require('../models/userModel');

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
    const newPin = await pinModel.create({
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
    await userModel.findByIdAndUpdate(
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


const pinDetail= async (req, res) => {
  try {
    // Step 1: Get the pin ID from the URL
    const pinId = req.params.id;

    // Step 2: Find the pin in the database
    const pin = await pinModel.findById(pinId);

    if (!pin) {
      return res.status(404).send('Pin not found');
    }

    const user =await userModel.findById(req.user._id)

    // Step 3: Pass pin details to EJS page
    res.render('pinDetail', { pin ,user});
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
}

module.exports = { createPin, pinDetail };
