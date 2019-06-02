require("../connect")
var mongoose = require('mongoose');
var User = require("../models/user").model




module.exports.ensure = (upn,cb) => {

var callback = (a,results,c,d) => {
    if (results && results.length)
    {
        cb(null,results[0]._doc)
    }
    else
    {
        var user = new User({upn:upn,name:upn,license : {}})
        user.save().then((x) => {
                return cb(null,upn)
            }
       ).catch((err) => {
           return cb(err.message)

           
       })

    }
    
  }

  User.
  find({ }).
  where('upn').equals(upn).
  limit(1).
  exec(callback)
}