import React, { Component } from 'react';
import PropTypes from 'prop-types'
import './toolimage.css'

/**
 * Describe overall purpose of the component
 *
 * @export
 * @class ToolImage
 * @extends {Component}
 */
export default class ToolImage extends Component { 
    state = {} 

    static propTypes  = {
        imageurl : PropTypes.string ,  // sample - remove or rename
        copyright : PropTypes.string,

    }
    

    constructor(props) {
        super(props);
    }

    /**
     * Required method return the output of the component
     *
     * @returns
     * @memberof ToolImage
     */
    render() {
        
        if (this.props.imageurl == null){return null}
        var style = {
            maxWidth:"100%", 
        
            xmargin:"8px", 
            height:"auto",
            backgroundColor : this.props.color ? this.props.color : "#ffffff"
        } 
        
        return (
        <div style={{marginBottom:"8px",marginTop:"8px" }}>
   
            <img className="toolimage" style={style} src={this.props.imageurl} />
            <div className="ms-font-s"> Copyright: {this.props.copyright}</div>
        </div>

        )
    }
}

