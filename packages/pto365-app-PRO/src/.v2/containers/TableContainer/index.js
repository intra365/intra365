import React, { Component } from "react";
import Table from "../../components/Table";
import { navigate } from "@reach/router";
import TableEditorCommandBar from "./TableEditorCommandBar";
import TableDialog from "./TableDialog";
import TableOpenDialog from "./TableOpenDialog";

import CellTypeSelector, {
  CellType
} from "../../components/Table/CellTypeSelector";

import { TileEditor } from "../../logic/TileEditors";
import { GroupPropertiesEditor } from "../../logic/GroupEditor";
import { TablePropertiesEditor } from "../../logic/TableEditors";
import {
  MessageBar,
  MessageBarType
} from "office-ui-fabric-react/lib/MessageBar";
import { EventType } from "../../components/Table/EventType";
import _ from "lodash";
import Grid from "./Grid";
import { TooltipHost } from "office-ui-fabric-react";
import TableImport from "./TableImport";
import TableExport from "./TableExport";
import TablePublisher from "./TablePublisher";
import TableCopyLink from "./TableCopyLink";
import TableConfirm from "./TableConfirm";
import json from "format-json";
import TableVersionsDialog from "./TableVersionsDialog";
import TablePublishedVersionsDialog from "./TablePublishedVersionsDialog";
import MyTablesBrowser from "../../components/MyTablesBrowser";
import TableCompanion from "./TableCompanion";

const Jumpto365Service = require("../../services").default;
const Jumpto365API = require("../../services/Jumpto365API");
const TABLENAME = "Table";

export default class TableContainer extends React.PureComponent {
  
constructor(props){
  super(props)
  var context = this.props.context
  var userSettings =
  context && context.me && context.me.JSON
    ? JSON.parse(context.me.JSON)
    : {};



this.state = {
  editMode: false,
  onSelectCelltype: false,
  showInfo: false,
  gridClasses: {},
  isDeveloper : userSettings.developer,
  canEdit : userSettings.canEdit
};

}


