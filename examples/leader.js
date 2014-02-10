
var etcd = require('..')('http://localhost:4001');

etcd.stats.leader(function (err, leader) {
  if (err) throw err;
  console.log(leader);
});

