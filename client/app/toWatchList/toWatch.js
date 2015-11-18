angular.module('movieApp.toWatch', [])

.controller('ToWatchController', function ($scope, $location, Movies) {
  $scope.watchList = Movies.watchList;
  
});
