angular.module('movieApp.search', [])
  .controller('SearchCtrl', function ($scope, $http, Movies, Search){
    var self = this;
    $scope.searchString = '';
    $scope.movies = Movies.movies;
    $scope.logger = function() {
      console.log($scope.searchString);
    };
  }); 

