const pinModel =require('../models/pinModel.js')
const userModel=require('../models/userModel.js')

const getHomePage = async (req, res) => {
  try {
    const pins = await pinModel.find()
      .populate('createdBy', 'username') // Optional: get creator's name
      .sort({ createdAt: -1 }); // latest first

    res.render('home', { pins }); // pass pins to EJS
  } catch (error) {
    console.error('Error fetching pins:', error.message);
    res.status(500).send('Server Error');
  }
};




module.exports={getHomePage}