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
    var formattedTimeStamp=moment(message.createdAt).format('h:mm a');
    var template=jQuery('#message-template').html();//html() will return markup inside of message template
    var html=Mustache.render(template,{
      text:message.text,
      from:message.from,
      createdAt:formattedTimeStamp
    });//need to pass second value for providing values to {{}}
    jQuery('#messages').append(html);
  // console.log("new message",message);
  // //we are using jquery differently, rather than selecting element
  // //we are going to create element and then modify that element
  // //and add it to markup
  // var li=jQuery('<li></li>');

  // li.text(`${message.from} ${formattedTimeStamp}: ${message.text}`);
  // jQuery('#messages').append(li);

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
  var messageTextbox=jQuery('[name=message]');
  socket.emit('createMessage',{
    from:'User',
    text:jQuery('[name=message]').val()
  }, function (){
    messageTextbox.val('');
  });

});

socket.on('newLocationMessage',function (message) {

  var formattedTimeStamp=moment(message.createdAt).format('h:mm a');
  var template=jQuery('#locationMessage-template').html();//html() will return markup inside of message template
  var html=Mustache.render(template,{
    createdAt:formattedTimeStamp,
    from:message.from,
    url:message.url
  });//need to pass second value for providing values to {{}}
  jQuery('#messages').append(html);



  // var li=jQuery('<li></li>');
  // var a=jQuery('<a target="_blank">My current location</a>');
  // //blank causes the location to open in new tab
  // var formattedTimeStamp=moment(message.createdAt).format('h:mm a');
  // li.text(`${message.from} ${formattedTimeStamp}: `);
  // a.attr('href',message.url);
  // //attr() if with one argument it fetches the value,
  // //and if with 2 arguments then it sets the value for that argument
  // li.append(a);
  // jQuery('#messages').append(li);

});

//jQuery('#send-location').on... is same as creating a variable locationButton
//and then on that variable
//benefit of below method is that we have a reusable variable

var locationButton = jQuery('#send-location');
locationButton.on('click',function(){
//geolocation api exists on navigator.geolocation
//we want to check if it exists on user's browser
//alert is availabl on all browsers
  if(!navigator.geolocation){
    return alert('Feature doesnt exist');
  }

  locationButton.attr('disabled','disabled').text('Sending');
  //getCurrentPosition takes two arguments first one is a
  //success function and second is our error handler
  navigator.geolocation.getCurrentPosition(function(position){
    locationButton.removeAttr('disabled').text('Send Location');
  socket.emit('createLocationMessage',{
    longitude:position.coords.longitude,
    latitude:position.coords.latitude
  });
  },function(){
    locationButton.removeAttr('disabled').text('Send Location');
    alert('Not able to fetch location');
  });
});
