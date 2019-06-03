var XLSX = require("xlsx");
var excel = XLSX.readFile(__dirname + "/fasttrack.xlsx");
var fs = require("fs");
var json = require("format-json")
var _ = require("lodash")

var fasttrackSheet = excel.Sheets["fasttrack"]
var fasttrack = XLSX.utils.sheet_to_json(fasttrackSheet)
var usecases = {
    categories: [],
    tools: []
}

function checkLookup(collection, element,id) {

    if (!element) return

//    if (Array.isArray(element)) {
        var categories = element.split(",")
        categories.forEach(category => {
            var key = category.trim()
            var existing = _.find(collection, function (o) {                return o.key === key            })
            if (!existing ) {
                collection.push({key:key,links : [id]})
            }
            else
            {
                existing.links.push(id)
            }
        })
    // } else {
    //     if (_.indexOf(collection, element) < 0) {
    //         collection.push(element)
    //     }
    // }
}

fasttrack.forEach(element => {
    checkLookup(usecases.categories, element.Category,element.id)
    checkLookup(usecases.tools, element.Featuring,element.id)
})

usecases.list = fasttrack


fs.writeFile(__dirname + "/fasttrack.json", json.plain(usecases), function (err) {
    if (err) {
        console.log(err);
        process.exit(1);
    }
    process.exit(0);
});