
var Marked = require("marked")

var _ = require("lodash")
var verbose = false
function log(a,b,c,d,e,f)
{
    if (!verbose) return
    console.log(a,b,c,d,e,f)
}
function relativeUrl(basePath,url){

    function startswith(search, searchfor) {
        return search.substr(0 , searchfor.length) === searchfor;
    }

    if (startswith(url,"http")){
        return url
    }
    var lastChar = basePath.substring(basePath.length-1)
    if (basePath.length > 1 && lastChar ==="/"){
        basePath = basePath.substring(0,basePath.length-1)
    }
    var newBasePath = basePath
    if (startswith(url,"#")){
        return url
    }

    if (startswith(url,"./")){
        return basePath + "/" +url.substring(2)
    }


    while (startswith(url,"../")) {

        var lastIx = newBasePath.lastIndexOf("/")
        if (lastIx > -1){
            newBasePath = newBasePath.substring(0,lastIx+1)
            
        }
        url = url.substring(3)
    }
    return newBasePath  + url

}

// https://regexr.com/
function parseSnakeTags(text) {
    var expression = /\{.*\}/gi;
    var regex = new RegExp(expression);
   

   var result = text.replace(regex, function (tag) {
        var control = "[Control]"
        var code = encodeURI(tag)
        var placeholder = `${control}(${code})`
//        log(placeholder)
        return placeholder
    })

    return result
}


