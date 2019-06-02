const errors = require('restify-errors')
const FileService = require("../../service/File")
const fs = require("fs")

module.exports.post = (req, res, next) => {
    
    var fileBuffer = fs.readFileSync(req.files.upfile.path)
    fs.unlinkSync(req.files.upfile.path)
    FileService.uploadPOST(req.pto365context, fileBuffer, req.files.upfile.type, req.body.tags,req.files.upfile.name)
        .then((a) => {
            res.send(a.id)
        })
        .catch((e) => {
            res.send(new errors.BadRequestError(e))
        })



}

module.exports.get = (req, res, next) => {

    FileService.get(req.params.id)
        .then((fileObject) => {
            //console.log(fileObject.fileContent)
            res.set({
                
                'content-type': fileObject.mimeType
                
            });
            res.sendRaw(200,fileObject.fileContent)
        })
        .catch((e) => {

            res.send(new errors.BadRequestError(e))
        })

}