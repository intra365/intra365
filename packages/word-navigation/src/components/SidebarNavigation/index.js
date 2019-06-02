import React, { Component } from "react";
import { renderMegaMenu,MegaMenu } from "@intra365/navigation-components";

export default class SidebarNavigation extends Component {
  render() {
      var navigation = this.props.navigation
    return <div><MegaMenu /></div>;
  }
}
