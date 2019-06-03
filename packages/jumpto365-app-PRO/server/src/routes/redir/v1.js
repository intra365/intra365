const MODULE_ID = 'api:redir'
const logger    = require('../../utils/logger')

module.exports = (req, res, next) => {
    logger.info('%s: request received', MODULE_ID)

    //var url = res.req.query
    res.redirect(302,req.query.url,next)
        
    //return next()
}
