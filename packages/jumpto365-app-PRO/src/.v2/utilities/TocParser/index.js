yaml = require('js-yaml');

var _ = require("lodash")
var verbose = true
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



module.exports = function (yamlText){
    return yaml.safeLoad(yamlText,'utf-8')
}