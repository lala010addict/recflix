var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var dbConfig = require('./server/config/db');
var mongoose = require('mongoose');
// Connect to DB
mongoose.connect(dbConfig.url);
mongoose.connection.once('open', function() {
  console.log("Mongoose has connected to MongoDB!");
});


var app = express();

require('./server/config/middleware.js')(app, express);

// Configuring Passport
var passport = require('passport');
var expressSession = require('express-session');

//app.use(session({secret: 'mySecretKey'}));
app.use(passport.initialize());
app.use(passport.session());

// Using the flash middleware provided by connect-flash to store messages in session
// and displaying in templates
var flash = require('connect-flash');
app.use(flash());

// Initialize Passport
var initPassport = require('./server/config/init');
initPassport(passport);

var routes = require('./server/users/userRoutes')(passport);
app.use('/', routes);
var movies = require('./server/movies/movieDBController')
app.use('/movies', movies);

//app.use('/', routes);

// This middleware will allow us to use the currentUser in our views and routes.
app.use(function(req, res, next) {
  global.currentUser = req.user;
  next();
});

// // Routes
// app.use('/', routes);
// // app.use('/users', users);
// app.use('/movies', movies);

/// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });

// development error handler
// will print stacktrace
// if (app.get('env') === 'development') {
//   app.use(function(err, req, res, next) {
//     res.status(err.status || 500);
//     res.render('error', {
//       message: err.message,
//       error: err
//     });
//   });
// }


app.listen(process.env.PORT || 3000, function() {
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});


module.exports = app;
