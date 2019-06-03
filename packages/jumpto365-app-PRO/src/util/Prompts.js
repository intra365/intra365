//TODO: Refactor and integrate in ./v2/services/github

var Handlebars = require("handlebars")
var Parser = require("./parsemarkdown")
var axios = require("axios")
var BASEURL = "https://raw.githubusercontent.com/pto365/client/master/docs/dialogues/"
var Marked = require("marked")
/**
 * load Prompt
 * 
 * @param {any} url 
 */
function getPromptFromGithub(path) {
    return new Promise(function (resolve, reject) {
        var url = `${BASEURL}${path}/index.md`
      //  console.log("url",url)
        axios.get(url)
            .then(function (response) {
                resolve(response.data);
            })
            .catch(function (error) {
                reject(error);
            });
    })
}

/**
 * Parse returns a promise 
 * 
 * @param {string} template 
 * Hello {{article.title}}
 * @param {any}  data
 */
function parse(template, data) {
    return new Promise(function (resolve, reject) {

        try {
            var temp = Handlebars.compile(template)
            var result = temp(data)
    
            resolve(result)
                
        } catch (error) {
            reject(error)            
        }
    })
}
function renderMarkdown(body,baseurl){
    var renderer = new Marked.Renderer();
    var headings = []
    renderer.heading = function (text, level){

        var escapedText = text.toLowerCase().replace(/[^\w]+/g, '-');
        var id = "heading"+headings.length
        
        var className = level === 1 ? "ms-font-xxl"  : level === 2 ?   "ms-font-xl" : "ms-font-l"



        headings.push({id:id,level:level,escapedText:escapedText,text:text})
        
        

        return `<h${level} id="${id}" class="${className}">
                  <a name="'${escapedText}'" class="anchor " href="#${escapedText}">
                    <span class="header-link"></span>
                  </a>
                  ${text}
                </h${level}>`;
    }

    renderer.image = function (href,title,text) {
        var url =  href.substring(0,4)==="http"  ? href :  href.substring(0,2) !== "./" ? baseurl + "/" + href :  baseurl + href.substring(1)
        
        
        return `<img class="markdownimage" src="${url}" alt="${text}" />`;
      };

    renderer.link = function (href,title,text) {
        
        var url =  href.substring(0,4)==="http"  ? href :  href.substring(0,1) === "#" ? href :  baseurl +  href
        var target = href.substring(0,1) === "#" ? "_self" :  "_blank"
        return `<a target="_blank" href="${url}"  />${text}</a>`;
      };
      return Marked(body, { renderer: renderer })
}
function ExtractProperties(markdown,url) {
    var baseurl = ""
    if (url){
        var s = url.split("/")
        baseurl = s[0]+"//"+s[2] + "/" + s[3] + "/" + s[4] + "/" + s[5] + "/" + s[6] + "/"    }

    var FrontMatterStart = markdown.indexOf("---")
    var FrontMatterEnd = markdown.indexOf("---",FrontMatterStart + 3)
    var body = markdown.substring(FrontMatterEnd+3)    
    var header = markdown.substring(FrontMatterStart+3,FrontMatterEnd-FrontMatterStart)
    
    var properties = header.split("\n")
    
    var md = {}
    properties.forEach(property => {
        var colon = property.indexOf(": ")
        if (colon > 0){
            var tag = property.substring(0,colon).trim()
            var value = property.substring(colon+2).trim()
            md[tag] = value
        }
    });

    md.body = body
        
    
    return md
}

/**
 * 
 * 
 * @param {any} path 
 * @param {any} exposedObjects 
 * @returns A object {properties,body}
 */
function get(path,exposedObjects){
    return new Promise(function (resolve, reject) {
        getPromptFromGithub(path)    
        .then(function (text){
            return parse(text,exposedObjects)
        })
        .then(markdown => {
            var textobject = ExtractProperties(markdown,BASEURL)
            textobject.html = `<div class="markdown">` + renderMarkdown(textobject.body,BASEURL+path) + `</div>`
            resolve(textobject)}
        
        )
        .catch(err => {reject(err)})
        
    })
}
module.exports = {
    get,
    parse,
    getPromptFromGithub
}