var Publisher = require("./")

async function flow(){
   var what =  await  Publisher.ping()
   console.log(what)
   return what
}

flow() 