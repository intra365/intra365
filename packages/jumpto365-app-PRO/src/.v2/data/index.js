
import _ from "lodash"
import TestData from "./TestData"
export default class Data {

    provider = null

    init = () => {}
    ping = (name) => {
        return true 
    }

    /**
     * 
     *
     * @memberof Data
     */
    getApp = (name) => {
        return _.find(TestData.toolsWithDetails,{name})

    }

    getUseCase = (name) => {

        
       return _.find(TestData.fasttrack,{"Title":name})

    }
    

}  
    