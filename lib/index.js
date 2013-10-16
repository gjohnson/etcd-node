
/**
 * Dependencies.
 */

var fs = require('fs');
var path = require('path');
var Client = require('./client');

/**
 * Load commands.
 */

var root = path.join(__dirname, 'commands');
var re = /\.js/;

fs.readdirSync(root)
.filter(function(file){
  return re.test(file);
})
.forEach(function(file){
  var name = file.replace(re, '');
  var fn = require(path.join(root, file));
  Client.prototype[name] = fn;
});

/**
 * Export as singleton.
 */

module.exports = new Client();