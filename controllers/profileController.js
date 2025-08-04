const pinModel =require('../models/pinModel.js');
const getProfilePage = async (req, res) => {
  try {
    const userId = req.user.id;

    const pins = await pinModel.find({ createdBy: userId }) // filter by logged-in user
      .populate('createdBy', 'username') // optional
      .sort({ createdAt: -1 }); // latest first

    res.render('profilepage', { user:req.user ,pins }); // render with filtered pins
  } catch (error) {
    console.error('Error fetching user pins:', error.message);
    res.status(500).send('Server Error');
  }
};



module.exports={getProfilePage}