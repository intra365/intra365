// https://tomasz.janczuk.org/2013/07/application-initialization-of-nodejs.html

var azure = require('azure-storage')
var running = true


module.exports.worker = function(config, getMetadata, getData, getDiff) {
    return new Promise((resolve, reject) => {
        interval = config.interval ? config.interval : 5000
        console.log("Booting...")

        var queueService = azure.createQueueService(config.storageAccount, config.password);

        queueService.createQueueIfNotExists(config.queue, function (error) {
            if (error) {
                return reject("Created queue " + error)

            }

            console.log("Queue is ready")
            var cycle = 60
            function takeOne() {

                if (!running) {
                    console.log("Exiting ")
                    return resolve("Done")
                }
                cycle++
                if (cycle > 60){
                    console.log("Waiting ")
                    cycle = 0
                }

                queueService.getMessage(config.queue, {
                    visibilityTimeout: 60
                }, (err, message, response) => {

                    var next = (error, result, response) => {
                        if (error) {
                            console.log("Error returned", error)
                            // Entity inserted
                        }
                        console.log("Deleting message")
                        queueService.deleteMessage(config.queue, message.messageId, message.popReceipt, function (error, response) {
                            if (error) {
                                console.log("Delete message returned", error)
                                // Entity inserted
                            }
                            setTimeout(takeOne, interval)
                        })

                    }

                    if (err) {
                        console.log("ERROR getMessage", config.queue, err)
                    }

                    if (!message) {
                        return setTimeout(takeOne, interval)
                    }

                    var tableSvc = azure.createTableService(config.storageAccount, config.password);

                    let buff = new Buffer(message.messageText, 'base64');
                    let text = buff.toString('ascii');
                    var obj = null
                    try {
                        obj = JSON.parse(text)
                    } catch (error) {
                        console.log("Error parsing", error)
                    }

                    if (!obj) {
                        next()
                    } else {
                       

                        tableSvc.createTableIfNotExists(config.table, function (error, result, response) {
                            if (error) {
                                return console.log("TABLE", error)
                            }

                            meta = getMetadata(obj)
                            console.log("Processing",meta.key)

                            if (meta.key) {
                                tableSvc.retrieveEntity(config.table, meta.partion, meta.key, function (error, result, response) {
                                    if (!error) {
                                        if (result) {
                                            var diff = getDiff(meta, result, obj)
                                            if (diff.update) {
                                                console.log("Updating")
                                                return tableSvc.replaceEntity(config.table, diff.dataobject,next)
                                            }
                                            else{
                                              return next()
                                          }
                                        }
                                    }
                                    var data = getData(meta, obj)
                                    console.log("Inserting")
                                    return tableSvc.insertEntity(config.table, data, next);
                                });

                            }
                        })
                    }
                })
            }

            takeOne()
        })
    });


}

