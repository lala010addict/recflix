angular.module('movieApp.movies', [])

.controller('MovieController', function ($scope, Movies) {
  // Your code here
  // add this movie to users playlist
  // modal for more info
  $scope.films = Movies.tasteKid; //list of films returned
  $scope.watchList = Movies.watchList;
  $scope.logger3 = function() {
    console.log('hello from MovieController');
    console.log($scope.films);
  };
})
.directive('movieCard', function(){
  return {
    restrict: 'E',
    scope: {
      data: '='
    },
    templateUrl: 'app/movies/movie.html',
    controller: function($scope) {
      console.log($scope.watchList);
    }
  };
});
