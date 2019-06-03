import React, { Component } from "react";
import PropTypes from "prop-types";

import _ from "lodash";
import { Icon } from "office-ui-fabric-react";
export default class HeaderActionButton extends Component {
    state = {}
      render()
      {
      
          return (
              <div
  
              onClick={e=>{if (this.props.onClick){
                this.props.onClick()
              }}}
              className="HeaderActionButtonIcon"
             
            >
          
                <div className="HeaderActionButtonIcon" style={{ display: "flex" ,cursor:"pointer"}}>
                <i class={` ms-Icon ms-Icon--${this.props.icon}`} aria-hidden="true"></i>
                 
                </div>
              
            </div>
          )
      }
  }