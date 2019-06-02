import React, { Component } from 'react';
import PropTypes from 'prop-types'
import PeriodicTable from '../../PeriodicTable';
import PageLayoutMain from '../../_Layouts/PageLayoutMain';
import PageHeader from '../../PageHeader';
import $ from "jquery"
import Testdata from "../../../data/TestData"
import Jumpto365Service from '../../../services';
///Users/niels/code/pto365-app/src/.v2/data/TestData/index.js
/**
 * Describe overall purpose of the component
 *
 * @export
 * @class SharePage
 * @extends {Component}
 */
export default class SharePage extends Component {

    static propTypes  = {
        context : PropTypes.string   // sample - remove or rename
    }
    

  

    /**
     * Required method return the output of the component
     *
     * @returns
     * @memberof SharePage
     */
    render() {

        return (

            <PageLayoutMain>
                <PageHeader icon="https://jumpto365.com/resources/images/app/jumpto365-Icon-white.png" title="Share" color="#2a7ab9"/>

Here you will get a list of links which you can use for sharing


<ul>
<li><a href="/context/ai">Periodic Table of AI</a></li>
<li><a href="/context/35tiles">Periodic Table of Periodic Tables</a></li>
    </ul>
            </PageLayoutMain>


        )
    }
}

