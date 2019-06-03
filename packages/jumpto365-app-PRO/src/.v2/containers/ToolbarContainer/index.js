import React, { Component } from "react";
import Toolbar from "../../components/Toolbar";
import { navigate } from "@reach/router";
import ToolbarEditorCommandBar from "./ToolbarEditorCommandBar";
import ToolbarDialog from "./ToolbarDialog";
import ToolbarOpenDialog from "./ToolbarOpenDialog";

import CellTypeSelector, {
  CellType
} from "../../components/Toolbar/CellTypeSelector";

import { TileEditor } from "../../logic/TileEditors";
import { GroupPropertiesEditor } from "../../logic/GroupEditor";
import { ToolbarPropertiesEditor } from "../../logic/ToolbarEditors";
import {
  MessageBar,
  MessageBarType
} from "office-ui-fabric-react/lib/MessageBar";
import { EventType } from "../../components/Toolbar/EventType";
import _ from "lodash";
import Tree from "./Tree";
import { TooltipHost } from "office-ui-fabric-react";
import ToolbarImport from "./ToolbarImport";
import ToolbarExport from "./ToolbarExport";
import ToolbarPublisher from "./ToolbarPublisher";
import ToolbarCopyLink from "./ToolbarCopyLink";
import ToolbarConfirm from "./ToolbarConfirm";
import json from "format-json";
import ToolbarVersionsDialog from "./ToolbarVersionsDialog";
import ToolbarPublishedVersionsDialog from "./ToolbarPublishedVersionsDialog";
import MyToolbarsBrowser from "../../components/MyToolbarsBrowser";
import ToolbarCompanion from "./ToolbarCompanion";

const Jumpto365Service = require("../../services").default;
const Jumpto365API = require("../../services/Jumpto365API");
const ToolbarNAME = "Toolbar";

export default class ToolbarContainer extends React.PureComponent {
  constructor(props) {
    super(props);
    var context = this.props.context;
    var userSettings =
      context && context.me && context.me.JSON
        ? JSON.parse(context.me.JSON)
        : {};

    this.state = {
      editMode: false,
      onSelectCelltype: false,
      showInfo: false,
      treeClasses: {},
      isDeveloper: userSettings.developer,
      canEdit: userSettings.canEdit
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
    // this.load(this.props.tag);
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
      this.ToolbarNew();
    } else {
      this.ToolbarOpen(tag);
    }
  };
  cmdImportToolbar = canExecute => {
    if (canExecute) return true;
    this._setState({ onToolbarImport: true });
  };
  cmdExportToolbar = canExecute => {
    if (canExecute) return true;
    this._setState({ onToolbarExport: true });
  };
  cmdToolbarNew = canExecute => {
    if (canExecute) return true;
    navigate("./(new)");
  };
  cmdToolbarRename = canExecute => {
    if (canExecute) return false;
  };
  cmdToolbarDelete = canExecute => {
    if (canExecute) return false;
  };
  cmdToolbarOpen = canExecute => {
    if (canExecute) return true;
    this._setState({ onToolbarOpen: true });
  };
  cmdToolbarOpenCompanion = canExecute => {
    if (canExecute) return true;
    if (!this.FEATURE_COMPANION) return;
    this._setState({ onToolbarOpenCompanion: true });
  };

  cmdViewVersions = canExecute => {
    if (canExecute) return true;
    this._setState({ onViewVersions: true });
  };
  cmdViewPublishedVersions = canExecute => {
    if (canExecute) return true;
    this._setState({ onViewPublishedVersions: true });
  };

  cmdToolbarSave = canExecute => {
    if (canExecute) return true;
    if (this.state.tag === "(new)") {
      this.cmdToolbarSaveAs();
    } else {
      this.ToolbarSave();
    }
  };

