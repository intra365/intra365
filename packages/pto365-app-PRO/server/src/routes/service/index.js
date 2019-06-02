const config    = require('../../config')

module.exports = (server) => {
    var PATH = config.basePath('/service/')
    server.get({ path: config.basePath('/service/:id'),
        version: '1.0.0' }, require('./v1').get)

}
