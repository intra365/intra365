var restifyMongoose = require('restify-mongoose');
var mongoose = require('mongoose');
var Base = require("./base").Base
var baseOptions = require("./base").baseOptions

// Create a simple mongoose model 'Note'
var Track = Base.discriminator('Track',new mongoose.Schema({
    upn: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    me: {
        type: Object
    }
},baseOptions));



module.exports.register = function (server, options) {
    var notes = restifyMongoose(Track);

    // Serve resource notes with fine grained mapping control
    // server.get('/notes', notes.query());
    // server.get('/notes/:id', notes.detail());
    server.post('/tracks', notes.insert());
    // server.patch('/notes/:id', notes.update());
    // server.del('/notes/:id', notes.remove());
}