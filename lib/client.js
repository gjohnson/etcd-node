
/**
 * Dependencies.
 */

var util = require('util');
var request = require('superagent');
var EventEmitter = require('events').EventEmitter;

/**
 * Initialize a new client.
 */

function Client(opts) {
  EventEmitter.call(this);
  this.version = 'v1';
  this.configure(opts || {});
}

/**
 * Inherits `EventEmitter`.
 */

util.inherits(Client, EventEmitter);

/**
 * Set connection options.
 *
 * Settings:
 *
 *  - port
 *  - host
 *
 * TODO: ssl
 *
 * @param {Object} opts
 * @return {Client}
 * @public
 */

Client.prototype.configure = function (settings) {
  this.port = settings.port || 4001;
  this.host = settings.host || '127.0.0.1';
  this.ssl = false;
  return this;
};

/**
 * Set.
 *
 * @param {String} key
 * @param {Mixed} value
 * @param {Function} cb
 * @return {Client}
 * @public
 */

Client.prototype.set = function (key, value, cb) {
  request
  .post(this.url('keys', key))
  .type('form')
  .send({ value: value })
  .end(this.reply(cb));
  return this;
};

/**
 * Get.
 *
 * @param {String} key
 * @param {Function} cb
 * @return {Client}
 * @public
 */

Client.prototype.get = function (key, cb) {
  request
  .get(this.url('keys', key))
  .end(this.reply(cb));
  return this;
};

/**
 * Endpoint utility.
 *
 * @return {String}
 * @private
 */

Client.prototype.url = function () {
  var route = [].slice.call(arguments).join('/');
  var protocol = this.ssl ? 'https://' : 'http://';
  return protocol
    + this.host
    + ':'
    + this.port
    + '/'
    + this.version
    + '/'
    + route;
};

/**
 * Reply utility.
 *
 * TODO: make body parsing not so ghetto.
 *
 * @param {Function} cb
 * @return {Function}
 * @private
 */

Client.prototype.reply = function (cb) {
  cb = cb || noop;
  return function (err, res) {
    if (err) return cb(err);

    if (res.error) {
      try {
        err = new ClientError(JSON.parse(res.text));
      } catch (e) {
        err = res.error;
      } finally {
        cb(err);
        return;
      }
    }

    cb(null, JSON.parse(res.text).value);
  };
};

/**
 * Custom Error.
 *
 * TODO: breakout once I understand all the errors.
 */

function ClientError(error) {
  this.message = error.message;
  this.code = error.errorCode;
  this.cause = error.cause;
  Error.call(this);
}

/**
 * Inherits `Error`.
 */

util.inherits(ClientError, Error);

/**
 * Noop.
 */

function noop(){}

/**
 * Export as a singleton.
 */

module.exports = new Client;