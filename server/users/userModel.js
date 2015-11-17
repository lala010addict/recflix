<<<<<<< HEAD
<<<<<<< 69c7e27a10da2ffcbd8bebd12275349531783a0b
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
// Q        = require('q'),
// SALT_WORK_FACTOR  = 10;


var userSchema = mongoose.Schema({

  facebook: {
    id: String,
    token: String,
    email: String,
    name: String
  },
  google: {
    id: String,
    token: String,
    email: String,
    name: String
  }

});

// generating a hash
userSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.local.password);
};

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);

















// UserSchema.methods.comparePasswords = function(candidatePassword) {
//   var defer = Q.defer();
//   var savedPassword = this.password;
//   bcrypt.compare(candidatePassword, savedPassword, function(err, isMatch) {
=======
// var mongoose = require('mongoose'),
//     bcrypt   = require('bcrypt-nodejs'),
//     Q        = require('q'),
//     SALT_WORK_FACTOR  = 10;


// var UserSchema = new mongoose.Schema({
//   username: {
//     type: String,
//     required: true,
//     unique: true
//   },

//   password: {
//     type: String,
//     required: true
//   },
//   salt: String
// });

// UserSchema.methods.comparePasswords = function (candidatePassword) {
//   var defer = Q.defer();
//   var savedPassword = this.password;
//   bcrypt.compare(candidatePassword, savedPassword, function (err, isMatch) {
>>>>>>> master
//     if (err) {
//       defer.reject(err);
//     } else {
//       defer.resolve(isMatch);
//     }
//   });
//   return defer.promise;
// };

<<<<<<< HEAD
// UserSchema.pre('save', function(next) {
=======
// UserSchema.pre('save', function (next) {
>>>>>>> master
//   var user = this;

//   // only hash the password if it has been modified (or is new)
//   if (!user.isModified('password')) {
//     return next();
//   }

//   // generate a salt
//   bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
//     if (err) {
//       return next(err);
//     }

//     // hash the password along with our new salt
//     bcrypt.hash(user.password, salt, null, function(err, hash) {
//       if (err) {
//         return next(err);
//       }

//       // override the cleartext password with the hashed one
//       user.password = hash;
//       user.salt = salt;
//       next();
//     });
//   });
// });

// module.exports = mongoose.model('users', UserSchema);
