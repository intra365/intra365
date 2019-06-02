


const http = require("https");
var XLSX = require("xlsx")
var MarkdownParser = require("../../utilities/MarkdownParser")
var mammoth = require("mammoth");

import Parser from "../Parser"
import {
    getUserAgentApplcation
  } from '../../utilities/Auth'
  import _ from "lodash"
function  filekey (filename) {
    return `file:${filename}`
}



export function downloadExcel(url){
       return new Promise((resolve, reject) => {
        var req = new XMLHttpRequest();
        req.open("GET", url, true);
        req.responseType = "arraybuffer";

        req.onload = function(e) {
        /* parse the data when it is received */
        var data = new Uint8Array(req.response);
        var excel = XLSX.read(data, {type:"array"});
        var data2 = Buffer.from(data).toString("base64")
       // debugger
        return resolve({excel,data2})
        };

        req.onerror = function (e){
            reject(e)
        }
        req.send();
           
       });

}



export function getWordMarkdownCached(filename,storageProvider,functionalVersion,isDashBoard){
    return new Promise((resolve, reject) => {
        var storage = storageProvider ? storageProvider : sessionStorage
        var fileItemData=storage.getItem(filekey(filename))
        var fileItem = fileItemData ? JSON.parse(fileItemData) : null
        if (fileItem){
            var document = MarkdownParser(fileItem.markDown,"","",functionalVersion,isDashBoard)
            document.markDown = fileItem.markDown
            document.components = Parser.parseComponents(document.body,functionalVersion)
            
            return resolve(document)
            
        }
        else{
            return reject()
        }
    })


}


export function getExcel(filename){
    
    return new Promise((resolve, reject) => {


    let graph = new OfficeGraphService()
        graph.me_drive()
        .then(me_drive => {
            
            var files = me_drive.value.map((file,ix)=>{
                var x = {key:ix,title:file.name.toLowerCase(),file}
                //console.log(x)
                return x
            })
            var file = _.find(files,{"title":filename.toLowerCase()})

        //    debugger
            if (!file) return reject("File not found ..")

           
            
            downloadExcel(file.file["@microsoft.graph.downloadUrl"])
            .then(document => {
                document.file2 = file
                return resolve(document)
            })
            
        })
        .catch(error => {
            
            reject(error)
        })
    });
}

export function getWordMarkdown(filename,storageProvider,functionalVersion,isDashBoard){

    return new Promise((resolve, reject) => {
        
    var storage = storageProvider ? storageProvider : sessionStorage

    let graph = new OfficeGraphService()
        graph.me_drive()
        .then(me_drive => {
            var files = me_drive.value.map((file,ix)=>{
                return {key:ix,title:file.name,file}
            })
            var file = _.find(files,{"title":filename})
            if (!file) return reject("File not found ..." )

            var fileItemData=storage.getItem(filekey(file.title))
            var fileItem = fileItemData ? JSON.parse(fileItemData) : null
            if (fileItem && fileItem.eTag === file.file.eTag){
                var document = MarkdownParser(fileItem.markDown,"","",functionalVersion,isDashBoard)
                document.markDown = fileItem.markDown
                document.components = Parser.parseComponents(document.body,functionalVersion)
                document.editLink = fileItem.weburl 
                return resolve(document)
                
            }
            
            download(file.file["@microsoft.graph.downloadUrl"],filename,file.file.eTag,storageProvider,file,functionalVersion,isDashBoard)
            .then(document => {
                return resolve(document)
            })
            
        })
        .catch(error => {
            reject(error)
        })
    });
}

