
/**
 * Statistics Module
 *
 * https://github.com/coreos/etcd/blob/master/Documentation/api.md#statistics
 */

module.exports = function (client) {
  client.stats = {
    leader: function (callback) {
      return client.get('/v2/stats/leader', null, null, callback);
    },
    self: function (callback) {
      return client.get('/v2/stats/self', null, null, callback);
    },
    store: function (callback) {
      return client.get('/v2/stats/store', null, null, callback);
    }
  };
};
