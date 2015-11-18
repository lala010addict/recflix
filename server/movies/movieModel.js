var mongoose = require('mongoose')
var Schema = mongoose.Schema;
// bcrypt   = require('bcrypt-nodejs'),
// Q        = require('q'),
// SALT_WORK_FACTOR  = 10;

var movieSchema = new Schema({
  movieName: String,
  user: {
    type: Schema.ObjectId,
    ref: "users"
  }, 
  created: {type: Date, default: Date.now}
});

module.exports = mongoose.model('movies', movieSchema)