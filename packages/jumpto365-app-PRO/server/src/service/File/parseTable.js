require("../../connect")
var JUMPTO365 = require("../../service")
var File = require(".")
var email = "niels@jumpto365.com"
JUMPTO365
    .Auth.GetContext(email)
    .then(context => {

        var filename =  "/Jumpto365 Excel Tool v1.xlsx"
        File.uploadPOST(context,__dirname +filename,"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",null,filename)

       .then(r=>{
        console.log(r)
       })
       .catch(err => {
        console.log(err)
    })

    })
    .catch(err => {
        console.log(err)
    })