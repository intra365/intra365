// http://jessewarden.com/2015/09/fun-with-node-restify-and-json-web-token.html
// https://github.com/99xt/azure-jwt-verify

var appInsights = require("applicationinsights");
appInsights.setup("d5a02694-a210-4ba6-8271-042bebfacea2").start();

const MODULE_ID = 'app:main'
const config = require('./config')
const logger = require('./utils/logger')

const jwt = require('restify-jwt-community')

logger.info('%s: initializing', MODULE_ID)

var restify = require('restify')
var plugins = require('restify').plugins


var server = restify.createServer()
const Services = require("./service")
const errors = require('restify-errors')


server.use(plugins.bodyParser())
server.use(plugins.queryParser());
const corsMiddleware = require('restify-cors-middleware')

const cors = corsMiddleware({
    preflightMaxAge: 5, //Optional
    origins: ['*'],
    allowHeaders: ['API-Token', 'Authorization', 'content-type', 'Accept5'],
    exposeHeaders: ['API-Token-Expiry']
})

server.pre(cors.preflight)
server.use(cors.actual)



// Auth
var jwtConfig = {
    secret: config.JWT_SECRET
}

// secure all routes. except /ping
server.use(jwt(jwtConfig).unless({
    path: [
        config.basePath('/ping'),
        config.basePath('/redir'),
        config.basePath('/register'),
        config.basePath('/admintoken'),
        '/notes',
        '/tracks'
    ]

}))

server.use(function (req, res, next) {
    logger.info(req.url);

    if (req.user && req.user.email) {
        Services.Auth.GetContext(req.user.email)
            .then(context => {
                req.pto365context = context
                return next();
            })
            .catch(err => {
                res.send(new errors.BadRequestError(err))
            })
    }
    else
    {
        return next();
    }

});


// Routes
require('./routes')(server)

require("./connect")
require("./models/notes").register(server)
require("./models/track").register(server)

// Serve
server.listen(config.PORT)
logger.info('%s: ready. listening on PORT ', MODULE_ID, config.PORT)

module.exports = server