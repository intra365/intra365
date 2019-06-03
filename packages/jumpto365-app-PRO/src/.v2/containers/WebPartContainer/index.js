import React, { Component } from "react";
import { navigate } from "@reach/router";
import WebPartEditorCommandBar from "./WebPartEditorCommandBar";
import WebPartDialog from "./WebPartDialog";
import WebPartObject from "./WebPartObject";
import { DefaultButton } from "office-ui-fabric-react";
import {
  MessageBar,
  MessageBarType
} from "office-ui-fabric-react/lib/MessageBar";
import WebPart from "../../components/WebPart";
import { EventType } from "../../components/WebPart/EventType";
import _ from "lodash";

import { TooltipHost } from "office-ui-fabric-react";
import Grid from "../TableContainer/Grid"

const Jumpto365API = require("../../services/Jumpto365API");

export default class WebPartContainer extends React.PureComponent {
  state = { editMode: false, onSelectCelltype: false, showInfo: false };
  


   /**
   * Key witin the $database
   */
  get $keyName(){
    return this.props.keyName
  }


   /**
   * ??
   */
  get $tag(){
    return this.props.tag
  }


  
 /**
   * Method called by parent container when it is ready to mount'
   * the Commandbar
   */
  get $registerCommandBar(){
    return this.props.registerCommandBar
  }
  /**
   * ??? 
   */
  get $setWebPartHeader(){
    return this.props.setWebPartHeader
  }
/**
   * Allowed height
   */
  get $height(){
    return this.props.height
  }
  /**
   * Allowed width
   */
  get $width(){
    return this.props.width
  }

  /**
   * Appolication context
   */
  get $context(){
    return this.props.context
  }
  /**
   * Update header
   */
  get $headerUpdated(){
    return this.props.headerUpdated
  }
 /**
   * in interaction mode?
   */
  get $editMode(){
    return this.props.editMode
  }


  get $canEdit (){
    return this.props.canEdit
  }
  
  /**
  * ?? 
  */

  get $showHeader(){
    return this.props.showHeader
  }
 /**
   * name ot the TABLE
   */
  tableName = () => {
    return "webparts";
  };

