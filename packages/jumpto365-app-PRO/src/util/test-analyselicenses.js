var json = require("format-json")
var matt = require("./matt")
var niels = require("./niels")
var ngjoh = require("./ngjoh")
var _ = require("lodash")
var util = require(".")

console.log("matt.wade@h3s.co")
console.log(json.plain( util.analyseAssignedLicenses(matt.me.assignedLicenses)))
console.log("niels@hexatown.com")
console.log(json.plain( util.analyseAssignedLicenses(niels.me.assignedLicenses)))
console.log("ngjoh@nets.eu")
console.log(json.plain( util.analyseAssignedLicenses(ngjoh.me.assignedLicenses)))
