var data = require('../components/PeriodicSystem/office365periodictable.json')
var serviceLicense = require('../data/service-licenses.json')
var Translators = require("../data/translators.json")
var skus = require("./skus")
var plans = require("./plans")
var _ = require("lodash")
var {useCases,appToTool} = require("./fasttrack")

function getSKU(skuID){
    return skus[skuID] ? skus[skuID] : "unknown"
}
module.exports.translator = (lang) => {
    var res = null
    for (let index = 0; index < Translators.length; index++) {
        const translator = Translators[index];
        if (lang === translator.language){
          res = translator
        }
       
      }
     return res 
}

module.exports.analyseAssignedLicenses = (assignedLicenses) => {
    var licenses = {}
    var results = []

    if (!assignedLicenses) return []
    assignedLicenses.forEach(license => {
        license.name = getSKU(license.skuId)
        license.disabled = []
        license.disabledPlans.forEach(disabledPlan => {
            
            license.disabled.push(getSKU(disabledPlan))
        })
        results.push(license)
    });
    return results

}
var FastTrack = {
    useCases: useCases,
    appToTool : appToTool
}

var Services = {
    get : (key) => {
            if (Services.service[key]){
                var service = Services.service[key]
                service.licenses = serviceLicense[service.licenseKey]
                return service
            }else
            {
                return null
            }
    },
    isLicensed : (key,license) => {
        if ((!key) || (!license)) return true
        var service = Services.service[key]
        if (!service) return false
        if (service.licenseKey==="FREE") return true
        service.licenses = serviceLicense[service.licenseKey]
        if (!service.licenses ) return false 
        var isIncluded = false
        
        service.licenses.yes.forEach(element => {
            let licenseKey = element.replace(" ","").replace(" ","").replace(" ","").replace(" ","")
            if (licenseKey === license)
            {
                isIncluded = true
            }
        });
        
        return isIncluded 
    }
}

Services.service = {}
var serviceIdKeyMap = {}
data[0].data.forEach(row => {
    row.columns.forEach(col => {
        if (col.key){
        Services.service[col.key] = col
        Services.service[col.key].translation = {}
        serviceIdKeyMap[col.id] = col.key
    }
    });
});

for (let index = 1; index < data.length; index++){
    let language = data[index].language
    data[index].data.forEach(row => {
        row.columns.forEach(col => {
            var key = serviceIdKeyMap[col.id];
            if (key){
                var s = Services.service[key]
                Services.service[key].translation[language] = {
                    title : col.title,
                    about : col.about,
                    descriptor : col.descriptor,
                    subtitle : col.subtitle,

                }
            }
        })
    })
        }
        



module.exports.Services = Services
module.exports.FastTrack = FastTrack
module.exports.Prompts = require("./Prompts")