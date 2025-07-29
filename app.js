const express = require('express');
const app = express();
const path=require('path');

const userRouter=require('./routes/userRouter')

//setting up middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'public')));

//setting up view engine

app.set('view engine','ejs')

//setting up routes
app.use('/user',userRouter)

// landing Route
app.get('/', (req, res) => {
  res.render('index')
});

module.exports = app;
