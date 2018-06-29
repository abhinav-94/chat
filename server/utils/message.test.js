var expect=require('expect');
var {generateMessage,generateLocationMessage}=require('./message'); //we need to require the module
describe('generateMessage',()=>{

  it('should generate coorect message ',()=>{
    var from='mee';
    var text='hey there';
    var message=generateMessage(from,text);
    expect(typeof message.createdAt).toBe('number');
    expect(message).toMatchObject({
      from:from,
      text:text
    });
  });
});

describe('generateLocationMessage',()=>{

it('should generate correct location object',()=>{
  var from='Admin';
  var latitude=1;
  var longitude=1;
  var ans=generateLocationMessage(from,latitude,longitude);
  expect (ans).toMatchObject({
    from:'Admin',
    url:`https://www.google.com/maps/?q=${latitude},${longitude}`});
});
});
