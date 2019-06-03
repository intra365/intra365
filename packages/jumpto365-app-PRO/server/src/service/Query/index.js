
var mongoose = require('mongoose');
var DataRoot = require("../../models/dataroot").model
var File = require("../../models/file").model

function Query(context, queryData) {
    return new Promise(function (resolve, reject) {

        if (!queryData) return reject({
            message: "Need query in body"
        })
        if (!queryData.type) return reject({
            message: "Need query.type"
        })
        var type = queryData.type.toUpperCase()
        switch (type) {
            case "WTW":
                if (!queryData.id) {
                    return reject({
                        message: "Need query.id"
                    })
                }
                File
                    .findById(queryData.id)
                    .exec((a, results, c, d) => {

                        console.log(a, results, c)
                        resolve(results)
                    })

                break;
            case "RAW":
            var query = queryData.query

                File.db
                .collections['data'].find(query,(error,cursor)=> {
                    if (error){
                        return reject(error)
                    }
                    var data = cursor.toArray()
                    
                    resolve(data)   
                    
                })
                   

                break;

            default:
                return reject({
                    message: `Unknown type type:"${queryData.type}"`
                })
                break;
        }




    });

}

module.exports = {
    Query
}