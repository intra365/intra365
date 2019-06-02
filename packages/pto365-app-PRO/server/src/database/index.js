const sql = require('mssql')
 

sql.connect('mssql://niels:Emln3060!@jumpto365.database.windows.net/jumpto365?encrypt=true')
.then(()=>{
    var request = new sql.Request()
    request.query("select * from dbo.tenants")
    .then(result=>{
        result.recordset.map(r=>{
            console.log(r)
        })
        })
    .catch(err=>{
        console.warn("sql",err)
        // ... error checks

    })
    
})
.catch (err=> {
        console.warn("connect",err)
        // ... error checks
    })