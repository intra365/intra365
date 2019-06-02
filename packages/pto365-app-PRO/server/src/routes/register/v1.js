const MODULE_ID = 'api:register'
const logger = require('../../utils/logger')
const config = require('../../config')
const errors = require('restify-errors')
const atob = require("atob")
const Services = require("../../service")
var AuditService = Services.Audit

module.exports = (req, res, next) => {
    logger.info('%s: request received', MODULE_ID)

    let resp = {}
    if (!req.body || !req.body.token) {
        resp = new errors.BadRequestError('Incomplete registration information.')
    } else {
        const jwt = require('jsonwebtoken')

        var s = req.body.token.split('.')
        if (s.length < 2) {
            resp = new errors.BadRequestError('Invalid token.')
        } else {
            try {
                var base64 = req.body.token.split('.')[1];

                var user = JSON.parse(atob(base64));
    
                var data = {
                    email: user.unique_name ? user.unique_name : user.preferred_username,
                    pto365:"v1",
                    mstoken: user,
                    address: req.connection.remoteAddress
                }
                const token = jwt.sign(data, config.JWT_SECRET)
    
                // set all the input data as response and add the token
                //resp = req.body
                resp = token
    
                logger.info('%s: token generated', MODULE_ID)
                Services.Auth.GetContext(data.email)
                .then (context=>{
                    AuditService.Append(context,"Login",AuditService.Categories.Authentication,`Token provided to ${data.email} `,data  )
                    .then(()=>{
                        res.send(resp)
                    })

                })
                .catch(err=>{
                    res.send(new errors.BadRequestError(err))
               })


                    
            } catch (error) {
                AuditService.Append(data.email,"Login",AuditService.Categories.Error,error.message,error  )
                .then(()=>{
                    res.send(new errors.BadRequestError(error.message))
                })

            }
        }
    }

    

    logger.info('%s: response sent', MODULE_ID)
    return next()
}