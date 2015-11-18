var mongoose = require('mongoose');

module.exports = mongoose.model('User', {


  id: String,
  access_token: String,
  email: String,
  name: String
   
});
