
var XLSX = require("xlsx");
var fs = require("fs");
var json = require("format-json")
var _ = require("lodash")
const axios = require("axios");
const http = require("https");
const signatures = require("./signatures.json")
//var Jumpto365App = require("../../components/_Contexts/Jumpto365App").default

var url = "https://365adm-my.sharepoint.com/personal/niels_hexatown_com/_layouts/15/download.aspx?UniqueId=98100762-97fd-43cf-8f17-3f986ddc98b6&Translate=false&tempauth=eyJ0eXAiOiJKV1QiLCJhbGciOiJub25lIn0.eyJhdWQiOiIwMDAwMDAwMy0wMDAwLTBmZjEtY2UwMC0wMDAwMDAwMDAwMDAvMzY1YWRtLW15LnNoYXJlcG9pbnQuY29tQGRmOTZiOGM5LTUxYTEtNDBjZi1iOGIxLTQ1MTRiZThlOTY2OCIsImlzcyI6IjAwMDAwMDAzLTAwMDAtMGZmMS1jZTAwLTAwMDAwMDAwMDAwMCIsIm5iZiI6IjE1MjQ0ODA1NjIiLCJleHAiOiIxNTI0NDg0MTYyIiwiZW5kcG9pbnR1cmwiOiI1cWJjSHJ5QUNLUmRla2M3a1pZWjNwdDhOLzFzdFpvUmZCWFFrd2s0V3dvPSIsImVuZHBvaW50dXJsTGVuZ3RoIjoiMTQ4IiwiaXNsb29wYmFjayI6IlRydWUiLCJjaWQiOiJaR0V5WWpSbVpHWXRORFF5TVMwMFkyRTRMV0V4TldRdE5tTXdNR0ZoWXpVeE1HSmsiLCJ2ZXIiOiJoYXNoZWRwcm9vZnRva2VuIiwic2l0ZWlkIjoiWVRGaE0yUmpPVFV0T1RObFlTMDBaVGN3TFRnek5EY3RNakkxWWpRME1UYzVNV00zIiwiYXBwX2Rpc3BsYXluYW1lIjoiR3JhcGggZXhwbG9yZXIiLCJzaWduaW5fc3RhdGUiOiJbXCJrbXNpXCJdIiwiYXBwaWQiOiJkZThiYzhiNS1kOWY5LTQ4YjEtYThhZC1iNzQ4ZGE3MjUwNjQiLCJ0aWQiOiJkZjk2YjhjOS01MWExLTQwY2YtYjhiMS00NTE0YmU4ZTk2NjgiLCJ1cG4iOiJuaWVsc0BoZXhhdG93bi5jb20iLCJwdWlkIjoiMTAwM0JGRkQ5Q0VCNzY2NSIsInNjcCI6Im15ZmlsZXMud3JpdGUgYWxsZmlsZXMud3JpdGUgYWxsc2l0ZXMud3JpdGUgYWxscHJvZmlsZXMucmVhZCIsInR0IjoiMiIsInVzZVBlcnNpc3RlbnRDb29raWUiOm51bGx9.RCtnMk9oRmthNFN2T3RnUDgrUTN0cnFGS2syYVJhcTJvZkxDUGdSYyt0VT0&ApiVersion=2.0"
//const excelFileName = __dirname + "/wtw-sample.xlsx"
const excelFileName = __dirname + "/wtw-fasttrack.xlsx"


function matchSignature(sheet,sheetName) {
    return new Promise((resolve, reject) => {
        if (!sheet) return resolve(null)
        
        signatures.forEach(sig => {
            var match = false
            for (let index = 0; index < sig.signature.length; index++) {
                var c = cell(sheet, index, 0)
                var v = c ? _.isString(c.v) ? c.v : c.v.toString() : ""
                const key = sig.signature[index];
                if (v.toUpperCase() !== key.toUpperCase()) {
                    match = false
                    break
                }
                
                match = true
            }
            if (match) {
                return resolve(sig)
            }
        })
        resolve(null)
    });




}

