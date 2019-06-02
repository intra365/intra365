import React, { Component } from 'react';
import PropTypes from 'prop-types'
import PageLayoutMain from '../../_Layouts/PageLayoutMain';
import PageHeader from '../../PageHeader';
import Login  from '../../Login';
import Jumpto365App from '../../_Contexts/Jumpto365App'
import Jumpto365Service from '../../../services';
import { subscribe, Subscribe } from 'react-contextual';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import PageBody from '../../PageBody';

/**
 * Describe overall purpose of the component
 *
 * @export
 * @class _DeveloperToolsPage
 * @extends {Component}
 */

export default class _DeveloperToolsPage extends React.PureComponent {

    static propTypes  = {
      
        context : PropTypes.any
    }

    
    
    state = {}
    
    
    constructor(props) {
        super(props);
      
    }

    
    
    
 
    render() {

        let ctx = this.props.context
        return (
           
               
            <PageLayoutMain>
                <PageHeader title="*** INTERNAL DEVELOPER TOOLS ***" color="red"/>
                <PageBody>



               
                <DefaultButton text="UP" onClick={Jumpto365App.up(ctx)}/>

                {JSON.stringify(ctx)}
                </PageBody>
            </PageLayoutMain>
        
        )
        
    }
}

