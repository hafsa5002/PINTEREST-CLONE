const express =require('express');
const router=express.Router();
const {registerUser ,logIn, logOut}=require('../controllers/userController');
const { isLoggedIn } = require('../middlewares/isLoggedIn');
const{createPin} =require('../controllers/pinController')


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
router.get('/home',(req,res)=>{
    res.render('home')
})

//profile route
router.get('/profile',isLoggedIn,(req,res)=>{
    res.render('profilepage',{user: req.user})

})
//pin creation
router.get('/pin',(req,res)=>{
    res.render('pinForm')
})


router.post('/pin',createPin)

//saved route
router.get('/saved',(req,res)=>{
res.render('savedpage')
})


module.exports=router
