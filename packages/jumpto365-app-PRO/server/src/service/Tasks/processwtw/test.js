require("../../connect")
var mongoose = require('mongoose');
var Services = require("../../service")
var Query = require("../../service/Query")


var ProcessWTW = require(".")
var ObjectId = mongoose.mongo.ObjectID
var upn = "niels@hexatown.com"
Services.Auth.GetContext(upn)
    .then(context => {
        Query.Query(context, {
                type: "raw",
                query: {
                    "_id": ObjectId("5b115491dc70bb1f781441c4")
                }
            })
            .then((data) => {
                return ProcessWTW.Step1(context, data)
            })
            .then((r) => {
                console.log("DONE")
            })
            .catch(err => {
                console.log(err)
            })
    })
    .catch(err => {
        console.log(err)
    })