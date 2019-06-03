import React, { Component } from "react";

import Layout2Columns from "./Layout2Columns";
import ReactJson from "react-json-view";
import { DefaultButton } from "office-ui-fabric-react";
const Jumpto365API = require("../../services/Jumpto365API");

export default class Page extends Component {
  
  render() {
    
    
    return (
      <div>
        <Layout2Columns
          {...this.props.tile}
          registerTableContainer = {this.props.registerTableContainer}
          associateTileWithUrl={this.props.associateTileWithUrl}
          keyName={this.props.keyName}
          domain={this.props.domain}
          tag={this.props.tag}
          width={this.props.width}
          height={this.props.height}
          relations={this.props.relations}
          isRoot={this.props.isRoot}
          onTileClicked={this.props.onTileClicked}
          onTableFullScreen={this.props.onTableFullScreen}
          interactMode={this.props.interactMode}
          registerEditor={this.props.registerEditor}
          onFileDropped={this.props.onFileDropped}
        />

        {/* <ReactJson src={{state:this.state,props:this.props}} /> */}
      </div>
    );
  }
}
