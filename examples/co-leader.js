
var etcd = require('..')('http://localhost:4001');
var co = require('co');

co(function *() {
  try {
    var leader = yield etcd.stats.leader();
    var self = yield etcd.stats.self();
    console.log('leader: %j', leader);
    console.log('self: %j', self);
  } catch (err) {
    console.error(err);
  }
})();
