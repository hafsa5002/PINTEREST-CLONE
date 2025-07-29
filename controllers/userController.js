const userModel = require('../models/userModel'); 

const registerUser = async (req, res) => {
  const {
    name,
    username,
    email,
    password,
    profileImage,
    bio,
    pins,
    role
  } = req.body;

  try {
    // Check if user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'User already exists with this email'
      });
    }

    // Create new user (password is hashed via schema pre-save)
    const newUser = await userModel.create({
      name,
      username,
      email,
      password,
      profileImage,
      bio,
      pins,
      role: role || 'user'  // default to 'user' if role not provided
    });

    return res.status(201).json({
      success: true,
      message: 'User registered successfully',
      user: {
        _id: newUser._id,
        name: newUser.name,
        username: newUser.username,
        email: newUser.email,
        role: newUser.role
      }
    });
  } catch (error) {
    console.error('Registration Error:');
    return res.status(500).json({
      success: false,
      message: 'Something went wrong. Please try again later.'
    });
  }
};

module.exports = { registerUser };
