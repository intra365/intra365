import React, { Component } from "react";

import { CommandBar } from "office-ui-fabric-react/lib/CommandBar";
import { Pivot, PivotItem } from "office-ui-fabric-react/lib/Pivot";
import { Label } from "office-ui-fabric-react/lib/Label";
import {
  Dropdown,
  IDropdown,
  DropdownMenuItemType,
  IDropdownOption
} from "office-ui-fabric-react/lib/Dropdown";
import "./webpart.css"

export default class WebPartEditorCommandBar extends Component {
  emit = (e, cmd) => {
    var key = cmd.key;
    if (!this.props.WebPartContainer) return;
    if (this.props.WebPartContainer[key]) {
        console.log("Emitting",key)
      this.props.WebPartContainer[key]();
    }
  };

  isDisabled = key => {
    if (!this.props.WebPartContainer) return true;
    if (this.props.WebPartContainer[key]) {
      return !this.props.WebPartContainer[key](true);
    }
  };

  newItem = (key, name, iconName) => {
    
    return {
      key,
      name,
      iconProps: { iconName },
      disabled:this.isDisabled(key) ,
      onClick: this.emit
    };
  };
  webPartFilter = {
    key: "cmdWebPartFilters",
    name: "Filters",
    hidden: true,
    disabled: false,
    onClick: this.emit,
    onRender: (a, b, c) => {
      return (
        <div style={{ display: "flex" }}>
          {/* <div>
              <Label>Filter</Label>
            </div> */}
          <div>
            <Dropdown
              style={{ margin: "8px", minWidth: "200px" }}
              placeholder="Select an Option"
              ariaLabel="Basic dropdown example"
              options={[
                {
                  key: "Header",
                  text: "Actions",
                  itemType: DropdownMenuItemType.Header
                },
                { key: "A", text: "Option a", title: "I am option a." },
                { key: "B", text: "Option b" },
                { key: "C", text: "Option c", disabled: true },
                { key: "D", text: "Option d" },
                { key: "E", text: "Option e" },
                {
                  key: "divider_2",
                  text: "-",
                  itemType: DropdownMenuItemType.Divider
                },
                {
                  key: "Header2",
                  text: "People",
                  itemType: DropdownMenuItemType.Header
                },
                { key: "F", text: "Option f" },
                { key: "G", text: "Option g" },
                { key: "H", text: "Option h" },
                { key: "I", text: "Option i" },
                { key: "J", text: "Option j" }
              ]}
            />
          </div>
        </div>
      );
    }
  }

  webPartName = {
    key: "cmdWebPartName",
    name: "Name",
    hidden: true,
    disabled: false,
    onClick: this.emit,
    onRender: (a, b, c) => {
      return (
        <div style={{ display: "flex" }}>
         
          <div style={{marginTop:"8px"}}>
           <Label>WebPart: {this.props.webPartName} Table: {this.props.tableName}</Label>
          </div>
        </div>
      );
    }
  }
  _fileCommands = {
    items: [
      this.newItem("cmdWebPartNew", "New", "Add"),
      this.newItem("cmdWebPartOpen", "Open", "OpenFolderHorizontal"),
      this.newItem("cmdWebPartSave", "Save", "Save"),
      this.newItem("cmdWebPartSaveAs", "Save As", "SaveAs"),
    //  this.newItem("cmdWebPartExportExcel", "Export to Excel", "ExcelDocument")
    ],
    overflowItems: [],
    farItems: [
        this.newItem("cmdWebPartDelete", "Delete", "Delete"),
    ]
  };

  _homeCommands = {
    items: [
      
        this.webPartName
    ],
    overflowItems: [],
    farItems: [
    //    this.newItem("cmdWebPartEdit", "Edit", "Edit")
      
        
    ]
  };

  _viewCommands = {
    items: [
      this.webPartFilter
    ],
    overflowItems: [],
    farItems: [
       
      
        this.newItem("cmdViewVersions", "Versions", "FullHistory"),
    ]
  };
  _publishCommands = {
    items: [
        this.newItem("cmdWebPartPublish", "Publish", "WebPublish"),
      
    ],
    overflowItems: [],
    farItems: [
        
        this.newItem("cmdViewPublishedVersions", "Published Versions", "FullHistory"),
     
    ]
  };

  _shareCommands = {
    items: [],
    overflowItems: [],
    farItems: []
  };
  render() {
    return (
      <div>
        <Pivot
          selectedKey="home"
          style={{ marginLeft: "0px", marginRight: "0px"}}
        >
          <PivotItem headerText="File" itemKey="files">
            <CommandBar
              
              elipisisAriaLabel="More options"
              {...this._fileCommands}
            />
          </PivotItem>
          <PivotItem headerText="Home" itemKey="home">
            <CommandBar
            
              elipisisAriaLabel="More options"
              {...this._homeCommands}
            />
          </PivotItem>
          {/* <PivotItem headerText="Insert" itemKey="insert">
              <CommandBar elipisisAriaLabel="More options" {...this._commands} />
            </PivotItem>
            <PivotItem headerText="Layout" itemKey="layout">
              <CommandBar elipisisAriaLabel="More options" {...this._commands} />
            </PivotItem>*/}
          {/* <PivotItem headerText="View" itemKey="view">
            <CommandBar elipisisAriaLabel="More options" {...this._viewCommands} />
          </PivotItem> */}
          <PivotItem headerText="Publish" itemKey="publish">
            <CommandBar
              elipisisAriaLabel="More options"
              {...this._publishCommands}
            />
          </PivotItem>
          <PivotItem headerText="Share" itemKey="share">
            <CommandBar
              elipisisAriaLabel="More options"
              {...this._shareCommands}
            />
          </PivotItem>
        </Pivot>
      </div>
    );
  }
}
