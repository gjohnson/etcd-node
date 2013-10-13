
var etcd = require('..');
var should = require('should');

describe('Commands', function () {

  describe('SET', function () {
    it('should set key with value', function (done) {
      etcd.set('hello', 'world', function (err, result) {
        should.not.exist(err);
        result.should.have.property('key', '/hello');
        result.should.have.property('action', 'SET');
        result.should.have.property('value', 'world');
        done();
      });
    });

    it('should set a key with ttl', function (done) {
      etcd.set('hai', 'there', { ttl: 1 }, function (err) {
        setTimeout(function () {
          etcd.get('hai', function (err) {
            err.should.have.property('message', 'Key Not Found');
            err.should.have.property('code', 100);
            err.should.have.property('cause', 'get: /hai');
            done();
          });
        }, 1050);
      });
    });
  });

  describe('GET', function () {
    it('should get key with value', function (done) {
      etcd.set('hi', 'bye');
      etcd.get('hi', function (err, result) {
        should.not.exist(err);
        result.should.have.property('action', 'GET');
        result.should.have.property('key', '/hi');
        result.should.have.property('value', 'bye');
        done();
      });
    });
  });

  describe('DEL', function () {
    it('should delete key', function (done) {
      etcd.set('yoo', 'bye');
      etcd.del('yoo', function (err, result) {
        should.not.exist(err);
        result.should.have.property('action', 'DELETE');
        result.should.have.property('key', '/yoo');
        result.should.have.property('prevValue', 'bye');
        done();
      });
    });
  });

  describe('LIST', function () {
    it('should list all keys under the prefix', function (done) {
      etcd.set('stuff/a', 'aaa', function () {
        etcd.set('stuff/b', 'bbb', function () {
          etcd.set('stuff/c', 'ccc', function () {
            etcd.list('stuff', function (err, result) {
              should.not.exist(err);
              result.should.have.instanceof(Array);
              result.should.have.length(3);
              result[0].should.have.property('action', 'GET');
              result[1].should.have.property('action', 'GET');
              result[2].should.have.property('action', 'GET');
              done();
            });
          });
        });
      });
    });
  });

});

/**
 * Little utility.
 */

function times(n, fn) {
  return function () {
    --n || fn.apply(null, arguments);
  };
}