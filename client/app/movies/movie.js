angular.module('movieApp.movies', [])

.controller('MovieController', function ($scope, Movies) {
  // Your code here
  // add this movie to users playlist
  // modal for more info
  $scope.films = Movies.movies; //list of films returned
  $scope.searchString = '';
  console.log($scope.films);
  $scope.watchList = Movies.watchList;
  $scope.logger3 = function() {
    console.log('hello from MovieController');
    console.log(Movies.movies);
    console.log($scope.films);
  };
  $scope.handleSearch = function(str) {
      Movies.handleSearch(str)
        .then(function (movies) {
          Movies.movies = movies;
          $scope.films = Movies.movies;
          console.log('Movie.movies' , Movies.movies);
          console.log('$scope.films' , $scope.films);
        });
      // $scope.movies = newMovies;
    };
})

