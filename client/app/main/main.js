'use strict';

angular.module('yoMovieApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'main'
      });
  })
  // .run(function($rootScope) {

  //   $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
  //     //	 next.referrer = current.id;
  //     console.log('hi')
  //     $rootScope.$watch('films')

  //     console.log($rootScope);
  //     //console.log(event)
  //   })
  // })
