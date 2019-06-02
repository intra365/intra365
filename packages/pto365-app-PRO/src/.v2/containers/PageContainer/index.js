import React, { Component } from "react";
import { navigate } from "@reach/router";
import PageEditorCommandBar from "./PageEditorCommandBar";
import PageDialog from "./PageDialog";
import PageObject from "./Page";
import { DefaultButton } from "office-ui-fabric-react";
import {
  MessageBar,
  MessageBarType
} from "office-ui-fabric-react/lib/MessageBar";
import Page from "../../components/Page";
import { EventType } from "../../components/Page/EventType";
import _ from "lodash";

import { TooltipHost } from "office-ui-fabric-react";
import Grid from "../TableContainer/Grid"
import {convertToRaw,convertFromRaw, EditorState} from "draft-js"
import {createEditorState} from "medium-draft"
import GridObject from "../TableContainer/Grid"

const Jumpto365API = require("../../services/Jumpto365API");
const Jumpto365Service = require("../../services").default;
export default class PageContainer extends React.PureComponent {
  state = { editMode: false, onSelectCelltype: false, showInfo: false };

  get $showHeader(){return this.props.showHeader}
  get $context () {return this.props.context}
  get $height () {return this.props.height}
  get $width () {return this.props.width}
  get $domain () {return this.props.domain}
  get $tag () {return this.props.tag}
  get $tileId () {return this.props.keyName}
  get $database () {return this.props.database}
  get $keyName () {return this.props.keyName}
  get $interactMode () {return editor.on}
  get $headerUpdated () {return this.state.headerUpdated}
  get $setPageHeader () {return this.props.setPageHeader}
  get $registerCommandBar () {this.props.registerCommandBar}
  
  
  tableName = () => {
    return this.props.database ? this.props.database : "pages";
  };

