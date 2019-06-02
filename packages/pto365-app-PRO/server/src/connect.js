var restifyMongoose = require('restify-mongoose');
var mongoose = require('mongoose');
//var _365security = require("@365admin/security")
var connectionString = "pto365.documents.azure.com"

//var _config = _365security.credentials.getCredentials(connectionString,"PS")

var _config = {
    "key":"pto365.documents.azure.com",
    "connectionString" :"mongodb://pto365.documents.azure.com:10255/?ssl=true",
    "user":"pto365",
    "pass":"WgbWjzrk5b0xgiEVwLTRjzVdG5xZUb2RtM56RDx1BV1n24c059reK3358NUFaxWTaukezB7bTR2C5RBuutaDaA=="
}

mongoose.connect(_config.connectionString,{user   :_config.user, pass :_config.pass});
