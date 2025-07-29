const express =require('express');
const router=express.Router();
const {registerUser ,logIn, logOut}=require('../controllers/userController');


//register route
router.post('/register', registerUser);
//logIN route
router.post('/login', logIn);

//logout route
router.post('/logout', logOut);

module.exports=router
