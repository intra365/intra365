var Tenant = require("../models/tenant").model
var Audit = require("./Audit")


module.exports = {ensure}

/**
 * Based on a given email either returns and existing Tenant or create a new and add the current UPN as owner
 * 
 * @param {string} upn User Principal Name
 * @returns 
 */
function ensure(context){

    return new Promise(function (resolve, reject) {

        
        Tenant.
        find({
            name: context.tenant
        }).
        exec((a, results, c, d) => {
            if (results && results.length > 0) {
                resolve(results[0])
            } else {
                var tenant = new Tenant({
                    name: context.tenant,
                    displayName :  context.tenant,
                    stage: "New",
                    upn: context.upn
                })
                tenant.save().then(newTenant => {
                    var objectId = newTenant._id
                    Audit.Append(context, "Appended Tenant", Audit.Categories.Data, "Append data", {
                             objectId
                        })
                        .then(() => {
                            resolve(newTenant)
                        })
                        .catch(err => {
                            reject(err)
                        })
                        
                    })
                    .catch(err => {
                        reject(err)
                    })
            }
        });
    });

}

module.exports.get = (tenantName) => {

    return new Promise(function (resolve, reject) {
        Tenant.
        find({
            name: tenantName
        }).
        exec((a, results, c, d) => {
            if (results && results.length > 0) {
                resolve(results[0])
            } else {

                reject(`Did not find tenant ${tenantName}`)
            }
        });
    });

}