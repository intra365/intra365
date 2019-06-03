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
export default class AppIconLarge extends Component { 

    static propTypes  = {
        about : PropTypes.string,
        backgroundColor :   PropTypes.string.isRequired,
        name :   PropTypes.string.isRequired,
        iconUrl :   PropTypes.string.isRequired,
        onClick : PropTypes.func,
        onJump : PropTypes.func,
    }
    

    constructor(props) {
        super(props);
    }

    /**
     * Required method return the output of the component
     *
     * @returns
     * @memberof AppIconLarge
     */
    render() {
        
        return (
        <div className="AppIconLarge" style={{cursor:"pointer", backgroundColor:this.props.backgroundColor}} onClick={this.props.onClick}>
            <img src={this.props.iconUrl} className="AppIconLargeImage"/>
        </div>

        )
    }
}

