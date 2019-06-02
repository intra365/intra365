import _ from "lodash"
import {createStore} from "react-contextual"
import {
  getUserAgentApplcation
} from '../../../../.v2/utilities/Auth'
import { jumpto365API } from "../../../../api/pto365";
import licenseNames from "./licensesnames"
import skuNames from "./skunames"
import { getWindowsVm } from "app-builder-lib/out/vm/vm";
const Jumpto365Service = require('../../../../.v2/services').default
const Jumpto365API = require('../../../../.v2/services/Jumpto365API')
const Storage =  require('../../../../.v2/services/OfficeGraph/Storage').Storage
const LICENSES = "Jumpto365Licenses"


var hasMountedPrompter = false 
var hasUnMountedPrompter = false 

export var ActionTypes = {
  "ManuallyConfirmed" : "ManuallyConfirmed",
  "EditModeOn" : "EditModeOn",
  "EditModeOff" : "EditModeOff",
  "TileEditStarted" : "TileEditStarted",
  "PublishDone" : "PublishDone",
  "EditSave": "EditSave"
}

Object.freeze(ActionTypes)
const copyArray = (array) => {
  
  const newArray = [];
  for (let i = 0; i < array.length; i++) {
    newArray[i] = array[i];
  }
  return newArray;
}


export var LINK = {
    PeriodicTableForTenant : (tenant,area)=> {return `/@/${tenant}/${area?area:"-"}`}
}



export  var EditorActions = {"Save":1, "SaveAs":2, "Publish":3,"PublishSharePoint":4}
Object.freeze(EditorActions)

export function splitHash(hash){
  var hash = hash.replace("#","")
  var p1 = hash.split("&")
  var p2 = p1.map(v=>{

    return v.split("=")
  })

  var p3 = {}
  p2.forEach(v=>{
    p3[v[0]]=v[1]
  })

  return p3
}
export function getSetting(name,defaultValue){
    
  let data = localStorage.getItem(name)

  try {
    return data ?  JSON.parse(data) : defaultValue  
  } catch (error) {
    console.log("Get settings parser error",data,error)
    return defaultValue
  }

  
  
}


export function isInternalLink(url){
return (_.startsWith(url,"https://localhost") ||
_.startsWith(url,"https://preview.app.jumpto365.com") ||
_.startsWith(url,"https://app.jumpto365.com") )
   

   

}

export function sitesRoot() {return getSetting("sitesRoot",{})}
export function drivesRoot() {return getSetting("drivesRoot",{})}
export function licenseDetails() {return getSetting("licenseDetails",null)}
export function setSetting(name,value){
  localStorage.setItem(name, JSON.stringify(value))
  
}
export function licenseInfo() {
  var licenses = licenseDetails()
  if (!licenses) return null
  

  var services = []

  licenses.forEach(sku => {
    sku.servicePlans.forEach(service => {
      if (service.provisioningStatus === "Success") {
        services.push( {
          servicePlanName: service.servicePlanName,
          appliesTo: service.appliesTo,
          sku: sku.skuPartNumber,
          skutext : skuNames[sku.skuPartNumber],
          text: licenseNames[service.servicePlanName]
        })
      }
    })
  })
  return services


}
export function messageDialogStage(context) {
  // console.log("stage",context)
  return context.stage
}

export function logAction(context,action){
  var actionLogger = context.actionLogger ? context.actionLogger : []
  actionLogger.push({actionType: action})
  context.setState({actionLogger})
  //console.log("Action logger",actionLogger)
}
export function  setEditMode(context,editMode){
  if (!context  && !context.setState) return

  if (context.editor && context.editor.setEditMode){
    context.editor.setEditMode( editMode)
  }
    
  var newState = {
    editMode
  }

  if (!editMode){
    newState.groupInFocus = null,
    newState.isGroupSelecting = false
  }
  
  context.setState(newState)
  logAction(context, editMode ? ActionTypes.EditModeOn : ActionTypes.EditModeOff)
  
}

