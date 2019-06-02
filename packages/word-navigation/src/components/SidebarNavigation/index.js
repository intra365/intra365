import React, { Component } from "react";
import { renderMegaMenu, MegaMenu } from "@intra365/navigation-components";
import "./toolbar.css";
import $ from "jquery";
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

    return (
      <div>     
        <div onClick={()=>window.Office.context.ui.displayDialogAsync("https://localhost:3001",{height:500,width:800})}>Dialog </div>
        <MegaMenu width={this.state.width}  navigation={this.props.navigation}/>
      </div>
    );
  }
}
