angular.module('movieApp.toWatch', [])

.controller('ToWatchController', function ($scope, $location, Movies) {
  $scope.watchList = Movies.watchList;
  $scope.removeFromWatchList = function() {
    $scope.watchList.splice([$scope.watchList.indexOf(this.movie)], 1);
  };
  
});
