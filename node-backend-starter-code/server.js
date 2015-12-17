var express = require('express');
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/movies");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var fs = require('fs');
var path = require('path');
var session = require("express-session");
var app = express();

app.use(express.static(path.join(__dirname, '/public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser("movies"));
app.use(session({resave: true, saveUninitialized: true, secret: 'movies', cookie: { expires: false }}));


app.get('/favorites', function(req, res){
  var data = fs.readFileSync('./data.json');
  res.setHeader('Content-Type', 'application/json');
  res.send(data);
});

app.get('favorites', function(req, res){
  if(!req.body.name || !req.body.oid){
    res.send("Error");
  }
});
//
// var data = JSON.parse(fs.readFileSync('./data.json'));
// data.push(req.body);
// fs.writeFile('./data.json', JSON.stringify(data));
// res.setHeader('Content-Type', 'application/json');
// res.send(data);

var routes = require("./config/routes");
app.use(routes);

app.listen(3000, function(){
  console.log("Listening on port 3000");
});
