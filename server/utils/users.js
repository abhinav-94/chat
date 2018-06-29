// [{
//   id:'/ssdsds',
//   name:'Andr',
//   room:'the office room'
// }]

//four methods for manipulating the users data
//1-add a users(id,name,room)
//2-remove users(id)
//3-fetch a users(id)
//4-get user list(room)

// var users=[];
// var addUser=(id,name,room)=>{
//   users.push();
// };
//we are not using the abover approach even though
//we can get our work done...instead of above method/
//we are using es6 class syntax
//we will create a users class and then create instance
//of that class and then fire of all the methods


class Users{
  constructor(){
      this.users=[];
  }
  addUser(id,name,room){
    var user={id,name,room};
    this.users.push(user);
    return user;
  }

  removeUser(id){
  // return this.users.filter((user)=>user.id===id)[0];
  var user=this.getUser(id);
  if(user){
    this.users=this.users.filter((user)=>user.id!==id);
  }
  return user; //fi it doesnt exist we will return
  }

  getUser(id){
    return this.users.filter((user)=>user.id===id)[0]; //shorthand method provided by es6
  }


  getUserList(room){
    //filter gets called by a function as its argument
    //this.users=array of users
    var users=this.users.filter((user)=>{
      return user.room===room;
    });
    //above var users gives all the user objects with room = room mentioned
    var namesArray=users.map((user)=>{
      return user.name
    });

    return namesArray;
  }
}



// class Person {
//     constructor (name,age){
//       this.name=name;
//       this.age=age;
//     }
//     //no need to add , another quirk of class syntax
//     getUserDescription(){
//       return `${this.name} is ${this.age} old`;
//     }
// }
// var me=new Person('Abhinav',24);
// var des=me.getUserDescription();
// console.log(des);
//
//



module.exports={Users};












//new instance of Person class
