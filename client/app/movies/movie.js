angular.module('movieApp.movies', [])

.controller('MovieController', function ($scope, Movies) {
  // Your code here
  // add this movie to users playlist
  // modal for more info
  $scope.films = Movies.movies; //list of films returned
  $scope.watchList = Movies.watchList;
  $scope.logger3 = function() {
    console.log('hello from MovieController');
    console.log(Movies.movies);

    console.log($scope.films);
  };
  $scope.handleSearch = function() {
      console.log('$scope.movies' , $scope.movies);
      Movies.handleSearch($scope.searchString)
        .then(function (movies) {
          $scope.films = movies;
        });
      // $scope.movies = newMovies;
      console.log('$scope.movies' , $scope.movies);
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
