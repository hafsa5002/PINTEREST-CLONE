const express =require('express');
const router=express.Router();
const {registerUser ,logIn, logOut}=require('../controllers/userController');
const { isLoggedIn } = require('../middlewares/isLoggedIn');


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

router.post('/profile',isLoggedIn,(req,res)=>{
    res.send('profile')
})

module.exports=router
