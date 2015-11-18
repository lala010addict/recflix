angular.module('movieApp.movies', [])

.controller('MovieController', function ($scope, Movies) {
  // Your code here
  // add this movie to users playlist
  // modal for more info
  $scope.films = Movies.tasteKid.Similar.Results;
  $scope.logger3 = function() {
    console.log('hello from MovieController');
    console.log($scope.films);
  };
});
