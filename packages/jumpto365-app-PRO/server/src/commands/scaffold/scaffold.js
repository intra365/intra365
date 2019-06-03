var Utils = require("../../utils")
var data = require("./data.json")
var fs = require("fs-extra")
var path = require("path")

function scaffold() {
    
    var pages = data.tasks
    var root =  path.join(  __dirname, "temp")
    fs.ensureDirSync(root)
    var root =  path.join(  root, data.title.toLowerCase())
    fs.ensureDirSync(root)
    fs.writeJsonSync(path.join(root,"index.json"),data)
    var mappedData = pages.map((page, ix) => {
     

      
        var filepath = `${root}/${page.subject.toLowerCase()}`
        fs.ensureDirSync(filepath)
        var comment = page.comment ? page.comment : ""

        var body = `\n ${comment} \n\n`
        var properties = {
            title: page.subject,
            //inshort: page.pageData.subTitle,
            translations: "en",
            color: "#777777",
            icon: "https://jumpto365.com/resources/images/app/jumpto365-Icon-white.png",
            externalref: page.link
        }




        var content = Utils.mdCombine(Utils.mdPropertiesToHeader(Utils.mdObjectToProperties(properties)), body)



        var fileName = path.join(filepath, `index.md`);
        fs.writeFileSync(fileName, content, "utf8")
        return (page)

    })


}


scaffold()
 module.exports = scaffold