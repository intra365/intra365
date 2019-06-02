
// this will be used to prefix route paths.
// a workaround since restify does not have this yet
const API_ROOT  = '/api'

module.exports = {
    LOG_LEVEL   : process.env['LOG_LEVEL'] || 'info',
    PORT        : process.env['PORT'] || 8082,

    // key to generate/verify JWT
    JWT_SECRET  : '&ra3Aeu^J\-{>q&"wFP5k4qYE`2bY-U:UQ}-t"]T/RZW8S,g]UF57@tPt7w}Fuq"g-YV";Ys"&nPku=L/]2-dmvR-<nLN:2wQb-2"m<SgmS',

    // will be used to building route paths
    basePath    : (path) => {
        return API_ROOT.replace(/\/$/, '') + '/' + path.replace(/^\//, '')
    }

}
