const config    = require('../../config')

module.exports = (server) => {
    var PATH = config.basePath('/message/')
    server.get({ path: PATH,
        version: '1.0.0' }, require('./v1'))
}
