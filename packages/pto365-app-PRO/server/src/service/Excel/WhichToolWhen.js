var XLSX = require("xlsx");
var fs = require("fs");
var json = require("format-json")
var _ = require("lodash")
const axios = require("axios");
const http = require("https");

var url = "https://365adm-my.sharepoint.com/personal/niels_hexatown_com/_layouts/15/download.aspx?UniqueId=98100762-97fd-43cf-8f17-3f986ddc98b6&Translate=false&tempauth=eyJ0eXAiOiJKV1QiLCJhbGciOiJub25lIn0.eyJhdWQiOiIwMDAwMDAwMy0wMDAwLTBmZjEtY2UwMC0wMDAwMDAwMDAwMDAvMzY1YWRtLW15LnNoYXJlcG9pbnQuY29tQGRmOTZiOGM5LTUxYTEtNDBjZi1iOGIxLTQ1MTRiZThlOTY2OCIsImlzcyI6IjAwMDAwMDAzLTAwMDAtMGZmMS1jZTAwLTAwMDAwMDAwMDAwMCIsIm5iZiI6IjE1MjQ0ODA1NjIiLCJleHAiOiIxNTI0NDg0MTYyIiwiZW5kcG9pbnR1cmwiOiI1cWJjSHJ5QUNLUmRla2M3a1pZWjNwdDhOLzFzdFpvUmZCWFFrd2s0V3dvPSIsImVuZHBvaW50dXJsTGVuZ3RoIjoiMTQ4IiwiaXNsb29wYmFjayI6IlRydWUiLCJjaWQiOiJaR0V5WWpSbVpHWXRORFF5TVMwMFkyRTRMV0V4TldRdE5tTXdNR0ZoWXpVeE1HSmsiLCJ2ZXIiOiJoYXNoZWRwcm9vZnRva2VuIiwic2l0ZWlkIjoiWVRGaE0yUmpPVFV0T1RObFlTMDBaVGN3TFRnek5EY3RNakkxWWpRME1UYzVNV00zIiwiYXBwX2Rpc3BsYXluYW1lIjoiR3JhcGggZXhwbG9yZXIiLCJzaWduaW5fc3RhdGUiOiJbXCJrbXNpXCJdIiwiYXBwaWQiOiJkZThiYzhiNS1kOWY5LTQ4YjEtYThhZC1iNzQ4ZGE3MjUwNjQiLCJ0aWQiOiJkZjk2YjhjOS01MWExLTQwY2YtYjhiMS00NTE0YmU4ZTk2NjgiLCJ1cG4iOiJuaWVsc0BoZXhhdG93bi5jb20iLCJwdWlkIjoiMTAwM0JGRkQ5Q0VCNzY2NSIsInNjcCI6Im15ZmlsZXMud3JpdGUgYWxsZmlsZXMud3JpdGUgYWxsc2l0ZXMud3JpdGUgYWxscHJvZmlsZXMucmVhZCIsInR0IjoiMiIsInVzZVBlcnNpc3RlbnRDb29raWUiOm51bGx9.RCtnMk9oRmthNFN2T3RnUDgrUTN0cnFGS2syYVJhcTJvZkxDUGdSYyt0VT0&ApiVersion=2.0"
//const excelFileName = __dirname + "/wtw-sample.xlsx"
const excelFileName = __dirname + "/wtw-fasttrack.xlsx"

function download2(url, cb) {
    http.get(url, (res) => {
        //debugger
        const {
            statusCode
        } = res;
        const contentType = res.headers['content-type'];
        console.log(`The type of the file is : ${contentType}`)
        let error;
        if (statusCode !== 200) {
            error = new Error(`Request Failed.\n` +
                `Status Code: ${statusCode}`);
        }
        if (error) {
            console.error(error.message);
            // consume response data to free up memory
            res.resume();
            return;
        }
        res.setEncoding('binary');
        let rawData = '';
        res.on('data', (chunk) => {
            rawData += chunk;
        });
        res.on('end', () => {
            try {
                //const parsedData = xlsxToCSVFunction(rawData);
                // And / Or just put it in a file
                fs.writeFileSync(excelFileName, rawData, 'binary')
                console.log("done")
                // console.log(parsedData);
            } catch (e) {
                console.error(e.message);
            }
        });
    }).on('error', (e) => {
        console.error(`Got error: ${e.message}`);
    });
}

