'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var Schema = mongoose.Schema;

var MovieSchema = new Schema({
  Title: String,
  active: Boolean,
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },

  Actors: String,
  Awards: String,
  BoxOffice: String,
  Country: String,
  DVD: String,
  Director: String,
  Genre: String,
  Language: String,
  Metascore: String,
  Plot: String,
  Poster: String,
  Production: String,
  Rated: String,
  Released: String,
  Response: String,
  Runtime: String,
  Type: String,
  Website: String,
  WikiURL: String,
  Writer: String,
  Year: String,
  YouTubeID: String,
  YouTubeURL: String,
  imdbID: String,
  imdbRating: String,
  imdbVotes: String,
  tomatoConsensus: String,
  tomatoFresh: String,
  tomatoImage: String,
  tomatoMeter: String,
  tomatoRating: String,
  tomatoReviews: String,
  tomatoRotten: String,
  tomatoURL: String,
  tomatoUserMeter: String,
  tomatoUserRating: String,
  tomatoUserReviews: String






























});

module.exports = mongoose.model('Movie', MovieSchema);
