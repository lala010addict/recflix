angular.module('movieApp.search', [])
  .controller('SearchCtrl', function ($scope, $http, Movies, Search){
    var self = this;
    $scope.searchString = '';
    $scope.movies = Movies.movies;
    $scope.logger = function() {
      console.log($scope.searchString);
    };
  // $scope.handleSearch = function() {
  //     console.log('$scope.movies' , $scope.movies);
  //     Movies.handleSearch($scope.searchString)
  //       .then(function (movies) {
  //         Movies.movies = movies;
  //       });
  //     // $scope.movies = newMovies;
  //     console.log('$scope.movies' , $scope.movies);
  //   };
    
  }) // serach bar --> search ---> take search query and do a GET to our server --> return the data 
      // to the 'movies' array 
  .factory('Movies', function (Search) {
    var movies = [];
    var searchString = '';
    var watchList = [];
    var handleSearch = function(str) {
      return Search.getMovies(str)
        .then(function (searchResults) {
          this.movies = searchResults;
          // console.log("from handle search");
          // console.log(searchResults, 'this is the search results');
          // console.log(this.movies, 'this is this.movies');
          return this.movies;
        })
        .catch(function() {
          console.log("we have an error in handleSearch");
        });
    };
    
    return {
      movies: movies,
      watchList: watchList,
      handleSearch: handleSearch,
      searchString: searchString
    };
  });
