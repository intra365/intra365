import FileSaver from 'file-saver'
var mammoth = require("mammoth");
//var fs = require("fs");
var json = require("format-json")
var path = require("path")
var _ = require("lodash")
var step1 = require("./step1.json")


export function mdSplit(markdown) {

    var FrontMatterStart = markdown.indexOf("---")
    var FrontMatterEnd = markdown.indexOf("---", FrontMatterStart + 3)
    var body = markdown.substring(FrontMatterEnd + 3)
    var header = markdown.substring(FrontMatterStart + 3, FrontMatterEnd - FrontMatterStart)
    var frontMatter = {}
    var properties = header.split("\n")


    return {
        body,
        header,
        properties
    }
}


// function Storage() {
//     return {
//         writeFile: function (path, content, encoding) {
//             return new Promise((resolve, reject) => {
//                 fs.writeFileSync(path, content, encoding)

//                 resolve()
//             })
//         },
//         writeJson: function (path, content, encoding) {
//             return new Promise((resolve, reject) => {
//                 fs.writeJSONSync(path, content, encoding)

//                 resolve()
//             })
//         },
//         ensureDir: function (path) {
//             return new Promise((resolve, reject) => {
//                 fs.ensureDirSync(path)

//                 resolve()
//             })
//         },
//         copyFile: function (filePath, destPath) {
//             return new Promise((resolve, reject) => {
//                 fs.copyFileSync(filePath, destPath)
//                 resolve()
//             })
//         },
//         fullPath: function (dirname, basepath) {
//             return path.join(dirname, basepath)
//         },
//         initialize: function (dirname, basepath) {
//             return new Promise((resolve, reject) => {
//                 resolve({
//                     path: path.join(dirname, basepath)
//                 })
//             });
//         }
//     }
// }


export function MemoryStorage() {
    var store = {}
    
    return {

        data : ()=>{
            return store
        },
        writeFile: function (path, content, encoding) {
            //debugger
            this.data()[path] = content
            return new Promise((resolve, reject) => {
                //debugger
                //fs.writeFileSync(path, content, encoding)
                
                resolve()
            })
        },
        writeJson: function (path, content, encoding) {
            this.data()[path] = content
            return new Promise((resolve, reject) => {
                //debugger
                //fs.writeJSONSync(path, content, encoding)
                
                resolve()
            })
        },
        ensureDir: function (path) {
            this.data()[path] = null
            return new Promise((resolve, reject) => {
                
                //fs.ensureDirSync(path)
               // debugger
                resolve()
            })
        },
        copyFile: function (filePath, destPath) {
                     
            return new Promise((resolve, reject) => {
                //debugger
                //fs.copyFileSync(filePath, destPath)
                resolve()
            })
        },
        fullPath: function (dirname, basepath) {
            return path.join(dirname, basepath)
        },
        initialize: function (dirname, basepath) {
            //debugger
            return new Promise((resolve, reject) => {
                resolve({
                    path: path.join(dirname, basepath)
                })
            });
        }
    }
}

export function mdPropertiesToObject(properties) {
    var obj = {}
    properties.forEach(property => {
        var s = property.split(":")
        if (s[0]) {
            obj[s[0]] = s[1] ? s[1].trim() : ""
        }
    });
    return obj
}

export function mdObjectToProperties(obj) {
    var properties = []
    for (var attr in obj) {
        var val = obj[attr]
        var s = `${attr}: ${val}`
        properties.push(s)

    };
    return properties

}

export function mdMergeProperties(obj, overwriter) {


    try {
        for (var attr in overwriter) {
            obj[attr] = overwriter[attr]


        };
        return obj
    } catch (error) {
        return obj

    }

}

export function mdCombine(header, translatedBody, translatedProperties) {
    var md =
        `---${header}---${translatedBody}
`
    return md

}


export function fixLinks(text) {

    return text.replace(/\u005D\u0020\u0028/g, "](")
}

export function preserveLinks(text) {
    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);
    var result = {
        links: [],
        text: null
    }

    result.text = text.replace(regex, function (link) {
        var placeholder = `http://${result.links.length}.com`
        result.links.push(link)
        return placeholder
    })

    return result
}

export function restoreLinks(text, links) {
    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);

    return text.replace(regex, function (link) {
        var s = link.split("http://")
        var ix = parseInt(s[1])
        if (!isNaN(ix) && ix >= 0 && ix < links.length)
            return links[ix]
        else
            return link

    })
}

/**
 * Converts string array into Front Matter
 *
 * @param {*} properties
 * @returns
 */
export function mdPropertiesToHeader(properties) {

    var s = "\n"
    properties.forEach(line => {
        s += line + "\n"
    })
    return s
}

