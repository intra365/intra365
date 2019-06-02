var Service = require("../../models/service").model
var Audit = require("../Audit")

module.exports = {ensure,get}

/**
 * Based on a given email either returns and existing Tenant or create a new and add the current UPN as owner
 * 
 * @param {string} upn User Principal Name
 * @returns 
 */
function ensure(context,name,defaults,thisService){

    return new Promise(function (resolve, reject) {
    
        Service.
        find({
            tenant : context.tenant,
            name: name
        }).
        exec((a, results, c, d) => {
            if (results && results.length > 0) {
                resolve({serviceInDb : results[0],thisService: thisService})
            } else {

                var service = new Service(defaults)
                service.tenant = context.tenant
                service.name = name
                service.upn = context.upn
                service.displayName = service.displayName ? service.displayName : name
                service.save().then(newService => {
                    var objectId = newService._id
                    Audit.Append(context, "Appended Service", Audit.Categories.Data, "Append data", {objectId})
                    .then(()=>{
                        resolve({serviceInDb : newService,thisService: thisService})
                    })
                        
                    })
                    .catch(err => {
                        Audit.Append(context, "Appended Service",  Audit.Categories.Error, "Append data", {
                            err})
                    .then(()=>{
                        reject(err)
                    })
                    })
            }
        });
    });

}

function get (tenantName,name) {

    return new Promise(function (resolve, reject) {
        Service.
        find({
            name: tenantName,
            name : name
        }).
        exec((a, results, c, d) => {
            if (results && results.length > 0) {
                resolve(results[0])
            } else {

                reject(`Did not find service ${tenantName}`)
            }
        });
    });

}