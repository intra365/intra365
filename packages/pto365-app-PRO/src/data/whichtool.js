//var WhichTool = require("./wtw-map.json")
var _ = require("lodash")
var jumpto365API = require("../api/pto365")

function hasTool(tools,tool){

}

/** Filter by Tool
 *     "mapping": [
        {
           "area": "Collaboration",
           "subject": "Rediger et dokument samtidig med en anden inden publisering",
           "rating": 5,
           "tool": "Projekt"
         },

 * 
 * @param {array} areas array of tools
 * @param {function} cb 
 */
function filterByTool(mapping,tools, cb) {
    var items = []

    mapping.forEach(function (item, key) {
        if (_.includes(tools, item.tool)) {
            items.push(item)
        }

    })

    //var subjects = _.groupBy(items,(i) => {return i.area})
    var subjects = _.groupBy(items, "subject")
    var keys = _.keys(subjects)
    var elements = []

    for (let index = 0; index < keys.length; index++) {
        const key = keys[index];
        elements.push({
            
            subject: key,
            tools: subjects[key]
        })
    }



    cb(null, elements)

}

/** Filter by Area
 *     "mapping": [
        {
           "area": "Collaboration",
           "subject": "Rediger et dokument samtidig med en anden inden publisering",
           "rating": 5,
           "tool": "Projekt"
         },

 * 
 * @param {array} areas array of topics
 * @param {function} cb 
 */
function filterByArea(mapping,areas, cb) {
    var items = []

    mapping.forEach(function (item, key) {
        if (_.includes(areas, item.area)) {
            items.push(item)
        }

    })

    //var subjects = _.groupBy(items,(i) => {return i.area})
    var subjects = _.groupBy(items, "subject")
    var keys = _.keys(subjects)
    var elements = []

    for (let index = 0; index < keys.length; index++) {
        const key = keys[index];
        elements.push({
            subject: key,
            tools: subjects[key]
        })
    }



    cb(null, elements)

}

function FilterByAreaV2(mapping,areas) {
    return new Promise((resolve, reject) => {

        filterByArea(mapping,areas, (err, result) => {
            if (err) return reject(err)
            resolve(result)
        });
    })
}

/** Find a tool by it's tag
 * 
 * @param {string} tag array of topics
 
 */
function toolByTag(toolList,tag) {
    var match = _.find(toolList, function (o) {
        if (!o.Tag) {
            return false
        }
        if (!tag) {
            return false
        }
        return o.Tag.toLowerCase() === tag.toLowerCase();
    })
    if (!match) {
        match = {
            tag: tag,
            Color: "grey",
            Icon: "data:image/png;base64,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",
        }
    }

    return match
}




function All(id) {

    return new Promise((resolve, reject) => {
        if (!id) return reject("Id cannot be null")

        jumpto365API
            .getFile(id)
            .then(file => {
                var wtwData = file.data
                var items = []
                if (!wtwData) return reject("Nothing found")
                if (!wtwData.mapping) return reject("Wrong format - mapping missing")
                if (!wtwData.mapping.length) return reject("Wrong format - mapping missing elements")
                wtwData.mapping.forEach(function (item, key) {
                    items.push(item)
                })

                //var subjects = _.groupBy(items,(i) => {return i.area})
                var subjects = _.groupBy(items, "subject")
                var keys = _.keys(subjects)
                var elements = []
                var lastArea = null
                for (let index = 0; index < keys.length; index++) {
                    const key = keys[index];

                    var tools = subjects[key]
                    if (tools && tools.length ){
                    var thisArea = tools[0].area
                    if (!lastArea || thisArea !== lastArea){
                        lastArea = thisArea
                        elements.push({
                            subject: thisArea,
                            isHeading : true,
                            tools: null
                        })                        
                    }
                    }

                    elements.push({
                        subject: key,
                        tools: tools,
                    })
                }

                var tools =  _.sortedUniq(wtwData.tools)
                resolve({items: elements, 
                         areas: tools,
                        tools:wtwData.toolList,
                    mapping : wtwData.mapping})
            })
            .catch(error => {
                reject(error)
            })
    })


}
module.exports = {
    filterByTool,
    filterByArea,
    FilterByAreaV2,
    toolByTag,
    All
}


