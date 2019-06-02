const fs = require('fs-extra')
const path = require("path")
var json = require("format-json")
var parse = require('csv-parse');
var connect = require("../services/sql").connect
var Request = require('tedious').Request
var TYPES = require('tedious').TYPES;
var _ = require("lodash")
// http://tediousjs.github.io/tedious/api-datatypes.html


function mapInitial(initial){
    if (!initial) return
    if (initial.toUpperCase()==="NPP") return "ONPPO"
    return initial

}
module.exports.default = function () {

    return new Promise((resolve, reject) => {

        var inputFilename = path.resolve(path.join(path.normalize(__dirname + "/../../data"), "SAP.json"))
        var employees = fs.readJSONSync(inputFilename)
        var employees2 = fs.readJSONSync(inputFilename)
        connect().then(connection => {
                console.log("Connected to database")

                function updateEmployee(employee) {
                    return new Promise((resolve, reject) => {
                        if (employee.employeeNumber === "*** EOF ***") {
                            return resolve("skipping", employee.employeeNumber)
                        }

                        var SQL = `
                        UPDATE [dbo].[NetsEmployees]
                       SET 
                       [Initilias]= @Initilias
                       ,[GivenName]= @GivenName
                       ,[MiddleName]= @MiddleName
                       ,[SurName]= @SurName
                       ,[OrganisationId]= @OrganisationId
                       ,[DepartmentId]= @DepartmentId
                       ,[DepartmentNumber]= @DepartmentNumber
                       ,[DepartmentName]= @DepartmentName
                       ,[PhysicalOfficeId]= @PhysicalOfficeId
                       ,[EmployeeStatusCode]= @EmployeeStatusCode
                       ,[EnableDate]= @EnableDate
                       ,[DisableDate]= @DisableDate
                       ,[PhoneNumber]= @PhoneNumber
                       ,[MobilePhoneNumber]= @MobilePhoneNumber
                       ,[EmployeeTypeCode]= @EmployeeTypeCode
                       ,[ManagerNetsEmployeeId]= @ManagerNetsEmployeeId
                       ,[CompanyName]= @CompanyName
                       ,[EmployeeTypeCode2]= @EmployeeTypeCode2
                       ,[IsInternal]= @IsInternal
                       ,[IsExternal]= @IsExternal
                       ,[LocationNumber]= @LocationNumber
                       ,[RoomNumber]= @RoomNumber
                       ,[ExternalCompany]= @ExternalCompany
                       ,[LeaveCode]= @LeaveCode
                       ,[LeaveStart]= @LeaveStart
                       ,[LeaveEnd]= @LeaveEnd
                       ,[Email]= @Email
                       ,[UserPrincipalName]= @UserPrincipalName

                       WHERE [NetsEmployeeId] = @NetsEmployeeId
            
                      
            
                        `
                        request = new Request(SQL, function (err) {
                            if (err) {
                                console.log(err);
                                return reject(err)
                            }
                            resolve()
                        });

                        function toDate(v) {
                            if (!v) return null
                            if (v === "99991231") return null
                            if (v === "00000000") return null

                            var y = parseInt(v.substr(0, 4))
                            var m = parseInt(v.substr(4, 2))
                            var d = parseInt(v.substr(6, 2))
                            return new Date(y, m, d)
                        }

                        request.addParameter('NetsEmployeeId', TYPES.NVarChar, parseInt(employee.employeeNumber))
                        request.addParameter('Initilias', TYPES.NVarChar, employee.inits)
                        request.addParameter('GivenName', TYPES.NVarChar, employee.givenName)
                        request.addParameter('MiddleName', TYPES.NVarChar, mapInitial(employee.initials))
                        request.addParameter('SurName', TYPES.NVarChar, employee.sn)
                        request.addParameter('OrganisationId', TYPES.NVarChar, employee.o)
                        request.addParameter('DepartmentId', TYPES.NVarChar, employee.DepartmentID)
                        request.addParameter('DepartmentNumber', TYPES.NVarChar, employee.NetsDepartmentNumber)
                        request.addParameter('DepartmentName', TYPES.NVarChar, employee.departmentNumber)
                        request.addParameter('PhysicalOfficeId', TYPES.NVarChar, employee.physicalDeliveryOfficeName)
                        request.addParameter('EmployeeStatusCode', TYPES.NVarChar, employee.EmployeeStatus)
                        request.addParameter('EnableDate', TYPES.Date, toDate(employee.Enable_Date))
                        request.addParameter('DisableDate', TYPES.Date, toDate(employee.Disable_Date))
                        request.addParameter('PhoneNumber', TYPES.NVarChar, employee.telephoneNumber)
                        request.addParameter('MobilePhoneNumber', TYPES.NVarChar, employee.mobile)
                        request.addParameter('EmployeeTypeCode', TYPES.NVarChar, employee.employeeType)
                        request.addParameter('ManagerNetsEmployeeId', TYPES.NVarChar, parseInt(employee.imManager))
                        request.addParameter('CompanyName', TYPES.NVarChar, employee.Company_Name)
                        request.addParameter('EmployeeTypeCode2', TYPES.NChar, employee.Employee_Type)
                        request.addParameter('IsInternal', TYPES.Bit, employee.Employee_Type === "I")
                        request.addParameter('IsExternal', TYPES.Bit, employee.Employee_Type === "E")
                        request.addParameter('PreferredName', TYPES.NVarChar, employee.preferredName)
                        request.addParameter('LocationNumber', TYPES.NVarChar, employee.Location)
                        request.addParameter('RoomNumber', TYPES.NVarChar, employee.roomNumber)
                        request.addParameter('ExternalCompany', TYPES.NVarChar, employee.care_of)
                        request.addParameter('LeaveCode', TYPES.NChar, employee.Leave)
                        request.addParameter('LeaveStart', TYPES.Date, toDate(employee.Lstart))
                        request.addParameter('LeaveEnd', TYPES.Date, toDate(employee.Lend))
                        request.addParameter('Email', TYPES.NVarChar, null)
                        request.addParameter('UserPrincipalName', TYPES.NVarChar, null)


                        connection.execSql(request);
                    })
                }

                function insertEmployee(employee) {
                    return new Promise((resolve, reject) => {
                        if (employee.employeeNumber === "*** EOF ***") {
                            return resolve("skipping", employee.employeeNumber)
                        }



                        var SQL = `
            INSERT INTO [dbo].[NetsEmployees]
           ([NetsEmployeeId]
           ,[Initilias]
           ,[GivenName]
           ,[MiddleName]
           ,[SurName]
           ,[OrganisationId]
           ,[DepartmentId]
           ,[DepartmentNumber]
           ,[DepartmentName]
           ,[PhysicalOfficeId]
           ,[EmployeeStatusCode]
           ,[EnableDate]
           ,[DisableDate]
           ,[PhoneNumber]
           ,[MobilePhoneNumber]
           ,[EmployeeTypeCode]
           ,[ManagerNetsEmployeeId]
           ,[CompanyName]
           ,[EmployeeTypeCode2]
           ,[IsInternal]
           ,[IsExternal]
           ,[PreferredName]
           ,[LocationNumber]
           ,[RoomNumber]
           ,[ExternalCompany]
           ,[LeaveCode]
           ,[LeaveStart]
           ,[LeaveEnd]
           ,[Email]
           ,[UserPrincipalName])

           VALUES
           (@NetsEmployeeId,
            @Initilias,
            @GivenName,
            @MiddleName,
            @SurName,
            @OrganisationId,
            @DepartmentId,
            @DepartmentNumber,
            @DepartmentName,
            @PhysicalOfficeId,
            @EmployeeStatusCode,
            @EnableDate,
            @DisableDate,
            @PhoneNumber,
            @MobilePhoneNumber,
            @EmployeeTypeCode,
            @ManagerNetsEmployeeId,
            @CompanyName,
            @EmployeeTypeCode2,
            @IsInternal,
            @IsExternal,
            @PreferredName,
            @LocationNumber,
            @RoomNumber,
            @ExternalCompany,
            @LeaveCode,
            @LeaveStart,
            @LeaveEnd,
            @Email,
            @UserPrincipalName)

            `





                        request = new Request(SQL, function (err) {
                            if (err) {
                                console.log(err);
                                return reject(err)
                            }
                            resolve()
                        });

                        function toDate(v) {
                            if (!v) return null
                            if (v === "99991231") return null
                            if (v === "00000000") return null

                            var y = parseInt(v.substr(0, 4))
                            var m = parseInt(v.substr(4, 2))
                            var d = parseInt(v.substr(6, 2))
                            return new Date(y, m, d)
                        }

                        request.addParameter('NetsEmployeeId', TYPES.NVarChar, parseInt(employee.employeeNumber))
                        request.addParameter('Initilias', TYPES.NVarChar, employee.inits)
                        request.addParameter('GivenName', TYPES.NVarChar, employee.givenName)
                        request.addParameter('MiddleName', TYPES.NVarChar, employee.initials)
                        request.addParameter('SurName', TYPES.NVarChar, employee.sn)
                        request.addParameter('OrganisationId', TYPES.NVarChar, employee.o)
                        request.addParameter('DepartmentId', TYPES.NVarChar, employee.DepartmentID)
                        request.addParameter('DepartmentNumber', TYPES.NVarChar, employee.NetsDepartmentNumber)
                        request.addParameter('DepartmentName', TYPES.NVarChar, employee.departmentNumber)
                        request.addParameter('PhysicalOfficeId', TYPES.NVarChar, employee.physicalDeliveryOfficeName)
                        request.addParameter('EmployeeStatusCode', TYPES.NVarChar, employee.EmployeeStatus)
                        request.addParameter('EnableDate', TYPES.Date, toDate(employee.Enable_Date))
                        request.addParameter('DisableDate', TYPES.Date, toDate(employee.Disable_Date))
                        request.addParameter('PhoneNumber', TYPES.NVarChar, employee.telephoneNumber)
                        request.addParameter('MobilePhoneNumber', TYPES.NVarChar, employee.mobile)
                        request.addParameter('EmployeeTypeCode', TYPES.NVarChar, employee.employeeType)
                        request.addParameter('ManagerNetsEmployeeId', TYPES.NVarChar, parseInt(employee.imManager))
                        request.addParameter('CompanyName', TYPES.NVarChar, employee.Company_Name)
                        request.addParameter('EmployeeTypeCode2', TYPES.NChar, employee.Employee_Type)
                        request.addParameter('IsInternal', TYPES.Bit, employee.Employee_Type === "I")
                        request.addParameter('IsExternal', TYPES.Bit, employee.Employee_Type === "E")
                        request.addParameter('PreferredName', TYPES.NVarChar, employee.preferredName)
                        request.addParameter('LocationNumber', TYPES.NVarChar, employee.Location)
                        request.addParameter('RoomNumber', TYPES.NVarChar, employee.roomNumber)
                        request.addParameter('ExternalCompany', TYPES.NVarChar, employee.care_of)
                        request.addParameter('LeaveCode', TYPES.NChar, employee.Leave)
                        request.addParameter('LeaveStart', TYPES.Date, toDate(employee.Lstart))
                        request.addParameter('LeaveEnd', TYPES.Date, toDate(employee.Lend))
                        request.addParameter('Email', TYPES.NVarChar, null)
                        request.addParameter('UserPrincipalName', TYPES.NVarChar, null)


                        connection.execSql(request);
                    })
                }

                function lookupEmployee(employee) {
                    return new Promise((resolve, reject) => {
                        if (employee.employeeNumber === "*** EOF ***") {
                            return resolve({
                                found: false
                            })
                        }

                        var data = []
                        var SQL = `select NetsEmployeeId from dbo.NetsEmployees where NetsEmployeeId = @employeeNumber`
                        request = new Request(SQL, function (err, count, rows) {
                            if (err) {
                                console.log(err);
                                return reject(err)
                            }

                            resolve({
                                found: count > 0,
                                data
                            })
                        });


                        request.addParameter('employeeNumber', TYPES.BigInt, parseInt(employee.employeeNumber))
                        request.on('row', function (columns) {
                            data.push(columns)
                            // columns.forEach(function(column) {
                            //     console.log("%s\t%s", column.metadata.colName, column.value);
                            //  });
                        });
                        connection.execSql(request);
                    })
                }
                function lookupEmployees() {
                    return new Promise((resolve, reject) => {
                        var data = []
                        var SQL = `select NetsEmployeeId from dbo.NetsEmployees `
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
                           
                            data.push({id : columns[0].value
                            })
                            // columns.forEach(function(column) {
                            //     console.log("%s\t%s", column.metadata.colName, column.value);
                            //  });
                        });
                        connection.execSql(request);
                    })
                }
                function updateOrInsertNext() {
                    if (employees.length === 0) return resolve()
                    var employee = employees.pop()

                    lookupEmployee(employee)
                        .then(rec => {
                            var action = null
                            if (rec.found) {
                                action = updateEmployee
                            } else {
                                action = insertEmployee
                            }
                            action(employee)
                                .then(result => {
                                    console.log(employee.inits, result)
                                    updateOrInsertNext()
                                })
                                .catch(error => {
                                    console.log("Run error", employee.inits, error)
                                    // reject(error)
                                })
                        })
                }
                function archive(db,employees){
                    return new Promise((resolve, reject) => {
                    db.forEach(rec => {
                       rec.found  =  _.find(employees,(employee=>{
                        
                        var empId = parseInt(employee.employeeNumber)
                           var match =  parseInt(rec.id) === empId
                            return match
                        }))
                       //console.log(1)
                    }); 

                db.forEach(rec => {
                       if (!rec.found){
                          console.log("Will archive",rec)
                        }
                    }); 
                return resolve()
                    // function archive(){
                    // if (employees.length === 0) return resolve()
                    // var employee = employees.pop()

                    // lookupEmployee(employee)
                    //     .then(rec => {
                    //         var action = null
                    //         if (rec.found) {
                    //             action = updateEmployee
                    //         } else {
                    //             action = insertEmployee
                    //         }
                    //         action(employee)
                    //             .then(result => {
                    //                 console.log(employee.inits, result)
                    //                 updateOrInsertNext()
                    //             })
                    //             .catch(error => {
                    //                 console.log("Run error", employee.inits, error)
                    //                 // reject(error)
                    //             })
                    //     })
                    // }
                })
                }

                lookupEmployees().
                then(inDb => {
                    archive(inDb,employees2)
                    .then(()=>{
                        updateOrInsertNext()
                    })
                })

                
            })
            .catch(error => {
                console.log("database connection", error)
            })

    })
}