'use strict';

angular.module('yoMovieApp')
  .controller('ModalInstanceCtrlCtrl',['$scope', '$modalInstance', 'movie', function ($scope, $modalInstance, movie) {
    $scope.movie = movie;
  }]);
