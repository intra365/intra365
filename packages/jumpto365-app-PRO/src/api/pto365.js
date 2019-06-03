var axios = require("axios")
var HOST = false ? "http://localhost:8082" :  "https://pto365.azurewebsites.net"

var moment = require("moment")
var axios = require("axios")

module.exports.jumpto365API  = {
    getTenant,
    uploadFile
}
module.exports.pto365Authenticate = (token, cb) => {
    axios.post(HOST + "/api/register", {
            "token": token
        })
        .then((response) => {
            localStorage.setItem("pto365auth", response.data)
            return cb(null, response.data)

        })
        .catch((error) => {
            return cb(error)
        })
}


module.exports.pto365Track = (upn, me, cb) => {
    axios.post(HOST + "/tracks", {
            "upn": upn,
            "date": moment().utc().toISOString(),
            "me": me
        })
        .then((response) => {
            return cb(null, response.data.body)

        })
        .catch((error) => {
            return cb(error)
        })



}

function authGet(path) {
    var auth = localStorage.getItem("pto365auth")
    const authStr = `Bearer ${auth}`
    var url = HOST + path
    return axios.get(url, {
        headers: {
            Authorization: authStr
        }
    })


}

function authPost(path,body) {
    var auth = localStorage.getItem("pto365auth")
    const authStr = `Bearer ${auth}`
    var url = HOST + path
    return axios.post(url, body,{
        headers: {
            Authorization: authStr
        }
    })


}

function authPostMultipart(path,body) {
    var auth = localStorage.getItem("pto365auth")
    const authStr = `Bearer ${auth}`
    var url = HOST + path
    
    return axios.post(url, body,{
        headers: {
            Authorization: authStr,
            "content-type":"multipart/form-data",
            "accept":"application/json"
        }
    })


}

/**
 * Default tenant of the current signedin user
 * 
 * @returns Tenant 
 */
function getTenant() {
    return new Promise(function (resolve, reject) {
        authGet("/api/mytenant")
            .then((response) => {
                resolve(response.data)

            })
            .catch((error) => {
                reject(error)
            })
    })


}

function uploadFile(file,tags){
    return new Promise(function (resolve, reject) {

        const formData = new FormData();
        formData.append('upfile',file)
        formData.append('tags',tags)
        
        
    
        authPostMultipart("/api/file",formData)
            .then((response) => {
                resolve(response.data)

            })
            .catch((error) => {
                reject(error)
            })
    })
    
}
module.exports.getFile = (id) => {
    return new Promise(function (resolve, reject) {
        var query = {
            type:"WTW",
            id}
        authPost("/api/query",query)
            .then((response) => {
                resolve(response.data)

            })
            .catch((error) => {
                reject(error)
            })
    })
    
}


function Get(path) {
    return new Promise(function (resolve, reject) {
        authGet(path)
            .then((response) => {
                resolve(response.data)

            })
            .catch((error) => {
                reject(error)
            })
    })
    
}
module.exports.Get = Get