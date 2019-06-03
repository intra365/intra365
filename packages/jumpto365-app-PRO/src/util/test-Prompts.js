var Prompts = require("./Prompts")

Prompts.parse("Hello {{article.title}}", {
        article: {
            title: "Title of article"
        }
    })
    .then(text => {
        console.log(text)
    })
    .catch(err => {
        console.error(err)
    })



Prompts
.get("login/authorized",{tenant : {name:"Tenant Name"}})
.then(text => {
    console.log(JSON.stringify(text))
})
.catch(err => {
    console.error(err)
})


Prompts
.get("unknown",{tenant : {name:"Tenant Name"}})
.then(text => {
    console.log(text)
})
.catch(err => {
    console.error(err)
})
