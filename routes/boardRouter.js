const express =require('express');
const { createBoard, renderBoardForm,addPinToBoard } = require('../controllers/boardController');
const upload=require('../middlewares/multer');
const { isLoggedIn } = require('../middlewares/isLoggedIn');
const router =express.Router();

router.get('/create',isLoggedIn, renderBoardForm)

router.post('/create',isLoggedIn, upload.single('file'),createBoard)

// routes/pinterestRoutes.js
router.post('/add-pin-to-board/:pinId', isLoggedIn, addPinToBoard);


module.exports=router