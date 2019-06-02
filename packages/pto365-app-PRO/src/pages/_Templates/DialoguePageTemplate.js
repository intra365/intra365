import React, { Component } from 'react';
import "./_templates.css"
export default class DialoguePageTemplate extends Component {

  render() {
     
    var x = 1
    
      return (
      <div className="DialoguePageTemplate">
      {this.props.children}
      </div>
    ) 

  }
}

