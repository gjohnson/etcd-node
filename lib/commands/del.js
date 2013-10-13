
/**
 * Delete.
 *
 * @param {String} key
 * @param {Function} cb
 * @return {Client}
 * @public
 */

module.exports = function del(key, cb) {
  return this.request
  .del(this.url('keys', key))
  .end(this.reply(cb));
};