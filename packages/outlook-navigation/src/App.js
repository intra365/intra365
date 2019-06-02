import React, { Component } from 'react'
import logo from "./logo.svg";


import "./App.css";
import Root from "./pages/Root";
import {Router} from "@reach/router"




export default class App extends Component {
  render() {
    return (
      <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
       */}
      <Router> 
        <Root path="/" default officeLoaded={this.props.officeLoaded} />
      </Router> 
    </div>
    )
  }
}