function licenseCheck(user) {
  var thisUser = _.clone(user)
  var jumpto365Service = new Jumpto365Service()
  function doThis() {
    
    if (!thisUser) return  console.log("no current user")
      
    
    jumpto365Service.getUser(thisUser, "licenses.json")
      .then(licenses => {
          setSetting(LICENSES,licenses)
          setTimeout(doThis, 60000)
        }

      )
      .catch(e => {
        setTimeout(doThis, 60000)
      })
  }
 // doThis()
}
export default class Jumpto365App {
  /**
   * The global context
   *
   * @static
   * @memberof Jumpto365App
   */
  static init =  () => {
    return new Promise(async (resolve, reject) => {
      const url = window.location
      
      var clientApplication = getUserAgentApplcation(url.protocol + '//' + url.host)

    clientApplication.isCallback(window.location.hash)
      var user = clientApplication.getUser()
      
      var initialState = {
        user,
        language : "en", // getSetting("language","en"),
        stage : getSetting("stage",0),
        destStage : getSetting("deststage",-1),
        userName: user ? user.name : null,
        userId: user ? user.displayableId : null,
        tenant: {
          title: "global",
          text: "PREVIEW V2",
          properties: {}
        },
        isAuthenticated: user != null,
        translations : []


      }

      if (user && user.displayableId){
        licenseCheck(user.displayableId)

      if (window.zE){
        window.zE(function() {
          window.zE.identify({
          name: user.name,
          email: user.displayableId,
         // organization: 'VIP'
        });
      });
    }
  }
      if (window.Intercom){
        if (user && user.displayableId){
        window.Intercom("boot", {
            app_id: "eq6ussjb",
            email: user.displayableId,
            name: user.name
          });
        }
        }
      //var storeData = createStore(initialState)

      //TODO: Make proper implementation of context provider
      var storeData = initialState

      var jumpto365Service = new Jumpto365Service()
    var hostname = window.location.hostname
    
    var hostSettings =  await jumpto365Service.getFile("pto365", "client", "hosts", `${hostname}/index.json`)
    jumpto365Service.getFile("pto365", "client", "_data", "prompts.json")
        .then(translations => {
          storeData.translations = translations
          storeData.hostSettings = hostSettings


          // storeData.hostSettings.version = 2
          // storeData.hostSettings.rootContext = "ems"

          if (user){
            var token = localStorage.getItem("msal.idtoken")
            Jumpto365API
            .authenticate(token)  
            .then(e => {

              Jumpto365API
              .getTenant()
              .then(tenant => {
                   storeData.jumpto365API = {tenant}
                   storeData.tenant.text = tenant.displayName
                   storeData.me = tenant
                   return resolve(storeData)
                  })
              .catch(e => {
                console.warn("getTenant",e)
                return resolve(storeData)}
              )
            })
            .catch(e=>{
              console.warn("authenticate",e)
              return resolve(storeData)}
            )

            
          }
          else
          {
       
          return resolve(storeData)
        }
        })
        .catch(e => {
          reject(e)
        })

    });
  }

  /**
   * Helper functions wrapping the store
   *
   */
  static ping = (context) => {
    return context ? true : false
  }

  
  static prompt(id,context){
    if (!context || !context.translations ) return `[[NOCONTEXT:${id}]]`
    var l = _.find(context.translations,{id})
    var text = l && l[context.language] ? l[context.language] : `[[${context.language}:${id}]]`
    return text
  }
  static hasTenant(context) {
    if (!context) return false
    if (!context.tenant) return false

    return true
  }

  static tenantName = (context) => {
    if (!this.hasTenant.context) return ""
    return context.tenant.text

  }

  static tenantHome = (context) => {
    if (!this.hasTenant(context)) return "/"
    return `/@/${context.tenant.title}`

  }
  static setLanguage = (context,language) => {
    return
    if (!context) return
    context.setState({language})
    setSetting("language",language)
    
  }


  static toogleEdit = (context) => {
    if (!context) return
    setEditMode(context,!context.editMode)
    
    
    
  }

  static setNavigationState = (collapsed) => {
    setSetting("navigationCollapsed",collapsed)
    
  }

