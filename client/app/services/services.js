angular.module('movieApp.services', [])

.factory('Search', function ($http) {
  var getMovies = function(movieName) {
    return $http({
      method: 'GET',
      url: 'api/movies/getRecommendations?title=%27' + movieName + '%27',
    })
    .then(function(resp) {
      //if (err) console.log(err);
      return resp.data;
    });
  };

  return {
    getMovies: getMovies
  };
})
.factory('Auth', function ($http, $location, $window) {
  // Don't touch this Auth service!!!
  // it is responsible for authenticating our user
  // by exchanging the user's username and password
  // for a JWT from the server
  // that JWT is then stored in localStorage as 'com.shortly'
  // after you signin/signup open devtools, click resources,
  // then localStorage and you'll see your token from the server
  var signinFB = function (user) {
    return $http({
      method: 'GET',
      url: '/auth/facebook/callback',
      data: user
    })
    .then(function (resp) {
      return resp.data.token;
    });
  };

  var signup = function (user) {
    return $http({
      method: 'POST',
      url: '/api/users/signup',
      data: user
    })
    .then(function (resp) {
      return resp.data.token;
    });
  };

  var isAuth = function () {
    return !!$window.localStorage.getItem('com.shortly');
  };

  var signout = function () {
    $window.localStorage.removeItem('com.shortly');
    $location.path('/signin');
  };


  return {
    signinFB: signinFB,
    signup: signup,
    isAuth: isAuth,
    signout: signout
  };
});

