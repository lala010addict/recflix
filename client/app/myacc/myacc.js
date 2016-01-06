'use strict';

angular.module('yoMovieApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('myacc', {
        url: '/myacc',
        templateUrl: 'app/myacc/myacc.html',
        controller: 'MyaccCtrl'
      });
  });
