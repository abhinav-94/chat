var socket=io();
     //available to us because we loaded in the library
     //opens up a socket io connection
function scrollToBottom(){

  //selectors
  var messages=jQuery('#messages');
  var newMessage=messages.children('li:last-child');
  //children method lets us write a selector specific to childern of messages
  //this means we will have all of our list items
  //maybe we want to select all childern that are paragraphs
  //in our case we will select the list items

  //heights
  var clientHeight=messages.prop('clientHeight');//gives us a cross browser way to fetch a property
  var scrollTop=messages.prop('scrollTop');
  var scrollHeight=messages.prop('scrollHeight');
  var newMessageHeight=newMessage.innerHeight();
  //takes into height including padding that we applied via css
  var lastMessageHeight=newMessage.prev().innerHeight();

  if(clientHeight+scrollTop+newMessageHeight+lastMessageHeight>=scrollHeight){
    messages.scrollTop(scrollHeight);
  }
}
//need to call this function whenever new message or
//newLocationMessage comes up
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
  scrollToBottom();

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
  scrollToBottom();
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
