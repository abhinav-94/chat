const path=require('path'); //no need to import already available in node
// console.log(__dirname + '/../public');
const http=require('http'); //built in module no need to install we can simply require
const express=require('express');
const nodemon=require('nodemon');
const socketIO=require('socket.io');


const {generateMessage,generateLocationMessage}=require('./utils/message');
const{isRealString}=require('./utils/validation');
const{Users}=require('./utils/users');

var app=express(); //app variable for configuring our express application

console.log(__dirname);
const publicPath=path.join(__dirname,'../public');
const port=process.env.PORT||3000; //doing it for Heroku Deployment
console.log(publicPath);
var server=http.createServer(app);
var io=socketIO(server);
var users=new Users();

app.use(express.static(publicPath));


io.on('connection',(socket)=>{
  console.log('New user connected');
  // socket.emit('newMessage',generateMessage('Admin','Welocme to chat'));
  // socket.broadcast.emit('newMessage',generateMessage('Admin','new user joined'));
  // //if you want to send data and send multiple data
  // //then emit object
  // //emit is not a listener so not providing ca;lback function

  socket.on('join',(params,callback)=>{
    if(!isRealString(params.name) || !isRealString(params.room)){
       return callback('Name and room name are required');
       //return so that none of the code below fires if the data is not valid
    }
    console.log(socket.id);

    socket.join(params.room);
    //socket.leave('the office')
    users.removeUser(socket.id);
    //so that there are no duplicat ids, user joins the room,
    //and then we remove them from any previous potential rooms
    users.addUser(socket.id,params.name,params.room);

    io.to(params.room).emit('updateUserList',users.getUserList(params.room));

    socket.emit('newMessage',generateMessage('Admin','Welocme to chat'));
    socket.broadcast.to(params.room).emit('newMessage',generateMessage('Admin',`${params.name} has joined`));
   //adding .to emits to only those connected to that specific room passwd
   //as parameter
   callback();
  });


  socket.on('disconnect',()=>{
    var user=users.removeUser(socket.id);
    if(user){
      io.to(user.room).emit('updateUserList',users.getUserList(user.room));//first one updates the list
      io.to(user.room).emit('newMessage',generateMessage('Admin',`${user.name} has left`));//second one prints the message that user has left he loom
    }

  });


  socket.on('createMessage',(message,callback)=>{
    var user=users.getUser(socket.id);
    if(user && isRealString(message.text)){
      io.to(user.room).emit('newMessage',generateMessage(user.name,message.text));
    }

  socket.on('createLocationMessage',(coords)=>{
    var user=users.getUser(socket.id);
    if(user){
    io.to(user.room).emit('newLocationMessage',generateLocationMessage(user.name,coords.latitude,coords.longitude));
  }
  });


  // console.log("create message",message);

  // socket.broadcast.emit('newMessage',{
  // from:message.from,
  // text:message.text,
  // createdAt:new Date().getTime()
  // });
  callback();//it is going to send an event back to the server
  });
  //we are in our node code therefore we can use arrow function

});

server.listen(port, () => {
  console.log(`Started up at port ${port}`);
});  //start the server at port 3000 and a little message onec the server is up
