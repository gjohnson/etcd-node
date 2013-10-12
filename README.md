
# etcd-node

An alternative client library for interacting with etcd from node.js (without coffeescrpt). If you don't mind having coffeescript dependencies, [there is already is a module for that](https://github.com/stianeikeland/node-etcd).

## Notice

This is not stable at all, I am writing this module as I learn about [etcd](http://coreos.com/docs/guides/etcd/), feel free to help!

## Example

Write me...

```js
var etcd = require('etcd');

etcd.set('hello', 'world');

etcd.get('hello', function (err, value) {
  if (err) throw err;
  console.log(value);
});
```

## License

MIT