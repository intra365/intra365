var worker = require('./core').worker

var metadataMapper = (message) => {
    var upn = message && message.body && message.body.Userdata ? message.body.Userdata.userPrincipalName : null

    return {
        partion: "upn",
        key: upn
    }
}

var dataMapper = (metadata, message) => {

    var signin = {
        PartitionKey: {
            '_': metadata.partion
        },
        RowKey: {
            '_': metadata.key
        },

        data: {
            '_': JSON.stringify(message)
        }
    };
    return signin
}

var dataUpdater = (metadata, dataobject, message) => {
    
    var doUpdate = false
    if (message && message.body && message.body.Userdata){
        var user = message.body.Userdata
        if (user.companyName){
           dataobject.companyName = {"_":user.companyName}
           doUpdate = true
        }
        if (user.mail){
            dataobject.mail = {"_":user.mail}
            doUpdate = true
         }
         if (user.mobilePhone){
            dataobject.mobilePhone = {"_":user.mobilePhone}
            doUpdate = true
         }
         if (user.usageLocation){
            dataobject.usageLocation = {"_":user.usageLocation}
            doUpdate = true
         }
         if (user.jobTitle){
            dataobject.jobTitle = {"_":user.jobTitle}
            doUpdate = true
         }
         if (user.country){
            dataobject.country = {"_":user.country}
            doUpdate = true
         }
         if (user.displayName){
            dataobject.displayName = {"_":user.displayName}
            doUpdate = true
         }
         
    }
   

    return {
        update: doUpdate,
        dataobject
    }
}

var config = {
    interval: 1000,
    queue: "flow",
    table: "signins",
    storageAccount: "jumpto36500001",
    password: "TrPnxiQXEsggqum029GKPzObvueh5e448OE4VqlS5DWOkd0uJoYi3H4YZtdZufSJH5DiJ9XJyECuqqqRUOONSg=="

}

worker(config, metadataMapper, dataMapper, dataUpdater)
    .then((exitMessage) => {
        console.log("Done", exitMessage)
        process.exit(0)
    })
    .catch(error => {
        console.log("Error", exitMessage)
        process.exit(1)

    })