export function  toMarkDown (buffer) {
    
    return new Promise((resolve, reject) => {
        var options = {
            arrayBuffer : buffer
        }
        mammoth.convertToMarkdown(options)
        .then(function(result){
            var html = result.value; // The generated HTML
            var messages = result.messages; // Any messages, such as warnings during conversion
    
            resolve(result)
           // fs.writeJsonSync(path.join(__dirname,"step1.json"),result)
        })
        .catch(function (err){
            console.log(err)   
            reject(err)     
        })
            
    });
}
export function download2 (url,filename,eTag) {

    return new Promise((resolve, reject) => {
        
    
    
    http.get(url, (res) => {
        //debugger
        const {
            statusCode
        } = res;
        const contentType = res.headers['content-type'];
        
        let error;
        if (statusCode !== 200) {
            error = new Error(`Request Failed.\n` +
                `Status Code: ${statusCode}`);
        }
        if (error) {
           
            // consume response data to free up memory
            res.resume();
            return reject(error)
        }
        res.setEncoding('binary');
        let rawData = '';
        res.on('data', (chunk) => {
            rawData += chunk;
        });
        res.on('end', () => {
            try {
                return resolve(rawData)  
            } catch (e) {
                console.error(e.message);
            }
        });
    }).on('error', (e) => {
        console.error(`Got error: ${e.message}`);
    });
});
}
export function download (url,filename,eTag,storageProvider,file,functionalVersion,isDashBoard) {

    return new Promise((resolve, reject) => {
        
    
        var storage = storageProvider ? storageProvider : sessionStorage
    http.get(url, (res) => {
        //debugger
        const {
            statusCode
        } = res;
        const contentType = res.headers['content-type'];
        
        let error;
        if (statusCode !== 200) {
            error = new Error(`Request Failed.\n` +
                `Status Code: ${statusCode}`);
        }
        if (error) {
           
            // consume response data to free up memory
            res.resume();
            return reject(error)
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
                //fs.writeFileSync(excelFileName, rawData, 'binary')
               // var buf = new Buffer.from(rawData)
                toMarkDown(rawData)
                .then(result => {
                    var document = MarkdownParser(result.value,"","",functionalVersion,isDashBoard)
                    document.components = Parser.parseComponents(document.body,functionalVersion,isDashBoard)
                    document.editLink = file ? file.file.webUrl : ""
                    var data = {eTag,markDown:result.value,weburl:file ? file.file.webUrl : ""}
                    storage.setItem(filekey(filename),JSON.stringify(data))
                    return resolve(document)
                    //console.log("done",markdown)

                })
                .catch(err => {
                    console.warn("Markdown converted",err)
                })

                // console.log(parsedData);
            } catch (e) {
                console.error(e.message);
            }
        });
    }).on('error', (e) => {
        console.error(`Got error: ${e.message}`);
    });
});
}
  /**
 * Describe overall purpose of the service
 * 
 *
 * @export
 * @class OfficeGraphService
 */
export default class OfficeGraphService{ 


    me = () => {return this.get_beta('me/')}
    me_licenseDetails = () => {return this.get_beta('me/licenseDetails')}
    sites_root = () => {return this.get_beta('sites/root')}
    drives_root = () => {return this.get_beta('me/drive')}
    me_photo = () => {return this.getFile('me/photo/$value',["https://graph.microsoft.com/user.read"])}
    me_manager = () => {return this.get_beta('me/manager')}
    me_drive = () => {return this.get2("me/drive/root:/jumpto365:/children",["https://graph.microsoft.com/user.read","https://graph.microsoft.com/files.read"])}
    me_drive2 = (subpath) => {return this.get2(`me/drive/root:/jumpto365/${subpath}:/children`,["https://graph.microsoft.com/user.read","https://graph.microsoft.com/files.read"])}
    generic = (url,consents) => {
        if (_.startsWith(url,"https://graph.jumpto365.com")){
            return new Promise(resolve=>{
                resolve({})
            })
        }
        return this.get3(url,consents ? consents : ["https://graph.microsoft.com/user.read","https://graph.microsoft.com/files.read"])
    }
    me_file = (path) => {
    

        return new Promise((resolve, reject) => {
            this.get2(`me/drive/root:/${path}`,["https://graph.microsoft.com/user.read","https://graph.microsoft.com/files.read"])
            .then(metadata=>{

                download2(metadata["@microsoft.graph.downloadUrl"])
                .then(file => {
                    resolve({file,metadata})
                })
            })
            .catch(err=>{reject(err)})
            
        });
    
    
    }


