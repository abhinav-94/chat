var expect=require('expect');
var {generateMessage}=require('./message'); //we need to require the module
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
