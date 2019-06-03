const fs = require('fs-extra')
const path = require("path")
var json = require("format-json")
var parse = require('csv-parse');
var connect = require("../services/sql").connect
var Request = require('tedious').Request
var TYPES = require('tedious').TYPES;
var _ = require("lodash")
var scripting = require("../services/scripting")
// http://tediousjs.github.io/tedious/api-datatypes.html

module.exports.default = function () {

    return new Promise((resolve, reject) => {

        var inputFilename = path.resolve(path.join(path.normalize(__dirname + "/../../data"), "corp.local.users.json"))
        var employees = fs.readJSONSync(inputFilename)
        connect().then(connection => {
                console.log("Connected to database")

                var usertoUpdate = []
                var managertoUpdate = []

                

                function lookupEmployees() {
                    return new Promise((resolve, reject) => {
                        var data = []
                        var SQL = `select EMP.Initilias,EMP.DepartmentNumber,EMP.DepartmentName, MAN.Initilias from dbo.NetsEmployees as EMP left join dbo.NetsEmployees as MAN on MAN.NETSEMPLOYEEID = EMP.ManagerNetsEmployeeId `
                        request = new Request(SQL, function (err, count, rows) {
                            if (err) {
                                console.log(err);
                                return reject(err)
                            }
                            console.log("Records found",count)
                            resolve(data)
                        });


                        //request.addParameter('Initilias', TYPES.NVarChar, employee.sAMAccountName)
                        request.on('row', function (columns) {
                           
                            data.push({id : columns[0].value.toUpperCase(),
                                departmentId : columns[1].value,
                                departmentName : columns[2].value,
                                manager : columns[3].value ? columns[3].value.toUpperCase() : ""
                            })
                            // columns.forEach(function(column) {
                            //     console.log("%s\t%s", column.metadata.colName, column.value);
                            //  });
                        });
                        connection.execSql(request);
                    })
                }
                
                async function buildScript(name,data){

                    scripting.render(name,data)
                    .then(scriptText => {
                        var scriptFilename = path.resolve(path.join(path.normalize(__dirname + "/../../data"), name))
                        fs.writeFileSync(scriptFilename,scriptText)
                        return resolve()
                    })
                    .catch((e)=>{
                        console.log("Couldn't genereate script for this",e)

                        return resolve()
                    })
                    
                }

                async function buildScripts(){
                    await buildScript("DepartmentName.ps1",{users:usertoUpdate})
                    await buildScript("Manager.ps1",{users:managertoUpdate})
                }

                function run(data) {
                    if (employees.length === 0) {
                        console.log("Wrong department",usertoUpdate)
                        var outputFilename = path.resolve(path.join(path.normalize(__dirname + "/../../data"), "baddepartment.json"))
                        fs.writeJSONSync(outputFilename,usertoUpdate)

                        outputFilename = path.resolve(path.join(path.normalize(__dirname + "/../../data"), "badmanager.json"))
                        fs.writeJSONSync(outputFilename,managertoUpdate)
                        buildScripts()
                        .then(()=> {
                            return resolve()
                        })


                }
                    var employee = employees.pop()
                    var sqlData= _.find(data,(sql)=>{
                        return sql.id === employee ? employee.sAMAccountName.toUpperCase() : ""
                    })
                    if (!sqlData){

                        return run(data)
                    }
                    var departmentText = sqlData.departmentId + ' ' + sqlData.departmentName
                    if (employee.department !== departmentText) {
                        usertoUpdate.push({
                            id: sqlData.id,
                            departmentText
                        })
                    }
                    var manager = employee.manager ? employee.manager.replace("CN=","").replace(",OU=Personal,OU=All Users,DC=corp,DC=local","").toUpperCase() : ""
                    if (manager !== sqlData.manager){
                        managertoUpdate.push({
                            id: sqlData.id,
                            manager : sqlData.manager
                        })
                    }

                    run(data)

                }
                lookupEmployees().then((data) => {
                    run(data)
                })

            })
            .catch(error => {
                console.log("database connection", error)
            })

    })
}