function download(url, cb) {



    axios({
        method: 'get',
        url: url,
        responseType: 'arraybuffer',
        headers: {
            'Accept': 'application/json'
        }
    })
        .then(response => {

            var x = Buffer.isBuffer(response.data)
            fs.writeFileSync(excelFileName, response.data, "UTF-8")

            process.exit(0)
            return cb(null, excelFileName)

        })
        .catch(error => {
            console.log(error);
            process.exit(1)
        });
}





function toJSON(data) {

    var excel = null
    if (data instanceof Buffer) {
        excel = XLSX.read(data, {
            type: "buffer"
        })
    } else {
        excel = XLSX.readFile(data)
    }
    var json = {
        sheets : []
    }
    excel.SheetNames.forEach(sheetName => {
        json.sheets.push(
            {name:sheetName,
            data:XLSX.utils.sheet_to_json(excel.Sheets[sheetName] )}
        )

    })

  
    return json
}

function detectFormat(data) {

    var excel = null
    if (data instanceof Buffer) {
        excel = XLSX.read(data, {
            type: "buffer"
        })
    } else {
        excel = XLSX.readFile(data)
    }


    if (excel.Sheets["WTW"]){
        return "WTW"
    }
    if (excel.Sheets["1.0"]){
        return "APQC"
    }
    
    return ""
}
/**
 * 
 * 
 * @param {any} data
 * Buffer or string 
 * @returns Promise containing WTW object
 */
function parseWTW(data) {

    return new Promise(function (resolve, reject) {
        var excel = null
        if (data instanceof Buffer) {
            excel = XLSX.read(data, {
                type: "buffer"
            })
        } else {
            excel = XLSX.readFile(data)
        }

        var toolList = XLSX.utils.sheet_to_json(excel.Sheets["Tools"])

        var liveSheet = excel.Sheets["WTW"]
        var map = []

        var areas = []
        var tools = []

        var area = null
        var subject = null

        for (var row = 1; row < 500; row++) {
            var preview = null
            var url = null
            var tags = null

            for (var col = 0; col < 100; col++) {
                var cellRef = XLSX.utils.encode_cell({
                    c: col,
                    r: row
                })
                var cell = liveSheet[cellRef]

                if (cell) {
                    var colHeaderRef = XLSX.utils.encode_cell({
                        c: col,
                        r: 0
                    })
                    var colHeader = liveSheet[colHeaderRef]
                    if (colHeader.v === "Preview") {
                        if (cell.t === "s" && cell.v !== "") {
                            preview = cell.v
                        }
                    }
                    if (colHeader.v === "Url") {
                        if (cell.t === "s" && cell.v !== "") {
                            url = cell.v
                        }
                    }
                    if (colHeader.v === "Tags") {
                        if (cell.t === "s" && cell.v !== "") {
                            tags = cell.v
                        }
                    }
                }
            }

            for (var col = 0; col < 100; col++) {
                var cellRef = XLSX.utils.encode_cell({
                    c: col,
                    r: row
                })
                var cell = liveSheet[cellRef]

                if (cell) {

                    if (col === 0) {
                        if (cell.t === "s" && cell.v !== "") {
                            area = cell.v
                            if (_.isUndefined(areas[area])) {
                                areas.push(area)
                            }
                        }
                    }
                    if (col === 1) {
                        if (cell.t === "s" && cell.v !== "") {
                            subject = cell.v
                        }
                    }
                    if (col > 1 && col < 7) {
                        var rating = 7 - col
                        var comment = null
                        if (cell.c !== undefined) {
                            comment = cell.c[0].t
                            console.log(1)
                        }
                        if (cell.l !== undefined) {
                            var toolValue = {
                                area,
                                subject,
                                rating,
                                preview,
                                url,
                                tags,
                                tool: cell.v,
                                link: cell.l.Target
                            }
                            if (comment) {
                                toolValue.comment = comment
                            }
                            var t = _.indexOf(tools, toolValue.tool)
                            if (t === -1) {
                                tools.push(toolValue.tool)
                            }

                            map.push(toolValue)
                        } else {
                            var valueArray = cell.v ? cell.v.split(",") : []
                            for (var v = 0; v < valueArray.length; v++) {
                                var toolValue = {
                                    area,
                                    subject,
                                    rating,
                                    preview,
                                    url,
                                    tags,
                                    tool: valueArray[v]
                                }
                                if (comment) {
                                    toolValue.comment = comment
                                }

                                var t = _.indexOf(tools, toolValue.tool)
                                if (t === -1) {
                                    tools.push(toolValue.tool)
                                }
                                map.push(toolValue)
                            }
                        }


                        //console.log(cellRef,cell)

                    }

                }
            }

        }


        // var groupedItems = _.groupBy(data.mapping,'subject')
        // var groupedAreas = _.groupBy(data.mapping,'area')
        // var groupedTools = _.groupBy(data.mapping,'tool')

        wtwData = {
            areas,
            tools,
            mapping: map,
            toolList
        }
        resolve(wtwData)


    })
}
/**
 * 
 * 
 * @param {any} data
 * Buffer or string 
 * @returns Promise containing WTW object
 */
