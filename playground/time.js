// //all the time is relative to a particular momnet in history
// //unix epic---Jan 1st 1970 00:00:00 am
// //so 0 represents that time whereas any positive number represents
// //time after 1st jan 1970 and negative numbers represent behind that
// //time
// //Moment is a time library in javascript
//
// var date = new Date();
// console.log(date.getMonth());
// var moment=require('moment');
// var date=moment();//creates a new moment object
// //representing correct point in time
// date.add(1,'year');
// console.log(date.format('MMM YYYY Do'));

var moment=require('moment');
var x=new Date().getTime();
console.log(x);
var someTimestamp=moment().valueOf();//returns milliseconds from unix time ie 1970
console.log(moment());
console.log(someTimestamp);
// var timestamp=60000;
var date=moment(someTimestamp);
console.log(date.format('DD MM YYYY h:mm a'));
