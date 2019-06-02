module.exports = (server) => {
    // unprotected routes
    require('./ping')(server)
    require('./redir')(server)
    require('./register')(server)
    require('./admin')(server) 

    // protected routes
    require('./me')(server)
    require('./home')(server)
    require('./messages')(server)
    require('./file')(server)
    require('./tenant')(server)
    require('./query')(server)
    require('./service')(server)
    require('./task')(server)
}
