var Movie       = require('./movieModel.js'),
    Q           = require('q'),
    request     = require('superagent'),
    async       = require('async'), 
    configAuth  = require('../config/auth'),
    _           = require('underscore');


module.exports = {

  getRecommendations: function (req, res, next) {
    var title = req.query.title.split("");
    title = title.slice(1, title.length - 1).join("");
    var moviesList;
    var getRawRecommendations = function(callback) {
      request
        .get('https://www.tastekid.com/api/similar?')
        .query(configAuth.tasteKid)
        .query({q: title})
        .query({info: 1})
        .end(function(err, res) {
          if (err) {
            console.log(err)
          } else {
            moviesList = res.body['Similar']['Results'];
            callback(); 
          }
        });
    };

    var getMovieInfo = function(movie, callback) {
      var result;
      request
        .get('http://www.omdbapi.com/?')
        .query({t: movie})
        .query({tomatoes: true})
        .query({plot: 'full'})
        .end(function(err, res) {
          if (err) {
            console.log(err)
          } else {
            result = res.body;
            callback(result);
          }
        });
    };

    var populateMoviesList = function(callback) {
      var movies = JSON.parse(JSON.stringify(moviesList));
      var newMovies = [];
      var asyncActions = [];
      for (var i = 0; i < movies.length; i++) {
        var newMovieInfo = function(index, callback) {
          var currentMovie = movies[index];
          var currentTitle = currentMovie['Name'];
          var currentYoutubeLink = currentMovie['yUrl'];
          var currentYoutubeId = currentMovie['yID'];
          var currentWiki = currentMovie['wUrl'];
          getMovieInfo(currentTitle, function(currentInfo) {
            currentMovie = currentInfo;
            currentMovie['YouTubeURL'] = currentYoutubeLink;
            currentMovie['YouTubeID'] = currentYoutubeId;
            currentMovie['WikiURL'] = currentWiki;
            moviesList[index] = currentMovie;
            callback();
          });
        };
        asyncActions[i] = newMovieInfo.bind(callback, i)
      }
      asyncActions.push(function(callback) {
        res.json(moviesList);
        callback();
      })
      async.series(asyncActions);
      callback();
    };

    async.series([getRawRecommendations, populateMoviesList])
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
