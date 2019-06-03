require("../../connect")
var Audit = require(".")

Audit.Append("niels@hexatown.com","login",Audit.Categories.Authentication,"Niels@hexatown.com logged in",{ip:"23.1.1.1"})
    .then(r => {
        console.log(r)
    })
    .catch(err => {
        console.log(err)
    })