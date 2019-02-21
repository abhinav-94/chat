const path=require('path'); 
const http=require('http'); 
const express=require('express');
const nodemon=require('nodemon');
const socketIO=require('socket.io');


const {generateMessage,generateLocationMessage}=require('./utils/message');
const{isRealString}=require('./utils/validation');
const{Users}=require('./utils/users');

var app=express(); 

console.log(__dirname);
const publicPath=path.join(__dirname,'../public');
const port=process.env.PORT||3000; 
console.log(publicPath);
var server=http.createServer(app);
var io=socketIO(server);
var users=new Users();

app.use(express.static(publicPath));


io.on('connection',(socket)=>{
  console.log('New user connected');
  socket.on('join',(params,callback)=>{
    if(!isRealString(params.name) || !isRealString(params.room)){
       return callback('Name and room name are required');
    }
    console.log(socket.id);

    socket.join(params.room);
    users.removeUser(socket.id);
    users.addUser(socket.id,params.name,params.room);

    io.to(params.room).emit('updateUserList',users.getUserList(params.room));

    socket.emit('newMessage',generateMessage('Admin','Welocme to chat'));
    socket.broadcast.to(params.room).emit('newMessage',generateMessage('Admin',`${params.name} has joined`));
   //adding .to emits to only those connected to that specific room passwd
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
});  