  keyName = () => {
    return this.props.keyName;
  };
  _setState = delta => {
    this.setState(delta);
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.keyName !== this.props.keyName) {
      this.load(this.props.keyName);
    }
  }

  componentDidMount() {
    this.load(this.props.keyName);
  }

  raiseError = message => {
    this._setState({ hasError: true, errorMessage: message });
  };

  clearError = () => {
    this._setState({ hasError: false, errorMessage: null });
  };
  load = keyName => {
    if (keyName === this.state.keyName) return;

    //this.registerCommandBar(keyName);
    this.clearError();
  

 

    this._setState({ keyName });
    var isNew = keyName === "(new)";
    if (isNew) {
      this.webPartNew();
    } else {
      this.webPartOpen(this.$tag,this.$keyName);
    }
  };

  cmdWebPartNew = canExecute => {
    if (canExecute) return true;
    navigate("./(new)");
  };
  cmdWebPartRename = canExecute => {
    if (canExecute) return false;
  };
  cmdWebPartDelete = canExecute => {
    if (canExecute) return false;
  };
  cmdWebPartOpen = canExecute => {
    if (canExecute) return true;
    this._setState({ onWebPartOpen: true });
  };

  cmdWebPartSave = canExecute => {
    if (canExecute) return true;
    this.webPartSave();
  };

  cmdWebPartSaveAs = canExecute => {
    if (canExecute) return true;
    this._setState({ onSaveAs: true });
  };

  cmdWebPartEdit = canExecute => {
    if (canExecute) return true;

    this.setEditMode(!this.state.editMode);
  };

  onTileClicked = (tag,tileId) =>{
    console.log("onTileClicked",tag,tileId)
    navigate(`../${tag}/${tileId}`)
  }

  setEditMode = editMode => {
    this._setState({ editMode });
  };


  setWebPartHeader = (tile) => {
    if (!tile) return
    if (!this.$setWebPartHeader) return
    
    this.$setWebPartHeader((
    <div>
          <div
            style={{
                display:"flex",
              backgroundColor: tile.color,
              color: tile.textcolor,
              marginLeft:"-8px",
              marginRight:"-8px",              
              marginBottom:"8px",
              padding: "8px",
              minHeight:"58px"

            }}
          >
            <div style={{ margin: "8px" ,flexGrow:"5"}}>
            <div style={{display:"flex"}}>
          {tile.icon && 
               <div> <img style={{height:"36px",width:"auto",marginLeft:"16px"}} src={tile.icon}></img></div>
               }
              <div className="ms-font-xxl	" style={{lineHeight:"36px",marginLeft:"16px"}}>{tile.title}</div>
              </div>
            </div>
            <div style={{ margin: "8px",marginBottom:"-4px" }}>
            {tile.jumpto && 
            
            <DefaultButton
            split={false}
            style={{ marginBottom: "10px" }}
            target="_blank"
            href={tile.jumpto}
            text="Jump to"
            xmenuProps={{
              items: [
                {
                  key: "emailMessage",
                  text: "Email message",
                  iconProps: { iconName: "Mail" }
                },
                {
                  key: "calendarEvent",
                  text: "Calendar event",
                  iconProps: { iconName: "Calendar" }
                }
              ]
            }}

          />
        }
                </div>
          </div>
          </div>))
  }
  registerCommandBar = (webPartName, tableName) => {
    if (this.$registerCommandBar) {
      this.$registerCommandBar(
        this,
        <WebPartEditorCommandBar
          webPartName={webPartName}
          tableName={tableName}
          WebPartContainer={this}
        />
      );
    }
  };
  tileClicked = (tag,tileId) => {
    
    navigate(`../${tag}/${tileId}`)
  }

  tableFullScreenClicked= (domain,tag) => {
    
    navigate(`../${tag}`)
  }
  registerTableContainer= (tableContainer) =>{
    
    this._setState({tableContainer})

  }
  associateWebPartWithUrl = (tag,keyName,url)=>{
    

      return this.webPartSave(tag,keyName,url)

     

  }
  webPartNew = () => {
    var webPartObject = new WebPartObject();
    this._setState({ webPart: webPartObject.webPart, webPartObject });
  };
  webPartOpen = (tag,keyName) => {
    
    var webPartObject = new WebPartObject();
    this._setState({ webPart: webPartObject.webPart, webPartObject });
    Jumpto365API.systemFindItemByKey(this.tableName(), tag+":"+keyName)
    .then(result => {
      if (result.length !== 1) {
        if (this.state.webPartLoader){
          this.state.webPartLoader(null)
        }
       
        return
      }

      //this.registerCommandBar(keyName, tableName);

      try {
        
        var data = result[0]
        
        if (this.state.webPartLoader){
          this.state.webPartLoader(data)
        }

       
      } catch (error) {
        return this.raiseError(error.message);
      }
    })
    .catch(error => {
      this.raiseError(error.message);
    });


  };
  webPartSave = (tag,keyName,url) => {
    
   
    var item = {
      key: tag+":"+keyName,
      title: "Default",
      url
      
    };

    return Jumpto365API.systemItemPatch(this.tableName(), item);
  };
  webPartSaveAs = (tag,keyName,url) => {
    var file = this.state.webPartObject ? this.state.webPartObject.export() : null;
    var item = {
      key:tag+":"+keyName,
      title: "Default",
      url
    };

    return Jumpto365API.systemItemPatch(this.tableName(), item);
  };
  refreshWebPart = () => {
    if (!this.state.webPartObject) return;
    this._setState({ webPart: this.state.webPartObject.webPart });
  };

  dispatcher = (event, id) => {
    switch (event) {
      default:
        console.log("Unsupported event", event, id);
        break;
    }
  };
  validateSaveAs = keyName => {
    return new Promise((resolve, reject) => {
      Jumpto365API.findItemByKey(this.tableName(), keyName).then(result => {
        resolve({
          isValid: result.length === 0,
          message: "A WebPart with that key already exists"
        });
      });
    });
  };

  _calculateScaling = (webPartHeight, webPartWidth) => {
    if (
      this.state.webPartHeight === webPartHeight &&
      this.state.webPartWidth === webPartWidth
    )
      return;

    var scaleH = this.$height / webPartHeight;
    var scaleW = this.$width / webPartWidth;
    var scale = Math.min(scaleH, scaleW);

    this._setState({ webPartHeight, webPartWidth, scale });
  };
  get userSettings (){
    
   return this.$context && this.$context.me && this.$context.me.JSON
        ? JSON.parse(context.me.JSON)
        : {};
  }
  
  get canEdit (){

  return this.userSettings.canSystemEdit? true  :false
    
  }
  render() {
    var tile = this.state.tile ? this.state.tile : {}

    return (
      <div style={{ position: "relative" }}>

          
        

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
          style={{
            xbackgroundColor: "red"
          }}
        >
          <WebPart
          associateWebPartWithUrl={
            this.associateWebPartWithUrl
          }
          registerLoader={webPartLoader => {
            
              this._setState({ webPartLoader });
            }}
            
            onSizeChange={(webPartHeight, webPartWidth) => {
              this._calculateScaling(webPartHeight, webPartWidth);
            }}
            onWebPartEditorAction={this.dispatcher}
            context={this.$context}
            
            {...this.props}
            {...this._methods}
            canEdit={this.canEdit}
            headerUpdated={this.$headerUpdated}
            contentRef={tile.contentRef}
            tile={tile}
            tileId={this.$tileId}
            onTileClicked={this.onTileClicked}
            onTableFullScreen={this.tableFullScreenClicked}
            editMode={this.$editMode}
            showHeader = {this.$showHeader}
            webPart={this.state.webPart}
          />
        </div>

        {this.state.onSaveAs && (
          <WebPartDialog
            title="Save a copy"
            label="Key"
            placeholder="Integrated part of the Url"
            validate={this.validateSaveAs}
            action={this.webPartSaveAs}
            actionLabel="Save"
            onDismiss={() => {
              this._setState({ onSaveAs: false });
            }}
            onSuccess={newKey => {
              this._setState({ onSaveAs: false });
              navigate(`./${newKey}`);
            }}
          />
        )}

        

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
            width: {this.$width} x height: {this.$height}
            <div>
              Inner webPart dimensions
              <div>
                width: {this.state.webPartWidth} x height: {this.state.webPartHeight}
              </div>
              <div>scale: {this.state.scale}</div>
            </div>
          </div>
        )}
      </div>
    );
  }
}
