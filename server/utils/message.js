var moment=require('moment');
var generateMessage = (from,text)=>{
  return {
    from,
    text,
    createdAt: moment().valueOf()
  };
};

var generateLocationMessage=(from,latitude,longitude)=>{
var a={
  url:`https://www.google.com/maps/?q=${latitude},${longitude}`
};
console.log(a);
  return {
    from,
    url:`https://www.google.com/maps/?q=${latitude},${longitude}`,
    createdAt:moment().valueOf()

  };
};
module.exports={generateMessage,generateLocationMessage};
