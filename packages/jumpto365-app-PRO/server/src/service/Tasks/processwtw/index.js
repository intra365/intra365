var Services = require("../../Services")
var Usecase = require("../../Usecase")
var Audit = require("../../Audit")
var _ = require("lodash")

function ProcessServices(context, batchId, refs) {

    return new Promise(function (resolve, reject) {



        function EnsureService(serviceRef) {
            if (!serviceRef) return resolve()
            console.log(`Processing service ${serviceRef.tool}`)
            Services.ensure(context, serviceRef.tool, {
                    url: serviceRef.link,
                    comment: serviceRef.comment,
                    batchId: batchId
                }, serviceRef)
                .then((result) => {
                    var pendingUpdate = false
                    if (result.thisService.link) {
                        if (result.serviceInDb.url !== result.thisService.link) {
                            result.serviceInDb.url = result.thisService.link
                            pendingUpdate = true
                        }
                    }

                    if (result.thisService.comment) {
                        if (result.serviceInDb.comment !== result.thisService.comment) {
                            result.serviceInDb.comment = result.thisService.comment
                            pendingUpdate = true
                        }
                    }

                    if (pendingUpdate) {
                        result.serviceInDb.save((err) => {
                            if (err) return reject(err)
                            EnsureService(refs.pop())
                        })
                    } else {
                        EnsureService(refs.pop())
                    }
                })
                .catch(err => {
                    reject(err)
                })
        }
        EnsureService(refs.pop())
    })
}


function ProcessUsecases(context, batchId, refs) {

    toolCheck = (result) => {
        return new Promise(function (resolve, reject) {
            var existingtool = _.find(result.useCaseInDb.tools, {
                'name': result.thisUsecase.tool
            })

            if (!existingtool) {
                result.useCaseInDb.tools.push({
                    name: result.thisUsecase.tool,
                    rating: result.thisUsecase.rating
                })
                result.useCaseInDb.save(err => {
                    if (err) {
                        return reject(err)
                    }
                    resolve()
                })
            } else {
                resolve()
            }

        })
    }

    categoryCheck = (result) => {
        return new Promise(function (resolve, reject) {

            var category = "@Area/" + result.thisUsecase.area
            var isExistingTag = _.find(result.useCaseInDb.tags, {
                'name': category
            })

            if (!isExistingTag) {
                result.useCaseInDb.tags.push({
                    name: category
                })
                result.useCaseInDb.save(err => {
                    if (err) {
                        return reject(err)
                    }
                    resolve()
                })
            } else {
                resolve()
            }

        })
    }

    return new Promise(function (resolve, reject) {
        function EnsureUsecase(usecaseRef) {
            if (!usecaseRef) return resolve()
            var thisUsecase = JSON.parse(JSON.stringify(usecaseRef))
            console.log(`Processing usecase ${usecaseRef.subject}`)
            Usecase.ensure(context, usecaseRef.subject, {
                    batchId: batchId
                }, thisUsecase)
                .then((result) => {
                    toolCheck(result)
                        .then(() => {
                            return categoryCheck(result)
                        })
                        .then(() => {
                            EnsureUsecase(refs.pop())
                        })
                        .catch((err) => {
                            reject(err)
                        })

                })
                .catch(err => {
                    reject(err)
                })
        }
        EnsureUsecase(refs.pop())
    })
}

function Step1(context, data) {
    return new Promise(function (resolve, reject) {
        if (!data) return reject("Missing wtwdata")
        var wtwdata = null
        if (_.isArray(data) && data.length > 0) {
            wtwdata = data[0]
        } else {
            wtwdata = data
        }

        if (!wtwdata.data) return reject("Missing wtwdata.data")
        if (!wtwdata.data.areas) return reject("Missing wtwdata.data.areas")
        if (!wtwdata.data.mapping) return reject("Missing wtwdata.data.mapping")
        if (!wtwdata.data.toolList) return reject("Missing wtwdata.data.toolList")

        Audit.Append(context, "Task WTW Step 1", Audit.Categories.Batch, `Converting ${wtwdata.name}`, {})
            .then(batchRef => {

                var serviceRefs = []
                for (let index = 0; index < wtwdata.data.mapping.length; index++) {
                    serviceRefs.push(wtwdata.data.mapping[index]);
                }
                var usecaseRefs = []
                for (let index = 0; index < wtwdata.data.mapping.length; index++) {
                    usecaseRefs.push(wtwdata.data.mapping[index]);
                }
                ProcessServices(context, batchRef._id, serviceRefs)
                    .then(() => {
                        return ProcessUsecases(context, batchRef._id, usecaseRefs)
                    })
                    .then(() => {
                        return resolve()
                    })

            })
            .catch(err => {
                reject(err)
            })
    })
}

module.exports = {
    Step1
}