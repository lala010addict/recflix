angular.module('movieApp', [
  'movieApp.services',
  'movieApp.movies',
  'movieApp.search',
  'movieApp.auth',
  'ngRoute'
])
// routes: '/', '/login', '/signup', 
.config(function($routeProvider, $httpProvider) {
  $routeProvider
    .when('/signin', {
      templateUrl: 'client/app/auth/signin.html', // template for ng-view
      controller: 'AuthController'
    })
    .when('/signup', {
      templateUrl: 'client/app/auth/signup.html',
      controller: 'AuthController'
    })
    .when('/', {
      templateUrl: 'app/static/movie.html',
      controller: 'MovieController'
    }).
    otherwise({
      redirectTo: '/'
    });
    // Your code here

    // We add our $httpInterceptor into the array
    // of interceptors. Think of it like middleware for your ajax calls
})
.factory('AttachTokens', function ($window) {

})
.run(function ($rootScope, $location, Auth) {
  // here inside the run phase of angular, our services and controllers
  // have just been registered and our app is ready
  // however, we want to make sure the user is authorized
  // we listen for when angular is trying to change routes
  // when it does change routes, we then look for the token in localstorage
  // and send that token to the server to see if it is a real user or hasn't expired
  // if it's not valid, we then redirect back to signin/signup
  $rootScope.$on('$routeChangeStart', function (evt, next, current) {
    if (next.$$route && next.$$route.authenticate && !Auth.isAuth()) {
      $location.path('/signin');
    }
  });
});
