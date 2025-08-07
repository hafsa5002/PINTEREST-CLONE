const boardModel=require('../models/boardModel');
const userModel =require('../models/userModel');




// controllers/boardController.js
const createBoard = async (req, res) => {
  try {
    const { name, description } = req.body;

    // Validate required fields
    if (!name || !description ) {
      return res.status(400).json({
        success: false,
        message: 'name and description are required.',
      });
    }
    // Create pin
    const newBoard = await boardModel.create({
  name,
  description,
  owner: req.user._id,
});

    // Add pin to user's list
    await userModel.findByIdAndUpdate(
      req.user._id,
      { $push: { boards: newBoard._id } },
      { new: true }
    );

  return res.redirect('/pinterest/profile');

    
  } catch (err) {
    console.error('Error creating board:', err.message);
    return res.status(500).json({
      success: false,
      message: 'Server error. Please try again later.',
    });
  }
};

const addPinToBoard = async (req, res) => {
  const {pinId } = req.params;
  const {boardId}= req.body;
  console.log(boardId)
  try {
    const board = await boardModel.findById(boardId);

    if (!board) {
      return res.status(404).json({ success: false, message: 'Board not found' });
    }

    // Optional: Prevent adding the same pin twice
    if (board.pins.includes(pinId)) {
      return res.status(400).json({ success: false, message: 'Pin already added to this board' });
    }

    board.pins.push(pinId);
    await board.save();

    return res.status(200).json({ success: true, message: 'Pin added to board' });
  } catch (err) {
    console.error('Error adding pin to board:', err.message);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};













const renderBoardForm=(req,res)=>{
res.render('createBoard')
}

module.exports={createBoard, renderBoardForm,addPinToBoard}