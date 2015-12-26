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
      return callback(err, res.status(401).send({message: err}));
    }
    // if it finds a user with the same email address
    else if(user){
      return callback(null, false, res.status(401).send({message: "Username already exists"}));
    }
    else{
      newUser.save(function(err, user){
        if(err){
          return res.status(200).send({message: err});
        }
        else{
          return res.status(200).send({message: "Welcome, you have sucessfully signed up!", user: user});
        }
      });
    }
  });
});

router.post("/login", function(req, res){
  if(UserModel.findOne({email: req.body.email}, function(err, user){
    user.authenticate(req.body.password, function(err, match){
      if(err){
        return res.status(401).send({message: "Incorrect Password or Email"});
      }
      if(match){
        res.status(200).send({message: "You have sucessfully logged in!", user: user });
        // req.session.userId = user.id;
      }
    });
  }));
  else {
    return res.status(401).send({message: "Please try again or Sign Up"});
  }
});

router.post("/favorites", function(req, res, callback){
  var newFav = new FavoriteModel(req.body);
  FavoriteModel.findOne({title : req.body.title}, function(err, match){
    // if there is an err will return a callback with that err from server
    if(err) throw err;
    // if it finds a user with the same email address
    else if(match){
      return callback(null, false, res.status(401).send({message: "Favorite Has Already Been Saved"}));
    }
    else{
      newFav.save(function(err, fav){
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
  });
});

module.exports = router;
