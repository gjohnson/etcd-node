
var etcd = require('..');
var should = require('should');

describe('keys', function () {
  var client;

  beforeEach(function () {
    client = etcd('http://localhost:4001');
  });

  describe('#set(key, value, callback)', function () {
    it('should set the value', function (done) {
      client.keys.set('/message', 'hi', function (err, value) {
        if (err) return done(err);
        value.should.equal('hi');
        done();
      });
    });

    it('should return the prev value', function (done) {
      client.keys.set('/message', 'yo', function (err, value, prev) {
        if (err) return done(err);
        value.should.equal('yo');
        prev.should.equal('hi');
        done();
      });
    });
  });

  describe('#get(key, callback)', function () {
    describe('when "key" already exists', function () {
      it('should get the existing value', function (done) {
        client.keys.set('/message', 'hi', function (err) {
          if (err) return done(err);
          client.keys.get('/message', function (err, value) {
            if (err) return done(err);
            value.should.equal('hi');
            done();
          });
        });
      });
    });

    describe('when "key" does not exist', function () {
      it('should get undefined', function (done) {
        client.keys.get('/noop', function (err, value) {
          if (err) return done(err);
          should.equal(value, undefined);
          done();
        });
      });
    });
  });

  describe('#del(key, callback)', function () {
    describe('when "key" already exists', function () {
      it('should get the prev value and remove it', function (done) {
        client.keys.set('/message', 'hi', function (err) {
          if (err) return done(err);
          client.keys.del('/message', function (err, prev) {
            if (err) return done(err);
            prev.should.equal('hi');
            client.keys.get('/message', function (err, value) {
              if (err) return done(err);
              should.equal(value, undefined);
              done();
            });
          });
        });
      });
    });

    describe('when "key" does not exist', function () {
      it('should get an error', function (done) {
        client.keys.del('/noop', function (err, value) {
          should.exist(err);
          err.should.have.property('message', 'Key not found');
          done();
        });
      });
    });
  });

  describe('#watch(key)', function () {
    it('should event multiple events on change', function (done) {
      var key = client.keys.watch('/tick');
      var values = [];

      key.on('change', function (value) {
        var n = values.push(value);
        if (2 == n) {
          values[0].should.equal('a');
          values[1].should.equal('b');
          done();
        } else {
          write('b');
        }
      });

      write('a');

      function write (value) {
         client.keys.set('/tick', value, function (err) {
          if (err) return done(err);
        });
      }
    });
  });
});
