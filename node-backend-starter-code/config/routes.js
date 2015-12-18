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
  console.log(req.body);
  var newUser = new UserModel(req.body);
  if(UserModel.findOne({'email' : req.body.email}, function(err, user){
    // if there is an err will return a callback with that err from server
    if(err){
      return callback(err, res.status(401).send({message: err}));
    }
    // if it finds a user with the same email address
    else if(user){
      console.log("user exits");
      return callback(null, false, res.status(401).send({message: "Username already exists"}));
    }
  }));
  else{
    newUser.save(function(err, user){
      if(err){
        console.log(err + "errrrror");
        return res.status(401).send({message: err});
      }
      else{
        console.log("no error" + user);
        return res.status(200).send({message: "Welcome to our Movies Site!"});
      }
    });
  }
});

router.post("/login", function(req, res){
  console.log(request.body);
  if(UserModel.findOne({email: req.body.email}, function(err, user){
    user.authenticate(req.body.password, function(err, match){
      if(err) throw err;
      if(match){
        console.log("sucess");
        res.status(200).send({message: "Successfully logged in", user: user });
        // req.session.userId = user.id;
      }
    });
  }));
  else {
    console.log('failed');
    return res.status(401).send({message: "Please try again or Sign Up"});
  }
});

router.post("/favorites", function(req, res, callback){
  var newFav = new FavoriteModel(req.body);
  console.log(newFav);
  FavoriteModel.findOne({title : req.body.title}, function(err, match){
    console.log(match);
    // if there is an err will return a callback with that err from server
    if(err) throw err;
    // if it finds a user with the same email address
    else if(match){
      console.log("ALREADY A FAV");
      return callback(null, false, res.status(401).send({message: "Favorite Has Already Been Saved"}));
    }
    else{
      newFav.save(function(err, fav){
        console.log("SAVING NEW");
        if(err){
          return res.status(401).send({message: "Error saving"});
        }
        else{
          return res.status(200).send({message: "Your Movie Has Been Favorited!"});
        }
      });
    }
  });
});


router.get("/currentuser", function(req, res){
  var currentUser = req.body;
  UserModel.findOne({"email": currentUser.email}, function(err, user){
    if(user){
      res.json(user);
    }
    else{
      console.log(err);
    }
  });
});

module.exports = router;
