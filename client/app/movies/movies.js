'use strict';

angular.module('yoMovieApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('movies', {
        url: '/movies/:movieName',
        templateUrl: 'app/movies/movies.html',
        controller: 'MoviesCtrl'
      });
  });
