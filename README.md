```
var casper = require('casper').create({
    verbose: true,
    logLevel: 'debug'
});

var logger = require('./logger').create(casper, {
  url:'http://requestb.in/x5fbd5x5'
});

casper.start('http://casperjs.org/', function() {
  logger.info(this.getTitle());
});

casper.thenOpen('http://phantomjs.org', function() {
  logger.debug(this.getTitle());
});

casper.run(function(){
  // this.exit();
});

```