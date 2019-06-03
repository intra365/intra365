import React, { Component } from 'react';
import '../../App.css';
import 'office-ui-fabric-react/dist/css/fabric.min.css'
import { Modal } from 'office-ui-fabric-react/lib/Modal';
import { DefaultButton } from 'office-ui-fabric-react';
import { autobind } from 'office-ui-fabric-react/lib/Utilities';
import {
  IPersonaProps,
  Persona,
  PersonaSize,
  PersonaPresence
} from 'office-ui-fabric-react/lib/Persona';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
  
class Feedback extends Component {
    constructor(props) {
        super(props);
        this.state = {
          showModal: false,
          language : this.props.language 
        };
        this._showModal =  this._showModal.bind(this);
        this._closeModal = this._closeModal.bind(this);
        this.languageSelected = this.languageSelected.bind(this);
      }
      _showModal() {
        this.setState({ showModal: true });
      }
    
      _closeModal() {
        this.setState({ showModal: false });
      }
      languageSelected(lang) {
        console.log("languageSelected",lang)
        this.setState({language: lang})
      }
    render() {
      const       mattPersona = {
          imageUrl: require('./MW.png'),
          imageInitials: 'MW',
          primaryText: 'Matt Wade',
          secondaryText: 'Microsoft MVP, Office 365 Consultant',
          tertiaryText: 'H3 Solutions, Inc',
          // tertiaryText: 'In a meeting',
          // optionalText: 'Available at 4:00pm'
        };
        const       nielsPersona = {
            imageUrl:  require('./NGJ.png'),
            imageInitials: 'NGJ',
            primaryText: 'Niels Gregers Johansen',
            secondaryText: 'Technical Lead, Collaboration Tools, ',
            tertiaryText: 'Nets A/S',
            // optionalText: 'Available at 4:00pm'
          };
    
      return (
      <div  >
         <div className='ms-PersonaExample'>
        <Persona
          { ...mattPersona }
          size={ PersonaSize.size72 }
          xpresence={ PersonaPresence.away }
          onRenderSecondaryText={ this._onRenderSecondaryText }
        />
        <Persona
          { ...nielsPersona }
          
          size={ PersonaSize.size72 }
          xpresence={ PersonaPresence.away }
          onRenderSecondaryText={ this._onRenderSecondaryText }
        />
      </div>
        <Modal
          isOpen={ this.state.showModal }
          onDismiss={ this._closeModal }
          isBlocking={ false }
          containerClassName='ms-modalExample-container InfoBox'
        >
          <div className='ms-modalExample-header InfoProductTitle' style={{backgroundColor:"#2B579A"}} >
         <div style= {{"margin-left":"10px"}}>
          Feedback </div>
          </div>
            
        </Modal>

      </div>  
    );
  }
}

export default Feedback;
