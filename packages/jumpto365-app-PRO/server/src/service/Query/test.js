require("../../connect")
var q = require(".")
var query = {"__type":"Tenant","tenant":"hexatown"}
q.Query("niels@hexatown.com", {
        type: "raw",
        query
    })
    .then(r => {
        console.log(r)
    })
    .catch(err => {
        console.log(err)
    })