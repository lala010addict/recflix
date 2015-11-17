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

module.exports = mongoose.model('movies', usersSchema)


























// var createSha = function(url) {
//   var shasum = crypto.createHash('sha1');
//   shasum.update(url);
//   return shasum.digest('hex').slice(0, 5);
// };

// MovieSchema.pre('save', function(next) {
//   var code = createSha(this.url);
//   this.code = code;
//   next();
// });

=======
// var mongoose = require('mongoose'),
//     crypto   = require('crypto');

// var MovieSchema = new mongoose.Schema({
//  visits: Number,
//  link: String,
//  title: String,
//  code: String,
//  base_url: String,
//  url: String
// });

// var createSha = function(url) {
//   var shasum = crypto.createHash('sha1');
//   shasum.update(url);
//   return shasum.digest('hex').slice(0, 5);
// };

// MovieSchema.pre('save', function(next){
//   var code = createSha(this.url);
//   this.code = code;
//   next();
// });

>>>>>>> deployment
=======
// var mongoose = require('mongoose'),
//     crypto   = require('crypto');

// var MovieSchema = new mongoose.Schema({
//  visits: Number,
//  link: String,
//  title: String,
//  code: String,
//  base_url: String,
//  url: String
// });

// var createSha = function(url) {
//   var shasum = crypto.createHash('sha1');
//   shasum.update(url);
//   return shasum.digest('hex').slice(0, 5);
// };

// MovieSchema.pre('save', function(next){
//   var code = createSha(this.url);
//   this.code = code;
//   next();
// });

>>>>>>> master
// module.exports = mongoose.model('Movie', MovieSchema);
