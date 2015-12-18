var express = require('express');
var mongoose = require("mongoose");
mongoose.connect(process.env.MONGOLAB_URI || "mongodb://localhost/movies");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var fs = require('fs');
var path = require('path');
var session = require("express-session");
var app = express();
var port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, '/public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser("movies"));
app.use(session({resave: true, saveUninitialized: true, secret: 'movies', cookie: { expires: false }}));


var routes = require("./config/routes");
app.use(routes);

app.listen(port);
