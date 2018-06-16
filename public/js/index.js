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
  //we are using jquery differently, rather than selecting element
  //we are going to create element and then modify that element
  //and add it to markup
  var li=jQuery('<li></li>');
  li.text(`${message.from}: ${message.text}`);
  jQuery('#messages').append(li);

});

// socket.emit('createMessage',{
//   from:'Pinkman',
//   text:'hi there'
// },function (data) {
//   console.log(data);
// });
//submit is event name
//unlike socket io listeners
//we get e argument fro over riding that default behaviour
//which causes page to refresh
jQuery('#message-form').on('submit',function(e){
  e.preventDefault();

  socket.emit('createMessage',{
    from:'User',
    text:jQuery('[name=message]').val()
  }, function (){

  });

});
