  var express     = require('express'),
      mongoose    = require('mongoose');

var app = express();

mongoose.connect('mongodb://localhost/shortly'); // connect to mongo database named shortly

// configure our server with all the middleware and and routing
require('./config/middleware.js')(app, express);

var port;
if (process.env.PORT) {
  port = process.env.PORT;
} else {
  port = 8000;
}

app.listen(port);

module.exports = app;
