const express =require('express');
const router=express.Router();
const {registerUser ,logIn, logOut}=require('../controllers/userController');
const { isLoggedIn } = require('../middlewares/isLoggedIn');
const { getHomePage } = require('../controllers/homeController.js');
const{getProfilePage}= require('../controllers/profileController.js');


//register route
router.get('/register',(req,res)=>{
   res.render('signup')
})

//post route to register user
router.post('/register', registerUser);

//logIN route
router.get('/login',(req,res)=>{
    res.render('login')
})
//post route for logIn
router.post('/login',logIn);

//logout route
router.post('/logout', isLoggedIn ,logOut);

//homepage
router.get('/home',isLoggedIn,getHomePage)

//profile route
router.get('/profile',isLoggedIn,getProfilePage);


module.exports=router
