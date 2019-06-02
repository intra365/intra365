import React from 'react';
import  './search.css'
import _ from 'lodash'

import { CompoundButton,DefaultButton, IButtonProps } from 'office-ui-fabric-react/lib/Button';
import { ScrollablePane } from 'office-ui-fabric-react/lib/ScrollablePane';
import { Sticky, StickyPositionType } from 'office-ui-fabric-react/lib/Sticky';
var axios = require("axios")


export default class   Search extends React.Component {
  
  constructor(props) {
    super(props);

    this.state = {
      
    }
    
    
  }


  render() {

    return (
      <h1>Searching</h1>)
  }
}