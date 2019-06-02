var restifyMongoose = require('restify-mongoose');
var mongoose = require('mongoose');
var Base = require("./base").Base
var baseOptions = require("./base").baseOptions
// Create a simple mongoose model 'Note'
var Note = Base.discriminator('Note',new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    tags: [String],
    content: {
        type: String
    }
},baseOptions))



module.exports.register = function (server, options) {
    var notes = restifyMongoose(Note);

    // Serve resource notes with fine grained mapping control
    server.get('/notes', notes.query());
    server.get('/notes/:id', notes.detail());
    server.post('/notes', notes.insert());
    server.patch('/notes/:id', notes.update());
    server.del('/notes/:id', notes.remove());
}