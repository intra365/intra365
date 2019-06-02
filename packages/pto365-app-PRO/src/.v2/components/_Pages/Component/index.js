import React, { Component } from 'react';
import PropTypes from 'prop-types'
/**
 * Describe overall purpose of the component
 *
 * @export
 * @class ToBeRenamed
 * @extends {Component}
 */
export default class ToBeRenamed extends Component { 
    state = {} 

    static propTypes  = {
        about : PropTypes.string   // sample - remove or rename
    }
    

    constructor(props) {
        super(props);
    }

    /**
     * Required method return the output of the component
     *
     * @returns
     * @memberof ToBeRenamed
     */
    render() {
        //TODO: Implement ToBeRanemd
        return (
        <div>
            ToBeRenamed
        </div>

        )
    }
}

