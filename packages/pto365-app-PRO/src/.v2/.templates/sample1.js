import React, { Component } from 'react';
import ComponentThis from './ComponentThis'
/**
 * Sample
 *
 * @export
 * @class ToBeRenamed
 * @extends {Component}
 */
export default class SampleComponent extends Component {

    constructor(props) {
        super(props);
    }

    /**
    
     * @returns output of the component
     
     */
    render() {

        return (<ComponentThis about="Hej"   />


        )
    }
}

