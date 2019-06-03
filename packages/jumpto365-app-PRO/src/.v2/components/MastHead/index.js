import React, { Component } from 'react';
import PropTypes from 'prop-types'
import jumpto365Logo from '../../media/Logo horizontal color - transparent background.png'
import './masthead.css'

import UserGlobalContextMenu from '../UserGlobalContextMenu';
import { Subscribe } from 'react-contextual'
import TenantMastHeadLogo from '../TenantMastHeadLogo';
import { Router, Link, Match,Location,navigate } from "@reach/router"
import { DefaultButton, PrimaryButton, Pivot,PivotItem } from 'office-ui-fabric-react';
import {Prompter} from "../Wizard"
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';
import { Customizer } from "office-ui-fabric-react";
import { FluentCustomizations } from "@uifabric/fluent-theme";
import PivotGlobal from '../PivotGlobal';
import HeaderContainer from '../../containers/HeaderContainer';



/**
 * Describe overall purpose of the component
 *
 * @export
 * @class MastHead
 * @extends {Component}
 */
export default class MastHead extends Component { 

    static propTypes  = {
        context : PropTypes.any,   // sample - remove or rename
        isMobile : PropTypes.string,
        isSlim : PropTypes.string
    }
    
    state = {}
    constructor(props) {
        super(props);
    }

    componentDidMount = ()=>{
      
      var s = sessionStorage.getItem("showByMe")
    var s = true
      this.setState({showByMe:s?false:true})
    }

    _buy = (SKU)=>{

    if  (window.Chargebee){
        var Chargebee =  window.Chargebee
        Chargebee.registerAgain();
        
        var cbInstance = Chargebee.getInstance();
        var chargebeePortalInstance = Chargebee.getInstance()
        var cart = cbInstance.getCart(); 
        var customer = {email:this.props.context ? this.props.context.userId  : "" }
       // debugger
        cart.setCustomer(customer); 

   console.log(cbInstance)
     var product = cbInstance.initializeProduct(SKU);

     
//      var cbPortal = cbInstance.createChargebeePortal();
//      cbPortal.open()
//      return 
// cbPortal.openSection({
//   sectionType: Chargebee.getPortalSections().ACCOUNT_DETAILS
// })
//      chargebeePortalInstance.open()
//      return 
     cbInstance.openCheckout({
      hostedPage: function() {
        // required
        // This function should return a promise, that will resolve a hosted page object
        // If the library that you use for making ajax calls, can return a promise,
        // you can directly return that.
        return new Promise(function(resolve, reject){
          
          // This sampe response should be fetched as a result of an ajax call
          var sampleResponse = {
            "id": "8ajOxcuyG692GDy9yjnZ2hNM1ATugOFQl",
            "type": "checkout_new",
            "url":"https://jumpto365.chargebee.com/hosted_pages/plans/entrypack?hp_opener=chargebee&hp_referrer=https://jumpto365.chargebee.com",
            "xurl": "https://yourapp.chargebee.com/pages/v3/8ajOxcuyG692GDy9yjnZ2hNM1ATugOFQl/",
            "state": "created",
            "embed": true,
            "created_at": 1515494821,
            "expires_at": 1515498421
          }
          resolve(sampleResponse);
        });
      },
      loaded: function(a,b,c) {
       // debugger
        // Optional
        // will be called once checkout page is loaded
      },
      error: function(error,a,b,c) {
        console.log("Chargebee error",error)
        debugger
        // Optional
        // will be called if the promise passed causes an error
      },
      step: function(step,a,b,c) {
        //debugger
        // Optional
        // will be called for each step involved in the checkout process
      },
      success: function(hostedPageId,a,b,c) {
        debugger
        // Optional
        // will be called when a successful checkout happens.
      },
      close: function(a,b,c) {
        debugger
        // Optional
        // will be called when the user closes the checkout modal box
      }
    })
     

}
    }

