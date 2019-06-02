var auth = require("./auth")
var graph = require("./graph")

auth.getAccessToken(function (err,token){
    if (err){
        console.log(err)
        process.exit(1)
    }
    console.log("token",token)
    process.exit(0)

})
