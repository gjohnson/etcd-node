
# etcd-node

An alternative client library for interacting with etcd from node.js (without coffeescrpt). If you don't mind having coffeescript dependencies, [there is already is a module for that](https://github.com/stianeikeland/node-etcd).

## Notice

This is not stable at all! I am writing this module as I learn more about [etcd](http://coreos.com/docs/guides/etcd/), feel free to [help](https://github.com/gjohnson/etcd-node/issues)!

## Install

```sh
$ npm install etcd
```

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

### .set(string, mixed, [options], [callback])

```js
etcd.set('hello', 'world', function (err) {
  if (err) throw err;
});
```

Set with a TTL:

```js
etcd.set('hello', 'world', { ttl: 5 }, function (err) {
  if (err) throw err;
});
```

Set using a "setAndTest":

```js
etcd.set('hello', 'world', { prev: 'world' }, function (err) {
  if (err) throw err;
});
```

### .get(string, [callback])

```js
etcd.get('hello', function (err, result) {
  if (err) throw err;
  assert(result.value);
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
etcd.list('prefix', function (err, items) {
  if (err) throw err;
});
```

### .watch(string, [callback])

```js
etcd.watch('prefix', function (err) {
  if (err) throw err;
});
```

### .machines(callback)

```js
etcd.machines(function (err, list) {
  if (err) throw err;
});
```

### .leader(callback)

```js
etcd.leader(function (err, host) {
  if (err) throw err;
});
```

## TODO

  - encoding (json|string)

## License

MIT