  cmdToolbarSaveAs = canExecute => {
    if (canExecute) return true;
    this._setState({ onToolbarAs: true });
  };
  cmdToolbarProperties = canExecute => {
    if (canExecute) return true;
    this.onEditToolbarSettings();
  };
  cmdRelationsEdit = canExecute => {
    if (canExecute) return true;

    this.setRelationsMode(!this.state.relationsEditMode);
  };
  setRelationsMode = relationsEditMode => {
    if (this.state.selectingGroupMember) {
      return;
    }
    this.registerCommandBar(this.props.tag, this.state.viewMode, false);
    if (!relationsEditMode) {
      this.refreshTree(true);
    }
    this._setState({ relationsEditMode, editMode: false });
  };
  cmdToolbarEdit = canExecute => {
    if (canExecute) return true;

    this.setEditMode(!this.state.editMode);
  };
  cmdToolbarPublish = canExecute => {
    if (canExecute) return true;

    this._setState({ onToolbarPublish: true });
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
      this.refreshTree(true);
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
  registerCommandBar = (ToolbarName, editConnections, editTiles) => {
    if (this.props.registerCommandBar) {
      if (this.isEdiToolbar) {
        this.props.registerCommandBar(
          this,
          <ToolbarEditorCommandBar
            ToolbarName={ToolbarName}
            ToolbarContainer={this}
            editConnections={editConnections}
            editTiles={editTiles}
            onSelectView={(viewMode=>{this.setState({viewMode})})}
          />
        );
      } else {
        this.props.registerCommandBar(
          this,
          <ToolbarEditorCommandBar
            viewMode
            ToolbarName={ToolbarName}
            ToolbarContainer={this}
            editConnections={editConnections}
            editTiles={editTiles}
            onSelectView={(viewMode=>{this.setState({viewMode})})}
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
    var cellType = this.state.treeObject.getCellType(id);
    console.log("onCellEdit", cellType);

    switch (cellType) {
      case CellType.Full:
        this._setState({ editCellProperties: true, cellId: id });
        break;
      case CellType.Title:
        this._setState({ editToolbarSettings: true, cellId: id });
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
    var copiedCell = this.state.treeObject.copyCell(id);
    this._setState({ copiedCell });
  };
  onCellCut = id => {
    var copiedCell = this.state.treeObject.copyCell(id);
    this.state.treeObject.clearCell(id);
    this.refreshTree(false);
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

    this.state.treeObject.clearCell(id);
    this.refreshTree(true);
    this._forceUpdate();
  };
  onCellPaste = id => {
    var copiedCell = this.state.copiedCell;
    if (!copiedCell) return;
    this.state.treeObject.pasteCell(id, copiedCell);
    this.refreshTree(true);
    this._forceUpdate();
  };
  onCellSelectType = id => {
    var cellType = this.state.treeObject.getCellType(id);
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
    alert("onTileDetailsClick Not implemented");
    //navigate(`/@/${this.props.domain}/${this.state.tag}/${id}`);
  };
  onTileClick = id => {
    if (this.state.selectedGroupId) {
      console.log("Tile clicked", id);
      this.state.treeObject
        .toggleMemberShip(this.state.selectedGroupId, id)
        .then(() => {
          console.log(
            "None members",
            this.state.treeObject.getNoneMembers(this.state.selectedGroupId)
          );
          this.calcCellStates(
            this.state.selectedGroupId,
            this.state.noneSelectedClassname
          );
        });
    } else {
      if (!this.props.interactMode) {
        var tile = this.state.treeObject.getCellTile(id);
        if (tile.contentRef) {
          alert("onTileClick - contentRef navigate to Not implemented");
          // navigate(`./${this.state.tag}/${id}`);
        }
        // if (this.props.onTileClicked) {
        //   this.props.onTileClicked(this.state.tag, id);
        // } else {
        //   var tile = this.state.treeObject.getCellTile(id);
        //   if (tile && tile.jumpto) {
        //     window.open(tile.jumpto, "_blank");
        //   }

        // }
      } else {
        if (this.state.editMode) {
          this.onCellEdit(id);
        } else {
          alert("Navigate Not implemented");
          // navigate(`./${this.state.tag}/${id}`);
        }
      }
    }
  };
  onEditToolbarSettings = () => {
    this._setState({ editToolbarSettings: true });
  };
  onGroupClick = id => {
    if (!this.props.interactMode) return;

    if (!this.state.relationsEditMode) {
      //this.onCellEdit(id);
      return;
    }
    var groupSettings = this.state.treeObject.getGroupSetting(id);
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
    var groupSettings = this.state.treeObject.getGroupSetting(
      this.state.selectedGroupId
    );
    console.log("onConnectorClick", id, groupSettings);
    if (!groupSettings) {
      return console.log("No group settings");
    }
    if (!this.state.selectingGroupMember) {
      return console.log("Not in group selecting mode");
    }
    this.state.treeObject.toggleCellConnector(
      id,
      direction,
      groupSettings.color
    );
    this.refreshTree(false);
    this._forceUpdate();
  };

  onGroupOver = id => {
    var groupSettings = this.state.treeObject.getGroupSetting(id);
    if (!groupSettings) {
      return;
    }
    if (!this.state.selectingGroupMember && groupSettings) {
      this._setState({
        selectedGroupId: id,
        noneSelectedClassname: "cellDimmed",
        groupOver: true
      });
      var cell = this.state.treeObject.getGroupSetting(id);
      console.log("onGroupOver", id, cell);
      this.calcCellStates(id, "cellDimmed");
    }
  };
  onGroupOut = id => {
    if (this.state.groupOver && !this.state.selectingGroupMember) {
      var cell = this.state.treeObject.getGroupSetting(id);
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
    var treeClasses = {};
    if (groupId) {
      this.state.treeObject.getNoneMembers(groupId).forEach(id => {
        treeClasses[id] = { className: noneSelectedClassname };
      });
      this._setState({ treeClasses });
      console.log("calcCellStates", treeClasses);
    } else {
      this._setState({ treeClasses });
      console.log("calcCellStates", treeClasses);
    }
  };

  cellSetTile = (id, tile) => {
    if (!this.state.treeObject) return;
    this.state.treeObject.setCellTile(id, tile);
    this.refreshTree(true);
  };
  ToolbarSetSettings = settings => {
    if (!this.state.treeObject) return;
    this.state.treeObject.setToolbarSettings(
      settings.title,
      settings.teaser,
      settings.titlegraphics,
      settings.backgroundColor,
      settings.textColor,
      settings.isProtected
    );
    this.refreshTree(true);
  };
  ToolbarGetSettings = () => {
    return {};
    if (!this.state.treeObject) return {};
    var settings = this.state.treeObject.getToolbarSettings();
    return settings;
  };
  cellSetGroupSetting = (id, groupSetting) => {
    if (!this.state.treeObject) return;
    this.state.treeObject.setGroupSetting(id, groupSetting);
    this.refreshTree(true);
  };
  cellGetGroupSetting = id => {
    if (!this.state.treeObject) return;
    var groupSetting = this.state.treeObject.getGroupSetting(id);
    return groupSetting;
  };

  associateTileWithUrl = (id, url) => {
    return new Promise((resolve, reject) => {
      if (!this.state.treeObject) return resolve();
      this.state.treeObject.setContentRef(id, url);

      this.ToolbarSave();
    });
  };
  cellGetTile = id => {
    if (!this.state.treeObject) return {};
    var tile = this.state.treeObject.getCellTile(id);

    return tile;
  };
  cellSelectType = (id, cellType) => {
    if (!this.state.treeObject) return;
    this.state.treeObject.setCellType(id, cellType);
    this.refreshTree(true);
  };

  ToolbarNew = () => {
    return alert("New Not implemented");
    var treeObject = new Tree(5, 8);
    this._setState({
      tree: treeObject.tree,
      treeObject,
      editMode: true,
      onToolbarAs: true
    });
    if (this.state.commandBar) {
      this.state.commandBar.setState({ selectedKey: "edit" });
    }
  };
  registerToolbarContainer = () => {
    if (this.props.registerToolbarContainer) {
      this.props.registerToolbarContainer(this);
    }
  };
  get isEdiToolbar() {
    return this.props.domain && this.props.domain.indexOf("@") > -1
      ? true
      : false;
  }
  ToolbarOpen = tag => {
    return new Promise(async (resolve, reject) => {
      //   var treeObject = new Tree();
      //   this._setState({ tree: treeObject.tree, treeObject });

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
              ToolbarNAME,
              tag
            ).then(result => {
             
              if (result.length < 1) {
                return reject("Could not load Toolbar");
              }
              
              var data = JSON.parse(atob( result[0].Base64));
             // debugger
              if (data.base64file){
               data.file = decodeURIComponent(escape(window.atob(data.base64file)))
                
              } 
             
             // var data = JSON.parse(result[0].Json);
             
              resolve(data);
            });
          }
        });
      };

      getData()
        .then(data => {
          this.registerCommandBar(tag);
          this.registerToolbarContainer();
          try {
            var treeObject = this.state.treeObject;
            if (!treeObject) {
              this.raiseError("Tree object not initializied ");
              return resolve({
                hasError: true,
                message: "Tree object not initializied"
              });
            }
            if (!treeObject.import(data)) {
              this.raiseError("Could not load ");
              return resolve({ hasError: true, message: "Could not load" });
            }

            //var tree = treeObject.tree;

            var onToolbarAs = this.props.Toolbaras === "1" ? true : false;

            this._setState({
              hasError: false,
              tag,
              //tree,
              treeObject,
              editMode: false,
              onToolbarOpen: false,
              preRender: true,
              onToolbarAs
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

  ToolbarOpenCompanion = tag => {
    return new Promise(async (resolve, reject) => {
      var companions = this.state.companions ? this.state.companions : [];
      companions.push(tag);
      this._setState({ companions });
    });
  };
  navigateTo = tag => {
    return new Promise((resolve, reject) => {
      this._setState({ onToolbarOpen: false, onToolbarOpenCompanion: false });
      if (this.state.onToolbarOpenCompanion) {
        this.ToolbarOpenCompanion(tag);
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
        ToolbarNAME,
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
  ToolbarImport = fileData => {
    return new Promise((resolve, reject) => {
      var treeObject = this.state.treeObject;

      if (!treeObject.import({ file: fileData })) {
        return this.raiseError("Could not load ");
      }

      this._setState({ preRender: true });
      this.setEditMode(true);
      this.ToolbarSave(treeObject);
      resolve();
    });
  };
  ToolbarSave = specificTreeObject => {
    if (this.props.tag === "(new") {
      return this.cmdToolbarSaveAs();
    }
    var treeObject = specificTreeObject
      ? specificTreeObject
      : this.state.treeObject;

    var file = treeObject ? treeObject.export() : null;

    //var base64file =  new Buffer(file).toString("base64");
    var base64file = btoa(unescape(encodeURIComponent(file)))
    var item = {
      key: this.props.tag,
      title: "Default",
      file,
      base64file
    };

    Jumpto365API.itemPatch(ToolbarNAME, item).then(() => {
      this.postBleepMessage("Toolbard", 600);
      if (this.props.tag && this.props.tag.indexOf("@") > -1) {
        alert("Not implemented");
        //this.navigateTo(this.props.tag.split("@")[0]);
      }
    });
  };
  ToolbarSaveAs = tag => {
    var file = this.state.treeObject ? this.state.treeObject.export() : null;
    var item = {
      key: tag,
      title: "Default",
      file
    };

    return Jumpto365API.itemPatch(ToolbarNAME, item);
  };
  refreshTree = Toolbar => {
    if (!this.state.treeObject) return;
    this.ToolbarSave();
    this._setState({ tree: this.state.treeObject.tree });
  };
  columnDelete = columnNumber => {
    this.state.treeObject.columnDelete(columnNumber);

    this.refreshTree(true);
  };
  columnInsertAfter = columnNumber => {
    this.state.treeObject.columnInsertAfter(columnNumber);
    this.refreshTree(true);
  };

  columnInsertBefore = columnNumber => {
    this.state.treeObject.columnInsertBefore(columnNumber);
    this.refreshTree(true);
  };
  columnMoveLeft = columnNumber => {};
  columnMoveRight = columnNumber => {};
  rowDelete = rowNumber => {
    this.state.treeObject.rowDelete(rowNumber);
    this.refreshTree(true);
  };
  rowInsertAfter = rowNumber => {
    this.state.treeObject.rowInsertAfter(rowNumber);
    this.refreshTree(true);
  };
  rowInsertBefore = rowNumber => {
    this.state.treeObject.rowInsertBefore(rowNumber);
    this.refreshTree(true);
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
      case EventType.ToolbarSettings:
        this.onEditToolbarSettings();
      default:
        console.log("Unsupported event", event, id);
        break;
    }
  };
  validateToolbarAs = key => {
    return new Promise((resolve, reject) => {
      Jumpto365API.findItemByKey(ToolbarNAME, key).then(result => {
        resolve({
          isValid: result.length === 0,
          message: "A Toolbar with that key already exists"
        });
      });
    });
  };
  validateToolbarData = ToolbarData => {
    return new Promise((resolve, reject) => {
      try {
        var data = JSON.parse(ToolbarData);
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
  _calculateScaling = (ToolbarHeight, ToolbarWidth) => {
    if (
      this.state.ToolbarHeight === ToolbarHeight &&
      this.state.ToolbarWidth === ToolbarWidth
    ) {
      return;
    }
    ToolbarWidth += 0;
    var scaleH = this.props.height / ToolbarHeight;
    var scaleW = this.props.width / ToolbarWidth;

    var scale = Math.min(scaleH, scaleW) * 0.9;

    var marginLeft = (this.props.width - scale * ToolbarWidth) / 2;

    this._setState({
      ToolbarHeight,
      ToolbarWidth,
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
    var ToolbarSettings = this.ToolbarGetSettings();

    return (
      <div
        style={{
          position: "relative",
          height: this.props.height,
          width: this.props.width
        }}
        className="ToolbarContainerOuter"
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
        {false && this.state.hasError && (
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
          className="ToolbarContainerInner"
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
              <Toolbar
                registerToolbar={Toolbar => {
                  this._setState({ treeObject: Toolbar });
                  this.load(this.props.tag);
                }}
                onSizeChange={(ToolbarHeight, ToolbarWidth) => {
                  this._calculateScaling(ToolbarHeight, ToolbarWidth);
                }}
                onToolbarEditorAction={this.dispatcher}
                onGroupClick={this.onGroupClick}
                onGroupOver={this.onGroupOver}
                onGroupOut={this.onGroupOut}
                onConnectorClick={this.onConnectorClick}
                marginLeft={this.state.marginLeft}
                connectingMode={this.state.selectingGroupMember}
                {...this.state}
                {...this.props}
                titleGraphicUrl={ToolbarSettings.titlegraphics}
                treeClasses={this.state.treeClasses}
                tree={this.state.tree}
              />
            </div>
            {this.FEATURE_COMPANION && this.state.showCompanion && (
              <ToolbarCompanion
                companions={this.state.companions}
                onAddCompanion={this.cmdToolbarOpenCompanion}
                height={this.props.height * 0.6}
                width={this.props.height * 0.8}
              />
            )}
            {(this.state.onToolbarOpen ||
              this.state.onToolbarOpenCompanion) && (
              <ToolbarOpenDialog
                ToolbarName={ToolbarNAME}
                title={
                  this.state.onToolbarOpenCompanion
                    ? "Add an companion"
                    : "Open an existing Toolbar"
                }
                label="Tag"
                context={this.props.context}
                placeholder="Integrated part of the Url"
                action={this.navigateTo}
                actionLabel="Open"
                onDismiss={() => {
                  this._setState({
                    onToolbarOpen: false,
                    onToolbarOpenCompanion: false
                  });
                }}
                onSelected={item => {
                  debugger
                  this._setState({
                    onToolbarOpen: false,
                    onToolbarOpenCompanion: false
                  });
                  navigate(`./${item.TableKey}`);
                }}
              />
            )}
            {this.state.onViewVersions && (
              <ToolbarVersionsDialog
                ToolbarName={ToolbarNAME}
                ToolbarKey={this.props.tag.split("@")[0]}
                title="Versions"
                context={this.props.context}
                action={this.restoreVersion}
                actionLabel="Restore"
                onDismiss={() => {
                  this._setState({ onViewVersions: false });
                }}
                onSelected={versionToolbarKey => {
                  this._setState({ onViewVersions: false });
                  navigate(`./${versionToolbarKey}`);
                }}
              />
            )}
            {this.state.onViewPublishedVersions && (
              <ToolbarPublishedVersionsDialog
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
            {this.state.onToolbarAs && (
              <ToolbarDialog
                title="Save as"
                label="Tag"
                placeholder="Integrated part of the Url"
                validate={this.validateToolbarAs}
                action={this.ToolbarSaveAs}
                actionLabel="Save"
                onDismiss={() => {
                  this._setState({ onToolbarAs: false });
                  if (this.props.Toolbaras === "1") {
                    navigate("/dashboard");
                  }
                }}
                onSuccess={newTag => {
                  this._setState({ onToolbarAs: false });
                  navigate(`/toolbar/${this.props.context.me.upn}/${newTag}`);
                }}
              />
            )}

            {this.state.onToolbarImport && (
              <ToolbarImport
                title="Data loader"
                label="Data to import"
                placeholder="Paste content to import"
                validate={this.validateToolbarData}
                action={this.ToolbarImport}
                actionLabel="Import"
                onDismiss={() => {
                  this._setState({ onToolbarImport: false });
                }}
                onSuccess={ToolbarData => {
                  this._setState({ onToolbarImport: false });
                }}
              />
            )}

            {this.state.confirmAction && (
              <ToolbarConfirm
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

            {this.state.onToolbarExport && this.state.treeObject && (
              <ToolbarExport
                title="Data export"
                label="Data to export"
                value={this.state.treeObject.export()}
                actionLabel="Done"
                onDismiss={() => {
                  this._setState({ onToolbarExport: false });
                }}
                onSuccess={ToolbarData => {
                  this._setState({ onToolbarExport: false });
                }}
              />
            )}
            {this.state.onToolbarPublish && (
              <ToolbarPublisher
                onDismiss={() => {
                  this._setState({ onToolbarPublish: false });
                }}
                sourceDomain={this.props.domain}
                targetDomain={this.props.context.me.domain}
                tag={this.props.tag}
              file = {this.state.treeObject ? this.state.treeObject.export() : null}
              />
            )}
            {this.state.onCopyLink && (
              <ToolbarCopyLink
                onDismiss={() => {
                  this._setState({ onCopyLink: false });
                }}
                domain={this.props.domain}
                tag={this.props.tag}
              />
            )}
            {this.state.selectCelltype && (
              <CellTypeSelector
                value={this.state.treeObject.getCellType(this.state.cellId)}
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
            {this.state.editToolbarSettings && (
              <ToolbarPropertiesEditor
                settings={this.ToolbarGetSettings()}
                context={this.props.context}
                onDismiss={() => {
                  this._setState({ editToolbarSettings: false });
                }}
                onUpdate={(x, ToolbarSettings) => {
                  this.ToolbarSetSettings(ToolbarSettings);

                  this._setState({ editToolbarSettings: false });
                }}
              />
            )}

            {this.state.browseDomain && (
              <MyToolbarsBrowser
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
              Inner Toolbar dimensions
              <div>
                width: {this.state.ToolbarWidth} x height:{" "}
                {this.state.ToolbarHeight}
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
