import React, { Component } from 'react';
import PropTypes from 'prop-types'
import PageLayoutMain from '../../_Layouts/PageLayoutMain';
import PageHeader from '../../PageHeader';
import Login  from '../../Login';
import Jumpto365App from "../../_Contexts/Jumpto365App"
import PageBody from '../../PageBody';

/**
 * Describe overall purpose of the component
 *
 * @export
 * @class LoginPage
 * @extends {Component}
 */
export default class LoginPage extends Component {

    static propTypes  = {
        context : PropTypes.object   // sample - remove or rename
    }
    

    constructor(props) {
        super(props);
        // if (this.props.location && this.props.location.hash && this.props.context){
        //         Jumpto365App.registerAuthToken(this.props.context,this.props.location.hash)

        // }
    }


    render() {
        if (this.props.context == null){
            return null
        }
        return (
            
            <PageLayoutMain>
                <PageHeader title="Login" color="#2a7ab9"/>
                <PageBody>
                <Login context={this.props.context}/>
                </PageBody>
            </PageLayoutMain>
       
        )
    }
}

