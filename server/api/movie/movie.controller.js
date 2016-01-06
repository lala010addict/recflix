/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/movies              ->  index
 * POST    /api/movies              ->  create
 * GET     /api/movies/:id          ->  show
 * PUT     /api/movies/:id          ->  update
 * DELETE  /api/movies/:id          ->  destroy
 */

'use strict';


var _ = require('underscore');
var async = require('async');
var Movie = require('./movie.model');
var request = require('superagent');
var Q = require('q');


function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

function responseWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function saveUpdates(updates) {
  return function(entity) {
    var updated = _.merge(entity, updates);
    return updated.saveAsync()
      .spread(function(updated) {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.removeAsync()
        .then(function() {
          res.status(204).end();
        });
    }
  };
}

// Gets a list of Movies
// exports.index = function(req, res) {
//   Movie.findAsync()
//     .then(responseWithResult(res))
//     .catch(handleError(res));
// };


exports.index = function(req, res) {
  if (req.baseUrl === '/api/users/me/movies') {
    Movie.find({
        user_id: req.user_id
      })
      .execAsync()
      .then(responseWithResult(res))
      .catch(handleError(res));
  } else {
    Movie.findAsync()
      .then(responseWithResult(res))
      .catch(handleError(res));

  }
};

// Gets a single Movie from the DB
exports.show = function(req, res) {
  Movie.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Creates a new Movie in the DB
exports.create = function(req, res) {
  Movie.createAsync(req.body)
    .then(responseWithResult(res, 201))
    .catch(handleError(res));
};

// Updates an existing Movie in the DB
exports.update = function(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Movie.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Deletes a Movie from the DB
exports.destroy = function(req, res) {
  Movie.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
};




exports.getRecommendations = function(req, res, next) {
  //get title from request. make sure to have a title property
  //and name of movie as value to request recommendations
  var title = req.query.title.split("");
  title = title.slice(1, title.length - 1).join("");
  //global moviesList variable this is used to send back to the response
  var moviesList;
  //function to get recommendations with limited data from tastekid
  //this function is to be used with async.series
  //the result will be stored to moviesList
  var getRawRecommendations = function(callback) {
    request
      .get('https://www.tastekid.com/api/similar?k=' + process.env.TASTEKID)
      .query({
        q: title
      })
      .query({
        info: 1
      })
      .end(function(err, res) {
        if (err) {
          console.log(err);
        } else {
          moviesList = res.body['Similar']['Results'];
          //this callback is part of superagent, similar to next()/done()
          //it is necessary to have callback() at the end to have the next function
          //in async.series to be executed
          callback();
        }
      });
  };

  //function to get detailed data of each movie from omdb
  //this function will be used in populateMoviesList function
  var getMovieInfo = function(movie, callback) {
    var result;
    request
      .get('http://www.omdbapi.com/?')
      .query({
        t: movie
      })
      .query({
        tomatoes: true
      })
      .query({
        plot: 'full'
      })
      .end(function(err, res) {
        if (err) {
          console.log(err);
        } else {
          //it is very troublesome to return or even store it to a global variable
          //instead doing a callback on the result works better
          result = res.body;
          callback(result);
        }
      });
  };

  //function to populate basic moviesList with detailed moviesList
  var populateMoviesList = function(callback) {
    //deep copy moviesList
    var movies = JSON.parse(JSON.stringify(moviesList));
    //array to store populating functions (newMovieInfo) for each individual movie in the moviesList
    //array will be used in async.series 
    var asyncActions = [];
    for (var i = 0; i < movies.length; i++) {
      //populating function for each movie
      var newMovieInfo = function(index, callback) {
        var currentMovie = movies[index];
        //necessary data to make request to omdb and to add to new data
        var currentTitle = currentMovie['Name'],
          currentYoutubeLink = currentMovie['yUrl'],
          currentYoutubeId = currentMovie['yID'],
          currentWiki = currentMovie['wUrl'];
        //execute getMovieInfo
        getMovieInfo(currentTitle, function(movieDetails) {
          //overwriting currentMovie with new movie details and add extra needed components 
          currentMovie = movieDetails;
          currentMovie['YouTubeURL'] = currentYoutubeLink;
          currentMovie['YouTubeID'] = currentYoutubeId;
          currentMovie['WikiURL'] = currentWiki;
          //store the new populated movie data to moviesList
          moviesList[index] = currentMovie;
          //this callback is part of superagent, similar to next()/done()
          //it is necessary to have callback() at the end to have the next function
          //in async.series to be executed
          callback();
        });
      };
      //add populating function to array of actions and bind index to it
      asyncActions[i] = newMovieInfo.bind(callback, i);
    }
    //add a response at the end after moviesList have been populated to return 
    //the desired result
    asyncActions.push(function(callback) {
      res.json(moviesList);
      callback();
    });
    //execute the array of actions
    async.series(asyncActions);
    callback();
  };
  //execute everything
  async.series([getRawRecommendations, populateMoviesList]);
};

exports.savedMovies = function(req, res, next) {
  //find all movies then send response back
  var findAll = Q.nbind(Movie.find, Movie);

  findAll({})
    .then(function(movies) {
      res.json(movies);
    })
    .fail(function(error) {
      next(error);
    });
};

exports.newMovie = function(req, res, next) {
  //get title from request
  var title = req.query.title.split("");
  title = title.slice(1, title.length - 1).join("");
  var createMovie = Q.nbind(Movie.create, Movie);
  var findMovie = Q.nbind(Movie.findOne, Movie);
  //find if movie already exist, if not then create new movie
  findMovie({
      title: title
    })
    .then(function(match) {
      if (match) {
        res.send(match);
      } else {
        var newMovie = {
          title: title
        };
        return createMovie(newMovie);
      }
    })
    .then(function(createdMovie) {
      if (createdMovie) {
        res.json(createdMovie);
      }
    })
    .fail(function(error) {
      next(error);
    });
};
