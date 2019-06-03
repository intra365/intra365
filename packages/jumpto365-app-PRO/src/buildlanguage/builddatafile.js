var XLSX = require("xlsx");
var excel = XLSX.readFile(__dirname + "/Periodic Table Metadata.xlsx");
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
                    element.licenseKey = cell.LicenseKey 
                    element.play = cell.Play 
                    element.title = cell.Title
                    element.key = cell.Key
                    element.descriptor = cell.Descriptor
                    element.subtitle = cell.Subtitle ? cell.Subtitle : ""
                    element.image = cell.Image
                    element.type = cell.Type ? cell.Type  : "service"
                    element.color = cell.Color
                    element.ispremium = cell.Premium == "Yes"
                    element.link = cell.Link ? cell.Link : ""
                    element.linkLanguage = cell.LinkLanguage
                    element.tags = cell.Tags ? cell.Tags.split(",") :[]
                    if (element.key) element.tags.push("service-"+element.key)
                    element.shareable = cell.Shareable ? cell.Shareable : ""
                    element.cellId = cell.Id
                }
            }, this);
        }, this);
    };


    for (var row = 1; row <= 6; row++) {
        const rowData = {
            left: {},
            right: {},
            connectors: [],
            columns: []

        }
        for (var column = 1; column <= 8; column++) {
            var cellData = {
                id: row + ":" + column,
                type: "",
                title: "",
                about: "",
                image: "",
                color: ""
            }
            rowData.columns.push(cellData);
        }
        tableData.push(rowData);

    }

    for (var index = 0; index < translation.length; index++) {
        var element = translation[index];
        //console.log("Element",element.Title)
        var key = element.Row + ":" + element.Column;
        CopyCell(element, key);
        if (element.Type === "Connector"){
            tableData[parseInt(element.Row)-1].connectors.push({class:element.Title});
        }
        for (var index2 = 0; index2 < tableData.length; index2++) {
            if (element.Column === "0"){
                tableData[parseInt(element.Row)-1].left = {
                    title: element.Title,
                    type : "lefter",
                    color : element.Color,
                    tags :  element.Tags ? element.Tags.split(",") :[],
                    cellId : element.Id
                }
            }
            if (element.Column === "99"){
                tableData[parseInt(element.Row)-1].right = {
                    title: element.Title,
                    type : "righter",
                    color : element.Color,
                    tags :  element.Tags ? element.Tags.split(",") :[]   ,
                    cellId : element.Id            
                }
            }

        }


    }
    return tableData;
}

function buildFasttrack(translation) {
    const tableData = [];


    for (var index = 0; index < translation.length; index++) {
        var element = translation[index];
        if (element.fasttrack ){
            tableData.push({id:element.Id,fasttrack:element.fasttrack})
        }
    }
    return tableData;
}

function buildLanguage(lang,excel){
    var en = excel.Sheets[lang]
    var text = XLSX.utils.sheet_to_json(en)
    return { language: lang,data :buildFile(text)}
}

function buildFasttrackMap(lang,excel){
    var en = excel.Sheets[lang]
    var text = XLSX.utils.sheet_to_json(en)
    return { language: lang,data :buildFasttrack(text)}
}
function build(){

var titleSheet = excel.Sheets["Titles"]
var titles = XLSX.utils.sheet_to_json(titleSheet)

var sidebarSheet = excel.Sheets["Sidebar"]
var sidebar = XLSX.utils.sheet_to_json(sidebarSheet)

var data = []
data.push(buildLanguage("EN",excel));
data.push(buildLanguage("DE",excel));
data.push(buildLanguage("DA",excel));
data.push(buildLanguage("JA",excel));
data.push(buildLanguage("ES",excel));
if (true){
    var secEn = buildLanguage("SecEN",excel);
    data.push(secEn);
}
data.push(buildLanguage("FR",excel));
data.push(buildLanguage("NL",excel));
data.push(buildLanguage("NO",excel));
data.push(buildLanguage("GovEN",excel));
data.push(buildLanguage("HU",excel));
data.push(buildLanguage("PT",excel));
data.push(buildLanguage("IS",excel));
data.push(buildLanguage("HE",excel));
data.push(buildLanguage("FI",excel));
data.push(buildLanguage("SV",excel));
data.push(buildLanguage("CS",excel));


var fasttrackmap = buildFasttrackMap("EN",excel)

fs.writeFileSync(__dirname + "/../components/PeriodicSystem/office365periodictable-titles.json", json.plain(titles));
fs.writeFileSync(__dirname + "/../components/Sidebar/office365periodictable-sidebar.json", json.plain(sidebar));
fs.writeFileSync(__dirname + "/../data/fasttrackmap.json", json.plain(fasttrackmap));
fs.writeFile(__dirname + "/../components/PeriodicSystem/office365periodictable.json", json.plain(data), function (err) {
    if (err) {
        console.log(err);
        process.exit(1);
    }
    process.exit(0);
});

}


