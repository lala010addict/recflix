'use strict';

angular.module('yoMovieApp', [
  'yoMovieApp.auth',
  'yoMovieApp.admin',
  'yoMovieApp.constants',
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router',
  'ui.bootstrap',
  'validation.match'
])
  .config(function($urlRouterProvider, $locationProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);
  });
