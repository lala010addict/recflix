var express = require('express');
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');
var path = require('path');
var favicon = require('static-favicon');
//var logger = require('morgan');
// var cookieParser = require('cookie-parser');
//var bodyParser = require('body-parser');

var app = express();

var dbConfig = require('./server/config/db');
mongoose.connect(dbConfig.url); // connect to mongo database named shortly

var expressSession = require('express-session');
// TODO - Why Do we need this key ?
//app.use(expressSession({secret: 'mySecretKey'}));


app.use(favicon());
//app.use(logger('dev'));
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded());
// app.use(cookieParser());


// configure our server with all the middleware and and routing
require('./server/config/middleware.js')(app, express);


// var configDB = require('./server/config/db');
// mongoose.connect(configDB.url);
var passportFB = require('./server/config/passport-fb');
var passportGoogle = require('./server/config/passport-google');

app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

var routes = require('./server/routes.js');


app.listen(process.env.PORT || 3000, function() {
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
module.exports = app;
