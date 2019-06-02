var restifyMongoose = require('restify-mongoose');
var mongoose = require('mongoose');
var Base = require("./base").Base
var baseOptions = require("./base").baseOptions
var File = Base.discriminator('File',new mongoose.Schema({
    upn: {
        type: String,
        required: true
    },
    fileContent: {
        type: Buffer,
        required: false,

    },
    mimeType: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    note: {
        type: String,
        required: false
    },
    tags: {
        type: [String]
    },
    data: {
        type: Object,
        required: false
    },


},baseOptions));

module.exports.model = File

module.exports.register = function (server, options) {
    var notes = restifyMongoose(File);

    // Serve resource notes with fine grained mapping control
    // server.get('/notes', notes.query());
    // server.get('/notes/:id', notes.detail());
    // server.post('/users', notes.insert());
    // server.patch('/notes/:id', notes.update());
    // server.del('/notes/:id', notes.remove());
}