function excelMap(excel) {
    return new Promise( (resolve, reject) => {


        if (!excel) return []
        var json = {
            sheets: []
        }
        var c = excel.SheetNames.length
        excel.SheetNames.forEach(sheetName => {

            var sheet = excel.Sheets[sheetName]
            matchSignature(sheet, sheetName)
            .then(map=>{
            json.sheets.push({
                name: sheetName,
                map 
                
            })
            c--
            if (c === 0){
                return resolve(json)
            }
        })
        })


        
    });
}

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


function sheetToJSON(data, sheetName) {

    var excel = null
    if (data instanceof Buffer) {
        excel = XLSX.read(data, {
            type: "buffer"
        })
    } else {
        excel = XLSX.readFile(data)
    }

    var json = XLSX.utils.sheet_to_json(excel.Sheets[sheetName])


    return json
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
        sheets: []
    }
    excel.SheetNames.forEach(sheetName => {
        debugger
        json.sheets.push({
            name: sheetName,
            data: XLSX.utils.sheet_to_json(excel.Sheets[sheetName])
        })

    })


    return json
}




function detectFormat(data, sheetName) {

    var excel = null
    if (data instanceof Buffer) {
        excel = XLSX.read(data, {
            type: "buffer"
        })
    } else {
        excel = XLSX.readFile(data)
    }


    if (!excel.Sheets[sheetName]) {
        return ""
    }

    var liveSheet = excel.Sheets[sheetName]

    if (liveSheet && sheetName.toLowerCase() === "tools") {
        return "TOOLS"
    }
    if (liveSheet && sheetName.toLowerCase() === "groups") {
        return "GROUPS"
    }

    // Is it WTW ?
    for (var row = 0; row < 20; row++) {


        for (var col = 0; col < 2; col++) {

            var cellRef = XLSX.utils.encode_cell({
                c: col,
                r: row
            })
            var cell = liveSheet[cellRef]
            if (!cell) continue
            if (col === 0 && cell.v === "Area") {
                return "WTW"
            }
        }
    }


    // Is it PTO ?


    var cellRef = XLSX.utils.encode_cell({
        c: 2,
        r: 0
    })
    var cell = liveSheet[cellRef]
    if (cell) {
        if (cell.v === 1) {
            return "PTO"
        }
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
function parseWTW(data, sheetName) {

    return new Promise(function (resolve, reject) {
        var excel = null
        if (data instanceof Buffer) {
            excel = XLSX.read(data, {
                type: "buffer"
            })
        } else {
            excel = XLSX.readFile(data)
        }

        var toolList = XLSX.utils.sheet_to_json(excel.Sheets["tools"])

        var liveSheet = excel.Sheets[sheetName]
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
            title: sheetName,
            color: "#256FB0",
            icon: "https://jumpto365.com/resources/images/app/jumpto365-Icon-white.png",
            hasRatings: 5,
            areas,
            tools,
            tasks: map,
            toolList,
            mapping: map
        }
        resolve(wtwData)


    })
}

function cell(sheet, col, row) {

    var cellRef = XLSX.utils.encode_cell({
        c: col,
        r: row
    })
    return sheet[cellRef]
}

function commentsContain(comments, tag) {
    if (!comments) return false
    if (!tag) return false

    if (!Array.isArray(comments)) return false
    var found = false
    comments.forEach(comment => {
        if (comment.r) {

            var ix = comment.r.indexOf(tag)
            if (ix !== -1) {
                found = true
            }
        }
    });
    return found
}





 function parsePTO(data, sheetName) {
    var parserSettings = {
        maxColumn : 7,
        maxRow : 5
    }
    return new Promise(function async (resolve, reject) {

        var excel = null
        if (data instanceof Buffer) {
            excel = XLSX.read(data, {
                type: "buffer"
            })
        } else {
            excel = XLSX.readFile(data)
        }
        var liveSheet = excel.Sheets[sheetName]

        if (!excel.Sheets["tools"]) {
            return reject(`Missing a sheet named "tools"`)
        }
        if (!excel.Sheets["groups"]) {
            return reject(`Missing a sheet named "groups"`)
        }

       

        var getParserSettings = (parserSettings) => {
            return new Promise((resolve, reject) => {
            
                if (excel.Sheets["settings"]) {
                    parseSettings(data,"settings").then(settingsOverwrite=>{
                      resolve(_.merge(parserSettings, settingsOverwrite))
                        
                    })
                   
                   
            }
        else{
            resolve(parserSettings)
        }
        }
            )
         }

    
       
         getParserSettings(parserSettings)
         .then(newSettings =>{
            parserSettings = newSettings
            
        parseGroups(data, "groups")
            .then(groups => {
                parseTools(data, "tools")
                    .then(tools => {

                        function findTool(name) {
                            var key = name.toLowerCase()

                            var f = _.find(tools, function (o) {
                                //console.log(o)
                                return o.key.toLowerCase() === key
                            })
                            return f

                        }

                        function findGroup(name) {
                            var f = _.find(groups, {
                                key: name
                            })
                            return f
                        }

                        function centerValue(cell, data) {
                            if (!cell) return 0
                            if (data && data.title && data.title === "#GROUP#") {
                                return 2
                            }
                            return 1
                        }

                        function groupValue(cell, data) {
                            if (!cell) return 0

                            if (data && data.isConnector) return 0
                            if (cell.v === ".") return 0
                            return 1

                        }

                        function hardcodedMembers(key) {

                            switch (key) {
                                case "emp":
                                    return ["delve", "people"]
                                    break;
                                case "pres":
                                    return ["powerpoint"]
                                    break;
                                case "tasks":
                                    return ["tasks"]
                                    break;
                                default:
                                    return []
                                    break;
                            }
                        }

                        function findRightMembers(thisRow, thisCol) {
                            var group = {
                                name: key,
                                members: hardcodedMembers(key)
                            }
                            var left = cell(liveSheet, thisCol - 1, thisRow)
                            var key = left && left.v ? left.v : "_"
                            if (key === "_" || key === "<" || key === ">" || key === "v" || key === "V") return group


                            var c = cell(liveSheet, thisCol, thisRow)

                            if (c && c.v) {
                                group.members.push(c.v)
                                c.left = key
                                var lowers = findLowerMembers(thisRow, thisCol)
                                if (lowers) {
                                    lowers.members.map(l => {
                                        group.members.push(l)
                                    })
                                }
                            }

                            for (var col = thisCol + 3; col < ((parserSettings.maxColumn*3)+1); col += 3) {
                                var center = cell(liveSheet, col, thisRow)
                                if (!center) return group

                                left = cell(liveSheet, col - 1, thisRow)
                                if (!left) return group
                                if (left.v !== ">") return group
                                group.members.push(center.v)
                                var lowers = findLowerMembers(thisRow, col)
                                if (lowers) {
                                    lowers.members.map(l => {
                                        group.members.push(l)
                                    })
                                }
                            }
                            return group


                        }


                        function findLeftMembers(thisRow, thisCol) {
                            var group = {
                                name: key,
                                members: hardcodedMembers(key)
                            }
                            var right = cell(liveSheet, thisCol + 1, thisRow)
                            var key = right && right.v ? right.v : "_"
                            if (key === "_" || key === "<" || key === ">" || key === "v" || key === "V") return group


                            var c = cell(liveSheet, thisCol, thisRow)

                            if (c && c.v) {
                                group.members.push(c.v)
                                c.right = key
                                var lowers = findLowerMembers(thisRow, thisCol)
                                if (lowers) {
                                    lowers.members.map(l => {
                                        group.members.push(l)
                                    })
                                }
                            }

                            for (var col = thisCol - 3; col > 0; col -= 3) {
                                var center = cell(liveSheet, col, thisRow)
                                if (!center) return group

                                right = cell(liveSheet, col + 1, thisRow)
                                if (!right) return group
                                if (right.v !== "<") return group

                                center.right = key
                                group.members.push(center.v)
                                var lowers = findLowerMembers(thisRow, col)
                                if (lowers) {
                                    lowers.members.map(l => {
                                        group.members.push(l)
                                    })
                                }
                            }

                            return group

                        }

                        function findBottomMembers(thisRow, thisCol) {
                            var group = {
                                name: key,
                                members: hardcodedMembers(key)
                            }
                            var bottom = cell(liveSheet, thisCol, thisRow + 1)
                            var key = bottom && bottom.v ? bottom.v : "_"
                            if (key.toUpperCase() !== "A") return group


                            var c = cell(liveSheet, thisCol, thisRow)


                            for (var row = thisRow + 3; row < ((parserSettings.maxRow*3)+1); row += 3) {
                                var center = cell(liveSheet, thisCol, row)
                                if (!center) return group

                                bottom = cell(liveSheet, thisCol, row - 1)
                                if (!bottom) return group
                                if (bottom.v.toUpperCase() !== "V") return group

                                center.bottom = key
                                group.members.push(center.v)

                            }

                            return group

                        }

                        function findTopMembers(thisRow, thisCol) {
                            var group = {
                                name: key,
                                members: hardcodedMembers(key)
                            }
                            var top = cell(liveSheet, thisCol, thisRow - 1)
                            var key = top && top.v ? top.v : "_"
                            if (key.toUpperCase() !== "A") return group


                            var c = cell(liveSheet, thisCol, thisRow)
                            if (c && c.v) {
                                group.members.push(c.v)
                                c.bottom = key

                            }

                            for (var row = thisRow - 3; row > 0; row -= 3) {
                                var center = cell(liveSheet, thisCol, row)
                                if (!center) return group

                                top = cell(liveSheet, thisCol, row + 1)
                                if (!top) return group
                                if (top.v.toUpperCase() !== "A") return group

                                center.bottom = key
                                group.members.push(center.v)

                            }

                            return group

                        }

                        function findLowerMembers(thisRow, thisCol) {
                            var group = {
                                name: key,
                                members: hardcodedMembers(key)
                            }
                            var lower = cell(liveSheet, thisCol, thisRow + 1)
                            var key = lower && lower.v ? lower.v : "_"
                            if (key.toUpperCase() !== "V") return group


                            var c = cell(liveSheet, thisCol, thisRow)



                            for (var row = thisRow + 3; row < ((parserSettings.maxRow*3)+1); row += 3) {
                                var center = cell(liveSheet, col, row)
                                if (!center) return group

                                top = cell(liveSheet, col, row - 1)
                                if (!top || !top.v) return group
                                if (top.v.toUpperCase() !== "V") return group
                                group.members.push(center.v)
                                center.top = key

                            }
                            return group


                        }

                        var rows = []
                        
                        for (var row = 2; row < ((parserSettings.maxRow*3)+1); row += 3) {
                            var columns = []

                            for (var col = 2; col < ((parserSettings.maxColumn*3)+1); col += 3) {

                                let left = cell(liveSheet, col - 1, row)
                                let top = cell(liveSheet, col, row - 1)
                                let center = cell(liveSheet, col, row)
                                let right = cell(liveSheet, col + 1, row)
                                let bottom = cell(liveSheet, col, row + 1)

                                let leftData = left ? findGroup(left.v) : null
                                let topData = top ? findGroup(top.v) : null
                                let rightData = right ? findGroup(right.v) : null
                                let centerData = center ? findTool(center.v) : null

                                var bottomKey = centerData && centerData.title === "#GROUP#" ? centerData.key : bottom ? bottom.v : null
                                let bottomData = bottomKey ? findGroup(bottomKey) : null

                                if (leftData) {
                                    leftData.members = findRightMembers(row, col)
                                }
                                if (rightData) {
                                    rightData.members = findLeftMembers(row, col)
                                }
                                if (bottomData) {
                                    bottomData.members = findBottomMembers(row, col)
                                }
                                if (topData) {
                                    topData.members = findTopMembers(row, col)
                                }
                                var centerValueFound = centerValue(center, centerData)
                                if (centerData && centerData.title === "#GROUP#") {
                                    var g = findGroup(center.v)
                                    if (g) centerData.title = g.title
                                }

                                columns.push({
                                    key: center ? center.v : null,
                                    l: groupValue(left, leftData),

                                    c: centerValueFound,
                                    r: groupValue(right, rightData),
                                    t: groupValue(top, topData),
                                    b: groupValue(bottom, bottomData),
                                    leftData,
                                    topData,
                                    centerData,
                                    rightData,
                                    bottomData
                                })
                            }




                            rows.push(columns)
                        }

                        groups = groups.map((g) => {

                            var extraMembers = hardcodedMembers(g.key)
                            if (g.members && g.members.members) {
                                g.members.members = g.members.members.concat(extraMembers)
                            }
                            return g
                        })
                        var settings = {}

                        for (var row = 16; row < 500; row++) {
                            var c = cell(liveSheet, 0, row)
                            if (c && c.v) {
                                var v = cell(liveSheet, 1, row)
                                if (v) {
                                    settings[c.v] = v.v
                                }
                            }
                        }

                        resolve({
                            title: sheetName,
                            settings,
                            color: "#256FB0",
                            icon: "https://jumpto365.com/resources/images/app/jumpto365-Icon-white.png",
                            groups,
                            grid: rows,
                            tools,

                        })
                    })
                    .catch(err => {
                        return reject(err)
                    })
            })
            .catch(err => {
                return reject(err)
            })
        }).catch(err => {
            return reject(err)
        })
    })
}

function parseTools(data, sheetName) {

    return new Promise(function (resolve, reject) {
        if (!data) return reject("Missing data")

        var excel = null
        if (data instanceof Buffer) {
            excel = XLSX.read(data, {
                type: "buffer"
            })
        } else {
            excel = XLSX.readFile(data)
        }
        var sheet = excel.Sheets[sheetName]
        var rows = []
        for (var row = 1; row < 10000; row += 1) {

            var key = cell(sheet, 0, row)
            if (key) {

                var title = cell(sheet, 1, row)
                var color = cell(sheet, 2, row)
                var icon = cell(sheet, 3, row)
                var inShort = cell(sheet, 4, row)
                var isFullyShareable = cell(sheet, 5, row)
                var isPartlyShareable = cell(sheet, 6, row)
                var isPremium = cell(sheet, 7, row)
                var jumpto = cell(sheet, 8, row)
                var subtitle = cell(sheet, 9, row)
                var contentRef = cell(sheet, 11, row)




                var tool = {
                    key: key.v,
                    title: title ? title.v : key.v,
                    color: color ? color.v : "",
                    icon: icon ? icon.v : "",
                    inShort: inShort ? inShort.v : "",
                    isFullyShareable: isFullyShareable ? isFullyShareable.v : "",
                    isPartlyShareable: isPartlyShareable ? isPartlyShareable.v : "",
                    isPremium: isPremium ? isPremium.v : "",
                    jumpto: jumpto ? jumpto.v : "",
                    subtitle: subtitle ? subtitle.v : "",
                    contentRef: contentRef ? contentRef.v : "",

                }
                rows.push(tool)
            }


        }
        resolve(rows)


    })
}
function parseSettings(data, sheetName) {

    return new Promise(function (resolve, reject) {
        if (!data) return reject("Missing data")

        var excel = null
        if (data instanceof Buffer) {
            excel = XLSX.read(data, {
                type: "buffer"
            })
        } else {
            excel = XLSX.readFile(data)
        }
        var sheet = excel.Sheets[sheetName]
        var settings = {}
        for (var row = 1; row < 100; row += 1) {

            var key = cell(sheet, 0, row)
            if (key) {

                var value = cell(sheet, 1, row)
                
                
                settings[key.v] = value.v
            }


        }
        resolve(settings)


    })
}


function parseGroups(data, sheetName) {

    return new Promise(function (resolve, reject) {
        if (!data) return reject("Missing data")

        var excel = null
        if (data instanceof Buffer) {
            excel = XLSX.read(data, {
                type: "buffer"
            })
        } else {
            excel = XLSX.readFile(data)
        }
        var sheet = excel.Sheets[sheetName]
        var rows = []
        for (var row = 1; row < 10000; row += 1) {

            var key = cell(sheet, 0, row)
            if (key) {
                var isConnector = cell(sheet, 1, row)
                var title = cell(sheet, 2, row)
                var color = cell(sheet, 3, row)
                var borderColor = cell(sheet, 4, row)
                var textColor = cell(sheet, 5, row)
                var tool = {
                    key: key.v,
                    title: title ? title.v : key.v,
                    color: color ? color.v : "",
                    borderColor: borderColor ? borderColor.v : "",
                    isConnector: isConnector ? isConnector.v === 1 : false,
                    textColor: textColor ? textColor.v : ""
                }
                rows.push(tool)
            }


        }
        resolve(rows)


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
    parsePTO,
    parseTools,
    parseGroups,
    detectFormat,
    sheetToJSON,
    toJSON,
    excelMap,
    signatures
}