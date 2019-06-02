var mongoose = require('mongoose');
module.exports.LabelSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        min:0,max:5,
        required: false
    },
    description: {
        type: String
    }
})


