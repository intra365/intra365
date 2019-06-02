const MODULE_ID = 'api:message'
const logger    = require('../../utils/logger')
var mongoose = require('mongoose');
var Message = require("../../models/message").model

module.exports = (req, res, next) => {
    logger.info('%s: request received', MODULE_ID)
    
    var callback = (a,results,c,d) => {
        if (results && results.length)
        {
            res.send(results)
            logger.info('%s: response sent', MODULE_ID)
            return next()
        }
        else
        {
            res.send([])
            logger.info('%s: response sent', MODULE_ID)
            return next()
       }
      }
    
      Message.
      find({ }).
      where('to').equals(req.user.email).
      //where('read').equals(false).
      limit(10).
      sort('date').
      exec(callback);


}
