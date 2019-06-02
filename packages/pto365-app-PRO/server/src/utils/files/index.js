var fs = require("fs-extra")

var _ = require("lodash")
var path = require('path');





function loop(root) {
    //console.log(root)
    return new Promise((resolve, reject) => {

        fs.readdir(root, function (err, files) {
            if (err) {
                console.error("Could not list the directory.", err);
                return reject("Could not list the directory." + JSON.stringify(err))
            }
            var directory = {
                path: root,
                files: [],
                directories: [],
                errors: []
            }

            var loops = files.length
            files.forEach(function (file, index) {
                // Make one pass and make the file complete
                var fromPath = path.join(root, file);


                fs.stat(fromPath, function (error, stat) {
                    if (error) {
                        directory.errors.push({
                            file,
                            error
                        })
                        loops--
                        if (loops === 0) {
                            // console.log("done with error")
                            return resolve(directory)


                        }
                    } else {
                        if (stat.isFile()) {
                            directory.files.push(fromPath)
                            loops--
                            if (loops === 0) {
                                // console.log("done with file")
                                return resolve(directory)

                            }
                        } else if (stat.isDirectory())
                            loop(fromPath)
                            .then(subdir => {
                                directory.directories.push(subdir)
                                loops--
                                if (loops === 0) {
                                    // console.log("done with ")
                                    return resolve(directory)
                                }
                            })

                    }

                });



            });
        });
    })
}

function processMD(directory) {
    

    return new Promise((resolve,reject)=>{
        var markdownfiles = []
        var loops = directory.files.length
       // console.log(directory.path)
        directory.files.forEach(file => {
            loops--
            if (_.endsWith(file,"index.md")) {
                var markdownfile = {directory:directory.path,file,translations : []}
                directory.files.forEach(translatedFile => {
                    var lastSlash = translatedFile.lastIndexOf( "\\" ) ||  translatedFile.lastIndexOf( "/" )
                    var filename = lastSlash ? translatedFile.substring(lastSlash+1) : ""
                    if (_.endsWith(translatedFile,".md") && filename.length === 5) { // da.md || es.md
                        markdownfile.translations.push(translatedFile)
                        //console.log(file,"translated to", translatedFile)                        
                    }
                })
                markdownfiles.push(markdownfile)
            }
            if (loops===0){
                resolve(markdownfiles)
            }
        })
        var directories = directory.directories.length
        directory.directories.forEach(directory => {
            processMD(directory)
            .then(subFiles=>{
                directories--
                subFiles.forEach(subFile => {
                    markdownfiles.push(subFile)
                })
                
                if (directories===0){
                    resolve(markdownfiles)
                }

            })
        })
    })
}

        // var pathName = "/Users/niels/code/pto365-api/src/utils/git/docs/microsoft/office365"
        // loop(pathName)
        //     .then(result => {
        
        //         processMD(result)
        //         .then(mdFiles => {
        //             console.log(mdFiles)
        //         })
        //         //process.exit(0)
        //     })
        //     .catch(err => {
        //         console.log(err)
        //         process.exit(1)
        //     })



module.exports = {
    loop ,
    processMD

}



