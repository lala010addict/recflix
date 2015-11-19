var movieController = require('./movieController.js');

module.exports = function (app) {
  // app === linkRouter injected from middleware.js

  // any get request to /api/movies/getRecommendations will be controlled
  // by the getRecommendations function
  app.get('/getRecommendations', movieController.getRecommendations);

  // any get/post/delete request to /api/movies/will be controlled
  // by the movieController
  app.route('/')
    .get(movieController.savedMovies)
    .post(movieController.newMovie)
    // .delete(movieController.deleteMovie);
};
