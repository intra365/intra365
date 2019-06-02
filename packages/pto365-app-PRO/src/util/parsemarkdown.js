var Marked = require("marked")

module.exports = (markdown,url) => {
    var baseurl = ""
    if (url){
        var s = url.split("/")
        baseurl = s[0]+"//"+s[2] + "/" + s[3] + "/" + s[4] + "/" + s[5] + "/" + s[6] + "/"    }

    var FrontMatterStart = markdown.indexOf("---")
    var FrontMatterEnd = markdown.indexOf("---",FrontMatterStart + 3)
    var body = markdown.substring(FrontMatterEnd+3)    
    var header = markdown.substring(FrontMatterStart+3,FrontMatterEnd-FrontMatterStart)
    var frontMatter = {}
    var properties = header.split("\n")
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
        
        var url = baseurl + href
        return `<img src="${url}" alt="${text}" />`;
      };

    renderer.link = function (href,title,text) {
        
        var url =  href.substring(0,4)==="http"  ? href : baseurl +  href
        
        return `<a href="${url}" title="${title}" />${text}</a>`;
      };

    properties.forEach(property => {
        var colon = property.indexOf(": ")
        if (colon > 0){
            var tag = property.substring(0,colon).trim()
            var value = property.substring(colon+2).trim()
            frontMatter[tag] = value
        }
    });

    var html = Marked(body, { renderer: renderer })
    var md = {
        properties : frontMatter,
        body : html,
        headings : headings
    }
    return md
}