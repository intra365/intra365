var base64Img = require('base64-img');
var XLSX = require("xlsx")

const folder = '../components/PeriodicSystem/media';
const fs = require('fs');
var table = []
var c = 0
fs.readdir(folder, (err, files) => {

  files.forEach(file => {
    console.log(file);
    base64Img.base64(folder+'/'+file, function(err, data) {
        if (err){
            console.error(err)
            //process.exit(1)
        }
        table.push({file,data})
        c++
        if (c==files.length){
            var wb = XLSX.utils.book_new();
            var ws =  XLSX.utils.json_to_sheet( table )
            XLSX.utils.book_append_sheet(wb, ws, "images");
            XLSX.writeFile(wb, __dirname + "/images.xlsx")
            // fs.writeFileSync(__dirname + "/images.json",JSON.stringify( table ))
            // console.log("Converted files")
            process.exit(0)
        }
    })
    
  });
})