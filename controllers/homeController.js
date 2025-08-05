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

const savePost = async (req, res) => {
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



module.exports={getHomePage, savePost}