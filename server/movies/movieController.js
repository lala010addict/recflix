var Movie    = require('./movieModel.js'),
    Q       = require('q'),
    request     = require('superagent'),
    async       = require('async'), 
    configAuth  = require('../config/auth'),
    util    = require('../config/utils.js');


module.exports = {

  getRecommendations: function (req, res, next) {
    var movieList;
    
     async.series([
      function(callback) {
        request
      .get('https://www.tastekid.com/api/similar?')
      .query(configAuth.tasteKid)
      .query({q: 'Inception'})
      .query({info: 1})
      .end(function(err, res) {
        if (err) {
          console.log(err)
        } else {
          movieList = res.body;
          callback(); 
        }
      });
      }, 
      function(callback){
        res.json(movieList)
        callback();
      }])
  },

  savedMovies: function (req, res, next) {
  var findAll = Q.nbind(Movie.find, Movie);

  findAll({})
    .then(function (movies) {
      res.json(movies);
    })
    .fail(function (error) {
      next(error);
    });
  },

  newMovie: function (req, res, next) {
    var title = req.body.title;
    var createMovie = Q.nbind(Movie.create, Movie);
    var findMovie = Q.nbind(Movie.findOne, Movie);

    findMovie({title: title})
      .then(function (match) {
        if (match) {
          res.send(match);
        } else {
          var newMovie = {
            title: title
          };
          return createMovie(newMovie);
        }
      })
      .then(function (createdMovie) {
        if (createdMovie) {
          res.json(createdMovie);
        }
      })
      .fail(function (error) {
        next(error);
      });
  }

};