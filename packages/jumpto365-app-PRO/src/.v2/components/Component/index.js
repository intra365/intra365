import React, { Component } from 'react';
import Package from '../../../../package.json'

/**
 * Describe overall purpose of the component
 *
 * @export
 * @class VersionId
 * @extends {Component}
 */
export default class VersionId extends Component { 

    /**
     * Required method return the output of the component
     *
     * @returns
     * @memberof VersionId
     */
    render() {
        return (<span>{Package.version} 
            {Package.subversion} </span>
        )
    }
}

