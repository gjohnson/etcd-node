
/**
 * Watch.
 *
 * @param {String} key
 * @param {Function} cb
 * @return {Client}
 * @public
 */

module.exports = function del(key, cb) {
  return this.request
  .get(this.url('watch', key))
  .end(this.reply(cb));
};