var FastTrack = require("..").FastTrack
//console.log(Services.service)

//FastTrack.appToTool("sharepoint")
var tool = FastTrack.appToTool("sharepoint")
console.log(tool)  
var fastTrack = FastTrack.useCases(tool.fasttrack)
console.log(fastTrack)  