function replaceN(cell){
    try {
        cell.v = cell.v.replace("\\n"," ")    
        return cell
            
    } catch (error) {
        console.log(error,cell)
        return {t:"t",v:""}
        
    }
}
function convert(lang,inshortColumm){
    

    var pto = XLSX.readFile("/Users/niels/Documents/Hexatown/JumpTo365 Administration - Documents/Tools/pto-master.xlsx")
    var source = excel.Sheets[lang.toUpperCase()]
    var tools = pto.Sheets["tools"]
   
   
    tools["B2"] = replaceN(source["A40"]) // booking
    tools["B3"] = replaceN(source["A27"]) // Kalender
    tools["B4"] = replaceN(source["A18"]) // Delve
    tools["B5"] = replaceN(source["A2"]) // Dynamics 365
    tools["B6"] = replaceN(source["A11"]) // Excel Online
    tools["B7"] = replaceN(source["A22"]) // Flow
    tools["B8"] = replaceN(source["A20"]) // Forms
    tools["B9"] = replaceN(source["A26"]) // Mail
    tools["B10"] = replaceN(source["A38"]) // Nyheder
    tools["B11"] = replaceN(source["A17"]) // OneDrive for Business
    tools["B12"] = replaceN(source["A12"]) // OneNote Online
    tools["B13"] = replaceN(source["A28"]) // Personer
    tools["B14"] = replaceN(source["A32"]) // Planner
    tools["B15"] = replaceN(source["A21"]) // PowerApps
    tools["B16"] = replaceN(source["A23"]) // PowerBI
    tools["B17"] = replaceN(source["A13"]) // Powerpoint Online
    tools["B18"] = replaceN(source["A33"]) // Project Online
    tools["B19"] = replaceN(source["A16"]) // SharePoint Online
    tools["B20"] = replaceN(source["A36"]) // Skype for Business
    tools["B21"] = replaceN(source["A41"]) // StaffHub
    tools["B22"] = replaceN(source["A6"]) // Stream
    tools["B23"] = replaceN(source["A3"]) // Sway
    tools["B24"] = replaceN(source["A29"]) // Opgaver
    tools["B25"] = replaceN(source["A37"]) // Teams
    tools["B26"] = replaceN(source["A31"]) // Todo
    tools["B27"] = replaceN(source["A7"]) // Visio Online
    tools["B28"] = replaceN(source["A10"]) // Word Online
    tools["B29"] = replaceN(source["A39"]) // Yammer


    tools["E2"] = replaceN(source[inshortColumm+"40"]) // booking
    tools["E3"] = replaceN(source[inshortColumm+"27"]) // Kalender
    tools["E4"] = replaceN(source[inshortColumm+"18"]) // Delve
    tools["E5"] = replaceN(source[inshortColumm+"2"]) // Dynamics 365
    tools["E6"] = replaceN(source[inshortColumm+"11"]) // Excel Online
    tools["E7"] = replaceN(source[inshortColumm+"22"]) // Flow
    tools["E8"] = replaceN(source[inshortColumm+"20"]) // Forms
    tools["E9"] = replaceN(source[inshortColumm+"26"]) // Mail
    tools["E10"] = replaceN(source[inshortColumm+"38"]) // Nyheder
    tools["E11"] = replaceN(source[inshortColumm+"17"]) // OneDrive for Business
    tools["E12"] = replaceN(source[inshortColumm+"12"]) // OneNote Online
    tools["E13"] = replaceN(source[inshortColumm+"28"]) // Personer
    tools["E14"] = replaceN(source[inshortColumm+"32"]) // Planner
    tools["E15"] = replaceN(source[inshortColumm+"21"]) // PowerApps
    tools["E16"] = replaceN(source[inshortColumm+"23"]) // PowerBI
    tools["E17"] = replaceN(source[inshortColumm+"13"]) // Powerpoint Online
    tools["E18"] = replaceN(source[inshortColumm+"33"]) // Project Online
    tools["E19"] = replaceN(source[inshortColumm+"16"]) // SharePoint Online
    tools["E20"] = replaceN(source[inshortColumm+"36"]) // Skype for Business
    tools["E21"] = replaceN(source[inshortColumm+"41"]) // StaffHub
    tools["E22"] = replaceN(source[inshortColumm+"6"]) // Stream
    tools["E23"] = replaceN(source[inshortColumm+"3"]) // Sway
    tools["E24"] = replaceN(source[inshortColumm+"29"]) // Opgaver
    tools["E25"] = replaceN(source[inshortColumm+"37"]) // Teams
    tools["E26"] = replaceN(source[inshortColumm+"31"]) // Todo
    tools["E27"] = replaceN(source[inshortColumm+"7"]) // Visio Online
    tools["E28"] = replaceN(source[inshortColumm+"10"]) // Word Online
    tools["E29"] = replaceN(source[inshortColumm+"39"]) // Yammer
    
    var groups = pto.Sheets["groups"]
    groups["C2"] = replaceN(source["A24"]) // Business App Platform
    groups["C3"] = replaceN(source["A35"]) // Chat & Conferencing
    groups["C4"] = replaceN(source["A44"]) // Direct Communication
    groups["C5"] = replaceN(source["A8"]) // Employee\nProfiles
    groups["C6"] = replaceN(source["A15"]) // File Storage & Collaboration
    groups["C7"] = replaceN(source["A19"]) // Forms
    groups["C8"] = replaceN(source["A14"]) // Office Oline
    groups["C9"] = replaceN(source["A25"]) // Outlook
    groups["C10"] = replaceN(source["A5"]) // Presentations
    groups["C11"] = replaceN(source["A34"]) // Project Management
    groups["C12"] = replaceN(source["A43"]) // Small Business Applications
    groups["C13"] = replaceN(source["A42"]) // Social\nNetworking
    groups["C14"] = replaceN(source["A30"]) // Task\nManagement

    XLSX.writeFileSync( pto, `/Users/niels/Documents/Hexatown/JumpTo365 Administration - Documents/Tools/pto-${lang}.xlsx`)    
}

convert("en","O")
convert("de","L")
convert("da","L")
convert("ja","L")
convert("es","L")
convert("fr","L")
convert("nl","L")
convert("no","L")
convert("hu","L")
convert("pt","L")
convert("is","L")
convert("he","L")
convert("fi","O")
convert("sv","O")
convert("cs","O")





process.exit(0)