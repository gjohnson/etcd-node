
/**
 * Dependencies.
 */

var utils = require('./utils');
var request = require('superagent');
var debug = require('debug')('etcd-node');

/**
 * Export.
 */

module.exports = Client;

/**
 * Initialize a new client.
 *
 * @see configure()
 */

function Client(opts) {
  this.version = 'v1';
  this.request = request;
  this.configure(opts || {});
}

/**
 * Configure connection options.
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
  this.host = settings.host || '127.0.0.1';
  this.port = settings.port || 4001;
  this.ssl = false;

  debug('configure - port:%s', this.port);
  debug('configure - host:%s', this.host);
  debug('configure - ssl:%s', this.ssl);

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
 * @param {Function} cb
 * @return {Function}
 * @private
 */

Client.prototype.reply = function (cb) {
  cb = cb || noop;
  return function (err, res) {
    if (err) return cb(err);

    if (res.error) {
      err = utils.error(res.text);
      debug('response error - %s', res.text);
      return cb(err.ignore ? err : null, {});
    }

    debug('response - %s', res.text);
    cb(null, JSON.parse(res.text));
  };
};

/**
 * Noop.
 */

function noop(){}