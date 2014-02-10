
var etcd = require('..')('http://localhost:4001');

etcd.keys.set('/message', 'hello world', function (err, value, prev) {
  if (err) throw err;
  console.log('value: %s', value);
  console.log('prev: %s', prev);
});

