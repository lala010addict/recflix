  var express     = require('express'),
      mongoose    = require('mongoose');

var app = express();

//TODO: NEED TO CHECK IF THIS WORKS
mongoose.connect('mongodb://localhost/movieRecommender');
//TODO: ABOVE

require('./server/config/middleware.js')(app, express);

app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});

module.exports = app;
