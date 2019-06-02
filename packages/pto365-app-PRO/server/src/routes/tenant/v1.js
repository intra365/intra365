const errors = require('restify-errors')
const TenantService = require("../../service/Tenant")


module.exports.ensure = (req, res, next) => {

    TenantService.ensure(req.pto365context)
        .then((tenant) => {
            res.send(tenant)
            return next
        })
        .catch((e) => {

            res.send(new errors.BadRequestError(e))
        })

}

module.exports.get = (req, res, next) => {

    TenantService.get(req.params.id)
        .then((tenant) => {
            res.send(tenant)
            return next
        })
        .catch((e) => {

            res.send(new errors.BadRequestError(e))
        })

}