require("../../connect")
var Usecase = require(".")

Usecase.ensure("niels@hexatown.com", `Rediger et dokument samtidig med en anden inden publisering`, {
        tagString: "@Area/Collaboration;",
        labels: [{
            name: "Rediger et dokument samtidig med en anden inden publisering",
            languageCode: "da"
        }, {
            name: "Edit a document simultaneously with another before publishing",
            languageCode: "us"
        }]
    })
    .then(r => {
        console.log(r)
    })
    .catch(err => {
        console.log(err)
    })