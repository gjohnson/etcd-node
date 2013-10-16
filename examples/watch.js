
var etcd = require('..');

// wait for it...

etcd.watch('some-test', function (err, result) {
  if (err) throw err;
  console.log('%j', result);
});

// later on...

setTimeout(function () {
  etcd.set('some-test', 'variation', function (err) {
    if (err) throw err;
  });
}, 100);