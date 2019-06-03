import React, { Component } from 'react';

import './App.css';
import 'office-ui-fabric-react/dist/css/fabric.css'
//import 'office-ui-fabric-react/dist/css/fabric-9.1.0.scoped.css'

import PeriodicTableofOffice365 from './pages/Beta/PeriodicTableofOffice365'
import FreeVersion from './pages/FreeVersion'
import DebugPage from './pages/Debug/debug.page'
import UseCasePage from './pages/Usecases/index'
import ProcessPage from './pages/Usecases/process'
import ServicePage from './pages/Service'
import UseCaseV2Page from './pages/UseCaseV2'
import AreaPage from './pages/Area'
import GitPage from './pages/Git'
import MsTeamsPage from './pages/msteams'
import LanguagePage from './pages/Language'
import LoginPage from './pages/Login'
import WhichToolWhenPage from './pages/WhichToolWhen'
import TenantPage from './pages/Tenant'

//import { Route,Switch,HashRouter as Router,Redirect } from 'react-router-dom'
import { initializeIcons } from '@uifabric/icons';
import  applicationConfig  from "./components/Auth/config.json"
import boyredskinhat from './boy-red-skin-hat.png'
import LeftNavigation from './components/Navigation/navigationleft-component'
import {ActionCommandBar} from './components/Navigation/navigationtop-component'
import Auth, {MsalLogin,}  from './components/Auth';
import { Fabric } from 'office-ui-fabric-react/lib/Fabric';
import About from './components/About'
import Embed from './components/Sidebar/Embed'
import _ from "lodash"

import { UserAgentApplication } from 'msal';

import {pto365Authenticate,pto365Track} from './api/pto365'
import { createContext  } from "react-broadcast"
import { connect,Provider  } from 'react-redux'
import counter from './reducer';
import PropTypes from 'prop-types'


