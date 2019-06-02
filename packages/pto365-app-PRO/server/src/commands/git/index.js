var chalk = require("chalk")
var _ = require("lodash")
var git = require("../../utils/git")




function gitCommands(program){
    program
    .command('pull [env]')
    .description('run pull commands for all envs')
    .action(function(env, options){

      git.pull(function (err,repository){
        if (err){
            console.error(err)
            process.exit(1)
        }
        console.log("done")
        process.exit(0)
      })  



      var mode = options.setup_mode || "normal";
      env = env || 'all';
      console.log('pulling from %s env(s) with %s mode', env, mode);
    }); 

    
    program
    .command('status [env]')
    .description('run status commands for all envs')
    .action(function(env, options){

      git.status(function (err,repository){
        if (err){
            console.error(err)
            process.exit(1)
        }
        console.log("done")
        process.exit(0)
      })  



      var mode = options.setup_mode || "normal";
      env = env || 'all';
      console.log('status from %s env(s) with %s mode', env, mode);
    }); 

    program
    .command('clone [env]')
    .description('run clone commands for all envs')
    .action(function(env, options){

      git.clone(function (err,repository){
        if (err){
            console.error(err)
            process.exit(1)
        }
        console.log("done")
        process.exit(0)
      })  



      var mode = options.setup_mode || "normal";
      env = env || 'all';
      console.log('cloning from %s env(s) with %s mode', env, mode);
    }); 



}


module.exports = gitCommands