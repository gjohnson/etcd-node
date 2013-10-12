
/**
 * List.
 *
 * @param {String} prefix
 * @param {Function} cb
 * @return {Client}
 * @public
 */

module.exports = function get(prefix, cb) {
  this.request
  .get(this.url('keys', prefix))
  .end(this.reply(cb));
  return this;
};