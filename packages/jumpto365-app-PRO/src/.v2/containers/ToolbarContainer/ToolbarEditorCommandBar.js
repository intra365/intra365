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
import "./Toolbar.css";
import {
  ComboBox,
 
} from "office-ui-fabric-react";
import { TooltipHost } from "office-ui-fabric-react";

export default class ToolbarEditorCommandBar extends Component {
  state = { selectedKey: "view" };
  emit = (e, cmd) => {
    var key = cmd.key;
    if (!this.props.ToolbarContainer) return;
    if (this.props.ToolbarContainer[key]) {
      console.log("Emitting", key);
      this.props.ToolbarContainer[key]();
    }
  };

  isDisabled = key => {
    if (!this.props.ToolbarContainer) return true;
    if (this.props.ToolbarContainer[key]) {
      return !this.props.ToolbarContainer[key](true);
    }
  };

  newItem = (key, name, iconName, checked) => {
    return {
      checked: checked ? true : false,
      key,
      name,

      iconProps: { iconName },
      disabled: this.isDisabled(key),
      onClick: this.emit
    };
  };

  ToolbarFilter = {
    key: "cmdToolbarFilters",
    name: "Filters",
    hidden: true,
    disabled: false,
    onClick: this.emit,
    onRender: (a, b, c) => {
      return (
        <div style={{ display: "flex" }}>
          <div className="HeaderLabel">
            <Label>Toolbar</Label>
          </div>
          <div>
            <Dropdown
              selectedKey={this.props.ToolbarName}
              style={{ margin: "8px", minWidth: "200px" }}
              placeholder="Select a Toolbar"
              ariaLabel="Basic dropdown example"
              options={[
                {
                  key: this.props.ToolbarName,
                  text: this.props.ToolbarName,
                  title: this.props.ToolbarName
                }
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
  };

  selectView = (display) => { return {
    key: "cmdToolbarView",
    xname: "Filters",
    hidden: true,
    disabled: false,
    onClick: this.emit,
    onRender: (a, b, c) => {
      return (
        <div style={{ display: "flex",marginLeft:"8px" }}>
          {/* <div className="HeaderLabel">
            <Label>Preview</Label>
          </div> */}

          <div>


          <ComboBox
          className="onTop"
          style={{ width: "200px",marginTop:"5px" }}
          xlabel="Type"
          selectedKey={display ? display : "desktop"}
          options={[
            { key: "phone", text: "Preview Phone" },
            //     { key: "tablet", text: "Tablet" },
            { key: "desktop", text: "Preview Desktop" },
            { key: "raw", text: "Preview Commandbar Only" }
          ]}
          onChange={(e, option) => {
            if (this.props.onSelectView){
              this.props.onSelectView(option.key)
            }
            
          }}
        />
           
          </div>
        </div>
      );
    }}
  };
  ToolbarName = {
    key: "cmdToolbarName",
    name: "Name",
    hidden: true,
    disabled: false,
    onClick: this.emit,
    onRender: (a, b, c) => {
      return (
        <div style={{ display: "flex" }}>
          <div style={{ marginTop: "8px" }}>
            <Label>Toolbar: {this.props.ToolbarName}</Label>
          </div>
        </div>
      );
    }
  };

  _fileViewCommands = {
    items: [
      this.newItem("cmdToolbarSaveAs", "Save a copy", "SaveAs")
      //  this.newItem("cmdToolbarExportExcel", "Export to Excel", "ExcelDocument")
    ],
    overflowItems: [
      //  this.newItem("cmdToolbarOpenCompanion", "Open an companion Toolbar", "WorkItemBar"),
    ],
    farItems: [this.newItem("cmdViewVersions", "Versions", "FullHistory")]
  };
  _fileCommands = {
    items: [
      this.newItem("cmdToolbarNew", "New Toolbar", "Add"),
      this.newItem("cmdToolbarOpen", "Open Toolbar", "OpenFolderHorizontal"),
      this.newItem("cmdToolbarSave", "Save", "Save"),
      this.newItem("cmdToolbarSaveAs", "Save a copy", "SaveAs"),
      //  this.newItem("cmdToolbarExportExcel", "Export to Excel", "ExcelDocument")
      this.newItem("cmdExportToolbar", "Export Toolbar", "Export"),
      this.newItem("cmdImportToolbar", "Import Toolbar", "Import")
    ],
    overflowItems: [
      //  this.newItem("cmdToolbarOpenCompanion", "Open an companion Toolbar", "WorkItemBar"),
    ],
    farItems: [this.newItem("cmdViewVersions", "Versions", "FullHistory")]
  };

  _homeCommands = {
    items: [this.ToolbarName],
    overflowItems: [],
    farItems: [this.newItem("cmdViewVersions", "Versions", "FullHistory")]
  };
  _editCommands = (editTiles, viewMode) => {
    return {
      items: [
        this.newItem("cmdToolbarEdit", "Edit Toolbar", "Edit", editTiles),
        this.selectView(viewMode)


        // this.newItem("cmdRelationsEdit", "Edit Connections", "BranchFork2",editConnections),
        //this.newItem("cmdToolbarEdit", "Edit Tiles", "ArrangeSendBackward"),
      ],
      overflowItems: [],
      farItems: [
        this.newItem("cmdViewVersions", "Versions", "FullHistory")
        //this.newItem("cmdToolbarProperties", "Toolbar Properties", "CalendarSettings"),
        // this.newItem("cmdToolbarDelete", "Delete", "Delete"),
      ]
    };
  };

  _viewCommands = {
    items: [
      this.ToolbarFilter
      // this.newItem("cmdViewVersions", "Versions", "FullHistory")
    ],
    overflowItems: [],
    farItems: [
      this.newItem("cmdViewVersions", "Versions", "FullHistory")

      // this.newItem("cmdViewInfo", "", "Info"),
    ]
  };
  _publishCommands = {
    items: [this.newItem("cmdToolbarPublish", "Publish", "WebPublish")],
    overflowItems: [],
    farItems: [
      //   this.newItem("cmdViewPublishedVersions", "Published Versions", "FullHistory"),
    ]
  };

  _shareCommands = {
    items: [
      //   this.newItem("cmdEmbed", "Embed", "Embed"),
      this.newItem("cmdCopyLink", "Copy Link", "Share")
    ],
    overflowItems: [],
    farItems: []
  };
  render() {
    if (this.$viewMode) {
      return (
        <div>
          <Pivot
            selectedKey="files"
            style={{ marginLeft: "0px", marginRight: "0px" }}
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
          style={{ marginLeft: "0px", marginRight: "0px" }}
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
            <CommandBar
              elipisisAriaLabel="More options"
              {...this._editCommands(
                this.props.editTiles,
                this.props.viewMode
              )}
            />
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
          {/* <PivotItem headerText="Share" itemKey="share">
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
