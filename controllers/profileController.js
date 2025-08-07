const pinModel =require('../models/pinModel.js');
const boardModel=require('../models/boardModel.js')
const getProfilePage = async (req, res) => {
  try {
    const userId = req.user.id;

    const pins = await pinModel.find({ createdBy: userId }) // filter by logged-in user
      .populate('createdBy', 'username') // optional
      .sort({ createdAt: -1 }); // latest first


    const boards = await boardModel.find({ owner: userId }) // filter by logged-in user
      .populate('owner', 'username') // optional
      .sort({ createdAt: -1 }); // latest first


    res.render('profilepage', { user:req.user ,pins,boards }); // render with filtered pins
  } catch (error) {
    console.error('Error fetching user pins:', error.message);
    res.status(500).send('Server Error');
  }
};



module.exports={getProfilePage}