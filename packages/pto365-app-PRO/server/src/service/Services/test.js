require("../../connect")
var Services = require(".")

Services.ensure("niels@hexatown.com","intranets2",{tagString: "Root/Child;Hidden$/0332 Line 2;Hidden$/01 Line 1;",labels:[{name:"Intranettet",languageCode:"da"},{name:"IntraNets",languageCode:"us"}]})
    .then(r => {
        console.log(r)
    })
    .catch(err => {
        console.log(err)
    })