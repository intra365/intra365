const MODULE_ID = 'api:me'
const logger    = require('../../utils/logger')
var mongoose = require('mongoose');
var User = require("../../models/user").model

module.exports = (req, res, next) => {
    logger.info('%s: request received', MODULE_ID)
    
    var callback = (a,results,c,d) => {
        if (results )
        {
            res.send(results[0])
            logger.info('%s: response sent', MODULE_ID)
            return next()
        }
        else
        {
            res.send({
                code:1,
                type:"Data operation",
                message: `User not found "${req.user.email}"`
            })
            logger.info('%s: response sent', MODULE_ID)
            return next()
       }
      }
    
      User.
      find({ }).
      where('upn').equals(req.pto365context.upn).
      //where('read').equals(false).
      exec(callback);


}
