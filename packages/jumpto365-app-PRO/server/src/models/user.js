var restifyMongoose = require('restify-mongoose');
var mongoose = require('mongoose');
var Base = require("./base").Base
var baseOptions = require("./base").baseOptions
var User = Base.discriminator('User',new mongoose.Schema({
    upn: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    license: {
        type: Object
    }
},baseOptions));

module.exports.model = User

module.exports.register = function (server, options) {
    var notes = restifyMongoose(User);

    // Serve resource notes with fine grained mapping control
    // server.get('/notes', notes.query());
    // server.get('/notes/:id', notes.detail());
    // server.post('/users', notes.insert());
    // server.patch('/notes/:id', notes.update());
    // server.del('/notes/:id', notes.remove());
}