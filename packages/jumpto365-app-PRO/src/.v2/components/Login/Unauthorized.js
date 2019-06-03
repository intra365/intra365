import React, { Component } from 'react';
import Util from "../../../util"
import { CompoundButton,DefaultButton, IButtonProps } from 'office-ui-fabric-react/lib/Button';
import { ProgressIndicator } from 'office-ui-fabric-react/lib/ProgressIndicator';

import { isAuthenticated,userName,userId } from '../../../components/Auth'

import ProcessPage from '../../../components/Process/ProcessPage'
import  SuggestTenantOwner from '../../../components/Process/SuggestTenantOwner'
import  SetupTenant from '../../../components/Process/SetupTenant'


export default class Unauthorized extends Component {
  constructor(props) {
    super(props);
    this.state = {
        tenant : props.tenant,
        prompts: {body : "",// "Your are the first to visit JumpTo365 from your Office 365 tenant, so you have been designated as owner. ",
               action1Title : "",// "Configure",
               action1 : "",// "We have some questions for you which impacts the experience.",
               action2Title : "",// "If you know that another one within your company should be the owner",
               action2 : "",// "Change Owner",
               buttonLogin : "Login" 

      } 
    };

  }

  componentDidMount = () => {
       Util.Prompts.get("login/unauthorized", {})
       .then(prompts => {
        this.setState({
          loaded:true,
          prompts
        })
      })
      .catch((error) => {
        this.setState({
          error
        })
      })
  }
  
  render() {
    if (this.state.error){
        return <div>{JSON.stringify(this.state.error)}</div>
    }
    if (!this.state.loaded){
        return <ProgressIndicator />
    }

    return (
      <ProcessPage title="Login" options={<DefaultButton
        primary={true}
        data-automation-id='test'
        checked={false}
        text={this.state.prompts.buttonLogin}
        onClick={this.props.onLogin}
        style={{ minWidth: '120px',margin:"10px" }}
      />}>
      <div dangerouslySetInnerHTML={{ __html: this.state.prompts.html }}></div>
        </ProcessPage>
        
        
    )
   
  }
}


