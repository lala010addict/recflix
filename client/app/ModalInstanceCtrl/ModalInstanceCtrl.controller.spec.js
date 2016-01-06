'use strict';

describe('Controller: ModalInstanceCtrlCtrl', function () {

  // load the controller's module
  beforeEach(module('yoMovieApp'));

  var ModalInstanceCtrlCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ModalInstanceCtrlCtrl = $controller('ModalInstanceCtrlCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
