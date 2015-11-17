  var express = require('express');
  var mongoose = require('mongoose');

  var passport = require('passport');
  var flash = require('flash');

  var app = express();

  mongoose.connect('mongodb://localhost/moviesDB'); // connect to mongo database named shortly

  // configure our server with all the middleware and and routing
  require('./server/config/middleware.js')(app, express);


  // var configDB = require('./server/config/db');
  // mongoose.connect(configDB.url);
  var passportFB = require('./server/config/passport-fb')
  var passportGoogle = require('./server/config/passport-google')

  app.use(passport.initialize());
  app.use(passport.session()); // persistent login sessions
  app.use(flash()); // use connect-flash for flash messages stored in session

  var routes = require('./server/routes.js');


  app.listen(process.env.PORT || 3000, function() {
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
  });
  module.exports = app;
