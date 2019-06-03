import React, { Component } from "react";
import { renderMegaMenu, MegaMenu,tree} from "@intra365/navigation-components";
import "./toolbar.css";
import $ from "jquery";
import { CommandBar } from "office-ui-fabric-react";
export default class SidebarNavigation extends Component {
  state = {};
  componentDidMount() {
    window.addEventListener("resize", this.updateDimensions);
    this.updateDimensions()
  }
  componentWillUnmount = () => {
    window.removeEventListener("resize", this.updateDimensions);
  };
  updateDimensions = () => {
    var win = $(window);
    var width = win.width();

    this.setState({ width });
  };

  render() {
     var navigation = this.props.navigation ? this.props.navigation : {}
    const items = tree(
      navigation.properties,
      navigation.tree,
      0,
      x => {},
      this.state.width ?this.state.width : 301
    );
    return (
      <div>     
        <CommandBar items={items}/>
        <MegaMenu width={this.state.width}  navigation={navigation}/>
      </div>
    );
  }
}
