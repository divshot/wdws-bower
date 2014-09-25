var bower = require("bower");

module.exports = function() { return function(server, cmd) {
    
  cmd('install', function(params, fn) {
    bower.commands.install(params.packages, {save: params.save}).on('end', function(installed) {
      fn(null, installed);
    }).on('error', function(err) {
      fn(err);
    });
  });
    
}}