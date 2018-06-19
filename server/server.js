const path=require('path'); //no need to import already available in node
// console.log(__dirname + '/../public');
const http=require('http'); //built in module no need to install we can simply require
const express=require('express');
const nodemon=require('nodemon');
const socketIO=require('socket.io');
const {generateMessage,generateLocationMessage}=require('./utils/message');
var app=express(); //app variable for configuring our express application

const publicPath=path.join(__dirname,'../public');
const port=process.env.PORT||3000; //doing it for Heroku Deployment
console.log(publicPath);
var server=http.createServer(app);
var io=socketIO(server);
app.use(express.static(publicPath));


io.on('connection',(socket)=>{
  console.log('New user connected');
  socket.emit('newMessage',generateMessage('Admin','Welocme to chat'));
  socket.broadcast.emit('newMessage',generateMessage('Admin','new user joined'));
  //if you want to send data and send multiple data
  //then emit object
  //emit is not a listener so not providing ca;lback function
  socket.on('disconnect',()=>{
    console.log("User was disconnected");
  });

  socket.on('createLocationMessage',(coords)=>{
    io.emit('newLocationMessage',generateLocationMessage('Admin',coords.latitude,coords.longitude));
  });

  socket.on('createMessage',(message,callback)=>{
  console.log("create message",message);
  io.emit('newMessage',generateMessage(message.from,message.text));
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
