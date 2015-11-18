var express = require('express');
var router = express.Router();

var isAuthenticated = function(req, res, next) {
  // if user is authenticated in the session, call the next() to call the next request handler 
  // Passport adds this method to request object. A middleware is allowed to add properties to
  // request and response objects
  if (req.isAuthenticated())
    return next();
  // if the user is not authenticated then redirect him to the login page
  res.redirect('/');
}

module.exports = function(passport) {

  // route for facebook authentication and login
  // different scopes while logging in
  router.get('/login/facebook',
    passport.authenticate('facebook', {
      scope: 'email'
    }));

  // handle the callback after facebook has authenticated the user
  router.get('/login/facebook/callback',
    passport.authenticate('facebook', {
      successRedirect: '/',
      failureRedirect: '/'
    })
  );

  // route for google authentication and login
  // different scopes while logging in

  router.get('/login/google', passport.authenticate('google', {
    scope: 'https://www.googleapis.com/auth/plus.login'
  }));

  // the callback after google has authenticated the user
  router.get('/login/google/callback',
    passport.authenticate('google', {
      successRedirect: '/',
      failureRedirect: '/'
    }));

  return router;
}
