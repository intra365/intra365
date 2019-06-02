var User = require("./user")

User.ensure("niels@hexatown.com",(err,user) => {
    if (err) {return console.log(err) }
       
    console.log(user)    
})