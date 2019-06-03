var XLSX = require("xlsx");
var fs = require("fs");
var json = require("format-json")


function buildTranslations(){
    console.log("Converting")
    var excel = XLSX.readFile("/Users/niels/Documents/Hexatown/JumpTo365 Administration - Documents/Tools/systemtranslations.xlsx");

    
    var sidebarSheet = excel.Sheets["System"]
    var sidebar = XLSX.utils.sheet_to_json(sidebarSheet)


    fs.writeFileSync(__dirname + "/translations.json", json.plain(sidebar));

}

module.exports = {
    buildTranslations
}

//
buildTranslations()