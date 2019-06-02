import React, { Component } from 'react';
import PropTypes from 'prop-types'
import './appicon.css'

/**
 * Describe overall purpose of the component
 *
 * @export
 * @class AppIconMini
 * @extends {Component}
 */
export default class AppIconMini extends Component { 

    static propTypes  = {
        about : PropTypes.string,
        backgroundColor :   PropTypes.string.isRequired,
        name :   PropTypes.string.isRequired,
        iconUrl :   PropTypes.string.isRequired,
        onClick : PropTypes.func
    }
    

    constructor(props) {
        super(props);
    }

    /**
     * Required method return the output of the component
     *
     * @returns
     * @memberof AppIconMini
     */
    render() {
        
        return (
        <div className="AppIconMini" style={{cursor:"pointer", backgroundColor:this.props.backgroundColor}} onClick={this.props.onClick}>
            <img src={this.props.iconUrl} className="AppIconMiniImage"/>
        </div>

        )
    }
}

