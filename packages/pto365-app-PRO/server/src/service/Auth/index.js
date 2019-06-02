module.exports = {GetContext}
function GetContext(upn){

   return new Promise(function (resolve, reject) {

        var mailParts = upn.split("@")
        if (mailParts.length < 2 ) {return reject("Invalid UPN "+upn)}
        var tenant = mailParts[1]
       
        resolve({
            upn,tenant
        })
   })

}

