import React, { Component } from "react";
import {EditorExperienceContext} from "./EditorExperienceContext";
export default class EditorExperience extends Component {
   
    constructor(props) {
        super(props);
        this.state = {
          name: "test",
          on:false,
          toggle: this.toggle
        };
      }
      toggle = () => {
        debugger
      this.setState({ on: !this.state.on });
    }
  render() {
    
    return <EditorExperienceContext.Provider value={this.state} />;
  }
}
