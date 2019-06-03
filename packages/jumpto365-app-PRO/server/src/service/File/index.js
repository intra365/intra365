var File = require("../../models/file").model
var Excel = require("../Excel")
var Audit = require("../Audit")
var _ = require("lodash")

module.exports.uploadPOST = (context, fileContent, mimeType, tags, fileName) => {
    return new Promise(function (resolve, reject) {

        var format = Excel.WhichToolWhen.detectFormat(fileContent)

        switch (format) {
            case "WTW" :
                WTW()
                break;
            case "APQC" :
                APQC()
                break;
        
            default:
                break;
        }
        function APQC(){

            Excel.WhichToolWhen.parseAPQC(fileContent)
                .then(data => {
                    var file = new File({
                        upn:context.upn,
                        tenant:context.tenant,
                        mimeType,
                        tags,
                        data,
                        name: fileName
                    })
    
                    file.save().then((filedata) => {
                        var objectId = filedata._id
                        Audit.Append(context, "Appended WTW", Audit.Categories.Data, "Append data", {
                                 objectId
                            })
                            .then(() => {
                                resolve(filedata)
                            })
    
                    }).catch((err) => {
                        Audit.Append(context, "Appended WTW",  Audit.Categories.Error, "Append data", {
                                err
                            })
                            .then(() => {
                                reject(err.message)
                            })
    
    
    
                    })
                })
                .catch(err => {
                    var errorText = err.message
                    Audit.Append(context, "parseWTW", Audit.Categories.Error, "Append data", {
                        errorText
                    })
                    .then(()=> {reject(err.message)})
                })
            }
    
        function WTW(){

        Excel.WhichToolWhen.parseWTW(fileContent)
            .then(data => {
                var file = new File({
                    upn:context.upn,
                    tenant:context.tenant,
                    mimeType,
                    tags,
                    data,
                    name: fileName
                })

                file.save().then((filedata) => {
                    var objectId = filedata._id
                    Audit.Append(context, "Appended WTW", Audit.Categories.Data, "Append data", {
                             objectId
                        })
                        .then(() => {
                            resolve(filedata)
                        })

                }).catch((err) => {
                    Audit.Append(context, "Appended WTW",  Audit.Categories.Error, "Append data", {
                            err
                        })
                        .then(() => {
                            reject(err.message)
                        })



                })
            })
            .catch(err => {
                var errorText = err.message
                Audit.Append(context, "parseWTW", Audit.Categories.Error, "Append data", {
                    errorText
                })
                .then(()=> {reject(err.message)})
            })
        }

    });

}

module.exports.get = (id) => {

    return new Promise(function (resolve, reject) {
        File.
        find({
            _id: id
        }).
        exec((a, results, c, d) => {
            if (results && results.length > 0) {
                resolve(results[0])
            } else {
                reject({
                    code: 1,
                    type: "Data operation",
                    message: `File not found `
                })
            }
        });
    });

}