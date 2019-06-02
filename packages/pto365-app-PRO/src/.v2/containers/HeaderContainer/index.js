import React, { Component } from "react";
import { navigate } from "@reach/router";
import HeaderCommandBar from "./HeaderCommandBar";
import Jumpto365App, { EditorActions } from "../../components/_Contexts/Jumpto365App";
import {
  MessageBar,
  MessageBarType
} from "office-ui-fabric-react/lib/MessageBar";

import { EventType } from "./HeaderEventType";
import _ from "lodash";

import { TooltipHost } from "office-ui-fabric-react";
import {readConfig} from "../../api/config"

const Jumpto365API = require("../../services/Jumpto365API");

export default class HeaderContainer extends React.PureComponent {
  state = { editMode: false, onSelectCelltype: false, showInfo: false };
  
  _setState = delta => {
    this.setState(delta);
  };

  cmdTranslatedVersions 
  componentDidMount() {
    this.load();
  }

  raiseError = message => {
    this._setState({ hasError: true, errorMessage: message });
  };

  clearError = () => {
    this._setState({ hasError: false, errorMessage: null });
  };
  load = () => {
    readConfig(window.location.href)
    .then(json=>{
      var config = json.result
      if (config.navigation){

        fetch(
          config.navigation
        )
          .then(data => {
            return data.json();
          })
          .then(navigation => {
            this.setState({navigation})
           
          })
          .catch(error => {
            console.log("error reading navigation", error);
            
          });
        
      }

    })
    var context = this.props.context
    if (!context) return
    
    if (context.me && context.me.tenantSettings ){
      this.setState({logoUrl:context.me.tenantSettings.logoUrl})
    }
  };

  cmdTranslatedVersions = canExecute => {
    if (canExecute) return true;

  navigate("/language")
  };
  cmdWhichToolWhen = canExecute => {
    if (canExecute) return true;

  navigate("/scenario/microsoft/microsoft365")
  };
  cmdAbout = canExecute => {
    if (canExecute) return true;

  navigate("/about")
  };

  cmdEmbed = canExecute => {
    if (canExecute) return true;

  navigate("/embed")
  };

  cmdNews = canExecute => {
    if (canExecute) return true;

    window.open("https://medium.com/jumpto365","_blank")
  };

  cmdHelp = canExecute => {
    if (canExecute) return true;

    window.open("https://jumpto365.zendesk.com/hc/en-us/sections/360003870492-Editing-and-Creating-Tables","_blank")
  };


  cmdMe = canExecute => {
    if (canExecute) return true;

  navigate("/me")
  };


  cmdDeveloper = canExecute => {
    if (canExecute) return true;

  navigate("/dev")
  };
  cmdDashboard = canExecute => {
    if (canExecute) return true;

  navigate("/dashboard")
  };

  cmdAccounts = canExecute => {
    if (canExecute) return true;

  navigate("/tenant")
  };
cmdLogin = canExecute =>{
  if (canExecute) return true;

  Jumpto365App.login();
}
cmdLogout = canExecute =>{
  if (canExecute) return true;
  Jumpto365App.logout();
}

  dispatcher = (event, id) => {
    switch (event) {
      default:
        console.log("Unsupported event", event, id);
        break;
    }
  };
  
  render() {
    return (
      <div >
      <HeaderCommandBar context={this.props.context}
        
          logoUrl={this.state.logoUrl}
          navigation={this.state.navigation}
          HeaderContainer={this}
        />
      </div>
    );
  }
}
