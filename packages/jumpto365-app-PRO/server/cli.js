#!/usr/bin/env node

 
var program = require('commander');
var chalk = require("chalk")
var _ = require("lodash")
var commands = require("./src/commands")



console.log(chalk.white.bgBlue.bold(_.repeat(" ",80)))
console.log(chalk.white.bgBlue.bold("  jumpto365"+_.repeat(" ",69)))
console.log(chalk.white.bgBlue.bold(_.repeat(" ",80)))



commands(program)

 
program.parse(process.argv);  
 





