const errors = require('restify-errors')
const ServicesService = require("../../service/Services")


module.exports.get = (req, res, next) => {
    var mailParts = upn.split("@")
    if (mailParts.length < 2 ) {return res.send(new errors.BadRequestError("Invalid UPN "+upn)) }
    var tenantName = mailParts[1]
    ServicesService.get(tenantName,req.params.name,{})
        .then((service) => {
            res.send(service)
            return next
        })
        .catch((e) => {

            res.send(new errors.BadRequestError(e))
        })

}

