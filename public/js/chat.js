var socket=io();
function scrollToBottom(){

  var messages=jQuery('#messages');
  var newMessage=messages.children('li:last-child');

  //heights
  var clientHeight=messages.prop('clientHeight');
  var scrollTop=messages.prop('scrollTop');
  var scrollHeight=messages.prop('scrollHeight');
  var newMessageHeight=newMessage.innerHeight();
  var lastMessageHeight=newMessage.prev().innerHeight();
  if(clientHeight+scrollTop+newMessageHeight+lastMessageHeight>=scrollHeight){
    messages.scrollTop(scrollHeight);
  }
}

 socket.on('connect',function () {
   var params=jQuery.deparam(window.location.search);
   socket.emit('join',params,function(err){
     if(err){
       alert(err);
            window.location.href='/';
     }
     else{
       console.log('No error');
     }
   });

  });



 socket.on('disconnect',function () {
   console.log("Disconnected from server");
 });

 socket.on('updateUserList',function(users){
   var ol=jQuery('<ol></ol>');

   users.forEach(function(user){
  ol.append(jQuery('<li></li>').text(user));
   });
     // console.log('Users list',users);
     jQuery('#users').html(ol);

 });

 
socket.on('newMessage',function(message){
    var formattedTimeStamp=moment(message.createdAt).format('h:mm a');
    var template=jQuery('#message-template').html();
    var html=Mustache.render(template,{
      text:message.text,
      from:message.from,
      createdAt:formattedTimeStamp
    });
    jQuery('#messages').append(html);
    scrollToBottom();
});


jQuery('#message-form').on('submit',function(e){
  e.preventDefault();
  var messageTextbox=jQuery('[name=message]');
  socket.emit('createMessage',{
    // from:'User',
    text:jQuery('[name=message]').val()
  }, function (){
    messageTextbox.val('');
  });

});

socket.on('newLocationMessage',function (message) {

  var formattedTimeStamp=moment(message.createdAt).format('h:mm a');
  var template=jQuery('#locationMessage-template').html();
  var html=Mustache.render(template,{
    createdAt:formattedTimeStamp,
    from:message.from,
    url:message.url
  });
  jQuery('#messages').append(html);
  scrollToBottom();
});

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
