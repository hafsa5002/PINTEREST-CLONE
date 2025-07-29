const express =require('express');
const router=express.Router();
const {registerUser ,logIn}=require('../controllers/userController');


//register route
router.post('/register', registerUser);
//logIN route
router.post('/login', logIn);

module.exports=router
