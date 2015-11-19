var morgan = require('morgan'), // used for logging incoming request
  bodyParser = require('body-parser'),
  helpers = require('./helpers.js'), // our custom middleware
  cookieParser = require('cookie-parser'),
  methodOverride = require('method-override')

module.exports = function(app, express) {
  // Express 4 allows us to use multiple routers with their own configurations

  //var userRouter = express.Router();

  var movieRouter = express.Router();

  app.use(morgan('dev'));
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(methodOverride());

  app.use(bodyParser.json());
  app.use(express.static(__dirname + '/../../client'));
  app.use(cookieParser());
  //register /api/... and assign routers that will take care of it 
  app.use('/api/movies', movieRouter);

  app.use(helpers.errorLogger);
  app.use(helpers.errorHandler);

  // inject our routers into their respective route files
  require('../movies/movieRoutes.js')(movieRouter);
};