import { MessageBarButton } from 'office-ui-fabric-react/lib/Button';
import { Link } from 'office-ui-fabric-react/lib/Link';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { MessageBar, MessageBarType } from 'office-ui-fabric-react/lib/MessageBar';
import { Dropdown, IDropdown, DropdownMenuItemType, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';

import store from "./redux/store/index";
import { Modal } from 'office-ui-fabric-react/lib/Modal';
import Search from './components/Search'
import { Panel, PanelType } from 'office-ui-fabric-react/lib/Panel';
import {Motion, spring, presets} from 'react-motion';
import { UseCases } from './components/UseCase/usecase-components'
import fasttrack from './data/fasttrack'
import { Grid, Header,Item, Image, Rail, Segment, Sticky,  Accordion, Icon } from 'semantic-ui-react'
import {Services,FastTrack} from './util/index'
import { Apps }  from './components/Fasttrack'
import ActionPage from './pages/Action'
import DebugComponenentsPage from './pages/DebugComponenents'
import { getUserAgentApplcation } from "./components/Auth"

initializeIcons();

const mapStateToProps = state => {
  return { articles: state.articles };
};

const ConnectedList = ({ articles }) => (
  <div style={{position:"absolute",zIndex:"10000",top:1,left:1}}>
    Articles
  <ul className="list-group list-group-flush">
    {articles.map(el => (
      <li className="list-group-item" key={el.id}>
        {el.title}
      </li>
    ))}
  </ul>
  </div>
);

const List = connect(mapStateToProps)(ConnectedList);

ConnectedList.propTypes = {
  articles: PropTypes.array.isRequired
};

class P1 extends Component {render(){ return (this.props.children)}}
class P2 extends Component {render(){ return (this.props.children)}}
class P3 extends Component {render(){ return (this.props.children)}}
class P4 extends Component {render(){ return (this.props.children)}}
class P5 extends Component {render(){ return (this.props.children)}}
class P6 extends Component {render(){ return (this.props.children)}}
class P7 extends Component {render(){ return (this.props.children)}}
class P8 extends Component {render(){ return (this.props.children)}}
class P9 extends Component {render(){ return (this.props.children)}}
class P10 extends Component {render(){ return (this.props.children)}}
class P11 extends Component {render(){ return (this.props.children)}}
class P12 extends Component {render(){ return (this.props.children)}}
class P13 extends Component {render(){ return (this.props.children)}}
class P14 extends Component {render(){ return (this.props.children)}}

//const { Provider, Consumer } = createContext({searchText : "" });

class App extends Component {
  clientApplication = null
  userstate = {};
  locationChanged() {
    console.log("sadfd")
  }
  constructor(props) {
    
    super(props);
    this.state = {user:null}
    this.onLogin = this.onLogin.bind(this)
    this.componentWillMount = this.componentWillMount.bind(this)
    this.clientApplication = getUserAgentApplcation("")


    var u = this.clientApplication.getUser();

    this.state = {
      location: props.location,
      searching : false
     
    }

    var w = window;
    var l = w.location

    function startswith(search, searchfor) {
      return search.substr(0 , searchfor.length) === searchfor;
  }


    var loginToken = /access_token|id_token|error/.test(l.hash) 
                   ?  l.hash 
                   : this.state.location && this.state.location.length && startsWith( this.state.location[0], "id_token=" ) 
                   ? this.state.location[0]
                   : null
      if (loginToken) {
      if (this.clientApplication) {
        this.clientApplication.handleAuthenticationResponse(loginToken)
      }
    }
  }
  onLogin = (errorDesc, token, error, tokenType) => {
    return
    // Called after loginRedirect or acquireTokenPopup
    if (tokenType == "id_token") {
      if (!this.clientApplication){
        this.clientApplication = getUserAgentApplcation("")
      }
      var user = this.clientApplication.getUser();
      
      localStorage.setItem("user",JSON.stringify(user))
      pto365Authenticate(token,()=>{})
      console.log(user)
      var userName = user.name;
  
      this.userstate = { user: user,isLoggedIn: true };
      this.callApi()
      //this.callApi2()
  
    } else {
      this.logMessage("Error during login:\n" + error);
    }
  }
  
  ptoAuthenticated = (err,result) => {
    this.setState({ptoAuth:result})
  }
  
  
  logMessage = (message) => {
    this.setState({ message: this.state.message + "\n" + message });
  }

  loginRedirect = () => {
    this.clientApplication.loginRedirect(applicationConfig.b2cScopes);
  }

  logout= () => {
    localStorage.removeItem("user","{}")
    localStorage.removeItem("userdata","{}")
    localStorage.removeItem("pto365auth")
    this.clientApplication.logout();
  }
  
  loginPopup= () => {
    this.clientApplication.loginPopup(applicationConfig.b2cScopes).then((idToken) => {
      this.clientApplication.acquireTokenSilent(applicationConfig.b2cScopes).then((accessToken) => {
        var userName = this.clientApplication.getUser().name;
        this.setState({ isLoggedIn: true });
        this.logMessage("User '" + userName + "' logged-in");
      }, (error) => {
        this.clientApplication.acquireTokenPopup(applicationConfig.b2cScopes).then((accessToken) => {
          var userName = this.clientApplication.getUser().name;
          this.setState({ isLoggedIn: true });
          this.logMessage("User '" + userName + "' logged-in");
        }, (error) => {
          this.logMessage("Error acquiring the popup:\n" + error);
        });
      })
    }, (error) => {
      this.logMessage("Error during login:\n" + error);
    });
  }

  callApi= () => {
    
    this.clientApplication.acquireTokenSilent(applicationConfig.b2cScopes).then((accessToken) => {
      this.callApiWithAccessToken(accessToken);
    }, (error) => {
      this.clientApplication.acquireTokenPopup(applicationConfig.b2cScopes).then((accessToken) => {
        this.callApiWithAccessToken(accessToken);
      }, (error) => {
        this.logMessage("Error acquiring the access token to call the Web api:\n" + error);
      });
    })
  }

  callApiWithAccessToken = (accessToken) => {
    // Call the Web API with the AccessToken
    fetch(applicationConfig.webApi, {
      method: "GET",
      headers: { 'Authorization': 'Bearer ' + accessToken }
    }).then(response => {
      
      response.text().then(text => {
        console.log(JSON.stringify(text))
        localStorage.setItem("userdata",text)
        var additionalUserData = JSON.parse(text)
        var newUser = this.state.user 

        pto365Track(newUser.displayableId,additionalUserData,function (){})
        

        
        newUser.jobTitle = additionalUserData.jobTitle
        this.setState({user:newUser})
        this.logMessage("Web APi returned:\n" + JSON.stringify(text))}
      );
    }).catch(result => {
      this.logMessage("Error calling the Web api:\n" + result);
    });
  }

  callApi2= () => {
    
    this.clientApplication.acquireTokenSilent(applicationConfig.b2cScopes).then((accessToken) => {
      this.callApiWithAccessToken2(accessToken);
    }, (error) => {
      this.clientApplication.acquireTokenPopup(applicationConfig.b2cScopes).then((accessToken) => {
        this.callApiWithAccessToken2(accessToken);
      }, (error) => {
        this.logMessage("Error acquiring the access token to call the Web api:\n" + error);
      });
    })
  }

  callApiWithAccessToken2 = (accessToken) => {
    // Call the Web API with the AccessToken
    fetch(applicationConfig.webApi2, {
      method: "GET",
      headers: { 'Authorization': 'Bearer ' + accessToken }
    }).then(response => {
      
      response.text().then(text => {
        console.log(JSON.stringify(text))
        localStorage.setItem("usergroups",text)
        this.logMessage("Web API 2 returned:\n" + JSON.stringify(text))}
      );
    }).catch(result => {
      this.logMessage("Error calling the Web api:\n" + result);
    });
  }

   componentWillMount(){
     this.setState(this.userstate)
   }

   onSearch = (text) => {
    this.setState({searching : (text !== ""),searchFor : text.toLowerCase()})
   }

// 
serviceDetailsCallback = (input) => {
  this.setState({serviceDetailsInstance:input})
}

tenantPageCallback = (input) => {
  this.setState({tenantPageInstance:input})
}

_closeModal = () => {
  this.setState({ searching: false });
}


periodicTableCallback = (input) => {
     this.setState({periodicTableInstance:input})
   }


   onItemInvoked = (item) => {
    var details = _.findIndex(fasttrack.list, function (o) {
      return o.id === item.value
    })
    if (details > -1) {
      this.setState({ "case": fasttrack.list[details] })
      if (this.state.apps) {
        this.state.apps.setState({ apps: fasttrack.list[details].Featuring })
      }
    }
  }
  fixProductivitylibraryLink = (link) => {
    return link.replace("https://fasttrack.microsoft.com/microsoft365/productivitylibrary/","https://www.microsoft.com/en-US/microsoft-365/success/productivitylibrary/")
  }
  handleUseCaseClick = (e, titleProps) => {
    const { index } = titleProps
    const { activeIndex } = this.state
    const newIndex = activeIndex === index ? -1 : index
  
    this.setState({ activeIndex: newIndex })
  }
  getDerivedStateFromProps = (nextProps, prevState) => {
    console.log("APP getDerivedStateFromProps",nextProps, prevState)
  }
  
  newLocation = (location) =>{
    console.log("APP New Location ", this.state, location)
    this.setState({location:location})
    //this.forceUpdate()
  }

  render() {
    console.log("APP RENDER",this.state.location)
    var links = _.sortBy(fasttrack.list, [function (o) { return o.Title; }]);
    var usecases = _.sortBy(fasttrack.list, [function (o) { return o.Title; }]);
  const pto365 = (match) => {
    return <PeriodicTableofOffice365 language="" sponsor=""/> 
  }

  var activeComponent = null
  var fullpage = false
  var location = this.state.location ? this.state.location : ['','','','']

  
  function locationParameter (number) {
    if (number > location.length) return null
    return location[number-1]
  }
    switch (location[0].toLowerCase() ) {
    case "debug":
      activeComponent = <DebugPage />
      break;
    case "usecases":
      activeComponent = <UseCasePage />
      break;
    case "usecase":
      activeComponent = <UseCaseV2Page />
      break;
   case "process":
      activeComponent = <ProcessPage />
      break;
    case "license":
      switch (location[1]) {
        case "BusinessEssentials":
          activeComponent = <P1><PeriodicTableofOffice365 license={location[1]} language={location[2]} ref={this.periodicTableCallback}/></P1>          
          break;
        case "BusinessPremium":
          activeComponent = <P2><PeriodicTableofOffice365 license={location[1]} language={location[2]} ref={this.periodicTableCallback}/></P2>          
          break;
        case "EnterpriseE1":
          activeComponent = <P3><PeriodicTableofOffice365 license={location[1]} language={location[2]} ref={this.periodicTableCallback}/></P3>          
          break;
          case "EnterpriseE3":
          activeComponent = <P4><PeriodicTableofOffice365 license={location[1]} language={location[2]} ref={this.periodicTableCallback}/></P4>          
          break;
          case "EnterpriseE5":
          activeComponent = <P5><PeriodicTableofOffice365 license={location[1]} language={location[2]} ref={this.periodicTableCallback}/></P5>          
          break;
          case "EnterpriseF1":
          activeComponent = <P6><PeriodicTableofOffice365 license={location[1]} language={location[2]} ref={this.periodicTableCallback}/></P6>          
          break;
          case "EduA1":
          activeComponent = <P7><PeriodicTableofOffice365 license={location[1]} language={location[2]} ref={this.periodicTableCallback}/></P7>          
          break;
          case "EduA3":
          activeComponent = <P8><PeriodicTableofOffice365 license={location[1]} language={location[2]} ref={this.periodicTableCallback}/></P8>          
          break;
          case "EduA5":
          activeComponent = <P9><PeriodicTableofOffice365 license={location[1]} language={location[2]} ref={this.periodicTableCallback}/></P9>          
          break;
          case "USGovG1":
          activeComponent = <P10><PeriodicTableofOffice365 license={location[1]} language={location[2]} ref={this.periodicTableCallback}/></P10>          
          break;
          case "USGovG3":
          activeComponent = <P11><PeriodicTableofOffice365 license={location[1]} language={location[2]} ref={this.periodicTableCallback}/></P11>          
          break;
          case "USGovG5":
          activeComponent = <P12><PeriodicTableofOffice365 license={location[1]} language={location[2]} ref={this.periodicTableCallback}/></P12>          
          break;
          case "USGovF1":
          activeComponent = <P13><PeriodicTableofOffice365 license={location[1]} language={location[2]} ref={this.periodicTableCallback}/></P13>          
          break;
        
        default:
          activeComponent = <PeriodicTableofOffice365 license={location[1]} language={location[2]} ref={this.periodicTableCallback}/>          
          break;
      }  

      
      break;
    case "msteams":
      activeComponent = <MsTeamsPage />
      break;
    case "action":
      activeComponent = <ActionPage location={location} />
      break;
    case "debugcomponents":
      activeComponent = <DebugComponenentsPage location={location} />
      break;
    case "service":
      activeComponent = <ServicePage service={location[1]} language={location[2]}  ref={this.serviceDetailsCallback}/>
      break;
    case "git":
      activeComponent = <GitPage location={location} />
      break;
    case "area":
      activeComponent = <AreaPage service={location[1]} />
      break;
    case "language":
      activeComponent = <LanguagePage />
      break;
    case "login":
      activeComponent = <LoginPage onLogin={this.loginRedirect}/>
      break;
    case "about":
      activeComponent = <div style={{margin:"10px"}}><About /></div>
      break;
    case "wtw":
      activeComponent = <WhichToolWhenPage id={locationParameter(2)} />
      break;
    case "@":
      if (this.state.tenantPageInstance){
        this.state.tenantPageInstance.newLocation(location)
      }
      activeComponent = <TenantPage parms={location} ref={this.tenantPageCallback}/>
      break;
      
    case "embed":
      activeComponent = <div style={{margin:"10px"}}><Embed /></div>
      break;
    case "office365":
    case "periodictable":
    switch (location[1]) {
      case "BusinessEssentials":
        activeComponent = <P1><PeriodicTableofOffice365 license={location[1]} language={location[2]} ref={this.periodicTableCallback}/></P1>          
        break;
      case "BusinessPremium":
        activeComponent = <P2><PeriodicTableofOffice365 license={location[1]} language={location[2]} ref={this.periodicTableCallback}/></P2>          
        break;
      case "EnterpriseE1":
        activeComponent = <P3><PeriodicTableofOffice365 license={location[1]} language={location[2]} ref={this.periodicTableCallback}/></P3>          
        break;
        case "EnterpriseE3":
        activeComponent = <P4><PeriodicTableofOffice365 license={location[1]} language={location[2]} ref={this.periodicTableCallback}/></P4>          
        break;
        case "EnterpriseE5":
        activeComponent = <P5><PeriodicTableofOffice365 license={location[1]} language={location[2]} ref={this.periodicTableCallback}/></P5>          
        break;
        case "EnterpriseF1":
        activeComponent = <P6><PeriodicTableofOffice365 license={location[1]} language={location[2]} ref={this.periodicTableCallback}/></P6>          
        break;
        case "EduA1":
        activeComponent = <P7><PeriodicTableofOffice365 license={location[1]} language={location[2]} ref={this.periodicTableCallback}/></P7>          
        break;
        case "EduA3":
        activeComponent = <P8><PeriodicTableofOffice365 license={location[1]} language={location[2]} ref={this.periodicTableCallback}/></P8>          
        break;
        case "EduA5":
        activeComponent = <P9><PeriodicTableofOffice365 license={location[1]} language={location[2]} ref={this.periodicTableCallback}/></P9>          
        break;
        case "USGovG1":
        activeComponent = <P10><PeriodicTableofOffice365 license={location[1]} language={location[2]} ref={this.periodicTableCallback}/></P10>          
        break;
        case "USGovG3":
        activeComponent = <P11><PeriodicTableofOffice365 language={location[2]} ref={this.periodicTableCallback}/></P11>          
        break;
        case "USGovG5":
        activeComponent = <P12><PeriodicTableofOffice365 language={location[2]} ref={this.periodicTableCallback}/></P12>          
        break;
        case "USGovF1":
        activeComponent = <P13><PeriodicTableofOffice365  language={location[2]} ref={this.periodicTableCallback}/></P13>          
        break;
      
      default:
        activeComponent = <PeriodicTableofOffice365 language={location[1]} ref={this.periodicTableCallback}/>          
        break;
    }  

    
    //activeComponent = <PeriodicTableofOffice365 language={location[1]} sponsor="bizzy" ref={this.periodicTableCallback}/>
    activeComponent = <PeriodicTableofOffice365 language={location[1]} sponsor="atbot"  ref={this.periodicTableCallback}/>
    break;

    default:
    activeComponent = <PeriodicTableofOffice365 sponsor="atbot" language="en" ref={this.callback}/>
      break;
  }
  var messages =     <MessageBar
  onDismiss={ 
    console.log('Message dismissed')
   }
  actions={
    <div>
      <MessageBarButton>Yes</MessageBarButton>
      <MessageBarButton>No</MessageBarButton>
    </div>
  }
  messageBarType={ MessageBarType.success }
  isMultiline={ true }
>
  Success lorem ipsum dolor sit amet. <Link href='www.bing.com'>Visit our website.</Link>
</MessageBar>
  messages = null

  if (fullpage){
    return activeComponent
  }else
  {
    if (this.state.searching){

    }


    var usecaseMarkup = null
    var NotFoundMarkup= null
    if (this.state.searching){
      const { activeIndex } = this.state

      var useCases = []
        
    
          var filteredItems =  _.filter(fasttrack.list,(i) => {return (i.Title.toLowerCase().indexOf(this.state.searchFor) > -1) || (i.Featuring.toLowerCase().indexOf(this.state.searchFor) > -1)}  )
          
          _.sortBy(filteredItems  ,"Title").map((useCase,index) => {
            useCases.push(
            <div>
            <Accordion.Title active={activeIndex === index} index={index} onClick={this.handleUseCaseClick}>
            <Icon name='dropdown' />
            {useCase.Title}<div style={{float:"right"}}>
            <Apps miniature apps={useCase.Featuring} />
            </div>
          </Accordion.Title>
          <Accordion.Content active={activeIndex === index}>
              <p>{useCase.Details}</p>
              <p><a href={useCase.Link} target="_blank">Productivity Library</a> [Microsoft]</p>
          </Accordion.Content>
    </div>)
    
          })
      
      if (useCases.length ===0) {
        NotFoundMarkup = `No match when searching for '${this.state.searchFor}'` 
      }
      
      usecaseMarkup = <div>
        
        
        {/* <Dropdown
          
          placeHolder='Select options'
          label='Industry:'
          selectedKeys={ this.state.selectedUseCaseCategories }
          onChanged={ this.onChangeselectedUseCaseCategories }
          multiSelect
          options={
            [
              { key: 'Header4', text: 'Industry', itemType: DropdownMenuItemType.Header },
              { key: 'Hospitality', text: 'Hospitality' },
              { key: 'RETAIL', text: 'Retail' },
              { key: 'HUMAN RESOURCES', text: 'Human Resources' },
              { key: 'COMMUNICATION & MEDIA', text: 'Communication & Media' },
              { key: 'Operations', text: 'Operations' },
              { key: 'FINANCIAL SERVICES', text: 'Financial Services' },
              { key: 'MANUFACTURING', text: 'Manufacturing' },
              { key: 'SALES', text: 'Sales' },
              { key: 'Marketing', text: 'Marketing' },
              { key: 'Header5', text: 'Tools', itemType: DropdownMenuItemType.Header },

            ]
          }
        /> */}
        <Accordion fluid styled>
        {useCases}
    </Accordion>
    {NotFoundMarkup}
    <div>Sources: <ul><li><a href="https://www.microsoft.com/en-US/microsoft-365/success/productivitylibrary" target="_blank">Microsoft 365 - Productivity Library</a></li></ul></div>
    </div>

    }
    
    return (
      <div className="Appxx">
        <Fabric>
    
            <div className="ActionCommandBar">
              <ActionCommandBar onSearch={this.onSearch} onLogin={this.loginRedirect} onLogout={this.logout} />
            </div>
    
            {messages}
            <Motion style={{height: spring(this.state.searching ? 80 : 0)}}>
            {({height}) =>
            <div className="searchlist" style={{xdisplay: this.state.searching ? "block" : "none",
                        backgroundColor:"#F4F4F4",
                         zIndex:10000,
                         position:"fixed",
                         height:`${height}%`,
                         width: "80%",
                         
                         left:"35px",
                         top:"40px",
                         boxShadow:"5px 10px 8px #888888",
                         borderBottomLeftRadius:"5px",
                         borderBottomRightRadius:"5px",
                         
                         }}>
                         <div
                         style={{
                           margin:"5px"
                         }}>

                         <div
                         style={{
                          backgroundColor:"#FFFFFF",
                           height:"100%",
                           width:"100%",
                           marginBottom:"-10px",
                           overflow:"auto",
                           position:"absolute"
                         }}>

             
              {usecaseMarkup}

              </div>
              </div>
              </div>
              }
              </Motion>
            {activeComponent}
            
            
            
    
        </Fabric>
      </div>
        );
        

  }


  }
}

export default App;
