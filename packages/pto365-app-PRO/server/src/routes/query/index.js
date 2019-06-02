const config    = require('../../config')


module.exports = (server) => {
    server.post({ path: config.basePath('/query'),
        version: '1.0.0' }, require('./v1').post)
    
}
