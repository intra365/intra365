const fs = require('fs-extra')
const path = require("path")
var json = require("format-json")
var parse = require('csv-parse');

  
module.exports.default = function(){

return new Promise((resolve,reject)=>{

    fs.ensureDirSync(path.normalize(__dirname +  "/../../data"))
    var inputFilename = path.resolve(path.join(path.normalize(__dirname +  "/../../data"),"SAP.csv"))
    var outputFilename = path.resolve(path.join(path.normalize(__dirname +  "/../../data"),"SAP.json"))

    var parser = parse({delimiter: ',',columns :true}, function(err, data){
        if (err) return reject(err)
       var txt = json.plain(data);
        
        fs.writeFileSync(outputFilename, txt);
        resolve(data)
    });
    
    
    
    fs.createReadStream(inputFilename,{encoding:'latin1'}).pipe(parser);
    
    
  } )}