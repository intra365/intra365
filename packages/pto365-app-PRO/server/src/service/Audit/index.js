var Audit = require("../../models/audit").model

var Categories = Object.freeze({
    Data: "Data",
    Authentication: "Authentication",
    Batch: "Batch",
    Error: "Error"
})

module.exports = {
    Append,
    Categories
}

/**
 * Based on a given email either returns and existing Tenant or create a new and add the current UPN as owner
 * 
 * @param {string} upn User Principal Name
 * @returns 
 */
function Append(context, name, category, displayName, data) {

    return new Promise(function (resolve, reject) {

        if (!context && !context.upn && !context.tenant) return reject("Missing context " )

        var audit = new Audit({
            name,
            category,
            displayName,
            upn: context.upn,
            data,
            tenant: context.tenant
        })
        audit.save().then(newAudit => {
                resolve(newAudit)
            })
            .catch(err => {
                reject(err)
            })
    })


}