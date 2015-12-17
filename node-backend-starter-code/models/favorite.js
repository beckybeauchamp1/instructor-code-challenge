require("../db/schema");
var mongoose = require("mongoose");
var FavoriteModel = mongoose.model("Favorite");

module.exports = FavoriteModel;
