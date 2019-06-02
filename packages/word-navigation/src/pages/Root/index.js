import React, { Component } from "react";
import ping from "@intra365/models";
import { readSharePointConfig } from "@intra365/config";
import SidebarNavigation from "../../components/SidebarNavigation";

var loadNavigation = require("@intra365/navigation").load
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
    var tree = this.state && this.state.nav ? this.state.nav.tree : []

  

    return (
      <div>
        Root {ping.hello} office loaded ? {this.props.officeLoaded}
        <SidebarNavigation navigation={this.state.navigation}/>
        {JSON.stringify(tree)}
      </div>
    );
  }
}
