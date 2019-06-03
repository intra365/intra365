import React, { Component } from 'react';

import "./nav.css"  

import PropTypes from 'prop-types'

import 'office-ui-fabric-react/dist/css/fabric.css'

import Jumpto365App,{getSetting} from "../_Contexts/Jumpto365App"
import { DefaultButton,IconButton } from 'office-ui-fabric-react/lib/Button';
import { navigate ,Location} from "@reach/router"
import { Subscribe } from 'react-contextual'
import { TooltipHost } from 'office-ui-fabric-react';


function getTenantSettings(context){
  
    
  
  var settings = {text:  Jumpto365App.prompt("64",context),homePath : context && context.isAuthenticated && context.me ? `/@/${context.me.domain}/-`:  "/",navigation : []}
  
  if (context.userId){
    //if (getSetting("module-personaldashboard",{enabled:false}).enabled) settings.homePath = `/@/${context.userId}`
}
  if (context && context.tenant && context.tenant.settings ){
      
      var data = context.tenant.settings 

      if ( data.name ) settings.text = data.name
      if (data.navigation ) settings.navigation = data.navigation

  }
  
  return settings

} 
class LinkTo extends Component { 
  
      render(){
        var backgroundColor = this.props.backgroundColor ? this.props.backgroundColor : "#e7e7e7"
        if (this.props.hide){
          return false
        }
        return (
<div className="NavLeftItem ms-font-m" >

{this.props.collapsed ?
<IconButton
            data-automation-id="upload"
            ariaDescription={this.props.text}
            title={this.props.text}
            iconProps={{ iconName: this.props.icon}} 
            disabled={this.props.disabled}
            style={{ backgroundColor:backgroundColor}}
            onClick={()=> {
              if (this.props.external){
                window.open(this.props.path,"_blank")
                return
              }
              
              navigate(this.props.path)}}
            />
:
<DefaultButton
            data-automation-id="upload"
            text={this.props.collapsed ? null : this.props.text}
            iconProps={{ iconName: this.props.icon}} hero
            disabled={this.props.disabled}
  icon={this.props.collapsed}
            style={{ backgroundColor:backgroundColor}}
            onClick={()=> {
              if (this.props.external){
                window.open(this.props.path,"_blank")
                return
              }
              
              
              navigate(this.props.path)}}
            />

}
            {this.props.children}
</div>
      )}
}


/**
 * Describe overall purpose of the component
 *
 * @export
 * @class NavigationLeft
 * @extends {Component}
 */
export default class NavigationLeft extends Component { 

    static propTypes  = {
        height : PropTypes.string,
        language: PropTypes.string  ,
        isCollapsed : PropTypes.any,
        tenantHome : PropTypes.string,
        tenantName: PropTypes.string,
        onCollaps : PropTypes.func,
        globalContext : PropTypes.object
    } 
    

    
        constructor(props) {
            super(props);
            
            this.state = this.getnewstate(Jumpto365App.getNavigationState())
 
          }
        

        getnewstate = (collapsed) => {
          return {navClass: collapsed ? "NavLeftCollapsed " : "NavLeftExpanded", isCollapsed:collapsed }
        }
        
        update = (collapsed) => {
         if (this.props.onCollaps){
           this.props.onCollaps(collapsed)
         }
         this.setState(this.getnewstate(collapsed))
          
        }

          setCollapsed = (collapsed) => {
            Jumpto365App.setNavigationState(collapsed)    
            this.update(collapsed)
          }
  
         
          render() {
            var context = this.props.globalContext
           

           
            function prompt(id){
               return Jumpto365App.prompt(id,context)
            } 
            var isAuthenticated = context ? context.isAuthenticated : false
        
            return (
              <Subscribe>{globalContext => (
                <Location>
                {({ location}) => (
                <div className={this.state.navClass} >
              
            
              <div  className="NavLeft" style={{height:this.props.height }}>
              <div className="NavContext">
              <NavigationLeftContext globalContext={globalContext} tenantName={this.props.tenantName} isCollapsed={this.state.isCollapsed}></NavigationLeftContext>
         </div>
              <div className="NavLeftGroup">
                   <NavigationLeftGroup globalContext={globalContext} isCollapsed={this.state.isCollapsed} navigation={this.props.navigation}></NavigationLeftGroup>
                   </div>
                   <div className="NavLeftSettings">
              <NavigationLeftSettings globalContext={globalContext} onCollapsed={()=>{this.setCollapsed(!this.state.isCollapsed)}} isCollapsed={this.state.isCollapsed}></NavigationLeftSettings>

            </div>
              </div>
              
              
              </div>)}
            </Location>
          )}
        </Subscribe>
            );
          }

 
}


export  class NavigationLeftContext extends Component { 
render() {
  var context = this.props.globalContext
            
  function prompt(id){
     return Jumpto365App.prompt(id,context)
  } 
  var isAuthenticated = context ? context.isAuthenticated : false

  
  var settings = getTenantSettings(context)
  return (
    <div >
    <LinkTo collapsed={this.props.isCollapsed} backgroundColor={this.props.backgroundColor} icon="Home" path={settings.homePath} text={settings.text} />
  
              

              </div>
  )

}
}


