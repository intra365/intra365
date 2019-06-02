import React, { Component } from 'react';
import PropTypes from 'prop-types'

import PageHeader from '../../PageHeader';
import Jumpto365Service from '../../../services' 
import { ProgressIndicator } from 'office-ui-fabric-react/lib/ProgressIndicator';
import { Link } from "@reach/router"
import $ from "jquery"
import PageBody from '../../PageBody';
import {isInternalLink} from "../../_Contexts/Jumpto365App"
import "./DevPage.css"
import { PivotLinkSize, PivotLinkFormat, PivotItem, Pivot } from 'office-ui-fabric-react/lib/Pivot';

import { Panel, PanelType } from 'office-ui-fabric-react/lib/Panel';
import { CommandBar } from 'office-ui-fabric-react/lib/CommandBar';
import ReactJson from 'react-json-view'
import { DocumentConverter } from 'mammoth/lib/document-to-html';
import { Dropdown, IDropdown, DropdownMenuItemType, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
import PageLayoutMain from '../../_Layouts/PageLayoutMain';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import {apiHostGet,apiHostSet,apiVersion} from "../../../services/Jumpto365API"
import ImageEditor from '../../ImageEditor';

var Word = require("../../../utilities/Word")
/**
 * Describe overall purpose of the component
 *
 * @export
 * @class ScenarioPage
 * @extends {Component}
 */
export default class DevPage extends Component {

 
    
    constructor(props) {
        super(props);
        this.state = {}
    }

    _init = ()=>{
        this.setState({apiURL:apiHostGet(),apiVersion:{}})
       apiVersion()
       .then(apiVersion => {
           this.setState({apiVersion})
       })

    }
    componentDidMount = () =>{
        this._init()
    }   
   
    render()
    {
        var that = this
        var context = this.props.context
        var userSettings = context && context.me && context.me.JSON ? JSON.parse(context.me.JSON) : {}
        
        var isDeveloper = userSettings.developer
        if (!isDeveloper){
            return (<div>Access Denied</div> )
        }
      return (<div>
           <PageLayoutMain>
                <PageHeader title="Developer" color="#2a7ab9"/>

                 {/* <DefaultButton onClick={()=> Word.docx1("blob").then(x=>{})} text="Download Word document"></DefaultButton>  */}
                 
                 <div>
               
                 <Dropdown
          label="API:"
          selectedKey={this.state.apiURL}
          onChange={(e,item)=>{
              
            apiHostSet(item.key)
            that._init()
          }}
          placeholder="Select an API"
          options={[
            { key: 'https://api.jumpto365.com', text: 'https://api.jumpto365.com' },
            { key: 'https://api1.jumpto365.com', text: 'https://api1.jumpto365.com' },
            { key: 'divider_1', text: '-', itemType: DropdownMenuItemType.Divider },
            { key: 'http://localhost:8000', text: 'http://localhost:8000' },
          ]}
        />
                 </div>
                 <div>

                <ReactJson collapsed="1" src={this.state.apiVersion} />      
                 <ImageEditor />

                 </div>
                </PageLayoutMain>
      </div>)
    }
}

