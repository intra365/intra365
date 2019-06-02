const errors = require('restify-errors')
const QueryService = require("../../service/Query")

module.exports.post = (req, res, next) => {
    
    QueryService.Query(req.pto365context,  req.body)
        .then((a) => {
            res.send(a)
        })
        .catch((e) => {
            res.send(new errors.BadRequestError(e.message))
        })



}
