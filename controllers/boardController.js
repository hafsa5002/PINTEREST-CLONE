const boardModel=require('../models/boardModel');
const userModel =require('../models/userModel');




// controllers/boardController.js
const createBoard = async (req, res) => {
  try {
    const { name, description } = req.body;

    // Validate required fields
    if (!name || !description || !req.file) {
      return res.status(400).json({
        success: false,
        message: 'Name, description, and image are required.',
      });
    }

    // Check if board already exists for this user
    const existingBoard = await boardModel.findOne({ name, owner: req.user._id });
    if (existingBoard) {
      return res.status(409).json({
        success: false,
        message: 'A board with this name already exists.',
      });
    }
    // Create the board
    const newBoard = await boardModel.create({
      name,
      description,
      image: {
        url: req.file.path,           // Cloudinary image URL
        filename: req.file.filename,  // Cloudinary public_id
      },
      owner: req.user._id,
    });

    // Add board to user's boards list
    await userModel.findByIdAndUpdate(
      req.user._id,
      { $push: { boards: newBoard._id } },
      { new: true }
    );

    return res.redirect('/pinterest/home');

  } catch (err) {
    console.error('Error creating board:', err);
    return res.status(500).json({
      success: false,
      message: 'Server error. Please try again later.',
    });
  }
};

const pinRender = async (req, res) => {
  try {
    const id=req.params.boardId;
     // get name from URL
    const board = await boardModel
      .findOne({ _id : id, owner: req.user._id })
      .populate('pins'); // assumes pins is an array of ObjectIds

    if (!board) {
      return res.status(404).send('Board not found');
    }

    res.render('boardPosts.ejs', { board });
  } catch (err) {
    console.error('Error rendering board pins:', err);
    res.status(500).send('Server error');
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


const deleteBoard = async (req, res) => {
  try {
    await boardModel.findByIdAndDelete(req.params.id);
    res.redirect('/pinterest/profile');
  } catch (error) {
    console.error(error);
    res.status(500).send("Error deleting Board");
  }
};

module.exports={createBoard, renderBoardForm,addPinToBoard, pinRender, deleteBoard}