<<<<<<< HEAD
angular.module('movieApp.services', ['$rootScope', '$window', '$http',
  function($rootScope, $window, $http) {
    var session = {
      init: function() {
        this.resetSession();
      },
      resetSession: function() {
        this.currentUser = null;
        this.isLoggedIn = false;
      },
      facebookLogin: function() {
        var url = '/auth/facebook',
          width = 1000,
          height = 650,
          top = (window.outerHeight - height) / 2,
          left = (window.outerWidth - width) / 2;
        $window.open(url, 'facebook_login', 'width=' + width + ',height=' + height + ',scrollbars=0,top=' + top + ',left=' + left);
      },
      logout: function() {
        var scope = this;
        $http.delete('/auth').success(function() {
          scope.resetSession();
          $rootScope.$emit('session-changed');
        });
      },
      authSuccess: function(userData) {
        this.currentUser = userData;
        this.isLoggedIn = true;
        $rootScope.$emit('session-changed');
      },
      authFailed: function() {
        this.resetSession();
        alert('Authentication failed');
      }
    };
    session.init();
    return session;
  }
]);
=======
angular.module('movieApp.services', [])

.factory('Links', function ($http) {
  // Your code here
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
    signin: signin,
    signup: signup,
    isAuth: isAuth,
    signout: signout
  };
});
>>>>>>> b28a4c5cb73b19797eaee2a66472676e28e32df2
