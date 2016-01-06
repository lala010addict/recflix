'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var movieCtrlStub = {
  index: 'movieCtrl.index',
  show: 'movieCtrl.show',
  create: 'movieCtrl.create',
  update: 'movieCtrl.update',
  destroy: 'movieCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var movieIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './movie.controller': movieCtrlStub
});

describe('Movie API Router:', function() {

  it('should return an express router instance', function() {
    movieIndex.should.equal(routerStub);
  });

  describe('GET /api/movies', function() {

    it('should route to movie.controller.index', function() {
      routerStub.get
        .withArgs('/', 'movieCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/movies/:id', function() {

    it('should route to movie.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'movieCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/movies', function() {

    it('should route to movie.controller.create', function() {
      routerStub.post
        .withArgs('/', 'movieCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/movies/:id', function() {

    it('should route to movie.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'movieCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/movies/:id', function() {

    it('should route to movie.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'movieCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/movies/:id', function() {

    it('should route to movie.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'movieCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
