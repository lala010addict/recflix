var mongoose = require('mongoose');
var Movie = require("../movies/movieModel")

module.exports = mongoose.model('User', {

  // fb: {

  id: String,
  access_token: String,
  email: String,
  name: String,
  movies: [ Movie.schema ]
    // },
    // google: {
    //   id: String,
    //   token: String,
    //   email: String,
    //   name: String
    // }
    //  movies: 
});
