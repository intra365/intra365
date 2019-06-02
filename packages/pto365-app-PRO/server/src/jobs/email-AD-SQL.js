
const fs = require('fs-extra')
const path = require("path")
var json = require("format-json")
var parse = require('csv-parse');
var connect = require("../services/sql").connect
var Request = require('tedious').Request
var TYPES = require('tedious').TYPES;
// http://tediousjs.github.io/tedious/api-datatypes.html

module.exports.default = function () {

    return new Promise((resolve, reject) => {

        var inputFilename = path.resolve(path.join(path.normalize(__dirname + "/../../data"), "corp.local.users.json"))
        var employees = fs.readJSONSync(inputFilename)
        connect().then(connection => {
                console.log("Connected to database")


                function lookupEmployee(employee) {
                    return new Promise((resolve, reject) => {
                        var data = []
                        var SQL = `select NetsEmployeeId,email from dbo.NetsEmployees where initilias = @Initilias`
                        request = new Request(SQL, function (err,count,rows) {
                            if (err) {
                                console.log(err);
                                return reject(err)
                            }
                            resolve(data)
                        });

                       
                        request.addParameter('Initilias', TYPES.NVarChar, employee.sAMAccountName)
                        request.on('row', function(columns) {
                            data.push(columns)
                            // columns.forEach(function(column) {
                            //     console.log("%s\t%s", column.metadata.colName, column.value);
                            //  });
                                 });
                        connection.execSql(request);
                    })
                }
                function updateEmail(employeeId,mail) {
                    return new Promise((resolve, reject) => {
                        
                        var SQL = `update dbo.NetsEmployees set email = @email where NetsEmployeeId = @NetsEmployeeId`
                        request = new Request(SQL, function (err,count,rows) {
                            if (err) {
                                console.log(err);
                                return reject(err)
                            }
                            resolve(count)
                        });

                        request.addParameter('NetsEmployeeId', TYPES.BigInt, employeeId)
                        request.addParameter('email', TYPES.NVarChar, mail)
                        
                        
                        connection.execSql(request);
                    })
                }
                function run() {
                    if (employees.length === 0) return resolve()
                    var employee = employees.pop()
                    lookupEmployee(employee)
                        .then(result => {
                            var takeNext = true
                            console.log(employee.sAMAccountName,result)
                            if (result.length === 1){
                                var email = result[0][1].value
                                var id = result[0][0].value


                                if (email !== employee.mail){
                                    takeNext = false
                                    updateEmail(id,employee.mail)
                                    .then(rows=>{
                                        run()
                                    })
                                }
                            }   


                            if (takeNext) run()
                        })
                        .catch(error => {
                            console.log("Run error",employee.sAMAccountName,error)
                           // reject(error)
                        })
                }

                run()
            })
            .catch(error => {
                console.log("database connection", error)
            })

    })
}