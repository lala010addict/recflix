var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var movieSchema = new Schema({
  title: String,
  user: {type: Schema.ObjectId, ref: 'User'},
  created: {type: Date, default: Date.now}
});




movieSchema.statics = {


  /**
  * Find movies by id
  *
  * @param {ObjectId} id
  * @param {Function} cb
  * @api public
  **/
  load: function (id, cb) {
    this.findOne({_id: id})
      .populate('user', 'name' )
      .exec(cb);
  },

  /**
  *
  * List movies
  * @param {Object} options
  * @param {Function} cb
  * @api public
  **/
  list: function (options, cb) {
    // var criteria = options.criteria || {};
    this.find({user: options.user})
      .populate('user', 'name')
      .sort({'createdAt': -1}) // sort by date
      .limit(options.perPage)
      .skip(options.perPage * options.page)
      .exec(cb);
  }



}

















module.exports = mongoose.model('movies', movieSchema)