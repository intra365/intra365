var git = require(".").default



git.
then(me=>console.log(me))
.catch(error=>console.log("error",error))