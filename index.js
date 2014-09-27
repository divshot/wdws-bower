var bower = require("bower");

module.exports = function() { return function(server, cmd) {
  var config = {
    cwd: server.provider.root
  };
  
  cmd('install', function(params, fn) {
    var socket = this;
    
    bower.commands.install(params.packages, {save: params.save, forceLatest: params.forceLatest}, config).on('end', function(installed) {
      console.log('ended')
      fn(null, installed);
    }).on('error', function(err) {
      fn(err);
    }).on('log', function(log) {
      console.log(">>> bower.install:log", log.message);
      socket.pm(params.pid, 'log', log.message);
    });
  });
  
  cmd('list', function(params, fn) {
    var socket = this;
    
    bower.commands.list({paths: true}, config).on('end', function(list) {
      fn(null, list);
    }).on('error', function(err) {
      fn(err);
    });
  });
    
}}