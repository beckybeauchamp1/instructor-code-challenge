require("../db/schema");
var mongoose = require("mongoose");
var Favorite = mongoose.model("Favorite");

module.exports = Favorite;