function parseAPQC(data) {

    return new Promise(function (resolve, reject) {
        var excel = null
        if (data instanceof Buffer) {
            excel = XLSX.read(data, {
                type: "buffer"
            })
        } else {
            excel = XLSX.readFile(data)
        }

        var toolList = XLSX.utils.sheet_to_json(excel.Sheets["Glossary terms"])

        var liveSheet = excel.Sheets["8.0"]
        var map = []

        var areas = []
        var tools = []

        var area = null
        var subject = null

        for (var row = 1; row < 5000; row++) {
            var preview = null
            var url = null
            var tags = null
            var hierarchyID = ""

            for (var col = 0; col < 100; col++) {
                var cellRef = XLSX.utils.encode_cell({
                    c: col,
                    r: row
                })
                var cell = liveSheet[cellRef]

                if (cell) {
                    var colHeaderRef = XLSX.utils.encode_cell({
                        c: col,
                        r: 0
                    })
                    var colHeader = liveSheet[colHeaderRef]
                    if (colHeader.v === "Preview") {
                        if (cell.t === "s" && cell.v !== "") {
                            preview = cell.v
                        }
                    }
                    if (colHeader.v === "Url") {
                        if (cell.t === "s" && cell.v !== "") {
                            url = cell.v
                        }
                    }
                    if (colHeader.v === "Tags") {
                        if (cell.t === "s" && cell.v !== "") {
                            tags = cell.v
                        }
                    }
                    if (colHeader.v === "Hierarchy ID") {
                        if (cell.t === "s" && cell.v !== "") {
                            hierarchyID = cell.v
                        }
                    }


                    
                }
            }

            for (var col = 0; col < 100; col++) {
                var cellRef = XLSX.utils.encode_cell({
                    c: col,
                    r: row
                })
                var cell = liveSheet[cellRef]

                if (cell) {

                    if (col === 1) {
                        if (cell.t === "s" && cell.v !== "") {
                            area = cell.v
                            var Levels = area.split(".")
                            area = Levels[0]
                            if (_.isUndefined(areas[area])) {
                                areas.push(area)
                            }
                        }
                    }
                    if (col === 2) {
                        if (cell.t === "s" && cell.v !== "") {
                            subject = hierarchyID + " " + cell.v.trim()
                        }
                   
                        var rating = 5
                        var comment = null
                        if (cell.c !== undefined) {
                            comment = cell.c[0].t
                            console.log(1)
                        }
                        if (cell.v !== undefined) {
                            var toolValue = {
                                area,
                                subject,
                                rating,
                                preview,
                                url,
                                tags,
                                tool: cell.v
                            }
                            if (comment) {
                                toolValue.comment = comment
                            }
                            var t = _.indexOf(tools, toolValue.tool)
                            if (t === -1) {
                                tools.push(toolValue.tool)
                            }

                            map.push(toolValue)
                        } 

                    }

                }
            }

        }

        wtwData = {
            areas,
            tools,
            mapping: map,
            toolList
        }
        resolve(wtwData)


    })
}

module.exports = {
    parseWTW,
    parseAPQC,
    detectFormat,
    toJSON
}