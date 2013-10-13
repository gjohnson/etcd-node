
/**
 * Set.
 *
 * @param {String} key
 * @param {Mixed} value
 * @param {Function} cb
 * @return {Client}
 * @public
 */

module.exports = function (key, value, options, cb) {
  if ('function' === typeof options) {
    cb = options;
    options = {};
  }

  if (!options) {
    options = {};
    cb = function(){};
  }

  var req = this.request
  .post(this.url('keys', key))
  .type('form')
  .send({ value: value });

  if (options.ttl) req.send({ ttl: options.ttl })
  if (options.prevValue) req.send({ prevValue: options.prevValue });

  return req.end(this.reply(cb));;
};