const fs = require('fs-extra')
const path = require("path")
var json = require("format-json")
var parse = require('csv-parse');
var connect = require("../services/sql").connect
var Request = require('tedious').Request
var TYPES = require('tedious').TYPES;
var _ = require("lodash")
// http://tediousjs.github.io/tedious/api-datatypes.html




module.exports.default = function () {

    return new Promise((resolve, reject) => {


        connect().then(connection => {
                console.log("Connected to database")


                function runQuery(sql) {
                    return new Promise((resolve, reject) => {
                        var data = []
                        var SQL = sql //`select NetsEmployeeId from dbo.NetsEmployees `
                        request = new Request(SQL, function (err, count, rows) {
                            if (err) {
                                console.log(err);
                                return reject(err)
                            }
                            console.log("Records found", count)
                            resolve(data)
                        });


                        //request.addParameter('Initilias', TYPES.NVarChar, employee.sAMAccountName)
                        request.on('row', function (columns) {

                          var record = {}
                             columns.forEach(function(column) {
                                 record[column.metadata.colName] = column.value
                                 //console.log("%s\t%s", column.metadata.colName, column.value);
                          });
                          data.push(record)

                        });
                        connection.execSql(request);
                    })
                }

                function publish(db, employees) {
                    return new Promise((resolve, reject) => {
                        var records = []

                        db.forEach(rec => {
                            records.push(rec)
                        });
                        var outputFilename = path.resolve(path.join(path.normalize(__dirname + "/../../data"), "junglemap.json"))
                        fs.writeJSONSync(outputFilename,records)

                        return resolve(records)

                    })
                }

                runQuery(`select * from dbo.viewNanoLearning order by department `).
                then(inDb => {
                    publish(inDb)
                    .then(users=>{
                        resolve(users)
                    })
                })


            })
            .catch(error => {
                console.log("database connection", error)
            })

    })
}