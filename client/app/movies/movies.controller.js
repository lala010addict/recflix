'use strict';

angular.module('yoMovieApp')
  .controller('MoviesCtrl', ['$scope', 'Auth', '$state', '$http', '$timeout', '$modal', '$log', function($scope, Auth, $state, $http, $timeout, $modal, $log) {

    $scope.movies = '';
    $scope.err = ''



    $http.get('api/movies/getRecommendations?title=%27' + $state.params.movieName + '%27')
      .success(function(data) {
        $scope.movies = data;
        if ($scope.movies.length === 0) {
          $scope.err = 'No Movie Recommendations Found';
        }

      })
      .catch(function(err) {
        $scope.err = 'No Movie Recommendations Found';
        console.log('Error: ' + err);
      })



    //********************open modal************************
    $scope.open = function(_movie) {

      var modalInstance = $modal.open({
        controller: "ModalInstanceCtrlCtrl",
        templateUrl: 'ModalInstanceCtrl.html',
        resolve: {
          movie: function() {
            return _movie;
          }
        }
      });

    };


    //********************add to watchlist************************
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.getCurrentUser = Auth.getCurrentUser;



    $scope.list = function(movie) {
      movie.user_id = $scope.getCurrentUser()._id;
      if (Auth.isLoggedIn() === true) {
        $http.post('/api/movies', movie)
          .success(function(data) {
            $scope.getMyList();

          })
          .error(function(data) {

            console.log('Error: ' + data);
          });

      } else {
        $state.go('login');
      }
    };

    $scope.myWatchList = '';


    $scope.getMyList = function() {

      if (Auth.isLoggedIn() === true) {
        $http.get('/api/users/me/movies')
          .success(function(data) {
            $scope.myWatchList = data
          })
          .error(function(data) {
            console.log('Error: ' + data);
          });
      } else {
        console.log('')
      }

    };
    $scope.getMyList();


    $scope.checkIfAdded = function(title) {

      var answer = false;
      _.forEach($scope.myWatchList, function(item) {
        if (_.contains(item, title)) {
          answer = true;
        }
      })
      return answer;

    };


    //********************delete from watchlist************************
    $scope.delete = function(title) {
      var movie = _.find($scope.myWatchList, {
        'Title': title
      });

      var r = confirm("Are you sure to delete??");
      if (r == true) {
        $http.delete('/api/movies/' + movie._id)
          .success(function(data) {
            $scope.getMyList();
          })
          .error(function(data) {

            console.log('Error: ' + data);
          });
      } else {
        console.log('')
      }
    }




  }])
