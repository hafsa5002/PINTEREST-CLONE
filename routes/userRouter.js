const express =require('express');
const router=express.Router();
const {registerUser ,logIn, logOut}=require('../controllers/userController');
const { isLoggedIn } = require('../middlewares/isLoggedIn');
const{createPin} =require('../controllers/pinController');
const upload = require('../middlewares/multer.js');
const { getHomePage } = require('../controllers/homeController.js');
const{getProfilePage}= require('../controllers/profileController.js')


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
router.get('/saved',(req,res)=>{
res.render('savedpage')
})


module.exports=router
