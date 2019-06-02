

var axios = require("axios")
var github = require("octonode")
/**
 * Describe overall purpose of the service
 * 
 *   https://api.github.com/rate_limit
 *   https://api.github.com/repos/Hexatown/docs/branches/master
 *   https://api.github.com/repos/Hexatown/docs/contents/microsoft/office365/word 
 *  
 *   https://api.github.com/search/code?q=hexatown+in:file+extension:md+repo:hexatown/docs
 * 
 *
 * @export
 * @class GitHubService
 */
export default class GitHubService{ 
    client = null
    constructor() {
        
        this.client = github.client()
    }

    //static name = "Service GitHub"
    /**
     * Check is there is connection to the service
     *
     * @returns
     * @memberof GitHubService
     */
    ping = () => {
        return new Promise((resolve,reject) => {
        this.get("https://raw.githubusercontent.com/Hexatown/docs/master/index.md")
        .then(()=>{resolve(true)})
        .catch(()=>{resolve(false)})
    })
        
    }

    get = (url) => {
        return new Promise((resolve,reject) => {
        axios.get(url)
        .then(function (response) {
          resolve(response.data);
        })
        .catch(function (error) {
            reject(error);
        });
    })

    

}
}





