var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var movieSchema = new Schema({
  title: String,
  created: {type: Date, default: Date.now}
});

module.exports = mongoose.model('movies', movieSchema)