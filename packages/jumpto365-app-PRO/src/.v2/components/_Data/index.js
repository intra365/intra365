
import _ from "lodash"
import TestData from "../../data/TestData"
export default class Data {

    provider = null

    init = () => {}

    /**
     * 
     *
     * @memberof Data
     */
    getApp = (name) => {
        var searchFor = name.toLowerCase()
       // console.log("Tool lookup",name)
        var result =  _.find(TestData.toolsWithDetails,{name:searchFor})
        return result
    }
    
 
}  
    