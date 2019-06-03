var Usecase = require("../../models/usecase").model
var Audit = require("../Audit")

module.exports = {ensure,get}

/**
 * Based on a given email either returns and existing Tenant or create a new and add the current UPN as owner
 * 
 * @param {string} upn User Principal Name
 * @returns 
 */
function ensure(context,name,defaults,thisUseCase){

    return new Promise(function (resolve, reject) {
    

        Usecase.
        find({
            tenant : context.tenant,
            name: name
        }).
        exec((a, results, c, d) => {
            if (results && results.length > 0) {
                resolve(
                    {useCaseInDb : results[0],thisUsecase: thisUseCase})
            } else {

                var usecase = new Usecase(defaults)
                usecase.tenant = context.tenant
                usecase.name = name
                usecase.upn = context.upn
                usecase.displayName = usecase.displayName ? usecase.displayName : name
                usecase.save().then(usecaseItem => {
                    var objectId = usecaseItem._id
                    Audit.Append(context, "Appended Usecase", Audit.Categories.Data, "Append data", {objectId})
                    .then(()=>{
                        resolve({useCaseInDb : usecaseItem,thisUsecase: thisUseCase})
                    })
                        
                    })
                    .catch(err => {
                        Audit.Append(context, "Appended Usecase",  Audit.Categories.Error, "Append data", {
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
        Usecase.
        find({
            name: tenantName,
            name : name
        }).
        exec((a, results, c, d) => {
            if (results && results.length > 0) {
                resolve(results[0])
            } else {

                reject(`Did not find usecase ${tenantName}:${name}`)
            }
        });
    });

}