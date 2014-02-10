
/*!
 * Module dependencies.
 */

var EventEmitter = require('events').EventEmitter;

/**
 * Key Space Operations.
 *
 * TODO: refactor key creation
 * TODO: refeactor url building
 * TODO: "directory" options / actions
 *
 * https://github.com/coreos/etcd/blob/master/Documentation/api.md#key-space-operations
 */

module.exports = function (client) {
  client.keys = {

    /**
     * SET.
     *
     * TODO: thunks
     *
     * @param {String} key
     * @param {Mixed} value
     * @param {Function} callback
     *
     * https://github.com/coreos/etcd/blob/master/Documentation/api.md#setting-the-value-of-a-key
     */

    set: function (key, value, options, callback) {
      if ('/' != key.charAt(0)) key = '/' + key;

      if ('function' == typeof options) {
        callback = options;
        options = {};
      }

      value = { value: value };

      if (options.ttl) {
        value.ttl = options.ttl;
      }

      client.put('/v2/keys' + key, null, value, function (err, body) {
        if (err) return done(err);
        var current = body.node.value;
        var prev = body.prevNode && body.prevNode.value;
        return callback(null, current, prev);
      });
    },

    /**
     * GET.
     *
     * TODO: thunks
     *
     * @param {String} key
     * @param {Function} callback
     *
     * https://github.com/coreos/etcd/blob/master/Documentation/api.md#get-the-value-of-a-key
     */

    get: function (key, options, callback) {
      if ('/' != key.charAt(0)) key = '/' + key;

      if ('function' == typeof options) {
        callback = options;
        options = {};
      }

      client.get('/v2/keys' + key, options, null, function (err, body) {
        if (err) return done(err);
        if (body.errorCode) {
          // https://github.com/gjohnson/etcd-node/issues/6
          if (100 === body.errorCode) {
            callback(null);
          }
        } else {
          var current = body.node.value;
          var prev = body.prevNode && body.prevNode.value;
          callback(null, current, prev);
        }
      });
    },

    /**
     * DELETE.
     *
     * TODO: centralize error handling
     * TODO: thunks
     *
     * @param {String} key
     * @param {Function} callback
     *
     * https://github.com/coreos/etcd/blob/master/Documentation/api.md#deleting-a-key
     */

    del: function (key, callback) {
      client.del('/v2/keys' + key, null, null, function (err, body) {
        if (err) return done(err);
        if (body.errorCode) {
          err = new Error(body.message);
          err.code = body.errorCode;
          err.cause = body.cause;
          callback(err);
        } else {
          callback(null, body.prevNode.value);
        }
      });
    },

    /**
     * WATCH.
     *
     * TODO: actually write an emitter so off cancels everything, etc.
     * this is just a quick hack.
     *
     * TODO: thunks
     *
     * @param {String} key
     * @param {Emitter} [emitter]
     */

    watch: function (key, emitter) {
      var self = this;
      emitter = emitter || new EventEmitter();

      this.get(key, { wait: true }, function (err, value) {
        if (err) return watcher.emit('error', err);
        emitter.emit('change', value);
        self.watch(key, emitter);
      });

      return emitter;
    },
  };
};
