
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

  this.request
  .post(this.url('keys', key))
  .type('form')
  .send({ value: value })
  .send({ ttl: options && options.ttl })
  .end(this.reply(cb));

  return this;
};