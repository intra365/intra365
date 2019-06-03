import React, { Component } from "react";
import { Customizer } from "office-ui-fabric-react";
import { FluentCustomizations } from "@uifabric/fluent-theme";
import { CommandBar } from 'office-ui-fabric-react/lib/CommandBar';
import "./pivotglobal.css"
import {
  DefaultButton,
  PrimaryButton,
  Pivot,
  PivotItem
} from "office-ui-fabric-react";
export default class PivotGlobal extends Component {
    state = {}
    _fileCommands = {
        items: [
            
        {
        key: 'fileNew',
        name: "New",
        iconProps: { iconName: 'Add' },
        disabled: false,
        onClick : () => {  }
    },
    {
        key: 'fileOpen',
        name: "Open",
        iconProps: { iconName: 'OpenFolderHorizontal' },
        disabled: false,
        onClick : () => {  }
    },
    {
        key: 'fileSaveAs',
        name: "Save As",
        iconProps: { iconName: 'SaveAs' },
        disabled: false,
        onClick : () => {  }
    },
    {
        key: 'excel',
        name : "Export to Excel",
        icon: 'ExcelDocument',
        disabled: false,
        iconProps: { iconName: 'ExcelDocument' }
      }
],
overflowItems: [],
farItems: []
}

_commands = {
items: [],
overflowItems: [],
farItems: []
}
  render() {

   
    var userSettings = this.props.context && this.props.context.me && this.props.context.me.JSON ? JSON.parse(this.props.context.me.JSON) : {}
        
    var featureRoadmap = userSettings.featureRoadmap  ? true :false
    var roadMap = (
        <PivotItem
          headerText="Roadmaps"
          itemIcon="StepSharedInsert"
          itemKey="Roadmaps"
          
        />)
    
    return (
      <div className="pivotGlobal" style={{marginLeft:"-16px",marginRight:"-16px"}}>
      <div style={{paddingLeft:"16px",paddingRight:"16px"}}>
        <Customizer {...FluentCustomizations}>
          <Pivot
            selectedKey={this.state.selectedKey}
            onLinkClick={this._handleLinkClick}
            headersOnly={false}
            getTabId={this._getTabId}
          >
            <PivotItem
              headerText="Periodic Table of Office 365"
              xitemIcon="cloud"
              itemKey="Overview"
            />
             <PivotItem
              headerText="Scenarios"
              xitemIcon="ConnectContacts"
              itemKey="Tasks"
              xitemCount="0"
            >
               <CommandBar elipisisAriaLabel='More options' {...this._fileCommands} />
            </PivotItem>
            <PivotItem
              headerText="Tools"
              xitemIcon="DeveloperTools"
              itemKey="Tools"
              xitemCount="0"
              >
              <CommandBar elipisisAriaLabel='More options' {...this._fileCommands} />
           </PivotItem> 
           
            {/* {roadMap}
            */}
          </Pivot>
        </Customizer>
        </div>
        <div style={{paddingLeft:"16px",paddingRight:"16px"}}>
        
        </div>
      </div>
    );
  }
}
