var mongoose = require('mongoose');
//var bcrypt = require('bcrypt-nodejs');
// Q        = require('q'),
// SALT_WORK_FACTOR  = 10;


module.exports = mongoose.model('User', {

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
  },
//  movies: 
});

// // generating a hash
// userSchema.methods.generateHash = function(password) {
//   return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
// };

// // checking if password is valid
// userSchema.methods.validPassword = function(password) {
//   return bcrypt.compareSync(password, this.local.password);
// };

// create the model for users and expose it to our app
//module.exports = mongoose.model('User', userSchema);
