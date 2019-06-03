var restifyMongoose = require('restify-mongoose');
var mongoose = require('mongoose');
var Base = require("./base").Base
var baseOptions = require("./base").baseOptions
var Audit = Base.discriminator('Audit',new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    upn: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    displayName: {
        type: String,
        required: true
    },
    data: {
        type: Object,
        required: false
    },
},baseOptions));


module.exports.model = Audit

module.exports.register = function (server, options) {
    var notes = restifyMongoose(Audit);

    // Serve resource notes with fine grained mapping control
    // server.get('/notes', notes.query());
    // server.get('/notes/:id', notes.detail());
    // server.post('/users', notes.insert());
    // server.patch('/notes/:id', notes.update());
    // server.del('/notes/:id', notes.remove());
}