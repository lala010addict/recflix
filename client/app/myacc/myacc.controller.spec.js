'use strict';

describe('Controller: MyaccCtrl', function () {

  // load the controller's module
  beforeEach(module('yoMovieApp'));

  var MyaccCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MyaccCtrl = $controller('MyaccCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
