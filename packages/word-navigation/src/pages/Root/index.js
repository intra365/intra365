import React, { Component } from "react";
import ping from "@intra365/models";
import { readSharePointConfig } from "@intra365/config";
import SidebarNavigation from "../../components/SidebarNavigation";
import {loadNavigation} from "@intra365/navigation"

export default class Root extends Component {
  state = {};
  componentDidMount() {
    readSharePointConfig(
      "https://365adm.sharepoint.com/sites/Jumpto365Templates"
    )
      .then(config => this.load(config) )
      .catch(error => this.setState({ error }));
  }

  
  async load(config){
    
    if (!config) return
    
    var navigation = await loadNavigation(config.navigation)
    this.setState({navigation})
   
  //  config.navigation
  }
  render() {
    

    var loaded = this.props.officeLoaded ? "yes":"no"

    return (
      
      <div>
       <h1 onClick={()=>{
    var Office =  window.Office ? window.Office : {}
    
    var ctx = Office.context
    if (ctx.auth){
      ctx.auth.getAccessTokenAsync(function(result) {
      
      if (result.status === "succeeded") {
          var token = result.value;
          // ...
      } else {
          console.log("Error obtaining token", result.error);
      }
  })}


       }}> Root {ping.hello} office loaded ? {loaded}</h1>
        <SidebarNavigation navigation={this.state.navigation}/>

      </div>
    );
  }
}
