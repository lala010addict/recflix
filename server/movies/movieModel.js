var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var MovieSchema = new Schema({
  title: String
 //, createdAt: { type: Date, default: Date.now }
});


module.exports = mongoose.model('Movie', MovieSchema)

