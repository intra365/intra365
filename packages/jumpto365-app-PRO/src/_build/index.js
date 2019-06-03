var path = require("path")
var fs = require("fs-extra")
var json = require("format-json")

var filename = path.resolve(path.join(path.normalize(__dirname +  "/../.."),"package.json"))

var package = fs.readJSONSync(filename)
var BUILD = process.env["BUILD_BUILDID"]
console.log(process.env)
var buildInfo = BUILD ? ` - ${BUILD}` : ' - Beta'
package.subversion =  buildInfo
fs.writeFileSync (filename,json.plain( package))

console.log("Build number injected",buildInfo )    