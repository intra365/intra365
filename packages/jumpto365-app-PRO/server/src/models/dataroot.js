var restifyMongoose = require('restify-mongoose');
var mongoose = require('mongoose');
var baseOptions = require("./base").baseOptions
var DataRoot = new mongoose.Schema({
    __type: {
        type: String,
        required: true
    },
    tenant: {
        type: String,
        required: true
    },
    upn: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    tags: {
        type: [String]
    },
    data: {
        type: Object,
        required: false
    },


},baseOptions);

module.exports.model = DataRoot

module.exports.register = function (server, options) {
module.exports.model = DataRoot
    var notes = restifyMongoose(DataRoot);

   
}