import React, { Component } from "react";
import ping from "@intra365/models";
import { readSharePointConfig } from "@intra365/config";
import SidebarNavigation from "../../components/SidebarNavigation";
import { load as loadNavigation } from "@intra365/navigation";

export default class Root extends Component {
  state = {};
  componentDidMount() {
    readSharePointConfig(
      "https://365adm.sharepoint.com/sites/Jumpto365Templates"
    )
      .then(config => this.load(config))
      .catch(error => this.setState({ error }));
  }

  async load(config) {
    if (!config) return;

    loadNavigation(config.navigation)
      .then(navigation => {
        this.setState({ navigation: navigation.result });
        
      })
      .catch(error => {
        this.setState({ error });
        
      });
  }
  render() {
    var loaded = this.props.officeLoaded ? "yes" : "no";

    return (
      <div>
        <SidebarNavigation navigation={this.state.navigation} />
      </div>
    );
  }
}
