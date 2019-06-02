/*
  
PAT



 */

var github = require("octonode")


function name(params) {
    
}
function ping(params) {
    return new Promise((resolve, reject) => {
        resolve(1)
    });
}

module.exports = {
    ping
}