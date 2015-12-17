mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;
var bcrypt = require("bcrypt");
// var bcrypt = require("bcrypt-node")

var FavoriteSchema = new Schema ({
  title: String,
  favorite: Boolean,
  createdAt: {type: Date, default: Date.now},
  user: {type: ObjectId, ref: "User"}
});

var UserSchema = new Schema ({
  firstname: String,
  lastname: String,
  email: {type: String, required: true, unqiue: true},
  password: {type: String, required: true},
  favorites: [FavoriteSchema]
});

UserSchema.pre("save", function(next){
  var user = this;
  if(!user.isModified("password")) return next();
  bcrypt.genSalt(8,function(err, salt){
    if(err) return next(err);
    bcrypt.hash(user.password, salt, function(err, hash){
      if(err) return next(err);
      user.password = hash;
      next();
    });
  });
});
//
// UserSchema.methods.hashPassword = function(password){
//   return bcrypt.hasSync(password, bcrypt.genSaltSync(8), null);
// };

UserSchema.methods.authenticate = function(password, callback){
  return bcrypt.compare(password, this.password, function(err, match){
    callback(null, match);
  });
};

var FavoriteModel = mongoose.model("Favorite", FavoriteSchema);
var UserModel = mongoose.model("User", UserSchema, "users");

module.exports = mongoose.model("User", UserSchema);
