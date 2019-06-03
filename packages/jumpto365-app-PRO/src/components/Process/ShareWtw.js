import React, { Component } from 'react';
import "./process.css"
import {
  CompoundButton,DefaultButton
} from 'office-ui-fabric-react/lib/Button';

import Action from './Action'
 export default class SuggestTenantOwner extends Component {
    render() {
     var link = `#/action/sharewtw0?tenant=${this.props.tenant}`
      return (
        <Action title={this.props.title}> 
        <p>
        {this.props.description}
        </p>
        <DefaultButton
        primary={ true }
            
            href={link}
          >
            {this.props.title}
          </DefaultButton>
          </Action>
    );
  }
}

