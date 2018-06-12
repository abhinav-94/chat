const path=require('path'); //no need to import already available in node
// console.log(__dirname + '/../public');
const express=require('express');
var app=express(); //app variable for configuring our express application
const publicPath=path.join(__dirname,'../public');
const port=process.env.PORT||3000; //doing it for Heroku Deployment
console.log(publicPath);

app.use(express.static(publicPath));

app.listen(port, () => {
  console.log(`Started up at port ${port}`);
});  //start the server at port 3000 and a little message onec the server is up
