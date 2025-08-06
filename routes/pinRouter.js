const express =require('express');
const router =express.Router();
const{createPin,pinDetail,savedPins,savePin, unsavePin} =require('../controllers/pinController');
const { isLoggedIn } = require('../middlewares/isLoggedIn');
const upload = require('../middlewares/multer.js');


//get route to pin creation ejs page
router.get('/',isLoggedIn,(req,res)=>{
    res.render('pinForm')
});

// post route to create pin
router.post('/',isLoggedIn ,upload.single('file'), createPin);

//get route to pin details page
router.get('/details/:id',isLoggedIn,pinDetail);

//get route to saved ejs page
router.get('/saved', isLoggedIn, savedPins);

//post route to save post
router.post('/save/:id',isLoggedIn, savePin);

//post route to unsave post
router.post('/:id/unsave',isLoggedIn,unsavePin);

module.exports= router