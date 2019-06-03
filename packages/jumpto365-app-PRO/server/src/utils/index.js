/**
 * 
 * 
 * 
 * https://docs.microsoft.com/en-us/azure/cognitive-services/translator/languages
 * https://regexr.com/3f4vo
 */

var Translator = require("./translate")
var Files = require("./files")
var fs = require("fs-extra")
var path = require("path")
var _ = require("lodash")

/**
 * Split the content of a markdown file
 *
 * @param {*} markdown
 * @returns {
 *       body,
 *       header,
 *       properties
 *   }
 */
function mdSplit(markdown) {

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

/**
 * 
 *
 * @param {Array of string "name: value"} properties
 * @returns object {name:value}
 */
function mdPropertiesToObject(properties) {
    var obj = {}
    properties.forEach(property => {
        var s = property.split(":")
        if (s[0]) {
            obj[s[0]] = s[1] ? s[1].trim() : ""
        }
    });
    return obj
}

/**
 * Converts an objedct into an array of strings "name: value"
 *
 * @param {*} obj
 * @returns
 */
function mdObjectToProperties(obj) {
    var properties = []
    for (var attr in obj) {
        var val = obj[attr]
        var s = `${attr}: ${val}`
        properties.push(s)

    };
    return properties

}

/**
 * Converts string array into Front Matter
 *
 * @param {*} properties
 * @returns
 */
function mdPropertiesToHeader(properties) {
    var s = "\n"
    properties.forEach(line => {
        s += line + "\n"
    })
    return s
}

/**
 * Combines what was split by mdSplit
 * 
 *
 * @param {*} header
 * @param {*} translatedBody
 * @returns
 */
function mdCombine(header, translatedBody) {
    var md =
        `---${header}---${translatedBody}
`
    return md

}

/**
 * Removes spaces between  ](
 *
 * @param {*} text
 * @returns
 */
function fixLinks(text) {

    return text.replace(/\u005D\u0020\u0028/g, "](")
}

/**
 * Replace links with proxy values
 *
 * @param {*} text
 * @returns an text with all http/https references removed 
 */
function preserveLinks(text) {
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

/**
 * Restore links having proxy values
 *
 * @param {*} text
 * @returns an text with all http/https references restored 
 */

function restoreLinks(text, links) {
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
 * Translates one Markdown file 
 *
 * @param {*} filePath
 * @param {*} directoryPath 
 * @param {*} fromLanguage
 * @param {*} toLanguage
 * @returns
 */
function mdTranslate(filePath, directoryPath, fromLanguage, toLanguage) {
    console.log("Tranlating into", toLanguage, filePath)
    return new Promise((resolve, reject) => {
        var buffer = fs.readFileSync(filePath)
        var text = buffer.toString("utf8")
        var mdSource = mdSplit(text)


        var sourceProperties = mdPropertiesToObject(mdSource.properties)
        var source = "---\n"
        source += `${sourceProperties.title}\n`
        source += `${sourceProperties.inshort}\n`
        source += "---\n"
        source += mdSource.body

        var sourceWithLinkPlaceholders = preserveLinks(source)


        Translator.translate(sourceWithLinkPlaceholders.text, fromLanguage, toLanguage, function (err, translation) {
            if (err) {
                return reject(err)
            }
            var translationWithRestoredLinks = restoreLinks(translation, sourceWithLinkPlaceholders.links)
            var mdTranslated = mdSplit(translationWithRestoredLinks)
            var properties = {
                title: mdTranslated.properties[1],
                inshort: mdTranslated.properties[2],
                translator: "Microsoft Cognitive Services"
            }


            var translatedFileName = path.join(directoryPath, `${toLanguage}.md`);
            var translatedContent = mdCombine(mdPropertiesToHeader(mdObjectToProperties(properties)), mdTranslated.body)

            translatedContent = fixLinks(translatedContent)



            fs.writeFileSync(translatedFileName, translatedContent, "utf8")

            return resolve()
        })
    });

}


/**
 * Translates all markdown files on a given path and sub directories to that into each of the languages specified
 *
 * @param {*} directoryPath
 * @param {*} languages
 * @returns
 */
function translate(directoryPath, languages) {
    return new Promise((resolve, reject) => {
        Files.loop(directoryPath)
            .then(result => {
                Files.processMD(result)
                    .then(mdFiles => {
                        // Now we got the gross list of files to translate

                        var docCount = mdFiles.length * (languages.length + 1)
                        mdFiles.forEach(mdFile => {
                            languages.forEach(language => {
                                mdTranslate(mdFile.file, mdFile.directory, "en", language)
                                    .then(result => {
                                        docCount--
                                        if (docCount === 0) {
                                            return resolve()
                                        }
                                    })
                                    .catch(err => {
                                        console.log(language, err)
                                        docCount--
                                        if (docCount === 0) {
                                            return resolve()
                                        }
                                    })
                            })
                        })
                    })
                    .catch(err => {
                        console.log(result, err)
                        reject(err)
                    })
            })
            .catch(err => {
                reject(err)
            })
    })
}

function iterateFiles(directoryPath, inspector) {
    return new Promise((resolve, reject) => {
        Files.loop(directoryPath)
            .then(rootDirectory => {
                function inspect(directory) {
                    directory.files.forEach(file => {
                        inspector(file)
                    });
                    directory.directories.forEach(directory => {
                        inspect(directory)
                    });

                }
                inspect(rootDirectory)
            })
            .catch(err => {
                reject(err)
            })
    })
}


function removeLiquidTags(text){

   
    var expression = /\{\%[\s\S]{1,200}\%\}/gi;
    var regex = new RegExp(expression);

    return text.replace(regex, function (link) {
        return ""
    })
   
}
function removeDash(text){
    if (!text) return ""
    var expression = /\&\#\x[\s\S]{1,6}\;/gi;
    var regex = new RegExp(expression);

    return text.replace(regex, function (link) {
        return " "
    })
    
}

function fileRemoveLiquidTags(filePath){

    var buffer = fs.readFileSync(filePath)
    var text = buffer.toString("utf8")
    var newText = removeLiquidTags(text)
    if (newText === text) return

    fs.writeFileSync(filePath, newText, "utf8")
}


function fasttrackMerge() {
    var ft = require("./scrapper/dump/fasttrack.json")
    var pages = require("./scrapper/dump/pages.json")

    var mappedData = pages.map((page, ix) => {
        ftdata = _.find(ft, {
            Title: page.pageData.title
        })
        page.ftdata = ftdata

        var root = "/Users/niels/code/pto365-api/src/utils/git/docs/microsoft/usecases/microsoft365"
        var filepath = `${root}/${page.pageData.title}`
        fs.ensureDirSync(filepath)


        var body = "\n" +  removeDash( page.pageData.subTitle) + "\n\n"
        var properties = {
            title: page.pageData.title,
            //inshort: page.pageData.subTitle,
            contexts: "office365,microsoft365",
            copyright: "Microsoft",
            translations: "en",
            tools: page && page.ftdata && page.ftdata.Featuring ? page.ftdata.Featuring : "",
            areas: page && page.ftdata && page.ftdata.Category ? page.ftdata.Category : "",
            color: "#777777",
            icon: "https://jumpto365.com/resources/images/app/jumpto365-Icon-white.png",
            externalref: page.url
        }



        page.pageData.elements.forEach(element => {
            var img = element.img ? element.img.replace("http://", "https://") : null
            body += `\n## ${element.headingMarkdown}\n\n`
            body += `${element.textMarkdown}\n\n`

            if (img) {
                body += `![](${element.img})\n`
            }
            if (element.video) {
                body += `[IFRAME](${element.video})\n`
            }


        });

        var content = mdCombine(mdPropertiesToHeader(mdObjectToProperties(properties)), body)



        var fileName = path.join(filepath, `index.md`);
        fs.writeFileSync(fileName, content, "utf8")
        return (page)

    })
    //fs.writeJsonSync(path.join(__dirname,"ft.json"),mappedData)

}


module.exports = {

    mdCombine,
    mdObjectToProperties,
    mdPropertiesToObject,
    mdPropertiesToHeader,
    translate,
    mdTranslate,
    mdSplit,
    mdCombine,
    fixLinks,
    preserveLinks,
    restoreLinks,
    removeDash
}

// log(removeLiquidTags(` fiókkal.

// 123{% közé tartozik a compliance.html %}456 `)
// )
// return

// iterateFiles("/Users/niels/code/pto365-api/src/utils/git/docs/microsoft", filepath => {
//     fileRemoveLiquidTags(filepath)
// }).then(r=>{log("done")})
// .catch(e=>{console.log(e)})
return

fasttrackMerge()

return

translate("/Users/niels/code/pto365-api/src/utils/git/docs/microsoft/office365", [
        "af", //Afrikaans
        "ar", //Arabic
        "apc", //Arabic, Levantine
        "bn", //Bangla
        "bs", //Bosnian (Latin)
        "bg", //Bulgarian
        "yue", //Cantonese (Traditional)
        "ca", //Catalan
        "zh-Hans", //Chinese Simplified
        "zh-Hant", //Chinese Traditional
        "hr", //Croatian
        "cs", //Czech
        "da", //Danish
        "nl", //Dutch
        "en", //English
        "et", //Estonian
        "fj", //Fijian
        "fil", //Filipino
        "fi", //Finnish
        "fr", //French
        "de", //German
        "el", //Greek
        "ht", //Haitian Creole
        "he", //Hebrew
        "hi", //Hindi
        "mww", //Hmong Daw
        "hu", //Hungarian
        "is", //Icelandic
        "id", //Indonesian
        "it", //Italian
        "ja", //Japanese
        "sw", //Kiswahili
        "tlh", //Klingon
        "tlh-Qaak", //Klingon (plqaD)
        "ko", //Korean
        "lv", //Latvian
        "lt", //Lithuanian
        "mg", //Malagasy
        "ms", //Malay
        "mt", //Maltese
        "nb", //Norwegian
        "fa", //Persian
        "pl", //Polish
        "pt", //Portuguese
        "otq", //Queretaro Otomi
        "ro", //Romanian
        "ru", //Russian
        "sm", //Samoan
        "sr-Cyrl", //Serbian (Cyrillic)
        "sr-Latn", //Serbian (Latin)
        "sk", //Slovak
        "sl", //Slovenian
        "es", //Spanish
        "sv", //Swedish
        "ty", //Tahitian
        "ta", //Tamil
        "th", //Thai
        "to", //Tongan
        "tr", //Turkish
        "uk", //Ukrainian
        "ur", //Urdu
        "vi", //Vietnamese
        "cy", //Welsh
        "yua", //Yucatec Maya
    ])
    .then(result => {
        console.log(result)
    })
    .catch(err => {
        console.log(err)
    })