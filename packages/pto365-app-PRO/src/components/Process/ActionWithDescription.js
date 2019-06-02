import React, { Component } from 'react';
import {
  CompoundButton,DefaultButton
} from 'office-ui-fabric-react/lib/Button';

import Action from './Action'
export default class ActionWithDescription  extends Component {
    render() {
     var link = this.props.link
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

