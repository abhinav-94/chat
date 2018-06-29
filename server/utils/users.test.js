const expect=require('expect');
const {Users} = require('./users');

describe('Users',()=>{
  var users;
  //reason for defing user above beforeEach
  //is so that it is accessible inside of beforeEach
  beforeEach(()=>{
    users=new Users();
    users.users=[{
      id:'1',
      name:'Abhi1',
      room:'node'
    },{
      id:'2',
      name:'Abhi2',
      room:'react'
    },{
      id:'3',
      name:'Abhi3',
      room:'node'
    }];
  });
  //beforeEach is called before every single test case
  //it will help us initialize some data
  //and the data we are initializing is defined just above
  it('should add new user',()=>{
    var users=new Users();
    var user={
      id:'123',
      name:'Abhinav',
      room:'the office'
    };
    var resUser=users.addUser(user.id,user.name,user.room);

    expect(users.users).toEqual([user]);
  });

  it('shoud remove a user',()=>{
    var userId='1';
    var user=users.removeUser(userId);

    expect(user.id).toEqual(userId);
    expect(users.users.length).toEqual(2);
  });

  it('should not remove user',()=>{
    var userId='44';
    var user=users.removeUser(userId);

    // expect(user).toNotExist();
    expect(users.users.length).toEqual(3);
  });

  it('should find user',()=>{
    var userId='2';
    var user=users.getUser(userId);
    expect(user.id).toEqual(userId);
  });

  it('should not find user',()=>{
    // var userId=99;
    // var user=users.getUser(userId);
    // expect(user).shouldNotExist();
  });

  it('should return names for node course',()=>{
    var userList=users.getUserList('node');
    expect(userList).toEqual(['Abhi1','Abhi3'])
  });



});