    /**
    
    https://graph.microsoft.com/beta/me/drive/root:/jumpto365/pto-en.xlsx:/workbook/worksheets

{
    "@odata.context": "https://graph.microsoft.com/beta/$metadata#users('58d02ee5-af80-4f81-b144-1734b77c02c9')/drive/root/workbook/worksheets",
    "value": [
        {
            "@odata.id": "/users('58d02ee5-af80-4f81-b144-1734b77c02c9')/drive/root/workbook/worksheets(%27%7B00000000-0001-0000-0000-000000000000%7D%27)",
            "id": "{00000000-0001-0000-0000-000000000000}",
            "name": "of Office365",
            "position": 0,
            "visibility": "Visible"
        },
        {
            "@odata.id": "/users('58d02ee5-af80-4f81-b144-1734b77c02c9')/drive/root/workbook/worksheets(%27%7B00000000-0001-0000-0100-000000000000%7D%27)",
            "id": "{00000000-0001-0000-0100-000000000000}",
            "name": "tools",
            "position": 1,
            "visibility": "Visible"
        },
        {
            "@odata.id": "/users('58d02ee5-af80-4f81-b144-1734b77c02c9')/drive/root/workbook/worksheets(%27%7B00000000-0001-0000-0200-000000000000%7D%27)",
            "id": "{00000000-0001-0000-0200-000000000000}",
            "name": "groups",
            "position": 2,
            "visibility": "Visible"
        }
    ]
}
https://graph.microsoft.com/beta/me/drive/root:/jumpto365/Jumpto365 Excel Tool v1.xlsx:/workbook/worksheets/tools/tables

{
    "@odata.context": "https://graph.microsoft.com/beta/$metadata#users('58d02ee5-af80-4f81-b144-1734b77c02c9')/drive/root/workbook/worksheets('tools')/tables",
    "value": [
        {
            "@odata.id": "/users('58d02ee5-af80-4f81-b144-1734b77c02c9')/drive/root/workbook/worksheets(%27%7B00000000-0001-0000-0200-000000000000%7D%27)/tables(%2718%27)",
            "highlightFirstColumn": false,
            "highlightLastColumn": false,
            "id": "18",
            "name": "Table18",
            "showBandedColumns": false,
            "showBandedRows": true,
            "showFilterButton": true,
            "showHeaders": true,
            "showTotals": false,
            "style": "TableStyleLight9"
        }
    ]
}

https://graph.microsoft.com/beta/me/drive/root:/jumpto365/Jumpto365 Excel Tool v1.xlsx:/workbook/worksheets/tools/tables/18/rows
{
    "@odata.context": "https://graph.microsoft.com/beta/$metadata#users('58d02ee5-af80-4f81-b144-1734b77c02c9')/drive/root/workbook/worksheets('tools')/tables('18')/rows",
    "value": [
        {
            "@odata.id": "/users('58d02ee5-af80-4f81-b144-1734b77c02c9')/drive/root/workbook/worksheets(%27%7B00000000-0001-0000-0200-000000000000%7D%27)/tables(%2718%27)/rows/itemAt(index=0)",
            "index": 0,
            "values": [
                [
                    "bookings",
                    "#25abb2",
                    "https://jumpto365.com/resources/images/app/Bookings.png",
                    "",
                    "https://hexatown.github.io/docs/microsoft/office365/Bookings",
                    "",
                    ""
                ]
            ]
        },
        {
            "@odata.id": "/users('58d02ee5-af80-4f81-b144-1734b77c02c9')/drive/root/workbook/worksheets(%27%7B00000000-0001-0000-0200-000000000000%7D%27)/tables(%2718%27)/rows/itemAt(index=1)",
            "index": 1,
            "values": [
                [
                    "calendar",
                    "#2072b9",
                    "https://jumpto365.com/resources/images/app/Calendar.png",
                    "https://outlook.office.com/owa/?path=/calendar/view/Day",
                    "https://hexatown.github.io/docs/microsoft/office365/Calendar",
                    "",
                    ""
                ]
            ]
        }, ....

     */
    
    client = null
    constructor() {
        const url = window.location
        this.client = getUserAgentApplcation(url.protocol + '//' + url.host)
    }
    ping = () => {return true}
    get_beta = (path) => {
        return this.getraw(`https://graph.microsoft.com/beta/${path}`)
    }

    get = (path) => {
        return this.getraw(`https://graph.microsoft.com/v1.0/${path}`)
    } 

    get2 = (path,scopes) => {
        return this.getraw2(`https://graph.microsoft.com/v1.0/${path}`,scopes)
    } 
    get3 = (url,scopes) => {
       // debugger
        return this.getraw2(url,scopes)
    } 
    getFile = (path,scopes) => {
        return this.getbinary(`https://graph.microsoft.com/v1.0/${path}`,scopes)
    } 
    getraw = (url) => {
        return this.getraw2(url,["https://graph.microsoft.com/user.read"])

    }
    getraw2 = (url,scopes) => {

        let that = this
        return  new Promise(function (resolve,reject){
    
            that.client
            .acquireTokenSilent(scopes)
            .then(accessToken => {

            fetch(url, {
                method: "GET",
               // mode:"no-cors",
                headers: { 'Authorization': 'Bearer ' + accessToken }
              }).then(response => {
                  if (response.status !== 200){
                    reject(response.statusText)
                  }else
                  {
                    resolve( response.json())
                    }
              }).catch(result => {
                reject(result);
              })
            })
            .catch(err => {
                reject(err)}
            )
        }
        )
    }
    convertBlobToBase64 = (blob) => {return new Promise((resolve, reject) => {
        const reader = new FileReader
        reader.onerror = reject
        reader.onload = () => {
            resolve(reader.result)
        };
        reader.readAsDataURL(blob)
    })}
    getbinary = (url,scopes) => {

        let that = this
        return  new Promise(function (resolve,reject){
    
            that.client
            .acquireTokenSilent(scopes)
            .then(accessToken => {
//debugger
            fetch(url, {
                method: "GET",
               // mode:"no-cors",
                headers: { 'Authorization': 'Bearer ' + accessToken }
              }).then(response => {

                  if (response.status !== 200){
                    reject(response.statusText)
                  }else
                  {
                      response.blob().then (blob=>{
                        that.convertBlobToBase64(blob).then(data=>{
                        
                            resolve(data)
                        }
                            
                            )
                        
                      })
                    
                    }
              }).catch(result => {
                reject(result);
              })
            })
            .catch(err => {
                reject(err)}
            )
        }
        )
    }



}





   