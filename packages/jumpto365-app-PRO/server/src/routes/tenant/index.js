const config    = require('../../config')

module.exports = (server) => {
    var PATH = config.basePath('/tenant/')
    server.get({ path: config.basePath('/tenant/:id'),
        version: '1.0.0' }, require('./v1').get)
        server.get({ path: config.basePath('/mytenant'),
        version: '1.0.0' }, require('./v1').ensure)

}
