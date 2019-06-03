import React, { Component } from 'react';
import "./process.css"

 export default class Action extends Component {
    render() {
     
      return (
        <div>
          {/* <h3>{this.props.title}</h3> */}
        <div style={{ border:"0px dashed grey",marginBottom:"20px"}}>
        <div style={{ margin:"5px"}}>
        
          {this.props.children}
          </div>
          </div>
          </div>
    );
  }
}

