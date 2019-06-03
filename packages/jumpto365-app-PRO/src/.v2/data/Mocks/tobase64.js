let fs = require("fs")
var base64 = require('file-base64');
 
base64.encode(__dirname + "/Jumpto365 Excel Tool v1.xlsx", function(err, base64String) {
  
  fs.writeFileSync(__dirname + "/Jumpto365 Excel Tool v1.json",JSON.stringify( base64String))

  process.exit(0)
});
