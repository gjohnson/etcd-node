
var etcd = require('..');

describe('stats', function () {
  var client;

  beforeEach(function () {
    client = etcd('http://localhost:4001');
  });

  describe('#leader(callback)', function () {
    it('should get the "leader" stats', function (done) {
      client.stats.leader(function (err, info) {
        if (err) return done(err);
        info.should.have.property('leader');
        info.should.have.property('followers');
        done();
      });
    });
  });

  describe('#self(callback)', function () {
    it('should get the "self" stats', function (done) {
      client.stats.self(function (err, info) {
        if (err) return done(err);
        info.should.have.property('name');
        info.should.have.property('leaderInfo');
        info.should.have.property('recvAppendRequestCnt');
        //info.should.have.property('recvBandwidthRate');
        //info.should.have.property('recvPkgRate');
        info.should.have.property('sendAppendRequestCnt');
        info.should.have.property('startTime');
        info.should.have.property('state');
        done();
      });
    });
  });

  describe('#store(callback)', function () {
    it('should get the "store" stats', function (done) {
      client.stats.store(function (err, info) {
        if (err) return done(err);
        info.should.have.property('compareAndSwapFail');
        info.should.have.property('compareAndSwapSuccess');
        info.should.have.property('createFail');
        info.should.have.property('createSuccess');
        info.should.have.property('deleteFail');
        info.should.have.property('deleteSuccess');
        info.should.have.property('expireCount');
        info.should.have.property('getsFail');
        info.should.have.property('getsSuccess');
        info.should.have.property('setsFail');
        info.should.have.property('setsSuccess');
        info.should.have.property('updateFail');
        info.should.have.property('updateSuccess');
        info.should.have.property('watchers');
        done();
      });
    });
  });
});
