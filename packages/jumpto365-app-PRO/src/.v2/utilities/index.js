//TODO: Move to seperate private package

import {
    DropdownMenuItemType
} from 'office-ui-fabric-react/lib/Dropdown';
import _ from "lodash"


export default class Utiltity {

    static key(name){
        if (!name) return ""
        return name
        //return _.replace(name," ","-").toLowerCase()
        
    }

    static ScenarioFromProp(prop){
        if (!prop) return {}
        var s = prop.split(":")
        if (s.length < 4) return {}
        return {
            domain : s[0],
            technology : s[1],
            subject : s[2],
            view : s[3],
        }

        
    }

    static LinkToolScenario(tool,domain,area,subject,technology,view) {
        
        return `/tool/${tool}/scenario/${this.key(domain)}:${this.key(technology)}:${this.key(subject)}:${this.key(view)}`
    }

    static LinkUsecase(subject,domain,technology,view) {
        
        return `/usecase/${subject}/scenario/${technology}/${domain}/${view}`
    }


    static ParametersFromSearch(s){
        if (!s) return {}
        var p = {}
        var questionMarkPos = s.indexOf("?")
        var query = s.substring(questionMarkPos+1)
        var params = query.split("&")
        for (let index = 0; index < params.length; index++) {
            var pair = params[index].split("=")
            p[pair[0]] = pair[1] ? pair[1] : ""
            
        }
        return p
    }

    /**
     * Flat copy of an array
     *
     * @param {*} array
     * @returns
     */
    static CopyArray(array) {
        const newArray = [];
        for (let i = 0; i < array.length; i++) {
            newArray[i] = array[i];
        }
        return newArray;
    }

    /**
     * Return options array based on array of keys
     *
     * @param {*} keys
     * @param {*} heading
     * @param  {*} propertyName Name of property in target area
     * @returns
     */

    static BuildOptions(keys, heading, propertyName) {
        if (!keys) return []
        var options = []
        options.push({
            key: `Header-${propertyName}`,
            text: heading,
            itemType: DropdownMenuItemType.Header
        })
        for (let index = 0; index < keys.length; index++) {
            const key = keys[index];
            options.push({
                key: `${propertyName}:${key}`,
                text: key
            })
        }
        return options
    }

   /** 
     * 
       * Ensure that items in array have a name and a key property
     *
     * @param {*} tools
     * @param {*} resolver - a function taking tool[x].name as input and return something which will be stored in .data 
    */ static ResolveTools(tools,resolver){
        if (!tools) return []
        var x = 0
        return tools.map(item => {
            x++
            item.data = resolver(item.name.toLowerCase())
            item.key = x
            return item

        })

    }
    
    /** 
     * 
       * Ensure that items in array have a name and a key property
     *
     * @param {*} inputArray
     * @param {*} propertyName 
    */
    static EnsureNameAndApplyKeyValue (inputArray,sourceProperty){
        if (!inputArray) return []
        var x = 0
        return inputArray.map(item => {
            x++
            if (!item.name) {
                item.name = item[sourceProperty]
            }
            item.key = x
            return item

        })
    }

     /** 
     * 
       * Ensure that items in array have a href and a icon
     *
     
    */
   static MakeCommandBarItems (inputArray,hrefProperty,iconProperty){
    if (!inputArray) return []
    var x = 0
    return inputArray.map(item => {
        x++
        if (!item.href) {
            item.href = item[hrefProperty]
        }if (!item.icon) {
            item.icon = "Info"
            if (iconProperty){
               item.icon = item[iconProperty]
            }
        }
        
        return item

    })
}
    
    static GroupTasksBySubject(items) {
        if (!items) return []
        var result = []
        var lastSubject = null
        var newItem = null
        for (let index = 0; index < items.length; index++) {
            const item = items[index];
            if (!lastSubject) {
                lastSubject = item.subject
                newItem = {
                    subject: item.subject,
                    area: item.area,
                    path : item.path,
                    tools: [{
                        rating: item.rating,
                        name: item.tool
                    }]
                }
            } else {
                if (lastSubject === item.subject) {
                    newItem.tools.push({
                        rating: item.rating,
                        name: item.tool
                    })
                } else {
                    result.push(newItem)
                    lastSubject = item.subject
                    newItem = {
                        subject: item.subject,
                        path : item.path,                        
                        area: item.area,
                        tools: [{
                            rating: item.rating,
                            name: item.tool
                        }]
                    }
                }
            }

        }
        result.push(newItem)

        return result
    }


    /**
     * Filter bases on keys words or search terms
     *
     * @static
     * @param {*} items
     * @param {*} filters
     * @param {*} searchWords
     * @returns Array of items 
     * @memberof Utiltity
     */
    static FilterItems(items, filters, searchWords) {
        return new Promise((resolve, reject) => {
            if (!items) return resolve([])
            var results = []
            items.forEach(item => {
                var include = false
                if (!filters || filters.length === 0) {
                    include = true
                } else {
                    for (let index = 0; index < filters.length; index++) {
                        const filter = filters[index];
                        var pair = filter.split(":")
                        var property = item[pair[0]]
                        if (property) {
                            if (Array.isArray(property)) {
                                for (let propertyItemIndex = 0; propertyItemIndex < property.length; propertyItemIndex++) {
                                    const element = property[propertyItemIndex];
                                    var key = pair[1].toUpperCase()

                                    var match = element.name ? element.name.toUpperCase() : ""
                                    if (match === key) {
                                        include = true
                                    }
                                }


                            } else {
                                var key = pair[1].toUpperCase()

                                var match = property ? property.toUpperCase() : ""
                                if (match === key) {
                                    include = true
                                }

                            }

                        }
                    }


                }

                if (searchWords && searchWords !== '') {
                    var searchFor = searchWords.toUpperCase()
                    if (include && item.subject) {
                        var searchIn = item.subject.toUpperCase()
                        var pos = searchIn.indexOf(searchFor)
                        if (pos > -1) {
                            include = true
                        } else {
                            include = false
                        }
                    }
                }
                if (include) {
                    results.push(item)
                }
            });

            return resolve(results)
        });




    }
}