
module.exports = process.env.ETCD_COV
  ? require('./lib-cov/client')
  : require('./lib/client');