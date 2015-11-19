var movieController = require('./movieController.js');

var mongoose = require('mongoose')
  , Article = mongoose.model('Movie')
  , async = require('async');
  var auth = require('../config/authorization.js')

module.exports = function (app) {
  // app === linkRouter injected from middleware.js

  // app.param will hijack any request with a 'code' parameter on in
  // like line 16 below. That code will actually be the shortned url
  // so the real URL will be pre fetched from mongo and attached to
  // req.navLink before it reaches line 16.
  app.get('/savedMovies', movieController.savedMovies)
  app.get('/getRecommendations', movieController.getRecommendations);
  app.post('/newMovie', movieController.newMovie);

  app.route('/')
    .get(movieController.savedMovies)
    .post(movieController.newMovie)
    // .delete(movieController.deleteMovie);





// movie routes
  // var movies = require('./movieDBController.js')
  // console.log(movies)
  // app.get('/movies', auth.isAuthenticated, movies.index)
  // app.post('/movies/new', auth.isAuthenticated, movies.create)
  // app.put('/movies/:id', auth.isAuthenticated, auth.movie.hasAuthorization, movies.update)
  // app.get('/movies/:id/destroy', auth.isAuthenticated, auth.movie.hasAuthorization, movies.destroy)
  // app.get('/movies/:id/done', auth.isAuthenticated, auth.movie.hasAuthorization, movies.done)

  // app.param('id', movies.movie)





};
