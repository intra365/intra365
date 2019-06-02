import React, { Component } from 'react';
import ProcessPage from '../../components/Process/ProcessPage'
import SimpleReactFileUpload from '../../components/Upload'
import { Link } from 'office-ui-fabric-react/lib/Link';
import Util from "../../util"
import { ProgressIndicator } from 'office-ui-fabric-react/lib/ProgressIndicator';
import _ from 'lodash'
import { MessageBar, MessageBarType } from 'office-ui-fabric-react/lib/MessageBar';
import {
  CompoundButton,DefaultButton
} from 'office-ui-fabric-react/lib/Button';
import { isAuthenticated } from '../../components/Auth'

export default class ActionPage extends Component {
  actions = [
    {id:"configure-whichtoolwhen",path : "modules/whichtoolwhen"},
    {id:"suggesttenantowner",path : "suggest-tenant-owner"},
    {id:"setuptenant",path : "setup-tenant"},
    {id:"login",path : "login"},
  ]
  constructor(props) {
    super(props);
    var action= null
    if (props.location && props.location.length > 1){
      var parm1 = props.location[1].toLowerCase()
      var ar = parm1.split("?")

      action = ar[0]
    }
    

    this.state = {parameters : props.location,action}

  }
  
  parameterError = (errorMessage) => {
    return (
  
      <MessageBar
      onDismiss={ 
        console.log('Message dismissed')
       }
      messageBarType={ MessageBarType.error }
      isMultiline={ true }
    >
      There is an error in the address used, error message is {errorMessage}  <Link href='#'>Try this instead</Link>
    </MessageBar>
    )
  }
  
  authenticationError = (errorMessage) => {
    return (
  
      <MessageBar
      onDismiss={ 
        console.log('Message dismissed')
       }
      messageBarType={ MessageBarType.error }
      isMultiline={ true }
    >
      {errorMessage}  <Link href='/#/login'>Login</Link>
    </MessageBar>
    )
  }
  

  componentDidMount = () => {
    var actionInfo = _.find(this.actions, { 'id': this.state.action });
    if (!actionInfo) return  this.setState({
      loaded:true
    })
    var path = actionInfo.path
    Util.Prompts.get(path , {})
    .then(prompts => {
      this.setState({
        loaded:true,
        prompts
      })
    })
    .catch((error) => {
      this.setState({
        loaded:true,
        prompts : {title:path,html: error.message}
      })
    })
  }
  render() {
  if (!isAuthenticated()){ return (this.authenticationError("You need to be authenticated to use this feature"))}
  if (!this.state.parameters && this.state.parameters.length < 2){ return (this.parameterError("Action parameter is missing"))}
  if (this.state.error){
    return <div>{JSON.stringify(this.state.error)}</div>
}
if (!this.state.loaded){
    return <ProgressIndicator />
}

  
  var actionComponent = null
  if (this.state.postActionLink){
    actionComponent = <DefaultButton
    primary={ true }
    
    href={this.state.postActionLink}
  >{this.state.postActionText} </DefaultButton>
  }
  else
  {
  switch (this.state.action) {

    case "setuptenant":
    actionComponent = "Work in progress"
      break;
    case "configure-whichtoolwhen":
      actionComponent = <SimpleReactFileUpload tags={["moduleWTW"]} onUploaded={(data)=>{ 
        this.setState({"postActionLink":"/#/wtw/"+data,"postActionText":"View"})
      }} />
      break;
    case "login":
    actionComponent = "Work in progress"
      break;
      case "suggesttenantowner":
      actionComponent = "Work in progress"
      break;
        
    default:
       return (this.parameterError("Unknown action"))
  
      break;
  }
}
  
    return (    
    
      
    <ProcessPage title={this.state.prompts.title} options={actionComponent}>
        <div dangerouslySetInnerHTML={{ __html: this.state.prompts.html }}></div>
    </ProcessPage>
    
    
    )
  }
}
  
