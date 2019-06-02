const MODULE_ID = 'api:hello'
const logger    = require('../../utils/logger')
var package = require("../../../package.json")

module.exports = (req, res, next) => {
    logger.info('%s: request received', MODULE_ID)

    res.send({ ping: 'OK', version:package.version })

    logger.info('%s: response sent', MODULE_ID)
    return next()
}
