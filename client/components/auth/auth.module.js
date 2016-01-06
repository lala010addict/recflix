'use strict';

angular.module('yoMovieApp.auth', [
  'yoMovieApp.constants',
  'yoMovieApp.util',
  'ngCookies',
  'ui.router'
])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
