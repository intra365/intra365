var Translate = require (".")

console.log(Translate.ping(1))

Translate.translate("Hello Niels\nHow is life?","da",function (err,result){
    if (err) return console.log(err)
    console.log(result)
})

