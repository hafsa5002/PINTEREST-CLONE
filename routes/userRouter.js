const express =require('express');
const router=express.Router();
const {registerUser ,logIn, logOut}=require('../controllers/userController');
const { isLoggedIn } = require('../middlewares/isLoggedIn');


//register route
router.post('/register', registerUser);
//logIN route
router.post('/login', logIn);

//logout route
router.post('/logout', logOut);

router.post('/profile',isLoggedIn,(req,res)=>{
    res.send('profile')
})

module.exports=router
