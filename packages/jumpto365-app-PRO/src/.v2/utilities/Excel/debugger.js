var Excel = require(".")
var path = require("path")
var fs = require("fs-extra")
var json = require("format-json")
Excel.parsePTO(path.join(  __dirname ,"pto-en.xlsx"),"of Office365")
.then(data => {
    fs.writeFileSync(path.join(__dirname,"pto.json"),json.plain(data))
    console.log(data)
})
.catch(err=>{
    console.log(err)

})
