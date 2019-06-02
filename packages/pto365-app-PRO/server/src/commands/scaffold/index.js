var chalk = require("chalk")
var _ = require("lodash")

var scaffold = require("./scaffold")


function commands(program) {
    program
        .command('scaffold [env]')
        .description('run scaffold commands for all envs')
        .action(function (env, options) {
            var mode = options.setup_mode || "normal";
            env = env || 'all';
            console.log('scaffolding from %s env(s) with %s mode', env, mode);

            scaffold()

        });






}


module.exports = commands