var Git = require(".")
var root = __dirname + "/docs"
var fs = require("fs")
var Translate = require("../translate")

function translator(element,cb){
    console.log("Translating ",element.area1,element.area2)
    var text = fs.readFileSync(element.path,"utf8")
    var markdown = Git.parseMarkdown(text)
    var to = "fi"
    Translate.translate(markdown.body,"en",to,function (err,result){
        if (err) return cb(err)
        fs.writeFileSync(element.directory +"\\"+to+".md",result,"utf8")
        cb(null,result)
    })
    
}

function translate(elements){
    if (!elements  || elements.length === 0) console.log("Nothing to tranlate"),process.exit(1)
    translator(elements.pop(),function (err,result){
        if (err){
            console.log("Translation Error",err)
        }
        translate(elements)
    })

}

var filter = (err,res) => {
    var toTranslate = []
    if (err) {
        console.log(err)
        process.exit(1)
    }else{
        console.log("Filtering")
        res.forEach(element => {
            var match = element.directory.indexOf("microsoft\\office365") 
            if ((element.extention === "md") && (element.name === "index") &&  (match > -1)){
                toTranslate.push(element)
                
            }    
        });
        
    }
    translate(toTranslate)
}


Git.iterate(root,filter)