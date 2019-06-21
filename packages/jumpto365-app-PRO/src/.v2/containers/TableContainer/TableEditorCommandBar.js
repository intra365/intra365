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
import "./table.css"

export default class TableEditorCommandBar extends Component {

  state = {selectedKey:"view"}
  emit = (e, cmd) => {
    var key = cmd.key;
    if (!this.props.TableContainer) return;
    if (this.props.TableContainer[key]) {
        console.log("Emitting",key)
      this.props.TableContainer[key]();
    }
  };

  isDisabled = key => {
    if (!this.props.TableContainer) return true;
    if (this.props.TableContainer[key]) {
      return !this.props.TableContainer[key](true);
    }
  };

  newItem = (key, name, iconName,checked) => {
    
    return {
      checked:checked ? true:false,
      key,
      name,
      
      iconProps: { iconName },
      disabled:this.isDisabled(key) ,
      onClick: this.emit
    };
  };

  tableFilter = {
    key: "cmdTableFilters",
    name: "Filters",
    hidden: true,
    disabled: false,
    onClick: this.emit,
    onRender: (a, b, c) => {
      return (
        <div style={{ display: "flex" }}>
           <div className="HeaderLabel">
              <Label>Table</Label>
            </div> 
          <div>
            <Dropdown
            
              selectedKey={this.props.tableName}
              style={{ margin: "8px", minWidth: "200px" }}
              placeholder="Select a table"
              ariaLabel="Basic dropdown example"
              options={[
                { key: this.props.tableName, text: this.props.tableName, title:this.props.tableName },
                // {
                //   key: "Header",
                //   text: "Actions",
                //   itemType: DropdownMenuItemType.Header
                // },
                // { key: "A", text: "Option a", title: "I am option a." },
                // { key: "B", text: "Option b" },
                // { key: "C", text: "Option c", disabled: true },
                // { key: "D", text: "Option d" },
                // { key: "E", text: "Option e" },
                // {
                //   key: "divider_2",
                //   text: "-",
                //   itemType: DropdownMenuItemType.Divider
                // },
                // {
                //   key: "Header2",
                //   text: "People",
                //   itemType: DropdownMenuItemType.Header
                // },
                // { key: "F", text: "Option f" },
                // { key: "G", text: "Option g" },
                // { key: "H", text: "Option h" },
                // { key: "I", text: "Option i" },
                // { key: "J", text: "Option j" }
              ]}
            />
          </div>
        </div>
      );
    }
  }

  tableName = {
    key: "cmdTableName",
    name: "Name",
    hidden: true,
    disabled: false,
    onClick: this.emit,
    onRender: (a, b, c) => {
      return (
        <div style={{ display: "flex" }}>
         
          <div style={{marginTop:"8px"}}>
           <Label>Table: {this.props.tableName}</Label>
          </div>
        </div>
      );
    }
  }

  _fileViewCommands = {
    items: [
     
      this.newItem("cmdTableSaveAs", "Save a copy", "SaveAs"),
    //  this.newItem("cmdTableExportExcel", "Export to Excel", "ExcelDocument")
    ],
    overflowItems: [
    
    //  this.newItem("cmdTableOpenCompanion", "Open an companion Table", "WorkItemBar"),
    ],
    farItems: [this.newItem("cmdViewVersions", "Versions", "FullHistory"),
      
    ]
  };
  _fileCommands = {
    items: [
      this.newItem("cmdTableNew", "New Table", "Add"),
      this.newItem("cmdTableOpen", "Open Table", "OpenFolderHorizontal"),
    //  this.newItem("cmdTableSave", "Save", "Save"),
      this.newItem("cmdTableSaveAs", "Save a copy", "SaveAs"),
    //  this.newItem("cmdTableExportExcel", "Export to Excel", "ExcelDocument")
    this.newItem("cmdExportTable", "Export Table", "Export"),
    this.newItem("cmdImportTable", "Import Table", "Import"),
    ],
    overflowItems: [
    
    //  this.newItem("cmdTableOpenCompanion", "Open an companion Table", "WorkItemBar"),
    ],
    farItems: [this.newItem("cmdViewVersions", "Versions", "FullHistory"),
      
    ]
  };

  _homeCommands = {
    items: [
      
        this.tableName
    ],
    overflowItems: [],
    farItems: [
       this.newItem("cmdViewVersions", "Versions", "FullHistory"),
      
        
    ]
  };
  _editCommands = (editTiles,editConnections) => { return {
    items: [ 
      
      this.newItem("cmdTableEdit", "Edit Tiles", "Waffle",editTiles),
      this.newItem("cmdRelationsEdit", "Edit Connections", "BranchFork2",editConnections),
      //this.newItem("cmdTableEdit", "Edit Tiles", "ArrangeSendBackward"),
    
     
    ],
    overflowItems: [],
    farItems: [
      this.newItem("cmdViewVersions", "Versions", "FullHistory"),
      //this.newItem("cmdTableProperties", "Table Properties", "CalendarSettings"),
     // this.newItem("cmdTableDelete", "Delete", "Delete"),
    ]
  }};
  
  _viewCommands = {
    items: [
      this.tableFilter,
      // this.newItem("cmdViewVersions", "Versions", "FullHistory")
    ],
    overflowItems: [],
    farItems: [
       
      this.newItem("cmdViewVersions", "Versions", "FullHistory"),
      
       // this.newItem("cmdViewInfo", "", "Info"),
    ]
  };
  _publishCommands = {
    items: [
        this.newItem("cmdTablePublish", "Publish", "WebPublish"),
       
    ],
    overflowItems: [],
    farItems: [
    //  this.newItem("cmdViewPublishedVersions", "Published Versions", "FullHistory"),
        
     
    ]
  };

  _shareCommands = {
    items: [
   //   this.newItem("cmdEmbed", "Embed", "Embed"),
      this.newItem("cmdCopyLink", "Copy Link", "Share"),
    ],
    overflowItems: [],
    farItems: []
  };
  render() {
    if (this.$viewMode){
      return (
        <div>
          <Pivot
            selectedKey="files"
            style={{ marginLeft: "0px", marginRight: "0px"}}
          >
            <PivotItem headerText="File" itemKey="files">
              <CommandBar
                
                elipisisAriaLabel="More options"
                {...this._fileViewCommands}
              />
            </PivotItem>
            
          </Pivot>
        </div>
      );
    }
    return (
      <div>
        <Pivot
          selectedKey="edit"
          style={{ marginLeft: "0px", marginRight: "0px"}}
        >
          <PivotItem headerText="File" itemKey="files">
            <CommandBar
              
              elipisisAriaLabel="More options"
              {...this._fileCommands}
            />
          </PivotItem>
          {/* <PivotItem headerText="Home" itemKey="home">
            <CommandBar
            
              elipisisAriaLabel="More options"
              {...this._homeCommands}
            />
          </PivotItem> */}
          {/* <PivotItem headerText="View" itemKey="view">
              <CommandBar elipisisAriaLabel="More options" {...this._viewCommands} />
            </PivotItem> */}
          <PivotItem headerText="Edit" itemKey="edit">
              <CommandBar elipisisAriaLabel="More options" {...this._editCommands(this.props.editTiles,this.props.editConnections)} />
            </PivotItem>
             {/* 
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
