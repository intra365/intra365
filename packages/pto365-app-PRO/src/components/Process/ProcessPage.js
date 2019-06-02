import React, { Component, Children } from 'react';
import PropTypes from "prop-types"

import './process.css'
 export default class ProcessPage extends Component {

  static propTypes = {
    /**
     *      * Actions which should render 
     */
    options: PropTypes.arrayOf(Object),
    /**
     *      Should options be visible
     */

    hideOptions: PropTypes.symbol,
    hideTitle: PropTypes.symbol,
    headerStyle : PropTypes.object,
    mastHead : PropTypes.object,
    mastHeadStyle : PropTypes.object,
    mastHeadClass : PropTypes.string
  }

    
    render() {
      var titleMarkup = this.props.hideTitle ? null : <h1 className="ms-font-xxl">{this.props.title}</h1>
      if (this.props.hideOptions){
        return (
        <div>
          <div className={this.props.mastHeadClass} style={this.props.mastHeadStyle}>{this.props.mastHead}</div>
        <div className="ProcessPageComponent"> 
      
        <div className="ms-Grid" >
          <div className="ms-Grid-row" >
          
          <div className="ms-Grid-col ms-sm12  " >
          {titleMarkup}
          {this.props.children}
          </div>
          </div>
          </div>
          </div>
          </div>
          )
          
      }
      return (
        <div>
        <div className={this.props.mastHeadClass} style={this.props.mastHeadStyle}>{this.props.mastHead}</div>

      
      <div className="ProcessPageComponent"> 

      
      <div className="ms-Grid" >
        <div className="ms-Grid-row" >
        
        <div className="ms-Grid-col ms-sm9  " >
        {titleMarkup}
        {this.props.children}
        </div>
        <div className="ms-Grid-col ms-sm3  " >
        <h2 className="ms-font-xl">Actions</h2>
        {this.props.options}
        </div>
        </div>
        </div>
        </div>
        </div>
        )
  }
}

