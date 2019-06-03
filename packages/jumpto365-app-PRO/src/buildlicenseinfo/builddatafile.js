var XLSX = require("xlsx");
var excel = XLSX.readFile("/Users/niels/Documents/Hexatown/JumpTo365 Administration - Documents/Tools/O365 Services by License.xlsx");
var fs = require("fs");
var json = require("format-json")
var _ = require("lodash")

console.log("SheetNames");
excel.SheetNames.forEach(function (s) {
    console.log(s);
});





var liveSheet = excel.Sheets["Live Copy"]
var live = XLSX.utils.sheet_to_json(liveSheet)

var licenses = {


}
services = {

}

var map = {}
licenses["Business Essentials"] = {yes:[],no:[],soon:[]}
licenses["Business"]= {yes:[],no:[],soon:[]}
licenses["Business Premium"]= {yes:[],no:[],soon:[]}
licenses["Enterprise E1"]= {yes:[],no:[],soon:[]}
licenses["Enterprise E3"]= {yes:[],no:[],soon:[]}
licenses["Enterprise E5"]= {yes:[],no:[],soon:[]}
licenses["Enterprise F1"]= {yes:[],no:[],soon:[]}
licenses["Edu A1"]= {yes:[],no:[],soon:[]}
licenses["Edu A3"]= {yes:[],no:[],soon:[]}
licenses["Edu A5"]= {yes:[],no:[],soon:[]}
licenses["US Gov G1"]= {yes:[],no:[],soon:[]}
licenses["US Gov G3"]= {yes:[],no:[],soon:[]}
licenses["US Gov G5"]= {yes:[],no:[],soon:[]}
licenses["US Gov F1"]= {yes:[],no:[],soon:[]}

live.forEach(row => {
    if (row.__EMPTY !== "SERVICES" && row.__EMPTY !== "FEATURES" && row.__EMPTY !== "Other"&& row.__EMPTY !== "Options"){
        var keys = _.keys(row)
        keys.forEach(key => {
            if (key !== "__EMPTY"){
                let val = row[key].toLowerCase()

                if (key === "MAP"){
                    map[row.__EMPTY] = val
                }
                else
                {
                
                
                try {
                    licenses[key][val].push(row.__EMPTY)    
                } catch (error) {
                    console.log("Error at ", key,val,row.__EMPTY)    
                }
            }
            }
        });

    }
});

live.forEach(row => {
    if (row.__EMPTY !== "SERVICES" && row.__EMPTY !== "FEATURES" && row.__EMPTY !== "Other"&& row.__EMPTY !== "Options"){
        var keys = _.keys(row)
        keys.forEach(key => {
            if (!services[row.__EMPTY]){
                services[row.__EMPTY] = { yes : [], soon: [], no : []}
            }
            
            if (key !== "__EMPTY"){
                let val = row[key].toLowerCase()
                
                console.log(key,val,row.__EMPTY)

                try {
                    services[row.__EMPTY][val].push(key)
                } catch (error) {
                    console.log("Error at ", key,val,row.__EMPTY)    
                }

            }
        });

    }
});


fs.writeFileSync(__dirname + "/../data/service.json", json.plain({map,services,licenses}))
fs.writeFileSync(__dirname + "/../data/service-licenses.json", json.plain(services))
fs.writeFile(__dirname + "/../data/licenses-service.json", json.plain(licenses), function (err) {
    if (err) {
        console.log(err);
        process.exit(1);
    }
    process.exit(0);
});

