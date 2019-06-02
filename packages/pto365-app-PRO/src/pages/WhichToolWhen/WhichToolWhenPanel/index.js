import React, { Component } from 'react';

import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { Panel, PanelType } from 'office-ui-fabric-react/lib/Panel';

import PropTypes from "prop-types"


export default class WhichToolWhenPanel extends Component {
  static propTypes = {
    /**
     * current tool name 
     */
    item: PropTypes.string.isRequired,
    details : PropTypes.string,
    isOpen : PropTypes.bool
  }

  constructor(props) {
    super(props);
    this.state  = {isPanelVisible: props.isOpen , item: props.item}

  }

  shouldComponentUpdate= (newProps,oldState,c) => {
    var doUpdate = false
    if (this.state.isPanelVisible !== newProps.isOpen){
    this.setState({"isPanelVisible":newProps.isOpen})
    doUpdate = true
  }
  // if (oldState.item !== newProps.item){
  //   this.setState({"item":newProps.item})
  //   doUpdate = true
  // }
    return doUpdate
  }
  componentDidUpdate = (a,b,c) => {
    console.log(a,b,c)
  }
  getSnapshotBeforeUpdate  (prevProps, prevState,c) {
    console.log(prevProps, prevState,c)
    return null;
  }
  _onClosePanel = () => {
    
    this.setState({ isPanelVisible: false });
  };
  _onRenderFooterContent = () => {
    return (
      <div>
        {/* <PrimaryButton onClick={this._onClosePanel} style={{ marginRight: '8px' }}>
          Save
        </PrimaryButton> */}
        <DefaultButton onClick={this._onClosePanel}>Close</DefaultButton>
      </div>
    );
  };
  render() {
    if (!this.state) return null

  return (

<Panel   isBlocking={false}
          isOpen={ this.state.isPanelVisible }
          type={ PanelType.medium }
          onDismiss={this._onClosePanel}
          headerText={!this.state ? "" : this.state.title}  
          closeButtonAriaLabel='Close'
          onRenderFooterContent={this._onRenderFooterContent}
        >
        {JSON.stringify(this.state.item)}
        </Panel>



    );

  }
}

