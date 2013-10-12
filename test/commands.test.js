
var etcd = require('..');
var should = require('should');

describe('Commands', function () {
  describe('SET', function () {
    it('should set key with value', function (done) {
      etcd.set('hello', 'world', function (err, value) {
        should.not.exist(err);
        value.should.equal('world');
        done();
      });
    });
  });

  describe('GET', function () {
    it('should get key with value', function (done) {
      etcd.set('hi', 'bye');
      etcd.get('hi', function (err, value) {
        should.not.exist(err);
        value.should.equal('bye');
        done();
      });
    });
  });
});