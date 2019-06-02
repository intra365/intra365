var mongoose = require('mongoose')

const baseOptions = {
    discriminatorKey: '__type',
    collection: 'data'
}



var Base = mongoose.model('Base', new mongoose.Schema({
    updateAt : {
        type : Date,
        required : true,
        default : new Date()
    },
    tenant : {
        type : String,
        required : false
    },
    batchId : {
        type : String,
        required : false
    }
}

, baseOptions));

  Base.schema.pre('save', function(next) {
    this.updateAt = new Date();
    next();
  });


  module.exports.Base = Base
  module.exports.baseOptions = baseOptions
