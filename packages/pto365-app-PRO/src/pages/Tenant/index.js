import React, { Component } from 'react';
import _ from 'lodash'
import { MessageBar, MessageBarType } from 'office-ui-fabric-react/lib/MessageBar';
import { Link } from 'office-ui-fabric-react/lib/Link';
import { Label } from 'office-ui-fabric-react/lib/Label';

import { MessageBarButton } from 'office-ui-fabric-react/lib/Button';

import Loadable from 'react-loadable';
import  jumpto365API  from '../../api/pto365'

export default class TenantPage extends Component {

  constructor(props) {
    super(props);
    
    this.state = this.buildState(props)
    
  }
  

  componentDidMount = () => {
    switch (_.toUpper( this.state.view)) {
      case "TOOLS" : jumpto365API.Get().then().except()
        break;
    
      default:
        break;
    }

  }

  render() 
  {
 
    if (!this.state.tenant){ return (this.parameterError("Tenant is missing"))}
    if (!this.state.domain){ return (this.parameterError("Domain is missing"))}
    if (!this.state.view){ return (this.parameterError("View is missing"))}
    //if (!this.state.subject){ return (this.parameterError("Subject is missing"))}

    var language = this.state.language ? this.state.language : "en"
    
    
    const WhichToolWhen = this.LoadWhichToolWhen()
   

    return (    
      
    <div>  
      <WhichToolWhen language={language} subject={this.state.subject} changeSubject={this.changeSubject}/>
    {JSON.stringify(this.state)}
    </div>
    )
  }

  LoadWhichToolWhen(){
    return Loadable({
      loader: () => import('../WhichToolWhen'),
      render: (loaded, props) => {
        let Component = loaded.default;
        return <Component {...props}/>;
      },
      loading: (props) => {
        if (props.isLoading) {
          if (props.timedOut) {
            return <div>Loader timed out!</div>;
          } else if (props.pastDelay) {
            return <div>Loading...</div>;
          } else {
            return null;
          }
        } else if (props.error) {
          return <div>Error! Component failed to load</div>;
        } else {
          return null;
        }

      }
    });
  }
  buildState(props){
    var p = props.parms ? props.parms : []
    return {
      tenant : p[1] ? p[1] : null,
      domain : p[2] ? p[2] : null,
      view : p[3] ? p[3] : null,
      subject : p[4] ? p[4] : null,
      language : p[5] ? p[5] : null
    };

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
  
  newLocation = (location) => {
    
    var newState = this.buildState({parms:location})
    console.log("TENANT - New state",newState)
    this.setState(newState)
  }
  
  changeSubject = (parm) => {
    if (parm !== this.state.subject){
       window.location.href = `#/@/${this.state.tenant}/${this.state.domain}/${this.state.view}/${parm}`
    }
  }
  

}
  
