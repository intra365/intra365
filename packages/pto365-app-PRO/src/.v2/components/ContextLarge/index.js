import React, { Component } from 'react';
import PropTypes from 'prop-types'
import PeriodicTableofOffice365 from '../../../pages/Beta/PeriodicTableofOffice365';
/**
 * Describe overall purpose of the component
 *
 * @export
 * @class ContextLarge
 * @extends {Component}
 */
export default class ContextLarge extends Component {

    static propTypes  = {
        about : PropTypes.string,   // sample - remove or rename
        /** iso language code - eg da for danish. */
        language : PropTypes.string   // sample - remove or rename
    }
    

    constructor(props) {
        super(props);
    }

    /**
     * Required method return the output of the component
     *
     * @returns
     * @memberof ContextLarge
     */
    render() {

        return (
            <PeriodicTableofOffice365/>
        )
    }
}

