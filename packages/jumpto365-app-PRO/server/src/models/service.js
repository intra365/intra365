var restifyMongoose = require('restify-mongoose');
var mongoose = require('mongoose');
var Base = require("./base").Base
var LabelSchema = require("./label").LabelSchema
var baseOptions = require("./base").baseOptions
var Service = Base.discriminator('Service',new mongoose.Schema({
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
    tagString: {
        type: String,
        required: false
    },
    tags: {
        type: [String]
    },
    url: {
        type: String,
        required: false
    },
    comment: {
        type: String,
        required: false
    },

    labels : {
        type:  [LabelSchema]
    }
},baseOptions));

// asynchronous defaults
Service.schema.pre('save', function(next) {
    if (this.tagString) {
        var tags = this.tagString.split(";")
        this.tags = tags
    }
    this.last_updated = new Date();
    next();
  });

module.exports.model = Service

module.exports.register = function (server, options) {
    var notes = restifyMongoose(Tenant);

    // Serve resource notes with fine grained mapping control
    // server.get('/notes', notes.query());
    // server.get('/notes/:id', notes.detail());
    // server.post('/users', notes.insert());
    // server.patch('/notes/:id', notes.update());
    // server.del('/notes/:id', notes.remove());
}