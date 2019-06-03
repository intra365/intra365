var mongoose = require('mongoose');
module.exports.TagSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true
    },
    description: {
        type: String
    }
})


