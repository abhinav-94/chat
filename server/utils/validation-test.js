var expect=require('expect');
var {isRealString}=require('./validation'); //we need to require the module
describe('validation',()=>{

  it('should give correct result ',()=>{
    var name='Abhinav';

    var ans=isRealString(name);
    expect(ans).toBe(false);

  });
});
