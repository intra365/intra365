import React, { Component } from 'react';
import { UserAgentApplication } from 'msal';
import PropTypes from 'prop-types'

import { isAuthenticated } from '../../../components/Auth'
import  applicationConfig  from "../../../components/Auth/config.json"
import {pto365Authenticate,pto365Track} from '../../../api/pto365'
import Authorized from './Authorized'
import Unauthorized from './Unauthorized'
import DialoguePageTemplate  from '../../../pages/_Templates/DialoguePageTemplate'
import { getUserAgentApplcation } from "../../utilities/Auth"
import Jumpto365App from '../_Contexts/Jumpto365App'
import { navigate } from '../../../../node_modules/@reach/router/lib/history';

export default class Login extends Component {


  static propTypes  = {
    context : PropTypes.object,
    onLogin : PropTypes.func
   
}
componentDidMount = () => {
//   if (this.props.context && this.props.context.isAuthenticated && this.props.context.userId){
//   navigate(`/@/${this.props.context.userId}`)
// }
}

  render() {

    if (!this.props.context) return "Missing context"
    
    if (this.props.context.isAuthenticated){
      return (<DialoguePageTemplate><Authorized tenant={this.props.context.tenant} upn={this.props.context.userId} /></DialoguePageTemplate>)
    }else{
      return (<DialoguePageTemplate><Unauthorized onLogin={()=>{ Jumpto365App.login(this.props.context)}} /></DialoguePageTemplate>)
    }

  }
}

