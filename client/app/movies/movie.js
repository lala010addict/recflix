angular.module('movieApp.movies', [])

.controller('MovieController', function ($scope, $route, Movies) {
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
      return Movies.handleSearch(str)
        .then(function (movies) {
          Movies.movies = movies;
          $scope.films = Movies.movies;
        });
  };
  $scope.$watch('films', function (newValue, oldValue) {
      console.log('films has changed');
      console.log('old ', oldValue);
      console.log('new ', newValue);
    });
})
  .factory('Movies', function (Search) {
    var movies = [];
    var searchString = '';
    var watchList = [];
    var handleSearch = function(str) {
      return Search.getMovies(str)
        .then(function (searchResults) {
          results = searchResults;
          movies.push(searchResults);
          return searchResults.data;
        })
        .catch(function() {
        });
    };
    
    return {
      movies: movies,
      watchList: watchList,
      handleSearch: handleSearch,
      searchString: searchString
    };
  });