export  class NavigationLeftGroup extends Component { 


    



  render() {
    var context = this.props.globalContext
    var hasFilterMenuAction = context.hostSettings ?  context.hostSettings.hasFilterMenuAction : true
    var hasWTWMenuAction = context.hostSettings ?  context.hostSettings.hasWTWMenuAction : true
    var hasEmbedMenuAction = context.hostSettings ?  context.hostSettings.hasEmbedMenuAction : true
    var blogURL = context.hostSettings ?  context.hostSettings.blogURL : "https://medium.com/jumpto365"
    var helpURL = context.hostSettings ?  context.hostSettings.helpURL : "https://jumpto365.zendesk.com/hc/en-us"

    function prompt(id){
       return Jumpto365App.prompt(id,context)
    } 
    var isAuthenticated = context ? context.isAuthenticated : false

    var settings = getTenantSettings(context)

    if (this.props.navigation){
      settings.navigation = this.props.navigation
    }
    var isCollapsed = this.props.isCollapsed
    var backgroundColor = this.props.backgroundColor
    var tenantNavigation = settings.navigation.map(function(node,ix){
      return <LinkTo key={ix} collapsed={isCollapsed} icon={node.icon}  backgroundColor={backgroundColor} path={node.path}  text={node.text} />
    })
  
    return (
      <div >
              
              
              
              <LinkTo collapsed={this.props.isCollapsed}  icon="LocaleLanguage" path="/language" text="Translated versions"/>
              <LinkTo hide={!hasWTWMenuAction} collapsed={this.props.isCollapsed} icon="DeveloperTools"  backgroundColor={this.props.backgroundColor} path="/scenario/microsoft/microsoft365" text={prompt("33") /* Which tool when? */}/> {/* Repair is also a potential */}
             <LinkTo hide={!hasFilterMenuAction} collapsed={this.props.isCollapsed} icon="Filter" backgroundColor={this.props.backgroundColor} path="/pages/docs/features/licenseinformation"  text={prompt("27") /* by license */}/>
             <LinkTo hide={!hasEmbedMenuAction} collapsed={this.props.isCollapsed} icon="Embed" backgroundColor={this.props.backgroundColor} path="/embed"  text={prompt("14") /* by license */}/>
              <LinkTo  collapsed={this.props.isCollapsed} external icon="News" backgroundColor={this.props.backgroundColor} path={blogURL}  text="Blog"/>
              <LinkTo  collapsed={this.props.isCollapsed} external icon="Help" backgroundColor={this.props.backgroundColor} path={helpURL}  text="Help"/>

              {/* <LinkTo  collapsed={this.props.isCollapsed} external icon="Lightbulb" backgroundColor={this.props.backgroundColor} path="https://ideas2.jumpto365.com"  text="Ideas"/> */}
     
              
              {tenantNavigation}
              
        
   

            
              {(isAuthenticated && false) &&
              <LinkTo collapsed={this.props.isCollapsed} icon="ShareiOS" backgroundColor={this.props.backgroundColor} path="/upload"  text={prompt("42") /* upload */}/>
              }
              {/* <LinkTo collapsed={this.state.isCollapsed} icon="Embed" path="/embed" text={prompt("14")  }/>
            <LinkTo collapsed={this.state.isCollapsed} icon="LocaleLanguage" path="/language" text={prompt("6") }/> */}



            </div>
    )

  }
  }

  
export  class NavigationLeftSettings extends Component { 
  render() {
    var context = this.props.globalContext
    var aboutURL = context.hostSettings ?  context.hostSettings.aboutURL : "/about"

    function prompt(id){
       return Jumpto365App.prompt(id,context)
    } 
    var isAuthenticated = context ? context.isAuthenticated : false
return (

  <div >
  {/* <LinkTo collapsed={this.props.isCollapsed} icon="JoinOnlineMeeting" backgroundColor={this.props.backgroundColor} path="/pages/docs/insiders" text="Insiders" /> */}
  <LinkTo collapsed={this.props.isCollapsed} icon="Info" backgroundColor={this.props.backgroundColor} path={aboutURL} text={prompt("19")} />
  {/* <LinkTo collapsed={this.props.isCollapsed} icon="Contact" backgroundColor={this.props.backgroundColor} path="/login" text={prompt("38")}/> */}
  {/* <LinkTo collapsed={this.state.isCollapsed} icon="Settings" path="/user" text="Settings"/> */}
  {this.props.onCollapsed &&
  <i  onClick={()=>{
    this.props.onCollapsed()}} class={`NavToggler${this.props.isCollapsed ? "Collapsed": "Expanded"} ms-Icon ms-Icon--DoubleChevron${this.props.isCollapsed ? "Right": "Left"} ms-font-size-m `} style={{color:"black"}} aria-hidden="true"></i>
}
  </div>
)
  }
  }
  