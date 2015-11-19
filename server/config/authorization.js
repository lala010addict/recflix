var express = require('express');
var router = express.Router();


exports.isAuthenticated = function(req, res, next) {
  // if user is authenticated in the session, call the next() to call the next request handler 
  // Passport adds this method to request object. A middleware is allowed to add properties to
  // request and response objects
  if (req.isAuthenticated())
    return next();
  // if the user is not authenticated then redirect him to the login page
  res.redirect('/');
}


/*
 *  User authorizations routing middleware
 */

exports.user = {
    hasAuthorization : function (req, res, next) {
      if (req.profile.id != req.user.id) {
        return res.redirect('/users/'+req.profile.id)
      }
      next()
    }
}


/*
 *  movie authorizations routing middleware
 */

exports.movie = {
    hasAuthorization : function (req, res, next) {
      if (req.movie.user.id != req.user.id) {
        return res.redirect('/login')
      }
      next()
    }
}