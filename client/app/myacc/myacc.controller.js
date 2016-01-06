'use strict';

angular.module('yoMovieApp')
  .controller('MyaccCtrl', ['$scope', 'Auth', '$http', '$state', '$timeout', '$modal', '$log', function($scope, Auth, $http, $state, $timeout, $modal, $log) {
    $scope.getCurrentUser = Auth.getCurrentUser;
    $scope.name = $scope.getCurrentUser().name;
    $scope.userID = $scope.getCurrentUser()._id;
    $scope.movies = '';


    $scope.refresh = function() {
      $http.get('/api/users/me/movies')
        .success(function(data) {
          $scope.movies = data;
          console.log(data);
        })
        .error(function(data) {
          console.log('Error: ' + data);
        });
    };

    $scope.refresh();

$scope.any = function  () {
if($scope.movies.length === 0){
  return true
}
}

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

    //********************** delete movies ******************

    $scope.deleteMovie = function(id) {

      var r = confirm("Are you sure to delete??");
      if (r == true) {
        $http.delete('/api/movies/' + id)
          .success(function(data) {
            $scope.refresh();
            console.log('deleted')

          })
          .error(function(data) {

            console.log('Error: ' + data);
          });
      } else {
        console.log('')
      }
    }




  }]);
