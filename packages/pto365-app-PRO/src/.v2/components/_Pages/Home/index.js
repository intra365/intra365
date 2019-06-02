import React, { Component } from 'react';
import PropTypes from 'prop-types'
import PageLayoutFrontpage from '../../_Layouts/PageLayoutFrontpage';
import PeriodicTableofOffice365 from '../../../../pages/Beta/PeriodicTableofOffice365';
import PageLayoutMain from '../../_Layouts/PageLayoutMain';

/**
 * Describe overall purpose of the component
 *
 * @export
 * @class HomePage
 * @extends {Component}
 */
export default class HomePage extends Component {
    state = {}
    static propTypes  = {
        license : PropTypes.string,   // sample - remove or rename
        language : PropTypes.string,

    }
    

    constructor(props) {
        super(props);

    }



    /**
     * Required method return the output of the component
     *
     * @returns
     * @memberof HomePage
     */
    render() {

        return (

        <PageLayoutMain >
              <PeriodicTableofOffice365 language={this.props.language} license={this.props.license}/>
</PageLayoutMain>

        )
    }
}

