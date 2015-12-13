mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;
// var bcrypt = require("bcrypt-node")

var FavoriteSchema = new Schema ({
  title: String,
  movie_id: String,
  favorite: Boolean,
  createdAt: {type: Date, default: Date.now},
  user: {type: ObjectId, ref: "User"}
});

var UserSchema = new Schema ({
  firstname: String,
  lastname: String,
  email: String,
  password: String,
  favorites: [FavoriteSchema]
  },
  {
  toObject: {virtuals: true},
  toJSON: {virtuals: true}
});

var FavoriteModel = mongoose.model("Favorite", FavoriteSchema);
var UserModel = mongoose.model("User", UserSchema);
