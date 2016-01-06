'use strict';

angular.module('yoMovieApp')
  .controller('MainController', ['$scope', '$http', '$stateParams', '$state', function($scope, $http, $stateParams, $state) {

    $scope.films = '';
    $scope.msg = ''
    $scope.getMovies = function(movieName) {
      $scope.msg = 'seaching...'
      $http.get('api/movies/getRecommendations?title=%27' + movieName + '%27')
        .success(function(data) {

          $scope.films = data;
          $stateParams.movieName = movieName
        })
        .then(function() {
          $state.go('movies', $stateParams)
        })
        .catch(function(err) {
          console.log('Error: ' + err);
        })

    }

  }])
