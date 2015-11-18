var User = require("./users/userModel");
var express = require('express');
var router = express.Router();


module.exports = function(passport) {

  // facebook -------------------------------
  // send to facebook to do the authentication
  router.get('/auth/facebook',
    //passport.authenticate('facebook', { scope : 'email' }));
    console.log('LOGIN!'))

  // handle the callback after facebook has authenticated the user
  router.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
      successRedirect: '/profile',
      failureRedirect: '/'
    }));


  // google ---------------------------------

  // send to google to do the authentication
  router.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email']
  }));

  // the callback after google has authenticated the user
  router.get('/auth/google/callback',
    passport.authenticate('google', {
      successRedirect: '/profile',
      failureRedirect: '/'
    }));

  // =============================================================================
  // AUTHORIZE (ALREADY LOGGED IN / CONNECTING OTHER SOCIAL ACCOUNT) =============
  // =============================================================================


  // facebook -------------------------------

  // send to facebook to do the authentication
  router.get('/connect/facebook', passport.authorize('facebook', {
    scope: 'email'
  }));

  // handle the callback after facebook has authorized the user
  router.get('/connect/facebook/callback',
    passport.authorize('facebook', {
      successRedirect: '/profile',
      failureRedirect: '/'
    }));


  // google ---------------------------------

  // send to google to do the authentication
  router.get('/connect/google', passport.authorize('google', {
    scope: ['profile', 'email']
  }));

  // the callback after google has authorized the user
  router.get('/connect/google/callback',
    passport.authorize('google', {
      successRedirect: '/profile',
      failureRedirect: '/'
    }));

  return router;
};

// route middleware to ensure user is logged in
var isLoggedIn = function(req, res, next) {
  if (req.isAuthenticated())
    return next();

  res.redirect('/');
}
