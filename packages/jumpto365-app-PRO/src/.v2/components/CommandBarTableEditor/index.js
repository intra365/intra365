import React, { Component } from "react";

import { CommandBar } from "office-ui-fabric-react/lib/CommandBar";
import { Pivot, PivotItem } from "office-ui-fabric-react/lib/Pivot";
import { Customizer } from "office-ui-fabric-react";
import { FluentCustomizations } from "@uifabric/fluent-theme";
export default class CommandBarTableEditor extends React.PureComponent {
  _methods = {
    onSave: () => {},
    onSaveAs: () => {},
    onRename: () => {},
    onDelee: () => {}
  };

  _fileCommands = {
    items: [
      //     {
      //     key: 'fileNew',
      //     name: "New",
      //     iconProps: { iconName: 'Add' },
      //     disabled: false,
      //     onClick : () => {  }
      // },
      {
        key: "fileOpen",
        name: "Open",
        iconProps: { iconName: "OpenFolderHorizontal" },
        disabled: false,
        onClick: () => {}
      },
      {
        key: "fileSaveAs",
        name: "Save As",
        iconProps: { iconName: "SaveAs" },
        disabled: false,
        onClick: () => {}
      }
      // {
      //     key: 'excel',
      //     name : "Export to Excel",
      //     icon: 'ExcelDocument',
      //     disabled: false,
      //     iconProps: { iconName: 'ExcelDocument' }
      //   }
    ],
    overflowItems: [],
    farItems: [
        {
            key: "stopEditing",
            name: "Stop Editing",
            iconProps: { iconName: "edit" },
            disabled: false,
            onClick: () => {}
          }
    ]
  };
  _homeCommands = {
    items: [],
    overflowItems: [],
    farItems: [
      {
        key: "tableSettings",
        name: "Table Settings",
        iconProps: { iconName: "settings" },
        disabled: false,
        onClick: () => {}
      }
    ]
  };
  _viewCommands = {
    items: [
        {
            key: "viewVersions",
            name: "Versions",
            iconProps: { iconName: "DocumentSet" },
            disabled: false,
            onClick: () => {}
          }
    ],
    overflowItems: [],
    farItems: [
     
    ]
  };

  _publishCommands = {
    items: [
        {
            key: "publishGlobal",
            name: "Jumpto365 Cloud",
            iconProps: { iconName: "Globe" },
            disabled: false,
            onClick: () => {}
          }
    ],
    overflowItems: [],
    farItems: [
     
    ]
  };
  _commands = {
    items: [],
    overflowItems: [],
    farItems: []
  };
  render() {
    return (
      <Customizer {...FluentCustomizations}>
        <div style={{ backgroundColor: "#F3F1F1", xmargin: "-16px" }}>
          <div style={{ xpadding: "16px" }}>
            <Pivot
              selectedKey="home"
              xstyle={{ marginLeft: "-8px", marginRight: "-8px" }}
            >
              <PivotItem headerText="Files" itemKey="files">
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
              {/* <PivotItem headerText="Insert" itemKey="insert" >
                            <CommandBar elipisisAriaLabel='More options' {...this._commands} />
                    </PivotItem>
                    <PivotItem headerText="Layout" itemKey="layout">
                            <CommandBar elipisisAriaLabel='More options' {...this._commands} />
                    </PivotItem> */}
              <PivotItem headerText="View" itemKey="view">
                <CommandBar
                  elipisisAriaLabel="More options"
                  {...this._viewCommands}
                />
              </PivotItem>
              <PivotItem headerText="Publish" itemKey="publish">
                <CommandBar
                  elipisisAriaLabel="More options"
                  {...this._publishCommands}
                />
              </PivotItem>
            </Pivot>
          </div>
        </div>
      </Customizer>
    );
  }
}
