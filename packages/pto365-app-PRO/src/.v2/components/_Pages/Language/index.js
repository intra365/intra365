import React, { Component } from 'react';
import PropTypes from 'prop-types'
import PageLayoutMain from '../../_Layouts/PageLayoutMain';
import PageHeader from '../../PageHeader';
import Languages from '../../../../components/Sidebar/Languages';
import Jumpto365App from '../../_Contexts/Jumpto365App';
import PageBody from '../../PageBody';

/**
 * Describe overall purpose of the component
 *
 * @export
 * @class ScenarioPage
 * @extends {Component}
 */
export default class LanguagePage extends Component {

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
     * @memberof ScenarioPage
     */
    render() {
        var context = this.props.globalContext
        function prompt(id){
            return Jumpto365App.prompt(id,context)
         } 
        
        return (

            <PageLayoutMain>
                <PageHeader title="Translated versions" color="#2a7ab9"/>
                <PageBody>
                <Languages />
                </PageBody>
            </PageLayoutMain>

        )
    }
}

