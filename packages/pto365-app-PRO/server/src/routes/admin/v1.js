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
    if (!req.body ) {
        resp = new errors.BadRequestError('Invalid request')
    } else {
        const jwt = require('jsonwebtoken')

        var user = req.body.user;
        var secret = req.body.secret;

        if (!user || !secret) {
            return res.send(new errors.BadRequestError("Invalid request"))
        } else {
            try {

                if (secret !== "NotFacebook!"){
                    return res.send(new errors.BadRequestError("Invalid request"))
                }
    
                var data = {
                    email: user,
                    pto365:"v1",
                    isAdmin : true,
                    address: req.connection.remoteAddress
                }
                const token = jwt.sign(data, config.JWT_SECRET)
    
                // set all the input data as response and add the token
                //resp = req.body
                resp = {token}
    
                logger.info('%s: token generated', MODULE_ID)
                Services.Auth.GetContext(data.email)
                .then (context=>{
                    AuditService.Append(context,"Login",AuditService.Categories.Authentication,`ADMIN Token provided to ${data.email} `,data  )
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