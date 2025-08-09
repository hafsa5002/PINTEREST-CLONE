const express = require('express');
const app = express();
const path=require('path');
const session = require('express-session');
const passport = require('passport');
const initializePassport = require('./config/passport-config');
const userRouter=require('./routes/userRouter');
const pinRouter=require('./routes/pinRouter');
const boardRouter=require('./routes/boardRouter');
require('dotenv').config();

//setting up middlewares for parsing data
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'public')));

//setting up view engine

app.set('view engine','ejs');
app.set('trust proxy', 1);
// Session middleware
const MongoStore = require('connect-mongo');
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI }),
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 1000 * 60 * 60 * 24,
  }
}));


// Initialize Passport
initializePassport(passport);
app.use(passport.initialize());
app.use(passport.session());



//setting up routes
app.use('/pinterest',userRouter);
app.use('/pinterest/pin', pinRouter);
app.use('/pinterest/boards',boardRouter)

app.get('/',(req,res)=>{
  res.render('login')
})

const helmet = require('helmet');
app.use(helmet());


module.exports = app;
