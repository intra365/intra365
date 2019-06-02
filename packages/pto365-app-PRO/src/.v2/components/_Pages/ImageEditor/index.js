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

import {itemPatch, apiHostGet,apiHostSet,apiVersion} from "../../../services/Jumpto365API"
import ImageEditor from '../../ImageEditor';
import { TextField, DefaultButton, PrimaryButton, IconNames } from 'office-ui-fabric-react';
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';




/**
 * Describe overall purpose of the component
 *
 * @export
 * @class ScenarioPage
 * @extends {Component}
 */
export default class ImageEditorPage extends Component {
    state = {}
    render()
    {

        var context = this.props.context
        var canSave = false && this.state.croppedImageUrl && this.state.name
      return (
           <PageLayoutMain>
                <PageHeader title="Image Editor" color="#2a7ab9"/>
                <div style={{display:"flex"}}>
                <div>
    <div style={{ maxWidth: '100%',width:"500px" ,margin:"8px"}}>
            <TextField  placeholder="Name" value={this.state.name} ariaLabel="Name" onChange={(e,v)=>{
                this.setState({name:v})
        
            }} />
            </div>
           
            
                 <div xstyle={{height:"500px",margin:"8px"}}>
                 {true && this.state.croppedImageUrl && (
          <img alt="Crop" style={{ maxWidth: '100%',width:"500px" }} src={this.state.croppedImageUrl} />
        )}
                 </div>
                 
                </div>
                <div  style={{ display:"flex", maxWidth: '100%',width:"100px" }}>
                
                <div style={{margin:"8px"}}>
                <PrimaryButton disabled={!canSave} text="Save (Not implemented yet)" onClick={()=>{
                    this.setState({canSave:false})
                    debugger
                    itemPatch("images",{TableKey:this.state.name,imageUrl:this.state.croppedImageUrl})
                    .then(r =>{
                        debugger
                    })


                  
                }}/>
                </div>
                <div style={{margin:"8px"}}>
                <DefaultButton text="Cancel" onClick={this.props.onCancel}/>
                </div>
            </div>
               </div>
               <div style={{margin:"8px"}}>
               <ImageEditor 
                 aspect="1" 
                 onPreview={(croppedImageUrl)=>{
                    this.setState({croppedImageUrl})
                 }}
                 
                />
</div>
                 {/* <ReactJson collapsed="1" src={this.state} />      */}
                 
                </PageLayoutMain>
      )

    }
}

