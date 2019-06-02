var data = require(".")
var json = require("format-json")
function cb(err,data){
    if (err) {
        console.error(err)
        process.exit(1)
    }
    console.log(json.plain( data))
    process.exit(0)

}

var key = 2
switch (key) {
    case 0:
        data.WhichTool.filterByArea('Collaboration',cb)     
        break;
    case 1:
        data.WhichTool.raw("",cb)
        break;
    case 2:
        data.WhichTool.filterByArea(['Collaboration','Communication'],cb)     
        break;

    default:
        cb("unknown key")
        break;
}

 
