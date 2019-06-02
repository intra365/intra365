import React, { Component } from 'react';
import Util from "../../../util"
import { CompoundButton,DefaultButton, IButtonProps } from 'office-ui-fabric-react/lib/Button';
import { ProgressIndicator } from 'office-ui-fabric-react/lib/ProgressIndicator';
import { navigate ,Location} from "@reach/router"
import { isAuthenticated,userName,userId } from '../../../components/Auth'
import PropTypes from 'prop-types'

import ProcessPage from '../../../components/Process/ProcessPage'
import  SuggestTenantOwner from '../../../components/Process/SuggestTenantOwner'
import  SetupTenant from '../../../components/Process/SetupTenant'
import { jumpto365API } from '../../../api/pto365'

export default class Authorized extends Component {

  
  static propTypes  = {
    tenant : PropTypes.object.isRequired,
    upn : PropTypes.object.isRequired,
    onLogout : PropTypes.func
}


  constructor(props) {
    super(props);
    this.state = {prompts: {},tenant:{stage:"NEW"}}

  }
  componentWillMount = () => {
    navigate(`/dashboard`)
    //navigate(`/@/${this.props.upn}`)
  }
  componentDidMount = () => {

    Util.Prompts.get("login/authorized" , this.props.tenant)
    .then(prompts => {
      this.setState({
        loaded:true,
        prompts
      })
    })
    .catch((error) => {
      this.setState({
        error: error.message
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


    switch (this.state.tenant.stage.toUpperCase()) {
        case "NEW":
                var options = []
                
                options.push(<SetupTenant tenant={this.state.tenant.name} title={this.state.prompts.action1title} description={this.state.prompts.action1} />)
                options.push(<SuggestTenantOwner tenant={this.state.tenant.name} title={this.state.prompts.action2title} description={this.state.prompts.action2} />)

                return <ProcessPage title={this.state.prompts.title} options={options}>
                
                <div dangerouslySetInnerHTML={{ __html: this.state.prompts.html }}></div>
                </ProcessPage>
            
        break;
              
        default:
            return null
            break;
    }
  }
}

