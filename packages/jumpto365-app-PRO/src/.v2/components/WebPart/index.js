import React, { Component } from "react";

import WordDocument from "./WordDocument";
import ReactJson from "react-json-view";
import { DefaultButton } from "office-ui-fabric-react";
const Jumpto365API = require("../../services/Jumpto365API");

export default class WebPart extends Component {
  
  render() {
    
    
    return (
      <div className={this.props.className}>
        <WordDocument
         {...this.props}

        />

        {/* <ReactJson src={{state:this.state,props:this.props}} /> */}
      </div>
    );
  }
}
