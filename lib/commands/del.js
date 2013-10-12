
/**
 * Delete.
 *
 * @param {String} key
 * @param {Function} cb
 * @return {Client}
 * @public
 */

module.exports = function del(key, cb) {
  this.request
  .del(this.url('keys', key))
  .end(this.reply(cb));
  return this;
};