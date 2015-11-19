var express = require('express');
var router = express.Router();
var mongoose = require('mongoose')
var Movie = mongoose.model('Movie')
//require('movieModel');

function makeError(res, message, status) {
  res.statusCode = status;
  var error = new Error(message);
  error.status = status;
  return error;
}

var authenticate = function(req, res, next) {
  if(!req.isAuthenticated()) {
    next();
  //CHANGE BACK  //res.redirect('/');
  }
  else {
    next();
  }
}

// INDEX
router.get('/', authenticate, function(req, res, next) {
  console.log('MOVIES:index: req.session=', req.session);
  var movies = global.currentUser.movies;
  res.render('movies/index', { movies: movies, message: req.flash() })
});

// NEW
router.get('/new', authenticate, function(req, res, next) {
  var movie = {
    title: ''
   // , completed: false
  };
  res.render('movies/new', { movie: movie, message: req.flash() });
});

// SHOW
router.get('/:id', authenticate, function(req, res, next) {
  var movie = currentUser.movies.id(req.params.id);
  if (!movie) return next(makeError(res, 'Document not found', 404));
  //var checked = movie.completed ? 'checked' : '';
  res.render('movies/show', { movie: movie, checked: checked, message: req.flash() } );
});


// CREATE
router.post('/', authenticate, function(req, res, next) {
  var movie = {
    title: req.body.title,
   //, completed: req.body.completed ? true : false
  };
  // Movie.create(movie, function(err, saved) {
  currentUser.movies.push(movie);
  currentUser.save(function (err) {
    if (err) return next(err);
    res.redirect('/');
  });
});


// DESTROY
router.delete('/:id', authenticate, function(req, res, next) {
  var movie = currentUser.movies.id(req.params.id);
  if (!movie) return next(makeError(res, 'Document not found', 404));
  var index = currentUser.movies.indexOf(movie);
  currentUser.movies.splice(index, 1);
  currentUser.save(function(err) {
    if (err) return next(err);
    res.redirect('/movies');
  });
});

module.exports = router;
