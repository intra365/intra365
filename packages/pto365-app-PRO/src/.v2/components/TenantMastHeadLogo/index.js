import React, { Component } from 'react';
import PropTypes from 'prop-types'
/**
 * Describe overall purpose of the component
 *
 * @export
 * @class TenantMastHeadLogo
 * @extends {Component}
 */
export default class TenantMastHeadLogo extends Component { 
    state = {} 

    static propTypes  = {
        tenant : PropTypes.object.isRequired   // sample - remove or rename
    }
    

    constructor(props) {
        super(props);
    }

    /**
     * Required method return the output of the component
     *
     * @returns
     * @memberof TenantMastHeadLogo
     */
    render() {
        //TODO: Implement ToBeRanemd
        return (
        <div>
           {this.props.tenant ? 
        <img src={this.props.tenant.properties.logo} style={{height:"20px",maxWidth:"100px",maxHeight:"20px",width:"auto"}}/> : "PREVIEW VERSION 2"}
        </div>

        )
    }
}

