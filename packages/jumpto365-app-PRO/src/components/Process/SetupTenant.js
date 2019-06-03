import React, { Component } from 'react';
import "./process.css"
import Action from './Action'

import {
  CompoundButton,DefaultButton
} from 'office-ui-fabric-react/lib/Button';

 export default class SetupTenant extends Component {
    render() {
     var link = `#/action/setuptenant?tenant=${this.props.tenant}`
      return (
        <Action title={this.props.title}> 
        <p>
          {this.props.description}
          </p>
        <DefaultButton
            primary={ true }
            xsecondaryText="hello"
            href={link}
          >
            {this.props.title}
          </DefaultButton>
          </Action>
    );
  }
}

