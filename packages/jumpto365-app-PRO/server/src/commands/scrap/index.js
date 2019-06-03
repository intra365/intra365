var chalk = require("chalk")
var _ = require("lodash")
var path = require("path")
var fs = require("fs-extra")

function commands(program){
    program
    .command('scrap')
    .description('run scrap ')
    .action(function(env, options){
        var productivityLibrarySites = require("../../utils/scrapper/sites")
        var Scrapper = require("../../utils/scrapper")
        var dest = path.join(__dirname, `dump/pages.json`)
        var destdir = path.join(__dirname, `dump`)
        fs.mkdirsSync(destdir)

        Scrapper.scrap(productivityLibrarySites,Scrapper.scrapProductivityLibraryPage)
            .then(pages => {
                fs.writeJSONSync(dest,pages);

                console.log("done")

            }) 
            .catch(e=>{
                console.log("root",e)

            })
    }); 

    
   



}


module.exports = commands