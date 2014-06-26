var require = patchRequire(require)
  , logger = require('casper').create()
  , instance = null
  , options = {}
  ;

exports.create = function(inst, opts){
  instance = inst;
  options = opts;
  logger.start();
  logger.then(function(){
    if (exports.queue.length) {
      var message = exports.queue.shift();
      instance.log(message.data, message.level);
      if (options.url) {
        this.open(options.url, { method:'post', data:message });
      }
    }
    this.wait((options.interval ? options.interval : 1000), arguments.callee);
  });
  logger.run();
  return exports;
};

exports.debug = function(message){
  exports.queue.push({ data:message, level:'debug' });
};

exports.info = function(message){
  exports.queue.push({ data:message, level:'info' });
};

exports.warn = function(message){
  exports.queue.push({ data:message, level:'warn' });
};

exports.error = function(message){
  exports.queue.push({ data:message, level:'error' });
};

exports.queue = [];
