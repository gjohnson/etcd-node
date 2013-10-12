
/**
 * Dependencies.
 */

var fs = require('fs');
var path = require('path');
var util = require('util');
var errors = require('./errors');
var request = require('superagent');

/**
 * Initialize a new client.
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
  this.port = settings.port || 4001;
  this.host = settings.host || '127.0.0.1';
  this.ssl = false;
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
        err = new errors.ClientError(JSON.parse(res.text));
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
 * Noop.
 */

function noop(){}

/**
 * Autoload commands.
 */

var root = path.join(__dirname, 'commands');
var re = /\.js/;

fs.readdirSync(root)
.filter(function(file){
  return re.test(file);
})
.forEach(function(file){
  var name = file.replace(re, '');
  var fn = require(path.join(root, file));
  Client.prototype[name] = fn;
});

/**
 * Export as a singleton.
 */

module.exports = new Client;