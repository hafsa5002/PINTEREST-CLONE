let http=require('http');
let dotenv=require('dotenv');
dotenv.config();
let debug=require('debug')('development:mongoose')


//DATABASE



//SERVER CREATION
let app = require("./app");
const server = http.createServer(app);


//PORT LISTENING
let PORT=process.env.PORT ;

server.listen(PORT,(err)=>{
    if(err){debug(err) }
});
