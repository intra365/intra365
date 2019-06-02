import React, { Component } from 'react'
import logo from "./logo.svg";


import "./App.css";
import Root from "./pages/Root";
import {Router} from "@reach/router"

import { Fabric } from "office-ui-fabric-react/lib/Fabric";
import { Customizer } from "office-ui-fabric-react";
import { FluentCustomizations } from "@uifabric/fluent-theme";

export default class App extends Component {
  render() {
    return (
      <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
       */}
          <Fabric>
          <Customizer {...FluentCustomizations}>
      <Router> 
        <Root path="/" default officeLoaded={this.props.officeLoaded} />
      </Router> 
      </Customizer>
      </Fabric>
    </div>
    )
  }
}