  get FEATURE_COMPANION() {
    return false;
  }
  _setState = delta => {
    this.setState(delta);
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.tag !== this.props.tag) {
      this.load(this.props.tag);
    }
  }

  componentDidMount() {
    this.load(this.props.tag); 
    var context = this.props.context;

   
    
  }

  raiseError = message => {
    this._setState({ hasError: true, errorMessage: message });
  };

  clearError = () => {
    this._setState({ hasError: false, errorMessage: null });
  };
  load = (tag, force) => {
    if (this.props.isDomainRoot) {
      return this._setState({ browseDomain: true });
    }
    if (!force) {
      if (tag === this.state.tag) return;
    }
    this.registerCommandBar();
    this.clearError();

    this._setState({ tag, browseDomain: false });
    var isNew = tag === "(new)";

    if (isNew) {
      this.tableNew();
    } else {
      this.tableOpen(tag);
    }
  };
  cmdImportTable = canExecute => {
    if (canExecute) return true;
    this._setState({ onTableImport: true });
  };
  cmdExportTable = canExecute => {
    if (canExecute) return true;
    this._setState({ onTableExport: true });
  };
  cmdTableNew = canExecute => {
    if (canExecute) return true;
    navigate("./(new)");
  };
  cmdTableRename = canExecute => {
    if (canExecute) return false;
  };
  cmdTableDelete = canExecute => {
    if (canExecute) return false;
  };
  cmdTableOpen = canExecute => {
    if (canExecute) return true;
    this._setState({ onTableOpen: true });
  };
  cmdTableOpenCompanion = canExecute => {
    if (canExecute) return true;
    if (!this.FEATURE_COMPANION) return;
    this._setState({ onTableOpenCompanion: true });
  };

  cmdViewVersions = canExecute => {
    if (canExecute) return true;
    this._setState({ onViewVersions: true });
  };
  cmdViewPublishedVersions = canExecute => {
    if (canExecute) return true;
    this._setState({ onViewPublishedVersions: true });
  };

  cmdTableSave = canExecute => {
    if (canExecute) return true;
    if (this.state.tag === "(new)") {
      this.cmdTableSaveAs();
    } else {
      this.tableSave();
    }
  };

  cmdTableSaveAs = canExecute => {
    if (canExecute) return true;
    this._setState({ onSaveAs: true });
  };
  cmdTableProperties = canExecute => {
    if (canExecute) return true;
    this.onEditTableSettings();
  };
  cmdRelationsEdit = canExecute => {
    if (canExecute) return true;

    this.setRelationsMode(!this.state.relationsEditMode);
  };
  setRelationsMode = relationsEditMode => {
    if (this.state.selectingGroupMember) {
      return;
    }
    this.registerCommandBar(this.props.tag, relationsEditMode, false);
    if (!relationsEditMode) {
      this.refreshGrid(true);
    }
    this._setState({ relationsEditMode, editMode: false });
  };
  cmdTableEdit = canExecute => {
    if (canExecute) return true;

    this.setEditMode(!this.state.editMode);
  };
  cmdTablePublish = canExecute => {
    if (canExecute) return true;

    this._setState({ onTablePublish: true });
  };

  cmdEmbed = canExecute => {
    if (canExecute) return true;

    navigate("/embed");
  };
  cmdCopyLink = canExecute => {
    if (canExecute) return true;

    this._setState({ onCopyLink: true });
  };
  setEditMode = editMode => {
    this.registerCommandBar(this.props.tag, false, editMode);
    if (this.state.relationsEditMode) {
      this.refreshGrid(true);
    }
    this._setState({
      editMode,
      relationsEditMode: false,
      selectingGroupMember: false
    });
  };

  updateCommandBarState = state => {
    if (this.state.commandBar) {
      this.state.commandBar.setState(state);
    }
  };
  registerCommandBar = (tableName, editConnections, editTiles) => {
    if (this.props.registerCommandBar) {
      if (this.isEditable) {
        this.props.registerCommandBar(
          this,
          <TableEditorCommandBar
            tableName={tableName}
            TableContainer={this}
            editConnections={editConnections}
            editTiles={editTiles}
          />
        );
      } else {
        this.props.registerCommandBar(
          this,
          <TableEditorCommandBar
            viewMode
            tableName={tableName}
            TableContainer={this}
            editConnections={editConnections}
            editTiles={editTiles}
          />
        );
      }
    }
  };
  _forceUpdate = () => {
    var stateVersion = this.state.stateVersion ? this.state.stateVersion : 0;
    stateVersion += 1;
    this._setState({ stateVersion });
  };
  onCellEdit = id => {
    var cellType = this.state.gridObject.getCellType(id);
    console.log("onCellEdit", cellType);

    switch (cellType) {
      case CellType.Full:
        this._setState({ editCellProperties: true, cellId: id });
        break;
      case CellType.Title:
        this._setState({ editTableSettings: true, cellId: id });
        break;
      case CellType.None:
      case CellType.SpacerCorner:
      case CellType.SpacerFull:
      case CellType.SpacerVertical:
      case CellType.SpacerHorisontal:
        break;
      default:
        this._setState({ editGroupProperties: true, cellId: id });
        break;
    }
  };
  onCellCopy = id => {
    var copiedCell = this.state.gridObject.copyCell(id);
    this._setState({ copiedCell });
  };
  onCellCut = id => {
    var copiedCell = this.state.gridObject.copyCell(id);
    this.state.gridObject.clearCell(id);
    this.refreshGrid(false);
    this._forceUpdate();
  };
  onCellClear = (id, confirmed) => {
    if (!confirmed) {
      this._setState({
        confirmAction: true,
        nextAction: { action: this.onCellClear, id }
      });
      return;
    }

    this.state.gridObject.clearCell(id);
    this.refreshGrid(true);
    this._forceUpdate();
  };
  onCellPaste = id => {
    var copiedCell = this.state.copiedCell;
    if (!copiedCell) return;
    this.state.gridObject.pasteCell(id, copiedCell);
    this.refreshGrid(true);
    this._forceUpdate();
  };
  onCellSelectType = id => {
    var cellType = this.state.gridObject.getCellType(id);
    if (!cellType) {
      this._setState({ selectCelltype: true, cellId: id });
    } else {
      this.onCellEdit(id);
    }
  };
  onCellChangeType = id => {
    this._setState({ selectCelltype: true, cellId: id });
  };
  onTileMouseOver = id => {
    console.log("Over", id);
  };
  onTileMouseOut = id => {
    console.log("Out", id);
  };
  onTileDetailsClick = id => {
    navigate(`/@/${this.props.domain}/${this.state.tag}/${id}`);
  };
  onTileClick = id => {
    if (this.state.selectedGroupId) {
      console.log("Tile clicked", id);
      this.state.gridObject
        .toggleMemberShip(this.state.selectedGroupId, id)
        .then(() => {
          console.log(
            "None members",
            this.state.gridObject.getNoneMembers(this.state.selectedGroupId)
          );
          this.calcCellStates(
            this.state.selectedGroupId,
            this.state.noneSelectedClassname
          );
        });
    } else {
      if (!this.props.interactMode) {
        var tile = this.state.gridObject.getCellTile(id);
        if (tile.contentRef) {
          navigate(`./${this.state.tag}/${id}`);
        }
        // if (this.props.onTileClicked) {
        //   this.props.onTileClicked(this.state.tag, id);
        // } else {
        //   var tile = this.state.gridObject.getCellTile(id);
        //   if (tile && tile.jumpto) {
        //     window.open(tile.jumpto, "_blank");
        //   }

        // }
      } else {
        if (this.state.editMode) {
          this.onCellEdit(id);
        } else {
          navigate(`./${this.state.tag}/${id}`);
        }
      }
    }
  };
  onEditTableSettings = () => {
    this._setState({ editTableSettings: true });
  };
  onGroupClick = id => {
    if (!this.props.interactMode) return;

    if (!this.state.relationsEditMode) {
      //this.onCellEdit(id);
      return;
    }
    var groupSettings = this.state.gridObject.getGroupSetting(id);
    console.log("onGroupClick", id, groupSettings);
    if (!groupSettings) {
      return console.log("No group settings");
    }
    if (this.state.selectingGroupMember && this.state.selectedGroupId) {
      // stop selecting
      this._setState({
        selectedGroupId: null,
        noneSelectedClassname: "cellDimmed",
        groupOver: true,
        selectingGroupMember: false
      });
      this.calcCellStates(id, "cellDimmed");
    } else {
      // start selecting
      this._setState({
        selectedGroupId: id,
        noneSelectedClassname: "cellBlur",
        selectingGroupMember: true,
        groupOver: false
      });
      this.calcCellStates(id, "cellBlur");
    }
  };

  onConnectorClick = (id, direction) => {
    if (!this.props.interactMode) return;
    var groupSettings = this.state.gridObject.getGroupSetting(
      this.state.selectedGroupId
    );
    console.log("onConnectorClick", id, groupSettings);
    if (!groupSettings) {
      return console.log("No group settings");
    }
    if (!this.state.selectingGroupMember) {
      return console.log("Not in group selecting mode");
    }
    this.state.gridObject.toggleCellConnector(
      id,
      direction,
      groupSettings.color
    );
    this.refreshGrid(false);
    this._forceUpdate();
  };

  onGroupOver = id => {
    var groupSettings = this.state.gridObject.getGroupSetting(id);
    if (!groupSettings) {
      return;
    }
    if (!this.state.selectingGroupMember && groupSettings) {
      this._setState({
        selectedGroupId: id,
        noneSelectedClassname: "cellDimmed",
        groupOver: true
      });
      var cell = this.state.gridObject.getGroupSetting(id);
      console.log("onGroupOver", id, cell);
      this.calcCellStates(id, "cellDimmed");
    }
  };
  onGroupOut = id => {
    if (this.state.groupOver && !this.state.selectingGroupMember) {
      var cell = this.state.gridObject.getGroupSetting(id);
      this._setState({
        selectedGroupId: null,
        noneSelectedClassname: null,
        groupOver: false
      });
      console.log("onGroupOut", id, cell);
      this.calcCellStates(null);
    }
  };

  calcCellStates = (groupId, noneSelectedClassname) => {
    var gridClasses = {};
    if (groupId) {
      this.state.gridObject.getNoneMembers(groupId).forEach(id => {
        gridClasses[id] = { className: noneSelectedClassname };
      });
      this._setState({ gridClasses });
      console.log("calcCellStates", gridClasses);
    } else {
      this._setState({ gridClasses });
      console.log("calcCellStates", gridClasses);
    }
  };

  cellSetTile = (id, tile) => {
    if (!this.state.gridObject) return;
    this.state.gridObject.setCellTile(id, tile);
    this.refreshGrid(true);
  };
  tableSetSettings = settings => {
    if (!this.state.gridObject) return;
    this.state.gridObject.setTableSettings(
      settings.title,
      settings.teaser,
      settings.titlegraphics,
      settings.backgroundColor,
      settings.textColor,
      settings.isProtected
    );
    this.refreshGrid(true);
  };
  tableGetSettings = () => {
    if (!this.state.gridObject) return {};
    var settings = this.state.gridObject.getTableSettings();
    return settings;
  };
  cellSetGroupSetting = (id, groupSetting) => {
    if (!this.state.gridObject) return;
    this.state.gridObject.setGroupSetting(id, groupSetting);
    this.refreshGrid(true);
  };
  cellGetGroupSetting = id => {
    if (!this.state.gridObject) return;
    var groupSetting = this.state.gridObject.getGroupSetting(id);
    return groupSetting;
  };

  associateTileWithUrl = (id, url) => {
    return new Promise((resolve, reject) => {
      if (!this.state.gridObject) return resolve();
      this.state.gridObject.setContentRef(id, url);

      this.tableSave();
    });
  };
  cellGetTile = id => {
    if (!this.state.gridObject) return {};
    var tile = this.state.gridObject.getCellTile(id);

    return tile;
  };
  cellSelectType = (id, cellType) => {
    if (!this.state.gridObject) return;
    this.state.gridObject.setCellType(id, cellType);
    this.refreshGrid(true);
  };

  tableNew = () => {
    var gridObject = new Grid(5, 8);
    this._setState({
      grid: gridObject.grid,
      gridObject,
      editMode: true,
      onSaveAs: true
    });
    if (this.state.commandBar) {
      this.state.commandBar.setState({ selectedKey: "edit" });
    }
  };
  registerTableContainer = () => {
    if (this.props.registerTableContainer) {
      this.props.registerTableContainer(this);
    }
  };
  get isEditable() {
    return this.props.domain && this.props.domain.indexOf("@") > -1
      ? true
      : false;
  }
  tableOpen = tag => {
    return new Promise(async (resolve, reject) => {
      var gridObject = new Grid();
      this._setState({ grid: gridObject.grid, gridObject });

      var getData = () => {
        return new Promise((resolve, reject) => {
          if (this.props.isRoot) {
            var jumpto365Service = new Jumpto365Service();
            jumpto365Service
              .getFile("hexatown", "docs", "contexts", `${tag}/index.json`)
              .then(data => {
                resolve({ file: data });
              });
          } else {
            if (this.props.domain && this.props.domain.indexOf("@") < 0) {
              return Jumpto365API.getGlobalTenant(this.props.domain, tag)
                .then(data => {
                  resolve({ file: data });
                })
                .catch(error => {
                  this.raiseError(error.message);
                });
            }

            Jumpto365API.findItemByKeyGlobally(
              this.props.domain,
              TABLENAME,
              tag
            ).then(result => {
              if (result.length < 1) {
                return reject("Could not load table");
              }
              var data = JSON.parse(result[0].Json);
              resolve(data);
            });
          }
        });
      };

      getData()
        .then(data => {
          this.registerCommandBar(tag);
          this.registerTableContainer();
          try {
            var gridObject = new Grid();
            if (!gridObject.import(data)) {
              this.raiseError("Could not load ");
              resolve({ hasError: true, message: "Could not load" });
            }

            var grid = gridObject.grid;

            var onSaveAs = this.props.saveas === "1" ? true : false;

            this._setState({
              hasError: false,
              tag,
              grid,
              gridObject,
              editMode: false,
              onTableOpen: false,
              preRender: true,
              onSaveAs
            });
            resolve(tag);
          } catch (error) {
            this.raiseError(error.message);
            return resolve({ hasError: true, message: error.message });
          }
        })
        .catch(error => {
          this.raiseError(error.message ? error.message : error);
          return resolve({ hasError: true, message: error.message });
        });
    });
  };

  tableOpenCompanion = tag => {
    return new Promise(async (resolve, reject) => {
      var companions = this.state.companions ? this.state.companions : [];
      companions.push(tag);
      this._setState({ companions });
    });
  };
  navigateTo = tag => {
    return new Promise((resolve, reject) => {
      this._setState({ onTableOpen: false, onTableOpenCompanion: false });
      if (this.state.onTableOpenCompanion) {
        this.tableOpenCompanion(tag);
        resolve();
      } else {
        navigate("./" + tag);
        return resolve({ hasError: false });
      }
    });
  };

  restoreVersion = versionId => {
    return new Promise((resolve, reject) => {
      Jumpto365API.restoreItem(
        this.props.domain,
        TABLENAME,
        this.props.tag,
        versionId
      )
        .then(() => {
          this.setEditMode(false);
          this.setState({ onViewVersions: false });
          this.load(this.props.tag, true);
          resolve({ hasError: false });
        })
        .catch(error => {
          return resolve({ hasError: true, error });
        });
    });
  };
  tableImport = fileData => {
    return new Promise((resolve, reject) => {
      var gridObject = new Grid();
      var file = JSON.parse(fileData);
      if (!gridObject.import({ file })) {
        return this.raiseError("Could not load ");
      }
      var grid = gridObject.grid;
      this._setState({ grid, gridObject, preRender: true });
      this.setEditMode(true)
      this.tableSave(gridObject)
      resolve();
    });
  };
  tableSave = (specificGridObject) => {
    if (this.props.tag === "(new") {
      return this.cmdTableSaveAs();
    }
var gridObject = specificGridObject ? specificGridObject : this.state.gridObject 
    
    var file = gridObject ? gridObject.export() : null;
    var item = {
      key: this.props.tag,
      title: "Default",
      file
    };

    Jumpto365API.itemPatch(TABLENAME, item).then(() => {
      this.postBleepMessage("Saved", 300);
      if (this.props.tag && this.props.tag.indexOf("@") > -1) {
        this.navigateTo(this.props.tag.split("@")[0]);
      }
    });
  };
  tableSaveAs = tag => {
    var file = this.state.gridObject ? this.state.gridObject.export() : null;
    var item = {
      key: tag,
      title: "Default",
      file
    };

    return Jumpto365API.itemPatch(TABLENAME, item);
  };
  refreshGrid = save => {
    if (!this.state.gridObject) return;
    this.tableSave();
    this._setState({ grid: this.state.gridObject.grid });
  };
  columnDelete = columnNumber => {
    this.state.gridObject.columnDelete(columnNumber);

    this.refreshGrid(true);
  };
  columnInsertAfter = columnNumber => {
    this.state.gridObject.columnInsertAfter(columnNumber);
    this.refreshGrid(true);
  };

  columnInsertBefore = columnNumber => {
    this.state.gridObject.columnInsertBefore(columnNumber);
    this.refreshGrid(true);
  };
  columnMoveLeft = columnNumber => {};
  columnMoveRight = columnNumber => {};
  rowDelete = rowNumber => {
    this.state.gridObject.rowDelete(rowNumber);
    this.refreshGrid(true);
  };
  rowInsertAfter = rowNumber => {
    this.state.gridObject.rowInsertAfter(rowNumber);
    this.refreshGrid(true);
  };
  rowInsertBefore = rowNumber => {
    this.state.gridObject.rowInsertBefore(rowNumber);
    this.refreshGrid(true);
  };

  rowMoveDown = rowNumber => {};
  rowMoveUp = rowNumber => {};

  dispatcher = (event, id) => {
    switch (event) {
      case EventType.ColumnDelete:
        this.columnDelete(id);
        break;
      case EventType.ColumnInsertAfter:
        this.columnInsertAfter(id);
        break;
      case EventType.ColumnInsertBefore:
        this.columnInsertBefore(id);

        break;
      case EventType.ColumnMoveLeft:
        break;
      case EventType.ColumnMoveRight:
        break;
      case EventType.RowDelete:
        this.rowDelete(id);
        break;
      case EventType.RowInsertAfter:
        this.rowInsertAfter(id);
        break;

      case EventType.RowInsertBefore:
        this.rowInsertBefore(id);
        break;
      case EventType.RowMoveDown:
        break;
      case EventType.RowMoveUp:
        break;
      case EventType.CellSelectType:
        this.onCellSelectType(id);
        break;
      case EventType.CellChangeType:
        this.onCellChangeType(id);
        break;
      case EventType.CellEdit:
        this.onCellEdit(id);
        break;
      case EventType.CellCopy:
        this.onCellCopy(id);
        break;
      case EventType.CellCut:
        this.onCellCut(id);
        break;
      case EventType.CellClear:
        this.onCellClear(id);
        break;
      case EventType.CellPaste:
        this.onCellPaste(id);
        break;
      case EventType.TileClick:
        this.onTileClick(id);
        break;
      case EventType.TileDetailsClick:
        this.onTileDetailsClick(id);
        break;
      case EventType.TileMouseOver:
        this.onTileMouseOver(id);
        break;
      case EventType.TileMouseOut:
        this.onTileMouseOut(id);
        break;
      case EventType.TableSettings:
        this.onEditTableSettings();
      default:
        console.log("Unsupported event", event, id);
        break;
    }
  };
  validateSaveAs = key => {
    return new Promise((resolve, reject) => {
      Jumpto365API.findItemByKey(TABLENAME, key).then(result => {
        resolve({
          isValid: result.length === 0,
          message: "A Table with that key already exists"
        });
      });
    });
  };
  validateTableData = tableData => {
    return new Promise((resolve, reject) => {
      try {
        var data = JSON.parse(tableData);
        resolve({
          isValid: true,
          message: null
        });
      } catch (error) {
        resolve({
          isValid: false,
          message: error.message
        });
      }
    });
  };
  _calculateScaling = (tableHeight, tableWidth) => {
    if (
      this.state.tableHeight === tableHeight &&
      this.state.tableWidth === tableWidth
    ) {
      return;
    }
    tableWidth += 0;
    var scaleH = this.props.height / tableHeight;
    var scaleW = this.props.width / tableWidth;

    var scale = Math.min(scaleH, scaleW) * 0.9;

    var marginLeft = (this.props.width - scale * tableWidth) / 2;

    this._setState({
      tableHeight,
      tableWidth,
      scale,
      marginLeft,
      preRender: false
    });
  };

  showNextBleepMessage = () => {
    var bleepMessages = this.state.bleepMessages
      ? this.state.bleepMessages
      : [];
    if (this.state.bleepTimer) {
      clearTimeout(this.state.bleepTimer);
    }
    if (bleepMessages.length > 0) {
      var bleepMessage = bleepMessages[0];
      var bleepTimer = setTimeout(
        this.showNextBleepMessage,
        bleepMessage.millisecs
      );
      bleepMessages.splice(0, 1);
      console.log("Next bleep is", bleepMessage.message);
      this._setState({
        bleepMessage: bleepMessage.message,
        bleepMessages,
        bleepTimer
      });
    } else {
      this._setState({ bleepMessage: null, bleepTimer: null });
      console.log("Bleep away");
    }
  };

  postBleepMessage = (message, millisecs) => {
    console.log("postBleepMessage", message);

    var bleepMessages = this.state.bleepMessages
      ? this.state.bleepMessages
      : [];
    bleepMessages.push({ message, millisecs });
    this._setState({ bleepMessages });
    if (!this.state.bleepTimer) {
      this.state.bleepTimer = setTimeout(this.showNextBleepMessage, 1);
    }
  };
  render() {
    var tableSettings = this.tableGetSettings();

    return (
      <div
        style={{
          position: "relative",
          height: this.props.height,
          width: this.props.width
        }}
        className="TableContainerOuter"
      >
        {false && this.state.editMode && (
          <div
            onClick={() => {
              this._setState({ editMode: false });
            }}
            style={{
              position: "absolute",
              left: "2px",
              top: "2px",
              cursor: "pointer",
              color: "#888888"
            }}
          >
            You are currently in "Edit Tiles" mode
          </div>
        )}
        {false && this.state.relationsEditMode && (
          <div
            onClick={() => {
              this.setRelationsMode(false);
            }}
            style={{
              position: "absolute",
              left: "2px",
              top: "2px",
              cursor: "pointer",
              color: "#888888"
            }}
          >
            You are currently in "Edit Connections" mode
          </div>
        )}
        {this.state.hasError && (
          <div>
            <MessageBar
              messageBarType={MessageBarType.error}
              isMultiline={false}
              onDismiss={() => {
                this.clearError();
              }}
              dismissButtonAriaLabel="Close"
            >
              {this.state.errorMessage}
            </MessageBar>
          </div>
        )}
        <div
          className="TableContainerInner"
          style={{
            height: this.props.height,
            width: this.props.width
          }}
        >
          <div style={{ display: "flex" }}>
            <div
              style={{
                transformOrigin: " 0 0 0 ",
                transform: `scale(${this.state.scale})`
              }}
            >
              <Table
                registerTable={table => {
                  this._setState({ table });
                }}
                onSizeChange={(tableHeight, tableWidth) => {
                  this._calculateScaling(tableHeight, tableWidth);
                }}
                onTableEditorAction={this.dispatcher}
                onGroupClick={this.onGroupClick}
                onGroupOver={this.onGroupOver}
                onGroupOut={this.onGroupOut}
                onConnectorClick={this.onConnectorClick}
                marginLeft={this.state.marginLeft}
                connectingMode={this.state.selectingGroupMember}
                {...this.state}
                {...this.props}
                titleGraphicUrl={tableSettings.titlegraphics}
                gridClasses={this.state.gridClasses}
                grid={this.state.grid}
              />
            </div>
            {this.FEATURE_COMPANION && this.state.showCompanion && (
              <TableCompanion
                companions={this.state.companions}
                onAddCompanion={this.cmdTableOpenCompanion}
                height={this.props.height * 0.6}
                width={this.props.height * 0.8}
              />
            )}
            {(this.state.onTableOpen || this.state.onTableOpenCompanion) && (
              <TableOpenDialog
                tableName={TABLENAME}
                title={
                  this.state.onTableOpenCompanion
                    ? "Add an companion"
                    : "Open an existing Table"
                }
                label="Tag"
                context={this.props.context}
                placeholder="Integrated part of the Url"
                action={this.navigateTo}
                actionLabel="Open"
                onDismiss={() => {
                  this._setState({
                    onTableOpen: false,
                    onTableOpenCompanion: false
                  });
                }}
                onSelected={item => {
                  this._setState({
                    onTableOpen: false,
                    onTableOpenCompanion: false
                  });
                  navigate(`./${item.TableKey}`);
                }}
              />
            )}
            {this.state.onViewVersions && (
              <TableVersionsDialog
                tableName={TABLENAME}
                tableKey={this.props.tag.split("@")[0]}
                title="Versions"
                context={this.props.context}
                action={this.restoreVersion}
                actionLabel="Restore"
                onDismiss={() => {
                  this._setState({ onViewVersions: false });
                }}
                onSelected={versionTableKey => {
                  this._setState({ onViewVersions: false });
                  navigate(`./${versionTableKey}`);
                }}
              />
            )}
            {this.state.onViewPublishedVersions && (
              <TablePublishedVersionsDialog
                domain={this.props.domain}
                tag={this.props.tag}
                title="Published Versions"
                context={this.props.context}
                onDismiss={() => {
                  this._setState({ onViewPublishedVersions: false });
                }}
                onSelected={key => {
                  this._setState({ onViewPublishedVersions: false });
                  navigate(`../${this.props.domain}/${key}`);
                }}
              />
            )}
            {this.state.onSaveAs && (
              <TableDialog
                title="Save as"
                label="Tag"
                placeholder="Integrated part of the Url"
                validate={this.validateSaveAs}
                action={this.tableSaveAs}
                actionLabel="Save"
                onDismiss={() => {
                  this._setState({ onSaveAs: false });
                  if (this.props.saveas ==="1"){
                    navigate("/dashboard")
                  }
                }}
                onSuccess={newTag => {
                  this._setState({ onSaveAs: false });
                  navigate(`/@/${this.props.context.me.upn}/${newTag}`);
                }}
              />
            )}

            {this.state.onTableImport && (
              <TableImport
                title="Data loader"
                label="Data to import"
                placeholder="Paste content to import"
                validate={this.validateTableData}
                action={this.tableImport}
                actionLabel="Import"
                onDismiss={() => {
                  this._setState({ onTableImport: false });
                }}
                onSuccess={tableData => {
                  this._setState({ onTableImport: false });
                }}
              />
            )}

            {this.state.confirmAction && (
              <TableConfirm
                title="Please Confirm"
                question="Are you sure that you want to clear this tile? "
                onDismiss={() => {
                  this._setState({ confirmAction: false });
                }}
                onSuccess={() => {
                  this._setState({ confirmAction: false });
                  if (this.state.nextAction && this.state.nextAction.action) {
                    this.state.nextAction.action(
                      this.state.nextAction.id,
                      true
                    );
                    this._setState({ nextAction: {} });
                  }
                }}
              />
            )}

            {this.state.onTableExport && (
              <TableExport
                title="Data export"
                label="Data to export"
                value={json.plain(this.state.gridObject.export())}
                actionLabel="Done"
                onDismiss={() => {
                  this._setState({ onTableExport: false });
                }}
                onSuccess={tableData => {
                  this._setState({ onTableExport: false });
                }}
              />
            )}
            {this.state.onTablePublish && (
              <TablePublisher
                onDismiss={() => {
                  this._setState({ onTablePublish: false });
                }}
                sourceDomain={this.props.domain}
                targetDomain={this.props.context.me.domain}
                tag={this.props.tag}
              />
            )}
            {this.state.onCopyLink && (
              <TableCopyLink
                onDismiss={() => {
                  this._setState({ onCopyLink: false });
                }}
                domain={this.props.domain}
                tag={this.props.tag}
              />
            )}
            {this.state.selectCelltype && (
              <CellTypeSelector
                value={this.state.gridObject.getCellType(this.state.cellId)}
                onDismiss={() => {
                  this._setState({ selectCelltype: false });
                }}
                onSelected={cellType => {
                  console.log(
                    "Set celltype",
                    this.state.cellId,
                    "to",
                    cellType
                  );

                  this.cellSelectType(
                    this.state.cellId,

                    cellType
                  );
                  this._setState({ selectCelltype: false });

                  this.onCellEdit(this.state.cellId);
                }}
              />
            )}
            {this.state.editCellProperties && (
              <TileEditor
                value={this.cellGetTile(this.state.cellId)}
                context={this.props.context}
                onDismiss={() => {
                  this._setState({ editCellProperties: false });
                }}
                onSelected={tile => {
                  this.cellSetTile(this.state.cellId, tile);

                  this._setState({ editCellProperties: false });
                }}
              />
            )}
            {this.state.editGroupProperties && (
              <GroupPropertiesEditor
                group={this.cellGetGroupSetting(this.state.cellId)}
                context={this.props.context}
                onDismiss={() => {
                  this._setState({ editGroupProperties: false });
                }}
                updateProperties={(x, groupSetting) => {
                  this.cellSetGroupSetting(this.state.cellId, groupSetting);

                  this._setState({ editGroupProperties: false });
                }}
              />
            )}
            {this.state.editTableSettings && (
              <TablePropertiesEditor
                settings={this.tableGetSettings()}
                context={this.props.context}
                onDismiss={() => {
                  this._setState({ editTableSettings: false });
                }}
                onUpdate={(x, tableSettings) => {
                  this.tableSetSettings(tableSettings);

                  this._setState({ editTableSettings: false });
                }}
              />
            )}

            {this.state.browseDomain && (
              <MyTablesBrowser
                context={this.props.context}
                upn={this.props.domain}
                height={this.props.height}
                width={this.props.width}
              />
            )}
          </div>
        </div>

        {this.state.showInfo && (
          <div
            style={{
              padding: "20px",
              color: "white",
              backgroundColor: "green",
              position: "absolute",
              top: 0,
              right: 0,
              borderRadius: "5px"
            }}
          >
            width: {this.props.width} x height: {this.props.height}
            <div>
              Inner table dimensions
              <div>
                width: {this.state.tableWidth} x height:{" "}
                {this.state.tableHeight}
              </div>
              <div>margin: {this.state.marginLeft}</div>
              <div>scale: {this.state.scale}</div>
              <div>selecting members: {this.state.selectingGroupMember}</div>
              <div>current id: {this.state.selectedGroupId}</div>
              <div>group over: {this.state.groupOver}</div>
              <div>
                noneSelectedClassname {this.state.noneSelectedClassname}
              </div>
            </div>
          </div>
        )}

        {this.state.bleepMessage && (
          <div
            style={{
              padding: "5px",
              color: "grey",

              position: "absolute",
              top: 0,
              left: 0
            }}
          >
            {this.state.bleepMessage}
          </div>
        )}
      </div>
    );
  }
}
