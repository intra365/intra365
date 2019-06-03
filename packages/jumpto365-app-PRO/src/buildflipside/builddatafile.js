var XLSX = require("xlsx");
var excel = XLSX.readFile(__dirname + "/flipside.xlsx");
var fs = require("fs");
var json = require("format-json")

console.log("SheetNames");
excel.SheetNames.forEach(function (s) {
    console.log(s);
});

var data = []
data.push(XLSX.utils.sheet_to_json(excel.Sheets["en"]));

fs.writeFile(__dirname + "/../components/FlipSide/services.json", json.plain(data), function (err) {
    if (err) {
        console.log(err);
        process.exit(1);
    }
    process.exit(0);
});

