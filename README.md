
# etcd-node

An alternative client library for interacting with etcd from node.js (without coffeescrpt). If you don't mind having coffeescript dependencies, [there is already is a module for that](https://github.com/stianeikeland/node-etcd).

## Notice

This is not stable at all! I am writing this module as I learn more about [etcd](http://coreos.com/docs/guides/etcd/), feel free to [help](https://github.com/gjohnson/etcd-node/issues)!


## Configuring.

I made the client a singleton for the time being (up for suggestions). If you need to set `host` or `port`, use the `configure` method.

```js
var etcd = require('etcd');

etcd.configure({
  host: '127.0.0.1',
  port: 40001
});
```

*NOTE: I still need to add SSL support.*

## Commands

I am still implementing commands, but here is what we have so far:

### .set(string, mixed, [callback])

```js
etcd.set('hello', 'world', function (err) {
  if (err) throw err;
});
```

### .get(string, [callback])

```js
etcd.get('hello', function (err) {
  if (err) throw err;
});
```

### .del(string, [callback])

```js
etcd.del('hello', function (err) {
  if (err) throw err;
});
```

### .list(string, [callback])

```js
etcd.set('prefix', function (err) {
  if (err) throw err;
});
```

## TODO

  - watch
  - encoding (json|string)
  - testAndSet

## License

MIT