import React, { Component } from 'react'
import _ from "lodash"
import { UserAgentApplication } from 'msal'

import  applicationConfig  from "./config.json"
import {
  Persona,
  PersonaSize,
  PersonaPresence
} from 'office-ui-fabric-react/lib/Persona';

export function getUserAgentApplcation   (url){
 //url = window.location.host


  
  var noneDefault = _.find(applicationConfig.environments,{url})
  
  var clientID = noneDefault ? noneDefault.clientID : applicationConfig.clientID
  
  //console.log(`Resolved url "${url}" to client id "${clientID}" ` )
  
  return new UserAgentApplication(clientID, applicationConfig.authority ,null,{redirectUri:`${url}/login`,cacheLocation: 'localStorage'})

}
export class MsalLogin extends Component {
  clientApplication = null
  constructor(props) {
    super(props);
    const url = window.location
    applicationConfig.redirectUri = url.protocol + '//' + url.host //+ '/#/login'
    var user = localStorage.getItem("user")
    this.state = {
      isLoggedIn: (user ) ? true : false,
      user : user ? JSON.parse(user) : {} ,
      message: ""
    }

    this.logMessage = this.logMessage.bind(this)
    this.loginRedirect= this.loginRedirect.bind(this)
    this.logout = this.logout.bind(this)
    this.loginPopup= this.loginPopup.bind(this)
    this.callApi = this.callApi.bind(this)
    this.callApiWithAccessToken = this.callApiWithAccessToken.bind(this)
    
    this.clientApplication = props.clientApplication;
  }



  logMessage(message) {
    this.setState({ message: this.state.message + "\n" + message });
  }

  loginRedirect() {
    this.clientApplication.loginRedirect(applicationConfig.b2cScopes);
  }

  logout() {
    localStorage.setItem("user","{}")
    this.clientApplication.logout();
  }
  
  loginPopup() {
    this.clientApplication.loginPopup(applicationConfig.b2cScopes).then((idToken) => {
      this.clientApplication.acquireTokenSilent(applicationConfig.b2cScopes).then((accessToken) => {
        var userName = this.clientApplication.getUser().name;
        this.setState({ isLoggedIn: true });
        this.logMessage("User '" + userName + "' logged-in");
      }, (error) => {
        this.clientApplication.acquireTokenPopup(applicationConfig.b2cScopes).then((accessToken) => {
          var userName = this.clientApplication.getUser().name;
          this.setState({ isLoggedIn: true });
          this.logMessage("User '" + userName + "' logged-in");
        }, (error) => {
          this.logMessage("Error acquiring the popup:\n" + error);
        });
      })
    }, (error) => {
      this.logMessage("Error during login:\n" + error);
    });
  }

  callApi() {
    
    this.clientApplication.acquireTokenSilent(applicationConfig.b2cScopes).then((accessToken) => {
      this.callApiWithAccessToken(accessToken);
    }, (error) => {
      this.clientApplication.acquireTokenPopup(applicationConfig.b2cScopes).then((accessToken) => {
        this.callApiWithAccessToken(accessToken);
      }, (error) => {
        this.logMessage("Error acquiring the access token to call the Web api:\n" + error);
      });
    })
  }

  callApiWithAccessToken(accessToken) {
    // Call the Web API with the AccessToken
    fetch(applicationConfig.webApi, {
      method: "GET",
      headers: { 'Authorization': 'Bearer ' + accessToken }
    }).then(response => {
      
      response.text().then(text => {
        console.log(JSON.stringify(text))
        localStorage.setItem("userdata",text)
        var additionalUserData = JSON.parse(text)
        
        var newUser = this.state.user 
        newUser.jobTitle = additionalUserData.jobTitle
        this.setState({user:newUser})
        this.logMessage("Web APi returned:\n" + JSON.stringify(text))}
      );
    }).catch(result => {
      this.logMessage("Error calling the Web api:\n" + result);
    });
  }

  

  render() {
    const       persona = {
      // imageUrl:  require('./NGJ.png'), 
      // imageInitials: 'NGJ',
      primaryText: this.state.user.name,
      secondaryText: this.state.user.displayableId,
      tertiaryText:  this.state.jobTitle,
      // optionalText: 'Available at 4:00pm'
    };

    var displayPersona = <div>
    
    
    <Persona
          { ...persona }
          size={ PersonaSize.size72 }
          xpresence={ PersonaPresence.away }
           />
    </div>
    var action = !isAuthenticated() ? <button onClick={() => this.loginRedirect()} >Login</button>: <button onClick={() => this.logout()} >Logout</button>
    var apiCall = (true) ?         <button onClick={() => this.callApi()} disabled={!isAuthenticated()}>Call Web API</button>
 : null
    return (
      <div >
        {displayPersona}
        {action}    
        {apiCall}
      </div>
    );
    
  
  }
}



export function isAuthenticated () {
    // Check whether the current time is past the 
    // access token's expiry time
    var userData = localStorage.getItem('user')
    if (!userData) return ""
    
    var user = JSON.parse(userData);
        
    return (user && user.name);
  }

  export function userName () {
    // Check whether the current time is past the 
    // access token's expiry time

    var userData = localStorage.getItem('user')
    if (!userData) return ""
    
    var user = JSON.parse(userData);
    
    return user ? user.name : ""
  }

  export function userId () {
    // Check whether the current time is past the 
    // access token's expiry time
    var userData = localStorage.getItem('user')
    if (!userData) return ""
    
    var user = JSON.parse(userData);
    
    return user ? user.displayableId : ""
  }

  export function RING (level) {
    return false
//    if (isAuthenticated() && (userId() === "niels@hexatown.com" || userId() === "ngjoh@nets.eu"  || userId() === "matt.wade@h3s.co"  || userId() === "mbh@samaqua.dk" )) return true
//    return false
  }


