
var etcd = require('..');

etcd
.set('foo', 'hi')
.get('foo', function (err, result) {
  if (err) console.log(err);
  else console.log(result);
});