var config = require(".")

config.readSharePointConfig("https://365adm.sharepoint.com/sites/Jumpto365Templates")
.then(x=>{

    console.log(x)
})