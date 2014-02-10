
/*!
 * Module dependencies.
 */

var url = require('url');
var util = require('util');
var assert = require('assert');
var request = require('request');
var defaults = require('defaults');
var thunkify = require('thunkify');
var debug = require('debug')('etcd:client');

/**
 * Export `Client`.
 */

module.exports = Client;

/**
 * Default settings.
 *
 * @var {Object}
 * @private
 */

var settings = {
  reconnect: false,
  ssl: false
};

/**
 * Initialize a new client for `url` with `options`.
 *
 * @param {Object} options
 * @constructor
 */

function Client (url, options) {
  if (!(this instanceof Client)) return new Client(url, options);
  this.url = url;
  this.options = defaults(options || {}, settings);
  this.use(require('./mixins/stats'));
  this.use(require('./mixins/keys'));
}

/**
 * Mixes-in the `plugin`
 *
 * @param {Function} plugin
 * @private
 */

Client.prototype.use = function (plugin) {
  plugin(this);
};

/**
 * GET sugar.
 *
 * @see `request`.
 */

Client.prototype.get = function (path, qs, data, callback) {
  return this.request('GET', path, qs, data, callback);
};

/**
 * PUT sugar.
 *
 * @see `request`.
 */

Client.prototype.put = function (path, qs, data, callback) {
  return this.request('PUT', path, qs, data, callback);
};

/**
 * POST sugar.
 *
 * @see `request`.
 */

Client.prototype.post = function (path, qs, data, callback) {
  return this.request('POST', path, qs, data, callback);
};

/**
 * DELETE sugar.
 *
 * @see `request`.
 */

Client.prototype.del = function (path, qs, data, callback) {
  return this.request('DELETE', path, qs, data, callback);
};

/**
 * Low level requests.
 *
 * @param {String} method
 * @param {String} path
 * @param {Object} qs
 * @param {Object} data
 * @param {Function} [callback]
 * @private
 */

Client.prototype.request = function (method, path, qs, data, callback) {
  var options = {
    url: this.url + path,
    qs: qs,
    method: method,
    form: data,
    json: true,
  };

  var thunk = thunkify(send);

  function send (callback) {
    request(options, function (err, res, body) {
      if (err) return callback(err);
      // TODO: handle master redirects
      if (307 === res.statusCode) {
        debug('direct -- %s', res.headers.location);
        return callback(new Error('not implemented'));
      }
      callback(null, body);
    });
  }

  return callback
    ? thunk(callback)
    : thunk;
};
