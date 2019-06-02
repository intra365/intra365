var XLSX = require("xlsx");
var excel = XLSX.readFile(__dirname + "/Microsoft Online Service Terms.xlsx");
var fs = require("fs");
var json = require("format-json")

console.log("SheetNames");
excel.SheetNames.forEach(function (s) {
    console.log(s);
});



function buildFile(translation) {
    const tableData = [];

    function CopyCell(cell, key) {
        tableData.forEach(function (row) {
            row.columns.forEach(function (element) {
                if (element.id === key) {
                    element.title = cell.Title
                    element.descriptor = cell.Descriptor
                    element.subtitle = cell.Subtitle ? cell.Subtitle : ""
                    element.image = cell.Image
                    element.type = cell.Type ? cell.Type  : "service"
                    element.color = cell.Color
                    element.ispremium = cell.Premium == "Yes"
                    element.link = cell.Link ? cell.Link : ""
                    element.linkLanguage = cell.LinkLanguage
                    element.shareable = cell.Shareable ? cell.Shareable : ""
                }
            }, this);
        }, this);
    };


    
    return tableData;
}

function buildLanguage(lang,excel){
    var en = excel.Sheets[lang]
    var text = XLSX.utils.sheet_to_json(en)
    return { language: lang,data :buildFile(text)}
}

var OST = excel.Sheets["OST"]
var ost = XLSX.utils.sheet_to_json(OST)

// var sidebarSheet = excel.Sheets["Sidebar"]
// var sidebar = XLSX.utils.sheet_to_json(sidebarSheet)

// var data = buildLanguage("OST",excel);

fs.writeFile(__dirname + "/terms.json", json.plain(ost), function (err) {
    if (err) {
        console.log(err);
        process.exit(1);
    }
    process.exit(0);
});

