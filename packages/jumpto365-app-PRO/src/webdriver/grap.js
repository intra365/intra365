var webdriverio = require('webdriverio');
var commander = require('commander');

var options = {
    desiredCapabilities: {
        browserName: 'chrome'
    }
};

console.log( process.argv)
var width = process.argv[2];
var height = process.argv[3];
console.log(width+"px*"+height+"px")

webdriverio
  .remote(options)
  .init()
  .setViewportSize({
    width: width,
    height: height
    })
  .url('http://localhost:5000')
  .saveScreenshot('image-'+width+'.png') 
  .end();