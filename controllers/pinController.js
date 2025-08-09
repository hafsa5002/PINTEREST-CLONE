// controllers/pinController.js
const pinModel = require('../models/pinModel');
const userModel = require('../models/userModel');
const boardModel=require('../models/boardModel')

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

  return res.redirect('/pinterest/home');

    
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

    const user =await userModel.findById(req.user._id);
     const userBoards = await boardModel.find({ owner: req.user._id });

    // Step 3: Pass pin details to EJS page
    res.render('pinDetail', { pin ,user,boards: userBoards});
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
}

const savedPins = async (req, res) => {
  try {
    // Populate both 'saved' and 'boards' fields in one go
    let user = await userModel.findById(req.user._id)
      .populate('saved')
      .populate('boards');

    // Render the page with populated saved posts and boards
    res.render('savedpage', {
      user,
      savedPosts: user.saved,
      boards: user.boards
    });
  } catch (err) {
    console.error(err);
    res.redirect('/error');
  }
};





const unsavePin= async (req, res) => {
  try {
    const pinId = req.params.id;
    const userId = req.user._id; // Assuming Passport.js is giving you req.user

    // Remove the pin from user's saved list
    await userModel.findByIdAndUpdate(
      userId,
      { $pull: { saved: pinId } } // removes the pinId from saved array
    );

    res.redirect('/pinterest/pin/saved'); // Go back to the same page
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error while unsaving the pin');
  }
}


const savePin = async (req, res) => {
  try {
    const currentPost = await pinModel.findById(req.params.id);
    if (!currentPost) return res.status(404).json({ message: 'Post not found' });

    const user = await userModel.findById(req.user._id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Avoid duplicate saves
    if (user.saved.includes(currentPost._id)) {
      return res.status(400).json({ message: 'Post already saved' });
    }

    user.saved.push(currentPost._id);
    await user.save();

    res.status(200).json({ message: 'Post saved successfully' });
  } catch (error) {
    console.error('Save Post Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const edit = async (req, res) => {
    try {
        const user = req.user; // safely assign the logged-in user
        res.render('editProfile', { user });
    } catch (err) {
        console.error(err);
        res.status(500).send("Something went wrong");
    }
};


const editData = async (req, res) => {
  try {
    const { name, username, email, bio } = req.body;

    // Build the update object
    const updateData = {
      name,
      username,
      email,
      bio
    };

    // If a new file is uploaded, set the profileImage
    if (req.file) {
      updateData.profileImage = {
        url: req.file.path,        // Cloudinary URL
        filename: req.file.filename // Cloudinary public_id
      };
    }

    // Update in MongoDB
    const updatedUser = await userModel.findOneAndUpdate(
      { _id: req.user._id },
      updateData,
      { new: true, runValidators: true }
    );


    res.redirect('/pinterest/profile');

  } catch (err) {
    console.error(err);
    res.status(500).send('Error updating profile');
  }
};

const deletePin = async (req, res) => {
  try {
    await pinModel.findByIdAndDelete(req.params.id);
    res.redirect('/pinterest/profile');
  } catch (error) {
    console.error(error);
    res.status(500).send("Error deleting pin");
  }
};




module.exports = { createPin, pinDetail ,savedPins, savePin, unsavePin , edit ,editData ,deletePin};
