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
import "./page.css"

export default class PageEditorCommandBar extends Component {
  emit = (e, cmd) => {
    var key = cmd.key;
    if (!this.props.PageContainer) return;
    if (this.props.PageContainer[key]) {
        console.log("Emitting",key)
      this.props.PageContainer[key]();
    }
  };

  isDisabled = key => {
    if (!this.props.PageContainer) return true;
    if (this.props.PageContainer[key]) {
      return !this.props.PageContainer[key](true);
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
  pageFilter = {
    key: "cmdPageFilters",
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

  pageName = {
    key: "cmdPageName",
    name: "Name",
    hidden: true,
    disabled: false,
    onClick: this.emit,
    onRender: (a, b, c) => {
      return (
        <div style={{ display: "flex" }}>
         
          <div style={{marginTop:"8px"}}>
           <Label>Page: {this.props.pageName} Table: {this.props.tableName}</Label>
          </div>
        </div>
      );
    }
  }
  _fileCommands = {
    items: [
  //    this.newItem("cmdPageNew", "New", "Add"),
  //    this.newItem("cmdPageOpen", "Open", "OpenFolderHorizontal"),
  // this.newItem("cmdPageEditUndo", "", "Undo"),
  //    this.newItem("cmdPageEditRedo", "", "Redo"),
      this.newItem("cmdPageSave", "Save", "Save"),
  //    this.newItem("cmdPageSaveAs", "Save As", "SaveAs"),
   //   this.newItem("cmdPageImportWord", "Import from Word", "WordDocument")

    ],
    overflowItems: [],
    farItems: [
 this.newItem("cmdViewVersions", "Versions", "FullHistory"),
    ]
  };

  _editCommands = {
    items: [
      // this.newItem("cmdPageEditUndo", "", "Undo"),
      // this.newItem("cmdPageEditRedo", "", "Redo"),
      // this.newItem("cmdPageEditCut", "Cut", "Cut"),
      // this.newItem("cmdPageEditCopy", "Copy", "Copy"),
      // this.newItem("cmdPageEditPaste", "Paste", "Paste"),
      // this.newItem("cmdPageEditBold", "", "Bold"),
      // this.newItem("cmdPageEditItalic", "", "Italic"),
      // this.newItem("cmdPageEditUnderline", "", "Underline"),
      // this.newItem("cmdPageEditBullet", "", "BulletedList"),
     
        
    ],
    overflowItems: [],
    farItems: [
    //    this.newItem("cmdPageEdit", "Edit", "Edit")
      
        
    ]
  };
  _insertCommands = {
    items: [
      this.newItem("cmdPageEditInsertPicture", "Picture", "Picture"),
      this.newItem("cmdPageEditRedo", "Link", "Link"),
      this.newItem("cmdPageEditRedo", "Table", "Waffle"),
        
    ],
    overflowItems: [],
    farItems: [
    //    this.newItem("cmdPageEdit", "Edit", "Edit")
      
        
    ]
  };

  _viewCommands = {
    items: [
      this.pageFilter
    ],
    overflowItems: [],
    farItems: [
       
      
        this.newItem("cmdViewVersions", "Versions", "FullHistory"),
    ]
  };
  _publishCommands = {
    items: [
        this.newItem("cmdPagePublish", "Publish", "WebPublish"),
      
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
    return (  <CommandBar
              
      elipisisAriaLabel="More options"
      {...this._fileCommands}
    />)
    return (
      <div>
        <Pivot
          selectedKey="file"
          style={{ marginLeft: "0px", marginRight: "0px"}}
        >
          <PivotItem headerText="File" itemKey="files">
            <CommandBar
              
              elipisisAriaLabel="More options"
              {...this._fileCommands}
            />
          </PivotItem>
          {/* <PivotItem headerText="Home" itemKey="edit">
            <CommandBar
            
              elipisisAriaLabel="More options"
              {...this._editCommands}
            />
          </PivotItem> */}
          <PivotItem headerText="Insert" itemKey="Insert">
            <CommandBar
            
              elipisisAriaLabel="More options"
              {...this._insertCommands}
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
          {/* <PivotItem headerText="Publish" itemKey="publish">
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
          </PivotItem> */}
        </Pivot>
      </div>
    );
  }
}