    /**
     * Required method return the output of the component
     *
     * @returns
     * @memberof MastHead
     */
    _debugger = (context) => {
      if (!context) return null
      var userSettings = context && context.me && context.me.JSON ? JSON.parse(context.me.JSON) : {}
      if (!userSettings.developer) return null
      if (context.editor && context.editor.name && context.editMode){
        return <div>{context.editor.name}</div>
      }
      return null
      return (
        <div>
          {JSON.stringify(userSettings)}
        </div>
      )
    }

   
    render() {
      var context = this.props.context ? this.props.context : {}
      var userSettings =
      context && context.me && context.me.JSON
        ? JSON.parse(context.me.JSON)
        : {};
        
     return <HeaderContainer context={context}/>

      var tenantHome = (context) => {
        return context && context.isAuthenticated && context.me ? `/@/${context.me.domain}/-`:  "/"
      }
      
     
        var styles = {
            bmBurgerButton: {
              position: 'fixed',
              width: '16px',
              height: '16px',
              left: '10px',
              top: '10px'
            },
            bmBurgerBars: {
              background: '#373a47'
            },
            bmCrossButton: {
              height: '16px',
              width: '16px'
            },
            bmCross: {
              xbackground: '#bdc3c7'
            },
            bmMenu: {
              background: '#ffffff',
              padding: '2.5em 1.5em 0',
              fontSize: '1.15em'
            },
            bmMorphShape: {
              fill: '#373a47'
            },
            bmItemList: {
              color: '#b8b7ad',
              padding: '0.8em'
            },
            bmItem: {
              display: 'inline-block'
            },
            bmOverlay: {
              background: 'rgba(0, 0, 0, 0.3)'
            }
          }
        var v21 = (context) => {
          var userSettings = context && context.me && context.me.JSON ? JSON.parse(context.me.JSON) : {}
          return userSettings.v21
        }
        var mastheadlogoclass = this.props.isMobile ? "mastheadlogo": "mastheadlogo" 
        return           <Subscribe>{context => (
          <Location>
          {({ location}) => (
            <div>
              
            <div style={{position:"relative",display:"none"}}>
            <div className="ms-Grid" style={{maxHeight:"40px",overflowY:"hidden",position:"xabsolute",top:"0px",left:"0px"}} >
                <div className="ms-Grid-row mastheadRow" >
                    <div className="ms-Grid-col ms-sm4 " >
                        
                    </div>
                    <div className="ms-Grid-col ms-sm4  " style={{textAlign:"center"}} >

                    {context.editMode &&  this.state.editorClicked  &&context.editor &&
                    <div>
                      {context.editor.tableProperties(this,()=>{this.setState({editorClicked:false})})}
                      
                      </div>
                    }
                   
                    
{/*                     
                    {this._debugger(context)

                    } */}
                    </div>
                    <div className="ms-Grid-col ms-sm4  " style={{textAlign:"right"}} >
                
                   
                                        
                    </div>
                </div>
                
            </div>
            <div  className="buyme" style={{display:this.state.showByMe ? "block" : "none"}}>
               
                <h2>Where do I find that? What is this tool good for? How do I use it?</h2>
                  <div>Stop here, we got the cure for that. The tailored version of the Periodic Table
                     makes it <b>intuitiv</b> for your users to <b>access any application</b>,
                  increase <b>awareness</b> and create <b>desire</b>. 
                  Sign up now for a 30 day free trial and try tailoring your the Periodic Table of Office 365 to the needs of your organisation/school!</div>
                <h1 style={{textAlign:"center"}}>$149/month</h1>
<div style={{marginBottom:"32px"}}> 

You get the "Entrypoint to your modern workspace" - any number of users! Accessible from any device on any location. Óne customizable table any number of editors. 
  </div>
               
               
                      
          <PrimaryButton text="Sign up"
           onClick={() => {
            this.setState({showByMe:false})
               this._buy("entrypack")
        
              }}  />
          &nbsp;                        
          <DefaultButton text="Options"
           onClick={() => {
            this.setState({showByMe:false})
               navigate("https://jumpto365.com/en")
        
              }}  />
              &nbsp;                        
          <DefaultButton text="Skip for now"
           onClick={() => {
             this.setState({showByMe:false})
             sessionStorage.setItem("showByMe",false)
              }}  />
            </div></div>
            <div style={{xmaxHeight:"40px",xoverflowY:"hidden",position:"xabsolute",top:"0px",left:"0px"}}>
            <div  className="headContainer">
            <div  className="headLeft">
            <Link to={tenantHome(context)} ><img src={context && context.tenant && context.tenant.properties && context.tenant.properties.logo ? context.tenant.properties.logo :  jumpto365Logo
} class={mastheadlogoclass}/> </Link>
                       
                        <TenantMastHeadLogo tenant={context.tenant}/>

            </div>
            
            <div className="headCenter" style={ v21(context) ? {textAlign:  "left" } : {}}>
            {v21(context) && false &&
           <PivotGlobal />
           }
            {false &&
            <Prompter context={context} /> }
            {context.editMode  &&
            <DefaultButton onClick={()=>{this.setState({editorClicked:!this.state.editorClicked})}}>Edit Table Title</DefaultButton>
              }
                             
            </div>
            <div  className="headRight">
            <UserGlobalContextMenu  isAuthenticated={context.isAuthenticated} 
                                            userName={context.userName} 
                                            userId={context.userId}  
                                            globalContext={context}
                                            isMobile={this.props.isMobile}
                                            isSlim ={this.props.isSlim}
                                            />

            </div>
            </div>
            </div>
            </div>)}
            </Location>
          )}
        </Subscribe>
    }
}

