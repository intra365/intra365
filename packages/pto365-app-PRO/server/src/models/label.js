var mongoose = require('mongoose');
module.exports.LabelSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true
    },
    languageCode: {
        type: String,
        required: true
    },
    isHumanTranslation: {type: Boolean,default:false}
    ,
    description: {
        type: String
    }
})


