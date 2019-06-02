//var fs = require("fs-extra");
var request = require('request');
var json = require("format-json")
const http = require("https");

function Storage(accessToken,root) {
    return {
        writeFile: function (path, content, encoding) {
            return new Promise((resolve, reject) => {
                var url = `https://graph.microsoft.com/v1.0/${root}/drive/items/root:/${path}:/content`
                request.put({
                    url,

                    headers: {
                        "Authorization": 'Bearer ' + accessToken,
                        "Content-Type": "text/plain"
                    },
                    body: content
                }, function (err, response, body) {
                    var parsedBody = JSON.parse(body);

                    if (err) {

                        reject(err);
                    } else if (parsedBody.error) {
                        reject(parsedBody.error_description);
                    } else {
                        resolve(parsedBody);
                    }

                })
            })
        },
        writeJson: function (path, content, encoding) {
            return new Promise((resolve, reject) => {
                var url = `https://graph.microsoft.com/v1.0/${root}/drive/items/root:/${path}:/content`
                request.put({
                    url,

                    headers: {
                        "Authorization": 'Bearer ' + accessToken,
                        "Content-Type": "application/json"
                    },
                    body: json.plain(content)
                }, function (err, response, body) {
                    var parsedBody = JSON.parse(body);

                    if (err) {

                        reject(err);
                    } else if (parsedBody.error) {
                        reject(parsedBody.error_description);
                    } else {
                        resolve(parsedBody);
                    }

                })
            })
        },
        ensureDir: function (path) {
            return new Promise((resolve, reject) => {
                //   fs.ensureDirSync(path)

                resolve()
            })
        },
        copyFile: function (filePath, destPath) {
            return new Promise((resolve, reject) => {
                //  fs.copyFileSync(filePath, destPath)
                resolve()
            })
        },
        fullPath: function (dirname, basepath) {
            return "jumpto365/" + basepath
        },
        initialize: function (dirname, basepath) {
            return new Promise((resolve, reject) => {

                var path = require("path")

                return resolve({
                    path: path.join(dirname, basepath)
                })


                var path = "jumpto365/" + basepath
                var webpath = `/v1.0/${root}/drive/items/root:/${path}:/content`
                http.get({
                    //href:url,
                    protocol : "https:",
                    port:443,
                    hostname : "graph.microsoft.com",
                    path : webpath,
                    
                    
                    
                    headers:{"Authorization": 'Bearer ' + accessToken}}, (res) => {
                    //debugger
                    const {
                        statusCode
                    } = res;
                    const contentType = res.headers['content-type'];
                    
                    let error;

                    if (statusCode == 302 ) { // redirect
                      
                        http.get(res.headers.location,res2=>{
                            const {
                                statusCode
                            } = res2;

                            if (statusCode !== 200 ) {
                                error = new Error(`Request Failed.\n` +
                                    `Status Code: ${statusCode}`);
                            }
                            if (error) {
                               
                                // consume response data to free up memory
                                res2.resume();
                                return reject(error)
                            }
                            res.setEncoding('binary');
                            let rawData = '';
                            res2.on('data', (chunk) => {
                                rawData += chunk;
                            });
                            res2.on('end', () => {
                                try {
                                   
                                return resolve({
                                    arrayBuffer: rawData, // used in client code
                                    buffer: rawData // used in server code
                                })
                                    
                    
                                    // console.log(parsedData);
                                } catch (e) {
                                    reject(e.message);
                                }
                            });
                        }).on('error', (e) => {
                            console.error(`Got error: ${e.message}`);
                        });
        
                        return

                        







                    }

                    if (statusCode !== 200 ) {
                        error = new Error(`Request Failed.\n` +
                            `Status Code: ${statusCode}`);
                    }
                    if (error) {
                       
                        // consume response data to free up memory
                        res.resume();
                        return reject(error)
                    }
                    res.setEncoding('binary');
                    let rawData = '';
                    res.on('data', (chunk) => {
                        rawData += chunk;
                    });
                    res.on('end', () => {
                        try {
                           
                        return resolve({
                            arrayBuffer: response.body, // used in client code
                            buffer: response.body // used in server code
                        })
                            
            
                            // console.log(parsedData);
                        } catch (e) {
                            reject(e.message);
                        }
                    });
                }).on('error', (e) => {
                    console.error(`Got error: ${e.message}`);
                });


                // request.get({
                //     url,

                //     headers: {
                //         "Authorization": 'Bearer ' + accessToken,
                //         "Accept-Encoding":"binary"
                //     }
                // }, function (err, response, body) {


                //     if (err) {

                //         reject(err);
                //     } else {
                //         resolve({
                //             arrayBuffer: response.body // buffer
                //         })
                //     }



                // });
            })
        }
    }
}

module.exports = {
    Storage
}