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
//     if (err) {
//       defer.reject(err);
//     } else {
//       defer.resolve(isMatch);
//     }
//   });
//   return defer.promise;
// };

// UserSchema.pre('save', function(next) {
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
