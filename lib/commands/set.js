
/**
 * Set.
 *
 * @param {String} key
 * @param {Mixed} value
 * @param {Function} cb
 * @return {Client}
 * @public
 */

module.exports = function set(key, value, cb) {
  this.request
  .post(this.url('keys', key))
  .type('form')
  .send({ value: value })
  .end(this.reply(cb));
  return this;
};