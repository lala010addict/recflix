'use strict';

angular.module('yoMovieApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('ModalInstanceCtrl', {
        url: '/ModalInstanceCtrl',
        templateUrl: 'app/ModalInstanceCtrl/ModalInstanceCtrl.html',
        controller: 'ModalInstanceCtrlCtrl'
      });
  });
