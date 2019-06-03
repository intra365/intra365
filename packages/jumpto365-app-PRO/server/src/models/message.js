var restifyMongoose = require('restify-mongoose');
var mongoose = require('mongoose');
var Base = require("./base").Base
var baseOptions = require("./base").baseOptions

// Create a simple mongoose model 'Note'
var Message =  Base.discriminator('Message',new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    to: {
        type: String,
        required: true
    },
    from: {
        type: String,
        required: true
    },
    read: {
        type: Boolean
    },
    tags: [String],
    content: {
        type: String
    }
},baseOptions))



module.exports.model = Message

module.exports.register = function (server, options) {
    var message = restifyMongoose(Message);

    // Serve resource notes with fine grained mapping control
    server.get('/messages', message.query());
    server.get('/messages/:id', message.detail());
    server.post('/messages', message.insert());
    server.patch('/messages/:id', message.update());
    server.del('/messages/:id', message.remove());
}