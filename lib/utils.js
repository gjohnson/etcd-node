
/**
 * Errors codes we can safely ignore.
 *
 * See: https://github.com/coreos/etcd/blob/master/error/error.go
 */

var ignored = [100];

/**
 * Parses the error text, decides what we
 * want to ignore or not. If this never gets
 * more complicated than this, we can just
 * move this back into client.
 *
 * @param {String} text
 * @return {Error}
 * @private
 */

exports.error = function (text) {
  var json = JSON.parse(text);
  var error = new Error(json.message);

  error.code = json.code;
  error.cause = json.cause;
  error.ignore = !!~ignored.indexOf(error.code);

  return error;
};