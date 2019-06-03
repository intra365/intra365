var restifyMongoose = require('restify-mongoose');
var mongoose = require('mongoose');
var Base = require("./base").Base
var baseOptions = require("./base").baseOptions
var Tenant = Base.discriminator('Tenant',new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    displayName: {
        type: String,
        required: true
    },
    upn: {
        type: String,
        required: true
    },
    stage: {
        type: String,
        required: true
    },
},baseOptions));

module.exports.model = Tenant

module.exports.register = function (server, options) {
    var notes = restifyMongoose(Tenant);

    // Serve resource notes with fine grained mapping control
    // server.get('/notes', notes.query());
    // server.get('/notes/:id', notes.detail());
    // server.post('/users', notes.insert());
    // server.patch('/notes/:id', notes.update());
    // server.del('/notes/:id', notes.remove());
}