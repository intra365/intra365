
var json = require("format-json")
var fs = require("fs")
var Excel = require("../Excel")
var filename =  "/Jumpto365 Excel Tool v1.xlsx"
var jsonData = Excel.WhichToolWhen.toJSON(__dirname +filename)

var jsonPretty = json.plain(jsonData)
fs.writeFileSync(__dirname +filename+'.json',jsonPretty)

