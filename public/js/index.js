var socket=io();
     //available to us because we loaded in the library
     //opens up a socket io connection
 socket.on('connect',function () {
   console.log("connected to server");



 });
 //we are using the arrow function available to us in es6
//but it may not work in mobile phones,etc
//so we are switching to regular functions


 socket.on('disconnect',function () {
   console.log("Disconnected from server");
 });

//data emitted from client side is sent as argument to callback function
socket.on('newMessage',function(message){
  console.log("new message",message);

});