  static getNavigationState = () => {
    return getSetting("navigationCollapsed",true)
  }


static hasMessageDialog(context) {
  if (messageDialogStage(context)===99) return
  return true
}



static goingToStage(context, destStage) {
  
  setSetting("deststage", destStage)
  context.setState({destStage})
  switch (destStage) {
    case 1:

      this.login(context)

      break;

    default:
      break;
  }


}



static setHash(context, hash) {
  //debugger
  if (!context) return
  if (!hash ) return
  
  //console.log("context set hash",hash)
  //sessionStorage.setItem("hash",hash)

 var p3 = splitHash(hash)
 
//  debugger
  if (p3.error_subcode && p3.error){
    context.loginrequired = p3.error
    if (context.destStage === 1){
      setSetting("stage", 2)
      setSetting("deststage", -1)
      context.stage = 2
      context.deststage = -1
      
    }
    return
    //return context.setState(newState)
  }
 
  if (p3.id_token){
    if (context.destStage === 1){
      setSetting("stage", 1)
      setSetting("deststage", -1)
      context.stage = 1
      context.deststage = -1
      
    }
  }


}

static setGroupInFocus(context, groupName) {
  console.log("setGroupInFocus",groupName)
  if (!context || !context.setState) return

  var newState = {
    groupInFocus:groupName
  }

  if (!groupName){
    newState.isGroupSelecting = false
  }
  
  context.setState(newState)
 
}

static setIsGroupSelecting(context, on) {
  
  if (!context || !context.setState) return
  context.setState({isGroupSelecting:on})
 
}
static setStage(context, destStage) {
  
  setSetting("stage", destStage)
  if (!context && !context.setState) return
 
  context.setState({stage:destStage})
 
}

static  setGlobalState(context,state){
  if (!context && !context.setState) return
  context.setState(state)
}




static setEditor(context,editor){
  if (!context || !context.setState) return
  context.setState({editor})
  console.log("Editor setup to ",editor)

}
static unmountPrompter(context){
  
  console.log("unmountPrompter setup 1 ",context)
  if (hasUnMountedPrompter) return
  if (!context || !context.setState) return
  console.log("unmountPrompter setup 2 ",context)
  context.setState({prompter:null})
  console.log("unmountPrompter setup 3 ",context)
  hasUnMountedPrompter = true
  hasMountedPrompter = false
}

static mountPrompter(context,prompter){
  

  console.log("mountPrompter setup 1 ",context,prompter)
  if (hasMountedPrompter) return
  if (!context || !context.setState) return
  
  console.log("mountPrompter setup 2 ",context,prompter)
  context.setState({prompter: prompter})
  console.log("mountPrompter setup 3 ",context,prompter)
  hasMountedPrompter = true
  hasUnMountedPrompter = false
}

  static saveSettings(context,settings){
    return new Promise((resolve, reject) => {

      const url = window.location
      var clientApplication = getUserAgentApplcation(url.protocol + '//' + url.host)
      clientApplication.acquireTokenSilent(["https://graph.microsoft.com/user.read","https://graph.microsoft.com/files.readwrite"])
      .then(accessToken => {
        Storage(accessToken,"me").writeJson("jumpto365/settings/debug.json",{context,settings})
        .then(()=>{resolve()})
        .catch(e=> reject(e))
      })
      .catch(e=>reject(e))
    });
  }

  static login = (context) => {
    const url = window.location

    var clientApplication = getUserAgentApplcation(url.protocol + '//' + url.host)

    clientApplication.loginRedirect(["https://graph.microsoft.com/user.read"])

  }
  static loginWithFilesReadWriteMailRead = (context) => {
    const url = window.location

    var clientApplication = getUserAgentApplcation(url.protocol + '//' + url.host)

    clientApplication.loginRedirect(["https://graph.microsoft.com/user.read","https://graph.microsoft.com/files.readwrite","https://graph.microsoft.com/files.read","https://graph.microsoft.com/mail.read"])


  }
  static loginWithFilesReadWrite = (context) => {
    const url = window.location

    var clientApplication = getUserAgentApplcation(url.protocol + '//' + url.host)

    clientApplication.loginRedirect(["https://graph.microsoft.com/user.read","https://graph.microsoft.com/files.readwrite","https://graph.microsoft.com/files.read"])

  }

  static logout = () => {
    const url = window.location

    var clientApplication = getUserAgentApplcation(url.protocol + '//' + url.host)
    sessionStorage.clear()
    clientApplication.logout()

  }

  static registerAuthToken = (context, token) => {
    const url = window.location

    var clientApplication = getUserAgentApplcation(url.protocol + '//' + url.host)

    clientApplication.isCallback(token)
  }

  static up = (context) => {
    if (!context || !context.up) return
    context.up()

  }

  static emitError(self, error, header) {

    if (!error) return

    var errType = error
    var errMessage = header ? header + ": " : ""


    try {
      errMessage = errMessage + error.message
    } catch (e) {
      errMessage = errMessage + error
    }


    if (self && typeof self.setState === "function" && typeof self.state === "object") {
      var errors = Array.isArray(self.state.errors) ? copyArray(self.state.errors) : []

      errors.push(errMessage)

      self.setState({
        errors
      })
    }

    return errMessage
  }

}