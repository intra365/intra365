const config    = require('../../config')

module.exports = (server) => {
    server.post({ path: config.basePath('/admintoken'),
        version: '1.0.0' }, require('./v1'))
}
