import React, { Component } from 'react';
import PropTypes from 'prop-types'
import PageLayoutMain from '../../_Layouts/PageLayoutMain';
import PageHeader from '../../PageHeader';
import Login  from '../../Login';
import Jumpto365App, {getSetting,setSetting,licenseInfo} from '../../_Contexts/Jumpto365App'
import Jumpto365Service, { mdPropertiesToHeader } from '../../../services';
import OfficeGraphService,{getWordMarkdown,download2} from '../../../services/OfficeGraph'
import { subscribe, Subscribe } from 'react-contextual';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import ReactJson from 'react-json-view'
import PageBody from '../../PageBody';
import { CommandBar } from 'office-ui-fabric-react/lib/CommandBar';
import ScenarioList from '../../ScenarioList';
import "./tool.css"
import { navigate ,Link } from "@reach/router"
var MarkdownParser = require("../../../utilities/MarkdownParser")
var mammoth = require("mammoth");
import { IPersonaSharedProps, Persona, PersonaSize, PersonaPresence } from 'office-ui-fabric-react/lib/Persona';
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';
import { Label } from 'office-ui-fabric-react/lib/Label';
import v1util from '../../../../util'
//import Word from '../../../utilities/Word'
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';
import { ThemeSettingName } from '@uifabric/styling';
const axios = require("axios");
const http = require("https");



class Jumpto365Module extends React.PureComponent {
state = {}
    componentDidMount = () => {
        const moduleName = "module-"+this.props.name
      //  debugger
        this.setState({moduleName,enabled:getSetting(moduleName,{enabled:false}).enabled})
    }
    render() {
        
        var that = this
        return <div style={{margin:"16px",display:"flex",alignContent:"stretch"}}>
        <div style={{marginRight:"16px",alignSelf:"flex-start"}}>
        <Toggle
        onChanged={()=>{
            
            setSetting(that.state.moduleName,{enabled: !that.state.enabled})
            that.setState({enabled: !that.state.enabled})
        }}
        checked={this.state.enabled}
        disabled={!this.props.enabled}
        xlabel="Introduction"
        onText=""
        offText=""
        style={{color:"#ffffff"}}
        onFocus={() => console.log('onFocus called')}
        onBlur={() => console.log('onBlur called')}
        /></div>
        <div style={{flex:1}}> <div className="ms-font-l"  >{this.props.text}</div>
        {<div>         <a href="javascript:void(0)" data-cb-type="checkout" data-cb-plan-id={this.props.productId} data-cb-plan-quantity="1" >Buy</a>       
        
</div> }
        <div> <Link to={`/pages/docs/features/${this.props.name}`} >Read more </Link> </div></div>
</div>
    }
}
/**
 * Describe overall purpose of the component
 *
 * @export
 * @class MetadataPage
 * @extends {Component}
 */

export default class MetadataPage extends React.PureComponent {

 
    
    
    state = {}
    
    
    
    componentDidUpdate = (previousProps, previousState) => {

       
      }

    _load = () => {
       
    }

   
    
    
    render() {

        let ctx = this.props.context

        if (!ctx ) return "No context"
   
        
        function prompt(id){
            return Jumpto365App.prompt(id,ctx)
         } 

        


        return (
           
               
            <PageLayoutMain>

               
                <PageHeader title={"Metadata"} color="#2a7ab9"/>

               
                <PageBody>
    
                <div>
                <h1>Work in progress, soon you will be able to get your jumtotag verified here</h1>
            {JSON.stringify(this.props.location && this.props.location.search ? this.props.location.search : {})}
     
</div>
 
</PageBody>
            </PageLayoutMain>
        
        )
        
    }
}

