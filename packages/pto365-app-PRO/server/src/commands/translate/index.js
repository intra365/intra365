var chalk = require("chalk")
var _ = require("lodash")
var translate = require("../../utils/translate")




function commands(program){
    program
    .command('translate [env]')
    .description('run translate commands for all envs')
    .action(function(env, options){
     var text = `
     
     jumpto365 App
     `
      translate.translate(text,"en","ja",function (err,translation){
        if (err){
            console.error(err)
            process.exit(1)
        }
        console.log(translation)
        console.log("done")
        process.exit(0)
      })  



      var mode = options.setup_mode || "normal";
      env = env || 'all';
      console.log('translating from %s env(s) with %s mode', env, mode);
    }); 

    
   



}


module.exports = commands