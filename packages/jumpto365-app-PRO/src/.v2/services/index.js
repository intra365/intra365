import _ from "lodash"
import TestData from "../data/TestData"
import Data from "../data"
import GitHub from "./GitHub"
import MarkdownParser from '../utilities/MarkdownParser'
import TocParser from '../utilities/TocParser'


import Parser from "./Parser"


const Jumpto365API = require('../services/Jumpto365API')
var Marked = require("marked")

var axios = require("axios")
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
export function mdCombine(mdObject, translatedBody, translatedProperties) {
    var md =
        `---${mdObject.header}---${translatedBody}
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
export default class Jumpto365Service {
    isValidating = false

    validateGrid(rows, onProgress) {
        var that = this
        return new Promise((resolve, reject) => {
            if (this.isValidating) {
                return reject("Already running a validation")
            }
            var cells = []
            // if (onProgress) onProgress({message:"Starting ",completedPercent:0})            
            var total = 0
            for (var row = 0; row < rows.length; row++) {
                const columns = rows[row];
                for (var column = 0; column < columns.length; column++) {
                    var cell = columns[column]
                    if (cell.centerData) {
                        total += 1
                        var key = cell.centerData.key
                        var contentRef = cell.centerData.contentRef
                        cells.push({
                            row,
                            column,
                            key,
                            contentRef
                        })
                    }

                }
            }
            var results = []

            function takeNext() {
                if (cells.length === 0) {
                    this.isValidating = false
                    return resolve(results)
                }
                var cell = cells.pop()
                //if (onProgress) onProgress({message:"Testing ",completedPercent:cells.length/total})   
                that.getToolDocument(cell.key, "en", cell.contentRef)
                    .then(result => {
                        cell.hasArticle = true
                        results.push(cell)
                        console.log(cells.length, result)
                        takeNext()
                    })
                    .catch(error => {
                        console.log(cells.length, error)
                        cell.hasArticle = false
                        results.push(cell)
                        takeNext()
                    })

            }
            takeNext()


        });
    }

    ping = (name) => {
        return true
    }


    getApp = (appName) => {
        let data = new Data()

        var app = data.getApp(appName)


        return app ? app : {
            color: "888888"
        }
    }
    getToolDocument = (toolName, language, contentRef,store,docPath) => {
        var that = this
        return new Promise(function (resolve, reject) {
            debugger
            let git = new GitHub()
            let data = new Data()
            var appData = data.getApp(toolName)
            if (!appData) {
                appData = {
                    "name": toolName,
                    "color": "#777777",
                    "Content": `https://hexatown.github.io/docs/microsoft/office365/${toolName}`
                }


            }
            var url = appData.Content.toLowerCase().replace("https://hexatown.github.io/docs/", "https://raw.githubusercontent.com/Hexatown/docs/master/")
            url += "/index.md"
            var documentSourceUrl = appData.Content.toLowerCase().replace("https://hexatown.github.io/docs/", "https://github.com/Hexatown/docs/blob/master/")
            documentSourceUrl += "/index.md"
            var translatedUrl = appData.Content.toLowerCase().replace("https://hexatown.github.io/docs/", "https://raw.githubusercontent.com/Hexatown/docs/master/")
            translatedUrl += `/${language}.md`
            var translatedDocumentSourceUrl = appData.Content.toLowerCase().replace("https://hexatown.github.io/docs/", "https://github.com/Hexatown/docs/blob/master/")
            translatedDocumentSourceUrl += `/${language}.md`

            if (store){
                if (store==="github.com"){
                    docPath = "https://raw.githubusercontent.com" + docPath.replace("/blob","")
                    contentRef = null
                }
                if (store=="article"){
                    contentRef = "/article" + docPath
                }
                
                url = docPath + "/index.md"
                translatedUrl =  docPath +  `/${language}.md`
            }




            var loader = git.get
            var properties = null
            if (contentRef) {
                documentSourceUrl = null
                translatedUrl = null
                translatedDocumentSourceUrl = null
                var host = Jumpto365API.apiHostGet()
                url = `${host}${contentRef}`

                loader = (url) => {
                    return new Promise((resolve, reject) => {
                        var jsontext = null
                        Jumpto365API.RestGet(url)
                            .then(r => {

                                if (r && r.length === 1) {
                                    jsontext = r[0].MarkDown
                                    properties = r[0]
                                    var expression = /(\\.)/gi;
                                    var regex = new RegExp(expression);

                                    var body2 = jsontext.replace(regex, function (link) {

                                        return `.`
                                    })
                                    try {
                                        properties.frontMatter = r[0].FrontMatter ? JSON.parse(r[0].FrontMatter) : {}
                                    } catch (error) {
                                        
                                    }
                                    
                                    resolve(body2)
                                }

                            })
                            .catch(error => {
                                reject({
                                    message: error.message,
                                    jsontext
                                })
                            })
                    });

                }

            }




            loader(url)
                .then(markdownContent => {
                    var document = MarkdownParser(markdownContent, appData.Content)
                    document.language = "en"
                    document.title = document.properties.title ? document.properties.title : ""
                    document.sourceUrl = documentSourceUrl
                    document.markdown = markdownContent

                    document.frontMatter = properties ? properties.frontMatter : null
                    if (language && language != "en") {
                        git.get(translatedUrl)
                            .then(transaltedMarkdownContent => {
                                var translatedDocument = MarkdownParser(transaltedMarkdownContent, appData.Content)
                                translatedDocument.language = language
                                translatedDocument.title = translatedDocument.properties.title ? translatedDocument.properties.title : ""
                                translatedDocument.sourceUrl = translatedDocumentSourceUrl
                                translatedDocument.properties = mdMergeProperties(document.properties, translatedDocument.properties)
                                translatedDocument.markdown = transaltedMarkdownContent

                                resolve(translatedDocument)
                            })
                            .catch(err => {
                                document.translationError = err
                                resolve(document)
                            })



                    } else {
                        resolve(document)

                    }


                })
                .catch(err => {
                    reject(err)

                })

        })


    }

    getUseCaseDocument = (usecaseTitle, language, domain, technology) => {
        return new Promise(function (resolve, reject) {
            let git = new GitHub()
            let data = new Data()



            function getPart(n) {

                switch (n) {
                    case 0:
                        return `${technology}/`
                        break;
                    case 1:
                        return "usecases/"
                        break;
                    case 2:
                        return `${domain}/`
                        break;


                    default:
                        return ""
                        break;
                }


            }


            var owner = "hexatown"
            var repo = "docs"
            var rootpath = getPart(0) + getPart(1) + getPart(2) + usecaseTitle.toLowerCase()


            var url = `https://raw.githubusercontent.com/${owner}/${repo}/master/${rootpath}/index.md`
            var documentSourceUrl = `https://github.com/${owner}/${repo}/blob/master/${rootpath}/index.md`
            var translatedUrl = `https://raw.githubusercontent.com/${owner}/${repo}/master/${rootpath}/${language}.md`
            var translatedDocumentSourceUrl = `https://github.com/${owner}/${repo}/blob/master/${rootpath}/${language}.md`

            var usecaseData = {
                name: usecaseTitle,
                language,
                documentSourceUrl,
                translatedDocumentSourceUrl
            }


            git.get(encodeURI(url))
                .then(markdownContent => {
                    var document = MarkdownParser(markdownContent, url)
                    document.language = "en"
                    document.title = document.properties.title ? document.properties.title : this.state.title
                    document.sourceUrl = documentSourceUrl
                    if (language && language != "en") {
                        git.get(encodeURI(translatedUrl))
                            .then(transaltedMarkdownContent => {
                                var translatedDocument = MarkdownParser(transaltedMarkdownContent, translatedUrl)
                                translatedDocument.language = language
                                translatedDocument.title = translatedDocument.properties.title ? translatedDocument.properties.title : this.state.title
                                translatedDocument.sourceUrl = translatedDocumentSourceUrl
                                translatedDocument.properties = mdMergeProperties(document.properties, translatedDocument.properties)
                                resolve(translatedDocument)
                            })
                            .catch(err => {
                                document.translationError = err
                                resolve(document)
                            })



                    } else {
                        resolve(document)

                    }


                })
                .catch(err => {
                    reject(err)

                })

        })


    }

    getDialogue = (path, language, internalRoot) => {

        var lastSlash = internalRoot && path ? path.lastIndexOf("/") : null
        var internalPath = null
        if (lastSlash) {
            internalPath = internalRoot + path + "/" //.substring(0,lastSlash)
        }

        return new Promise(function (resolve, reject) {
            let git = new GitHub()


            var owner = "pto365"
            var repo = "client"



            var url = `https://raw.githubusercontent.com/${owner}/${repo}/master/${path}/index.md`
            var documentSourceUrl = `https://github.com/${owner}/${repo}/blob/master/${path}/index.md`
            var translatedUrl = `https://raw.githubusercontent.com/${owner}/${repo}/master/${path}/${language}.md`
            var translatedDocumentSourceUrl = `https://github.com/${owner}/${repo}/blob/master/${path}/${language}.md`



            git.get(encodeURI(url))
                .then(markdownContent => {
                    var document = MarkdownParser(markdownContent, url, internalPath)
                    document.language = "en"
                    document.title = document.properties.title ? document.properties.title : this.state.title
                    document.sourceUrl = documentSourceUrl
                    document.source = markdownContent
                    if (language && language != "en") {
                        git.get(encodeURI(translatedUrl))
                            .then(transaltedMarkdownContent => {
                                var translatedDocument = MarkdownParser(transaltedMarkdownContent, translatedUrl, internalPath)
                                translatedDocument.language = language
                                translatedDocument.title = translatedDocument.properties.title ? translatedDocument.properties.title : this.state.title
                                translatedDocument.sourceUrl = translatedDocumentSourceUrl
                                translatedDocument.properties = mdMergeProperties(document.properties, translatedDocument.properties)
                                translatedDocument.source = markdownContent

                                translatedDocument.components = Parser.parseComponents(translatedDocument.body)
                                resolve(translatedDocument)
                            })
                            .catch(err => {
                                document.translationError = err
                                resolve(document)
                            })



                    } else {
                        document.components = Parser.parseComponents(document.body)

                        resolve(document)

                    }


                })
                .catch(err => {
                    reject(err)

                })

        })


    }

    getGitHubMarkdown = (owner, repo, branch, path) => {



        return new Promise(function (resolve, reject) {
            let git = new GitHub()



            var url = `https://raw.githubusercontent.com/${owner}/${repo}/${branch}${path}`
            var documentSourceUrl = `https://github.com/${owner}/${repo}/blob/${branch}${path}`



            git.get(encodeURI(url))
                .then(markdownContent => {
                    var document = MarkdownParser(markdownContent, url, null)
                    document.title = document.properties.title ? document.properties.title : this.state.title
                    document.sourceUrl = documentSourceUrl
                    document.source = markdownContent
                    document.components = Parser.parseComponents(document.body)
                    resolve(document)
                })
                .catch(err => {
                    reject(err)

                })

        })


    }


    getGitHubTOC = (owner, repo, branch, path) => {



        return new Promise(function (resolve, reject) {
            let git = new GitHub()



            var url = `https://raw.githubusercontent.com/${owner}/${repo}/${branch}${path}/TOC.yml`
            var documentSourceUrl = `https://github.com/${owner}/${repo}/blob/${branch}${path}/TOC.yml`



            git.get(encodeURI(url))
                .then(yaml => {
                    var document = TocParser(yaml)

                    document.sourceUrl = documentSourceUrl
                    document.source = yaml

                    resolve({
                        isYaml: true,
                        document
                    })
                })
                .catch(err => {
                    url = `https://raw.githubusercontent.com/${owner}/${repo}/${branch}${path}/TOC.md`
                    documentSourceUrl = `https://github.com/${owner}/${repo}/blob/${branch}${path}/TOC.md`
                    git.get(encodeURI(url))
                        .then(md => {
                            var renderer = new Marked.Renderer();
                            renderer.link = function (href, title, text) {
                                return `<div><a href=${href} title=${title}>${text}</a></div>`
                            }
                            renderer.heading = function (text, level) {
                                return `<div classname="toc${level}" >${text}</div>`
                            }

                            renderer.image = function (href, title, text) {
                                return `<img src={$href} ></img>`
                            }
                            var document = MarkdownParser(md, null, null, null, null, renderer)

                            document.sourceUrl = documentSourceUrl
                            document.source = md

                            resolve({
                                isMarkdown: true,
                                document
                            })
                        })
                        .catch(err => reject(err))

                })

        })


    }

    parseMarkDown = (markdownContent, url, internalRoot) => {

        var lastSlash = internalRoot && path ? path.lastIndexOf("/") : null
        var internalPath = null
        if (lastSlash) {
            internalPath = internalRoot + path + "/" //.substring(0,lastSlash)
        }

        return new Promise(function (resolve, reject) {

            var document = MarkdownParser(markdownContent, url, internalPath)

            document.title = document.properties.title ? document.properties.title : this.state.title
            document.source = markdownContent
            document.components = Parser.parseComponents(document.body)

            resolve(document)

        })


    }
    getMarkDown = (owner, repo, path, language, internalRoot) => {

        var lastSlash = internalRoot && path ? path.lastIndexOf("/") : null
        var internalPath = null
        if (lastSlash) {
            internalPath = internalRoot + path + "/" //.substring(0,lastSlash)
        }

        return new Promise(function (resolve, reject) {
            let git = new GitHub()






            var url = `https://raw.githubusercontent.com/${owner}/${repo}/master/${path}/index.md`
            var documentSourceUrl = `https://github.com/${owner}/${repo}/blob/master/${path}/index.md`
            var translatedUrl = `https://raw.githubusercontent.com/${owner}/${repo}/master/${path}/${language}.md`
            var translatedDocumentSourceUrl = `https://github.com/${owner}/${repo}/blob/master/${path}/${language}.md`



            git.get(encodeURI(url))
                .then(markdownContent => {
                    var document = MarkdownParser(markdownContent, url, internalPath)
                    document.language = "en"
                    document.title = document.properties.title ? document.properties.title : this.state.title
                    document.sourceUrl = documentSourceUrl
                    if (language && language != "en") {
                        git.get(encodeURI(translatedUrl))
                            .then(transaltedMarkdownContent => {
                                var translatedDocument = MarkdownParser(transaltedMarkdownContent, translatedUrl, internalPath)
                                translatedDocument.language = language
                                translatedDocument.title = translatedDocument.properties.title ? translatedDocument.properties.title : this.state.title
                                translatedDocument.sourceUrl = translatedDocumentSourceUrl
                                translatedDocument.properties = mdMergeProperties(document.properties, translatedDocument.properties)

                                translatedDocument.components = Parser.parseComponents(translatedDocument.body)
                                resolve(translatedDocument)
                            })
                            .catch(err => {
                                document.translationError = err
                                resolve(document)
                            })



                    } else {
                        document.components = Parser.parseComponents(document.body)

                        resolve(document)

                    }


                })
                .catch(err => {
                    reject(err)

                })

        })


    }



    getTenant = (tenantName) => {
        return new Promise(function (resolve, reject) {
            let git = new GitHub()

            function getPart(n) {
                if (n > tenantName.length) return
                return tenantName.substring(n, n + 1) + "/"

            }

            var owner = "pto365"
            var repo = "tenants"
            var rootpath = getPart(0) + getPart(1) + getPart(2) + tenantName

            var prefix = 'https://pto365.github.io/tenants'

            var url = `https://raw.githubusercontent.com/${owner}/${repo}/master/${rootpath}/index.md`
            var documentSourceUrl = `https://github.com/${owner}/${repo}/blob/master/${rootpath}/index.md`
            var settingsUrl = `https://raw.githubusercontent.com/${owner}/${repo}/master/${rootpath}/index.json`



            git.get(url)
                .then(markdownContent => {

                    var document = MarkdownParser(markdownContent, url, "/")
                    document.title = document.properties.title ? document.properties.title : this.state.title
                    document.sourceUrl = documentSourceUrl
                    document.components = Parser.parseComponents(document.body)
                    git.get(settingsUrl)
                        .then(settings => {
                            document.settings = settings
                            resolve(document)
                        })
                        .catch(e => {
                            resolve(document)
                        })
                })
                .catch(err => {
                    reject(err.message)

                })

        })


    }

    userName = null
    getUser = (user, filename) => {
        this.userName = JSON.parse(JSON.stringify(user))
        var that = this
        return new Promise(function (resolve, reject) {

            var userName = that.userName
            if (!userName) return reject("No user name")
            let git = new GitHub()
            var name = filename ? filename : "index.md"

            function getPart(n) {
                if (n > userName.length) return
                return userName.substring(n, n + 1) + "/"

            }
            var userName = userName.replace("@", "-")
            var owner = "pto365"
            var repo = "tenants"
            var rootpath = getPart(0) + getPart(1) + getPart(2) + userName

            var prefix = 'https://pto365.github.io/tenants'

            var url = `https://raw.githubusercontent.com/${owner}/${repo}/master/${rootpath}/${name}`
            var documentSourceUrl = `https://github.com/${owner}/${repo}/blob/master/${rootpath}/${name}`



            git.get(url)
                .then(data => {
                    if (name === "index.md") {
                        var document = MarkdownParser(data)

                        document.title = document.properties.title ? document.properties.title : this.state.title
                        document.sourceUrl = documentSourceUrl

                        resolve(document)
                    } else {
                        resolve(data)
                    }
                })
                .catch(err => {
                    reject(err.message)

                })

        })


    }


    getJSON = (name, areaPath) => {
        return this.getJSON2("hexatown", "docs", `${areaPath}/${name}`)

    }

    getJSON2 = (owner, repo, subPath, language) => {
        return new Promise(function (resolve, reject) {
            let git = new GitHub()


            // var owner = "hexatown"
            // var repo = "docs"
            var rootpath = `${subPath}`

            //  var prefix = 'https://pto365.github.io/tenants'

            var url = `https://raw.githubusercontent.com/${owner}/${repo}/master/${rootpath}/index.json`
            // var documentSourceUrl = `https://github.com/${owner}/${repo}/blob/master/${rootpath}/index.json`

            var translatedUrl = `https://raw.githubusercontent.com/${owner}/${repo}/master/${rootpath}/${language}.json`
            // var translatedDocumentSourceUrl = `https://github.com/${owner}/${repo}/blob/master/${rootpath}/${language}.json`



            git.get(url)
                .then(content => {

                    content.language = "en"
                    if (language && language != "en") {
                        git.get(translatedUrl)
                            .then(translatedContent => {
                                translatedContent.language = language
                                resolve(translatedContent) // translated version
                            })
                            .catch(err => {
                                content.languageLookupError = err
                                resolve(
                                    content
                                )
                            }) //english version
                    } else {
                        resolve(content) // english version
                    }
                })
                .catch(err => {
                    reject(err.message)

                })

        })


    }

    getFile = (owner, repo, path, filename) => {
        return new Promise(function (resolve, reject) {
            let git = new GitHub()

            var url = `https://raw.githubusercontent.com/${owner}/${repo}/master/${path}/${filename}`

            git.get(url)
                .then(content => {
                    resolve(content)
                })
                .catch(err => {
                    reject(err.message)

                })

        })


    }
    getContent = async (url,baseUrl) => {
       var git = new GitHub()
       var markdownContent = null
        
        if (_.startsWith(url,"/article/")){

                var host = Jumpto365API.apiHostGet()
                var contentUrl = `${host}${url}`

                var data = await Jumpto365API.RestGet(contentUrl)
            
                markdownContent = data[0].MarkDown

        }else{
            markdownContent = await git.get(url)
            if (_.endsWith(url,".json")){
                return markdownContent
            }
        }



       
        
       var document = MarkdownParser(markdownContent, baseUrl)
       //document.language = "en"
       document.title = document.properties.title ? document.properties.title : ""
       //document.sourceUrl = documentSourceUrl


       return document
        
    }
    getDomainPublicContext = async (domain,area,key,language) => {
        return  Jumpto365API.getDomainPublicContext(domain,area,key,language)
    }
    getContext = (contextName, language, tenant, isNew,area) => {
        var blankGrid = (rows, columns) => {
            var cellRows = []
            for (let row = 0; row < rows; row++) {
                var columnCells = []
                for (let column = 0; column < columns; column++) {
                    columnCells.push({
                        "key": "blank2",
                        "l": column  === 0 ? 1 : 0,
                        "c": 1,
                        "r": column  === (columns-1) ? 1 : 0,
                        "t": 0,
                        "b": 0,
                        "leftData": column  === 0 ? {} : null,
                        "topData": null,
                        xcenterData : null,
                        "centerData": {
                            "key": "",
                            "textcolor" : "#cccccc",
                            "title": "",
                            "color": "#ffffff",
                            "icon": null,
                            "inShort":"",
                            "isFullyShareable": "",
                            "isPartlyShareable": "",
                            "isPremium": "",
                            "jumpto": null,
                            "subtitle": "",
                            "contentRef": ""
                          },
                        "rightData": column  === (columns-1) ? {} : null,
                        "bottomData": {},
                        "connectorColor": "#ffffff"
                    })
                }
                cellRows.push(columnCells)
            }
            return cellRows
        }
        return new Promise(function (resolve, reject) {
            if (isNew) {
                resolve( {
                    "title": "of Office365",
                    "version":2,
                    "settings": {
                        "titlegraphics": "xhttps://jumpto365.com/resources/images/CogServicesTitle.png",
                        "tileactiontype": "externallink"
                    },
                    "color": "#256FB0",
                    "icon": "https://jumpto365.com/resources/images/app/jumpto365-Icon-white.png",
                    "groups": [{
                        "key": "biz",
                        "title": "Business App Platform",
                        "color": "#AAE29F",
                        "borderColor": "",
                        "isConnector": false,
                        "textColor": ""
                    }],
                    "grid": blankGrid(5,7),
                    "tools": [
                        {
                            "key": "blank",
                            "title": "",
                            "color": "#cccccc",
                            "icon": null,
                            "inShort": "",
                            "isFullyShareable": "",
                            "isPartlyShareable": "",
                            "isPremium": "",
                            "jumpto": null,
                            "subtitle": "",
                            "contentRef": ""
                          }
                    ]
                })
            }

            if (tenant) {
                var isGlobal = _.indexOf(tenant,"@") ===-1
                if (isGlobal){

                    Jumpto365API.getGlobalTenant(tenant,area ? area : "-")
                    .then(settings=>{

                        

                        if (
                            !settings ||
                            !settings.contexts ||
                            !settings.contexts.default   ){
                                reject("Missing default table for tenant")
                            }else
                        resolve(settings.contexts.default)
                    }) 
                    .catch(e => {
                        reject(e)
                    }) 
                /*
                    
                    function getPart(n) {
                        if (n > tenant.length) return
                        return tenant.substring(n, n + 1) + "/"
        
                    }
        
                    var owner = "pto365"
                    var repo = "tenants"
                    var rootpath = getPart(0) + getPart(1) + getPart(2) + tenant
        
                    var settingsUrl = `https://raw.githubusercontent.com/${owner}/${repo}/master/${rootpath}/index.json`
        
        
        
                    var git = new GitHub()
                    //var myservice = new Jumpto365Service()
                    git.get(settingsUrl)
                    .then(settings=>{
                        
                        if (
                            !settings ||
                            !settings.contexts ||
                            !settings.contexts.default   ){
                                reject("Missing default table for tenant")
                            }else
                        resolve(settings.contexts.default)
                    }) 
                    .catch(e => {
                        reject(e)
                    }) 
                    */
                }
                else
                {
                Jumpto365API.findItemByKey("mytables",area ? area : "-")
                .then(content => {
                    
                    if(!content) return reject("Didn't get a table from the API")
                    //if(!content.length !==1) return reject("Didn't get a exactly 1 record from the API")
                    try {
                        
                        var item = JSON.parse(content[0].Json)

                        
                        resolve(item.tableOf)

                    } catch (error) {
                        
                        return reject(error)
                    }

                }

                )
                .catch(e => {
                    reject(e)
                })
                // Jumpto365API.fileGet("-", "default", "context", "index.json")
                //     .then(url => {
                //         console.log(url)
                //         axios.get(url, {})
                //             .then(content => {

                //                 resolve(content.data)
                //             })
                //             .catch(e => {

                //                 // debugger
                //                 reject(e)
                //             })
                //     })
                //     .catch(e => {
                //         reject(e)
                //     })
                }
            } else {
                let git = new GitHub()

                function getPart(n) {
                    if (n > contexttName.length) return
                    return contexttName.substring(n, n + 1)  + "/"

                }

                var owner = "hexatown"
                var repo = "docs"
                var rootpath = `contexts/${contextName}`

                //  var prefix = 'https://pto365.github.io/tenants'

                var url = `https://raw.githubusercontent.com/${owner}/${repo}/master/${rootpath}/index.json`
                // var documentSourceUrl = `https://github.com/${owner}/${repo}/blob/master/${rootpath}/index.json`

                var translatedUrl = `https://raw.githubusercontent.com/${owner}/${repo}/master/${rootpath}/${language}.json`
                // var translatedDocumentSourceUrl = `https://github.com/${owner}/${repo}/blob/master/${rootpath}/${language}.json`



                git.get(url)
                    .then(content => {

                        content.language = "en"
                        if (language && language != "en") {
                            git.get(translatedUrl)
                                .then(translatedContent => {
                                    translatedContent.language = language
                                    resolve(translatedContent) // translated version
                                })
                                .catch(err => {
                                    content.languageLookupError = err
                                    resolve(
                                        content
                                    )
                                }) //english version
                        } else {
                            resolve(content) // english version
                        }
                    })
                    .catch(err => {
                        reject(err.message)

                    })
            }
        })


    }


}