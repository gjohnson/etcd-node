
/**
 * Dependencies.
 */

var util = require('util');

/**
 * Export.
 */

exports.ClientError = ClientError;

/**
 * Client Error.
 */

function ClientError(error) {
  this.message = error.message;
  this.code = error.errorCode;
  this.cause = error.cause;
  Error.call(this);
}

util.inherits(ClientError, Error);
