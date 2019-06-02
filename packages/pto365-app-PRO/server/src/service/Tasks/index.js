var File = require("../../models/file").model
var ProcessWTW = require("./processwtw")
var _ = require("lodash")
module.exports.Process = (context, request) => {
    return new Promise(function (resolve, reject) {
        if (!context) return reject("Missing context")
        if (!request && !request.task) return reject("Missing request")
        if (!request && !request.parameters) return reject("Missing parameters")

        switch (_.toUpper(request.task)) {
            case "PROCESSWTW":
                File
                    .findById(request.parameters.id)
                    .exec((err, file, c, d) => {
                        if (err) return reject(err)


                        ProcessWTW.Step1(context, file)

                            .then((r) => {
                                resolve(r)

                            })
                            .catch(err => {
                                reject(err)
                            })
                    })

                break;

            default:
                reject("Unknown task")
                break;
        }



    })
}