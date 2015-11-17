  var express     = require('express'),
      mongoose    = require('mongoose');

var app = express();

mongoose.connect('mongodb://localhost/shortly'); // connect to mongo database named shortly

// configure our server with all the middleware and and routing
require('./server/config/middleware.js')(app, express);

app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});

module.exports = app;