  get databaseKeyName (){
    return this.$tag +"|" + this.$keyName;
  };
  _setState = delta => {
    this.setState(delta);
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.keyName !== this.props.keyName) {
      this.load(this.databaseKeyName);
    }
  }

  componentDidMount() {
    this.load(this.databaseKeyName);
  }

  raiseError = message => {
    this._setState({ hasError: true, errorMessage: message });
  };

  clearError = () => {
    this._setState({ hasError: false, errorMessage: null });
  };
  load = databaseKeyName => {
    if (databaseKeyName === this.state.databaseKeyName) return;

    this.registerCommandBar(databaseKeyName);
    this.clearError();
    this.pageOpen(databaseKeyName)
    this._setState({ databaseKeyName });

    
  };

 
  cmdPageDelete = canExecute => {
    if (canExecute) return false;
  };
  
  cmdPageSave = canExecute => {
    if (canExecute) return true;
    this.pageSave();
  };
  cmdPageOpen= canExecute => {
    if (canExecute) return true;
    this.pageOpen(this.databaseKeyName);
  };

  
  cmdPageEdit = canExecute => {
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


  setPageHeader = (tile) => {
    if (!tile) return
    if (!this.props.setPageHeader) return
    
    this.props.setPageHeader((
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
            {false && tile.jumpto && 
            
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
  registerCommandBar = (pageName, tableName) => {
    return
    if (this.props.registerCommandBar) {
      this.props.registerCommandBar(
        this,
        <PageEditorCommandBar
          pageName={pageName}
          tableName={tableName}
          PageContainer={this}
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
  associateTileWithUrl = (tag,keyName,url)=>{
    debugger
    return new Promise((resolve,reject)=>{
      if (this.state.tableContainer){
        
        this.state.tableContainer.associateTileWithUrl(keyName,url)
        .then(()=>{
          resolve()
        })

      }


resolve()
    })

  }

  onFileDropped = (fileData) =>{
    debugger
    var file = fileData.files[0]
    return Jumpto365API.uploadFileToBlob(file,file.name,this.$context.me.upn)
    
  }
  pageNew = () => {
    var pageObject = new PageObject();
    this._setState({ page: pageObject.page, pageObject });
  };
  pageOpen = () => {

    if (this.props.isRoot) {
      debugger
      var jumpto365Service = new Jumpto365Service();
      return jumpto365Service
        .getFile("hexatown", "docs", "contexts", `${this.$tag}/index.json`)
        .then(result => {
       
    
          var data = { file: result }
      
          var gridObject = new GridObject()
          gridObject.import(data)
          var tile = gridObject.getCellTile(this.$tileId)
          var relations=  gridObject.getRelations(this.$tileId)
          this.setPageHeader(tile)
          this._setState({tile,relations})
        });
      }
    if (this.$domain && this.$domain.indexOf("@") < 0) {
      return Jumpto365API.getGlobalTenant(this.$domain, this.$tag)
      .then(result => {
       
    
        var data = { file: result }
    
        var gridObject = new GridObject()
        gridObject.import(data)
        var tile = gridObject.getCellTile(this.$tileId)
        var relations=  gridObject.getRelations(this.$tileId)
        this.setPageHeader(tile)
        this._setState({tile,relations})
      });
    }
   // this._setState({isLoading:true})
   Jumpto365API.findItemByKeyGlobally(this.$domain, "Table", this.$tag)
   .then(result => {
    if (result.length < 1) {
      return this.raiseError("Table not found")
    }
    
    var data = JSON.parse(result[0].Json);

  

    var gridObject = new GridObject()
    gridObject.import(data)
    var tile = gridObject.getCellTile(this.$tileId)
    var relations=  gridObject.getRelations(this.$tileId)
    this.setPageHeader(tile)
    this._setState({tile,relations})
  });

  };
  pageSave = () => {
    
    try {
      var editorData = this.state.editor ? convertToRaw(this.state.editor.state.editorState.getCurrentContent()) : null
      
    } catch (error) {
      
      return this.raiseError(error.message)
      
    }
    
    if (!editorData){
      return this.raiseError("Nothing to save")
    }
    var editorText  = JSON.stringify(editorData)
    
   
    var item = {
      key: this.databaseKeyName,
      title: "Default",
      editorText
    };
   
   Jumpto365API.itemPatch(this.tableName(), item).then(result=>{
     if (result.hasError){
       this.raiseError(result.error)
     }
   }).catch(error=>{
    this.raiseError(error)
   })
  };
  
  refreshPage = () => {
    if (!this.state.pageObject) return;
    this._setState({ page: this.state.pageObject.page });
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
          message: "A Page with that key already exists"
        });
      });
    });
  };

  _calculateScaling = (pageHeight, pageWidth) => {
    if (
      this.state.pageHeight === pageHeight &&
      this.state.pageWidth === pageWidth
    )
      return;

    var scaleH = this.props.height / pageHeight;
    var scaleW = this.props.width / pageWidth;
    var scale = Math.min(scaleH, scaleW);

    this._setState({ pageHeight, pageWidth, scale });
  };

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
          <Page
          associateTileWithUrl={
            this.associateTileWithUrl
          }
            registerEditor={editor => {
              
              this._setState({ editor });
            }}
            registerPage={page => {
              this._setState({ page });
            }}
            registerTableContainer = {this.registerTableContainer}
            onSizeChange={(pageHeight, pageWidth) => {
              this._calculateScaling(pageHeight, pageWidth);
            }}
            onPageEditorAction={this.dispatcher}
            context={this.props.context}
            {...this.state}
            {...this.props}
            {...this._methods}
            headerUpdated={this.props.headerUpdated}
            contentRef={tile.contentRef}
            tile={tile}
            tileId={this.props.tileId}
            onTileClicked={this.onTileClicked}
            onTableFullScreen={this.tableFullScreenClicked}
            interactMode={this.props.interactMode}
            showHeader = {this.props.showHeader}
            page={this.state.page}
            onFileDropped={this.onFileDropped}
          />
        </div>

        {this.state.onSaveAs && (
          <PageDialog
            title="Save a copy"
            label="Key"
            placeholder="Integrated part of the Url"
            validate={this.validateSaveAs}
            action={this.pageSaveAs}
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
            width: {this.props.width} x height: {this.props.height}
            <div>
              Inner page dimensions
              <div>
                width: {this.state.pageWidth} x height: {this.state.pageHeight}
              </div>
              <div>scale: {this.state.scale}</div>
            </div>
          </div>
        )}
      </div>
    );
  }
}
