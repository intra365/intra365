import React, { Component } from 'react';
import '../../App.css';
import 'office-ui-fabric-react/dist/css/fabric.min.css'
import { Modal } from 'office-ui-fabric-react/lib/Modal';
import { DefaultButton } from 'office-ui-fabric-react';
import { autobind } from 'office-ui-fabric-react/lib/Utilities';
import { action } from '@storybook/addon-actions';
import HexaCell from './HexaCell';

import services from './services.json'
class FlipSide extends Component {
    constructor(props) {
        super(props);
        this.state = {
          showModal: false,
          language : this.props.language 
        };
        this.languageSelected = this.languageSelected.bind(this);
      }
      languageSelected(lang) {
        console.log("languageSelected",lang)
        this.setState({language: lang})
      }
    render() {
      
      return (
      <div  >
        FlipSide

        <HexaCell title="Title  Title" image="Premium.png" />

      </div>  
    );
  }
}

export default FlipSide;