export function splitMarkdown(areaName, tool, basepath, md, storage) {
    return new Promise((resolve, reject) => {
        
        var root = storage.fullPath(__dirname, basepath)
        storage.ensureDir(root)
            .then(() => {
                var files = md.split("\n# ")
                
                files = files.reverse()
                var mapTitleToFile = []
                var headings = []
                var index = 0

                function parseHeadings() {
                    var h1 = files.pop()
                    if (!h1) {
                        return storage.writeJson(path.join(root, "index.json"), {
                                "title": areaName,
                                "icon": "https://images-na.ssl-images-amazon.com/images/I/715vwvP5ZEL.png",
                                "color": "#1BC98E",
                                "hasRatings": 5,
                                "areas": [areaName],
                                "tools": [tool],
                                "tasks": headings

                            })
                            .then(() => {
                                
                                var data = storage.data()
                                var directory = _.keysIn(data)
                                
                                return resolve({mapTitleToFile,directory,data})
                            })
                    }

                    index += 1

                    
                    var newLine = h1.indexOf("\n")
                    if (newLine < 0) return
                    var title = h1.substring(0, newLine < 100 ? newLine : 100)
                    var body = h1.substring(newLine)
                    var myNumber = index;
                    var formattedNumber = ("0" + myNumber).slice(-2)
//                    var fn = formattedNumber + "-" + title.toLowerCase().replace(/[^\w]+/g, '-')


                    var fn =  title.toLowerCase().replace(/[^\w]+/g, '-')
                    
                    var title =  title.replace(/\\/g, '')
                     title =  title.replace(/\#/g, '')
                     title = title.replace(/<[^>]*>/g,"")
                    mapTitleToFile.push({title,file:fn})

                    var thispath = path.join(root, fn)
                    storage.ensureDir(thispath)
                        .then(() => {
                            var properties = {
                                title: areaName,
                                contexts: "office365,microsoft365",
                                source: "Microsoft public sites",
                                translation: "en",
                                tools: tool
                            }

                          //  var content = mdCombine(mdPropertiesToHeader(mdObjectToProperties(properties)), body)

                            storage.writeFile(path.join(thispath, "index.md"), body, "utf8")
                                .then(() => {
                                    headings.push({
                                        "area": areaName,
                                        "subject": title,
                                        "path": fn,
                                        // "rating": 5,
                                        // "preview": null,
                                        // "url": null,
                                        // "tags": null,
                                        // "tool": "yammer"
                                    })
                                    parseHeadings()
                                })

                        })

                }

                parseHeadings()
            })



    })

}



export  function toMarkDown(buffer) {

    return new Promise((resolve, reject) => {
        var options = {
            buffer
        }
        mammoth.convertToMarkdown(options)
            .then(function (result) {
                var html = result.value; // The generated HTML
                var messages = result.messages; // Any messages, such as warnings during conversion

                resolve(result)
                // fs.writeJsonSync(path.join(__dirname,"step1.json"),result)
            })
            .catch(function (err) {
                console.log(err)
                reject(err)
            })

    });
}

function convert(areaName, tool, basepath, storagePath, fileName, storage) {

    return new Promise((resolve, reject) => {

        storage.initialize(storagePath, fileName)
            .then(options => {



                var root = storage.fullPath(__dirname, basepath)




                storage.ensureDir(root)

                    .then(() => {
                        var destPath = path.join(root, "index.docx")
                        var filePath = storage.fullPath(storagePath, fileName)
                        storage.copyFile(filePath, destPath) // will not be performed online
                        mammoth.convertToMarkdown(options)
                            .then(function (result) {
                                splitMarkdown(areaName, tool, basepath, result.value, storage)
                                    .then(() => {
                                        resolve()
                                    })
                            })
                            .catch(function (err) {
                                console.log(err)
                            })
                            .done();

                    })
            });
    })
}

export function docx1(dest) {
    return new Promise((resolve, reject) => {
        return reject("has errors internally")
    
    // // Create document
    // var doc = new docx.Document();

    // // Add some content in the document
    // var paragraph = new docx.Paragraph("Some cool text here.");
    // // Add more text into the paragraph if you wish
    // paragraph.addRun(new docx.TextRun("Lorem Ipsum Foo Bar"));
    // doc.addParagraph(paragraph);
    // const packer = new docx.Packer();

    // packer.toBuffer(doc).then((blob) => {
    //     switch (dest) {
    //         case "blob":
    //             //debugger
    //              var element = window.document.createElement("a");
    //             var file = new Blob(blob, {type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'});
    //             // element.href = URL.createObjectURL(file);
    //             // element.download = "example.docx";
    //             // element.click();
    //             saveAs(file,"word.docx")
    //             resolve()
    //             break;

    //         default:
                
    //            // fs.writeFileSync(path.join(__dirname, "example.docx"), blob)
    //             reject("Unsupported "+dest)
    //             break;
    //     }

    // });
});


}
// module.exports = {
//     //Storage,
//     toMarkDown,
//    // convert,
//     docx1
// }
//convert( "Yammer","yammer","yammer","/Users/niels/Documents/Hexatown/JumpTo365 Administration - Documents/Tools/Guides/What is Yammer.docx")
//convert( "Pandora Yammer","yammer","pandora-yammer","/Users/niels/Documents/Hexatown/#WhichToolWhenBeta - Documents/Pandora/Yammer Essentials training.docx")
//toMarkDown()
//docx1()
