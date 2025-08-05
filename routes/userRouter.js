const express =require('express');
const router=express.Router();
const {registerUser ,logIn, logOut}=require('../controllers/userController');
const { isLoggedIn } = require('../middlewares/isLoggedIn');
const{createPin,pinDetail} =require('../controllers/pinController');
const upload = require('../middlewares/multer.js');
const { getHomePage,savePost } = require('../controllers/homeController.js');
const{getProfilePage}= require('../controllers/profileController.js');
let userModel =require('../models/userModel')


//register route

router.get('/register',(req,res)=>{
   res.render('signup')
})

router.post('/register', registerUser);

//logIN route
router.get('/login',(req,res)=>{
    res.render('login')
})
router.post('/login', logIn);


//logout route
router.post('/logout', logOut);

//homepage
const Pin = require('../models/pinModel');


router.get('/home',getHomePage)

//profile route
router.get('/profile',isLoggedIn,getProfilePage)
//pin creation
router.get('/pin',(req,res)=>{
    res.render('pinForm')
})



// Protect with your auth middleware if needed
router.post('/pin', upload.single('file'), createPin);

//saved route
router.get('/saved', isLoggedIn, async (req, res) => {
    try {
        // Populate the saved posts from the User model
        let user = await userModel.findById(req.user._id).populate('saved');

        // Render the page with populated saved posts
        res.render('savedpage', {
            user,
            savedPosts: user.saved // Pass saved posts separately if you want
        });
    } catch (err) {
        console.error(err);
        res.redirect('/error');
    }
});

router.post('/save/:id',isLoggedIn, savePost);

router.get('/details/:id',isLoggedIn,pinDetail)

module.exports=router