module.exports = function (markdown,url,internalPath,functionalVersion,isDashBoard,customRender){
    
    var baseurl = ""
    var funclevel = functionalVersion ? functionalVersion : 0
    if (url){
        var s = url.split("/")
        baseurl = s[0]+"//"+s[2] + "/" + s[3] + "/" + s[4] + "/" + s[5] + "/" + s[6] + "/"    }

    var FrontMatterStart = markdown.indexOf("---")
    var FrontMatterEnd = markdown.indexOf("---",FrontMatterStart + 3)
    
    var body = FrontMatterEnd !==-1 ? markdown.substring(FrontMatterEnd+3)  : markdown  
    var header = FrontMatterEnd !==-1 ? markdown.substring(FrontMatterStart+3,FrontMatterEnd-FrontMatterStart) : ""
    var frontMatter = {}
    var properties = header.split("\n")
    var renderer = new Marked.Renderer();
    var headings = []
    var flowId = 0
    var previousLevel = 0
    var controlData = null
    var flowIds = {}
   
    var actions = null
    var links = []

    var linkTree = {}
    
   var currentHeading = null
   var headingCounter = 0
   var images = {}
   var metadata = {}

   // setting up a pointer to current levels store

    var pushHeading = (root,heading,currentLevel,targetLevel) => {

        if (!root.childrens){
            
            root.childrens = []
            if (currentLevel!==targetLevel){
                root.childrens.push({text:currentLevel,links:[] })
            }
        }

        if (currentLevel===targetLevel){
        
            currentHeading = {text:heading,links:[]}
            root.childrens.push(currentHeading)
            return 
        }
        else
        {
            pushHeading(root.childrens[root.childrens.length-1],heading,currentLevel+1,targetLevel)
        }


    }


    var pushLink = (text,link) => {
        if (currentHeading){
            currentHeading.links.push({text,link})
        }
    }

    renderer.heading = function (text, level){
        if (level===1) headingCounter++
        var color = (l) =>{
            switch (l) {
                case 0:
                    return "black"
                    break;
            
                case 1:
                    return "green"
                    break;
                case 2:
                    return "yellow"
                    break;
                case 3:
                    return "red"
                    break;
                default:
                    break;
            }
        }
        var style = (l) =>{
            switch (l) {
                case 0:
                    return ``
                    break;
            
                case 1:
                    return `display:flex;flex-direction: row;padding:0px;min-width:300px;`
                    break;
                case 2:
                    return `display:flex;flex-direction: column;flex-wrap:wrap;padding:10px;min-width:240px;`
                    break;
                case 3:
                    return `display:flex;flex-direction: column;flex-wrap:wrap;padding:10px;min-width:180px;`
                    break;
                default:
                return ""
                    break;
            }
        }

        var headerStyle= (l) =>{
            switch (l) {
                case 0:
                    return ``
                    break;
            
                case 1:
                    return `margin-bottom:10px;padding:8px;xcolor:white;xbackground-color:#4D79B6;xborder-radius:5px`
                    break;
                case 2:
                    return `;margin-bottom:8px;padding:8px;xcolor:white;xbackground-color:#4D79B6;xborder-radius:5px;border-bottom:1px solid #888888`
                    break;
                case 3:
                    return `margin-bottom:6px;padding:8px;xcolor:white;xbackground-color:#4D79B6;xborder-radius:5px`
                    break;
                default:
                return ""
                    break;
            }
        }
        var escapedText = text.toLowerCase().replace(/[^\w]+/g, '-');
        var id = "heading"+headings.length
        
        var className = level === 1 ? "ms-font-xxl"  : level === 2 ?   "ms-font-xxl" : "ms-font-xl"

        var traceOn = false

        headings.push({id:id,level:level,escapedText:escapedText,text:text})
        
        pushHeading(linkTree,text,1,level)

        flowId+=1
        
        var headingCounters = []
            

        var closePrevious = ""
        var openNext = "" // `FROM ${previousLevel} TO ${level}`

        
        // for (let index = 1; index<=level; index++) {
        //     if (!actions){
        //         actions = {level:index,text}
        //     }     
        // }


        for (let index = previousLevel; index>=level; index--) {
            closePrevious += "</div>"
            
        }
        var controlStyle = "flex-grow:1;"
        var headerControl = {}
        for (let index = ( previousLevel === 0? level: (level > previousLevel ? previousLevel+1 : level) )  ; index <= level; index++) {
           
           //log("controldata? ",controlData)
           if (controlData && controlData.cols && (controlData.cols.length > 0) && (index === level)){
               log("controldata",controlData)
                if (!controlData.currentLevel){
                    controlData.currentLevel = level    
                }
                if (controlData.currentLevel === level){
                    var col  =controlData.cols.shift()
                    controlStyle = col.style
                    headerControl = col.heading ? col.heading : headerControl
                    log("Header control",JSON.stringify(col.heading))
                }
           }
           openNext += `<div data-Flowid="${flowId}-${index}" style="border:0px dashed grey ;border-top:0px dashed grey;padding:0px; ${style(index)};${controlStyle}  ">`
            
        }
        log("Heading",flowId,level,text,headerControl)
        var header     =  level === 1 ? "" : headerControl.hidden ? "": `<h${level} className=${className} style="${headerStyle(level)};display:block;">${text}</h${level}>` 

        var startTag =  closePrevious  + openNext + header
        var endTag = level === 1 ? "": ""


        previousLevel = level
        if (isDashBoard){
        return startTag + endTag
    }else{
        return `<h${level} id="${escapedText}" class="${className}">
                  <a name="'${escapedText}'" class="anchor " href="#${escapedText}">
                    <span class="header-link"></span>
                  </a>
                  ${text}
                </h${level}>`;
            }
    }

    renderer.image = function (href,title,text) {
        
        var url = baseurl + href
        switch (text ? text.toUpperCase() : "") {
     
            case "COMPONENT":
                return `/***${href}***/`;
                break;
            default:


            var text = unescape(text)


            
                var expression = /(&quot;)/gi;
                var regex = new RegExp(expression);

                
             
                text = text.replace(regex, function (link) {
                
                    return `"`
                })
                function startswith(search, searchfor) {
                    return search.substr(0 , searchfor.length) === searchfor;
                }
            
             //   text = _.replace(text,"&quot;",`"` )
                var url =  (href.substring(0,4)==="http" || href.substring(0,4)==="data")  ? href : baseurl +  href
                if (text && startswith(text,"{")){
                    var style = ""
                    try {
                        var properties = JSON.parse(text)

                        if (properties.style){
                        _.forOwn(properties.style,function (value,key){
                            style += `${key}:${value};`    

                        })
                            
                        }   
                        

                    } catch (error) {
                        console.warn("Markdown property parser error ",error,"source",text)
                    }
                    
                if (headingCounter > 0){
                    if (!images[headingCounter-1]){
                        images[headingCounter-1] = [url]
                    }
                    else
                    {
                        images[headingCounter-1].push( url)
                    }
                }
                    return `<img style="${style}" src="${url}"  />`;
                }
                else
                {
                    if (headingCounter > 0){
                        if (!images[headingCounter-1]){
                            images[headingCounter-1] = [url]
                        }
                        else
                        {
                            images[headingCounter-1].push( url)
                        }
                    }
                    return `<img  src="${url}" alt="${text}" />`;

                }

                

              
                break;
        }
            
        
        
      };

    renderer.link = function (href, title, text) {
        var tag = text

        function startswith(search, searchfor) {
            return search.substr(0, searchfor.length) === searchfor;
        }

        if (startswith(tag, "https://www.microsoft.com/en-us/videoplayer")) {
            tag = "IFRAME"
        }
        switch (tag ? tag.toUpperCase() : "") {
            case "JUMTOTAG" :

                    var tag = {}
                    var questionMarkIndex = _.indexOf(href,"?")
                    
                    var search = questionMarkIndex > -1 ? href.substring(questionMarkIndex+1) : ""

                    var lastHash = _.lastIndexOf(search,"#")

                    if (lastHash > -1){
                        tag.jumpto = search.substring(lastHash+1)
                        search = search.substring(0,lastHash)
                        
                    }


                    var parms = search.split("&amp;")
                    parms.forEach(parm =>{
                        var elements = parm.split("=")
                        
                        tag[elements[0]] =elements[1]
                    })
                    metadata[headingCounter-1] = tag
                    return ''
                break
            case "IFRAME":
                return `<iframe src="${href}" height="400" width="100%" ></iframe><a target="_blank" href="${href}" >...</a>`;
                break;
            case "COMPONENT":
                return `/***${href}***/`;
                break;
            case "FLOW":
                return `/***${href}/Flow***/`;
                break;
            case "CONTROL":
                function unescape(text, expression, key) {

                    var regex = new RegExp(expression);

                    return text.replace(regex, function () {

                        return key
                    })
                }
                var json = decodeURI(href)


                json = unescape(json, /(\\\[)/gi, "[")
                json = unescape(json, /(\\\])/gi, "]")
                json = unescape(json, /(\\\{)/gi, "{")
                json = unescape(json, /(\\\})/gi, "}")
                json = unescape(json, /(\\)/gi, "")
                controlData = null
                log("control data source",  json)
                try {
                    controlData = JSON.parse(json)
                    
                } catch (error) {
                    log("error parsing control data",  error.message)
                }


                return ''
                return `/***${href}/Control***/`;
                break;
            default:
        
            if (_.startsWith(href,"https://graph.microsoft.com/") || _.startsWith(href,"https://graph.jumpto365.com")){


                var s = href.split("#")
                var hash2= s.length>1 ? "+" + s[1] : ""
                href = s.length>1 ? s[0] : href

                var text = text.replace("%5B","[").replace("%5D","]")
               var hash = encodeURI(text + hash2)
              //debugger
               return `/***${href}#${hash}/Graph***/`
                break;
         }
                var url = null
                if (internalPath) {
                    url = relativeUrl(internalPath, href)
                    return `<a href="${url}" data-ref="${url}" class="internallink" title="${title}" />${text}</a>`;
                    // log(internalPath,href,"==>",url)
                } else {
                    url = href.substring(0, 4) === "http" ? href : baseurl + href
                }
                pushLink(tag, url)

                return `<a href="${url}" title="${title}" />${text}</a>`;
                break;
        }


    };


      for (let index = 0; index < properties.length; index++) {
          const property = properties[index];
       
        var colon = property.indexOf(": ")
        if (colon > 0){
            var tag = property.substring(0,colon).trim()
            var value = property.substring(colon+2).trim()
            frontMatter[tag] = value
        }
    }
    if (frontMatter.funclevel==="1"){
        isDashBoard = true
        funclevel = 1
    }

     if (funclevel>0){
        body = body.replace( new RegExp(/([“”])/gi), function (link) {
         
            return `"`
        })
         body = parseSnakeTags(body)
         var expression = /(\\\[)/gi;
         var regex = new RegExp(expression);
      
         body = body.replace(regex, function (link) {
         
             return `[`
         })

      
     }





    var html = Marked(body, { renderer: customRender ? customRender : renderer })
    var closePrevious = ""
    for (let index = previousLevel; index>=1; index--) {
        if (funclevel>0) closePrevious += "</div>"
        
    }
    var html = html + closePrevious
    var md = {
        properties : frontMatter,
        body : html,
        headings : headings,
        links : linkTree,
        images,
        metadata
    }

    var j = JSON.stringify(linkTree)
    return md

}