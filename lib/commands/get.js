
/**
 * Get.
 *
 * @param {String} key
 * @param {Function} cb
 * @return {Client}
 * @public
 */

module.exports = function get(key, cb) {
  return this.request
  .get(this.url('keys', key))
  .end(this.reply(cb));
};