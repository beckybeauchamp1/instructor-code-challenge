var express = require('express');
mongoose = require("mongoose");
var router = express.Router();
var request = require("request");
var UserModel = require("../models/user");
var FavoriteModel = require("../models/favorite");

function error(response, message){
  response.status(500);
  response.json({error: message});
}

router.post("/signup", function(req, res, callback){
  var newUser = new UserModel(req.body);
  UserModel.findOne({'email' : req.body.email}, function(err, user){
    // if there is an err will return a callback with that err from server
    if(err){
      return callback(err);
    }
    // if it finds a user with the same email address
    if(user){
      console.log("user exits");
      return callback(null, false, res.status(200).send({message: "username already exists"}));
    }
    else{
      newUser.save(function(err, user){
        if(err){
          console.log(err + "errrrror");
          return res.status(401).send({message: err});
          // callback(err);
        }
        else{
          console.log("no error" + user);
          return res.status(401).send({message: "sucessfully created user"});
          // callback(null, user);
        }
      });
    }
  });
});

router.post("/login", function(req, res){
  UserModel.findOne({email: req.body.email}, function(err, user){
    user.authenticate(req.body.password, function(err, match){
      if(err) throw err;
      if(match){
        console.log("sucess");
        return res.status(200).send({message: "Login Success"});
      }
      else {
        console.log('failed');
        return res.status(401).send({message: "Invalid Login"});
      }
    });
  });
});

router.post("/favorites", function(req, res, callback){
  console.log("FAVOIRESSSSS" + req);
  var newFav = new FavoriteModel(req.body);
  FavoriteModel.findOne({title : req.body.title}, function(err, fav){
    // if there is an err will return a callback with that err from server
    if(err){
      return callback(err);
    }
    // if it finds a user with the same email address
    if(fav){
      console.log("already favorited");
      return callback(null, false);
    }
    else{
      newFav.save(function(err, fav){
        if(err){
          console.log(err + "errrrror");
          return res.status(401).send({message: err});
        }
        else{
          console.log("no error" + fav);
          return res.status(202).send({message: "Sucessfully Logged in"});
        }
      });
    }
  });
});


module.exports = router;
