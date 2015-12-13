var express = require('express');
var router = express.Router();
var request = require("request");

function error(response, message){
  response.status(500);
  response.json({error: message});
}

router.get("/", function(req, res){
  var search = req.searchstring;
  var url = "http://www.omdbapi.com/?s=" + search;

  request(url, function(err,res, body){
    var movies = JSON.parse(body).results;
    console.log("body: " + body);
    if(err){
      console.log("error : "  + error);
      throw err;
    }
  });
});


module.exports = router;
