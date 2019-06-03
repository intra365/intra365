const errors = require('restify-errors')
const TaskService = require("../../service/Tasks")

module.exports = (req, res, next) => {
    
    TaskService.Process(req.pto365context,  req.body)
        .then((a) => {
            res.send(a)
            next();
        })
        .catch((e) => {
            res.send(new errors.BadRequestError(e))
            next();
        })



}