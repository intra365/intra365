import React, { Component } from "react";
import { navigate } from "@reach/router";
import TenantEditorCommandBar from "./TenantCommandBar";
import TenantDialog from "./TenantDialog";
import TenantObject from "./TenantObject";
import { DefaultButton } from "office-ui-fabric-react";
import {
  MessageBar,
  MessageBarType
} from "office-ui-fabric-react/lib/MessageBar";
import Tenant from "../../components/Tenant";
import { EventType } from "../../components/Tenant/EventType";
import _ from "lodash";

import { TooltipHost } from "office-ui-fabric-react";
import Grid from "../TableContainer/Grid"

const Jumpto365API = require("../../services/Jumpto365API");

export default class TenantContainer extends React.PureComponent {
  state = { editMode: false, onSelectCelltype: false, showInfo: false };
  tableName = () => {
    return this.props.database ? this.props.database : "tenant";
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
    var tableName = this.tableName();

    Jumpto365API.findItemByKey("@Tenant", this.props.tag)
      .then(result => {
       
        if (result.length !== 1) {
          return
          return this.raiseError(
            `Could not find table "${this.props.tag}"  `
          );
        }
        var tenant = JSON.parse(result[0].Json);
        
        this.setTenantHeader(tenant)
        this.setState({tenant})
      })

    this._setState({ keyName });
    var isNew = keyName === "(new)";
    if (isNew) {
      this.tenantNew();
    } else {
      this.tenantOpen(keyName);
    }
  };

  cmdTenantNew = canExecute => {
    if (canExecute) return true;
    navigate("./(new)");
  };
  cmdTenantRename = canExecute => {
    if (canExecute) return false;
  };
  cmdTenantDelete = canExecute => {
    if (canExecute) return false;
  };
  cmdTenantOpen = canExecute => {
    if (canExecute) return true;
    this._setState({ onTenantOpen: true });
  };

  cmdTenantSave = canExecute => {
    if (canExecute) return true;
    this.tenantSave();
  };

  cmdTenantSaveAs = canExecute => {
    if (canExecute) return true;
    this._setState({ onSaveAs: true });
  };

  cmdTenantEdit = canExecute => {
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


  setTenantHeader = (tenant) => {
    if (!tenant) return
    if (!this.props.setTenantHeader) return
    this.props.setTenantHeader((
    <div>
          <div
            style={{
                display:"flex",
              backgroundColor: tenant.color,
              color: tenant.textColor,
              marginLeft:"-8px",
              marginRight:"-8px",              
              marginBottom:"8px",
              padding: "8px",

            }}
          >
            <div style={{margin:"8px", marginLeft: "20px" ,flexGrow:"5"}}>
              <div className="ms-font-xxl	">Settings: {tenant.title}</div>
            </div>
            <div style={{ margin: "8px",marginBottom:"-4px" }}>
            
                </div>
          </div>
          </div>))
  }
  registerCommandBar = (tenantName, tableName) => {
    if (this.props.registerCommandBar) {
      this.props.registerCommandBar(
        this,
        <TenantEditorCommandBar
          tenantName={tenantName}
          tableName={tableName}
          TenantContainer={this}
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
  tenantNew = () => {
    var tenantObject = new TenantObject();
    this._setState({ tenant: tenantObject.tenant, tenantObject });
  };
  tenantOpen = keyName => {


    this.setTenantHeader({title:keyName,color:"#000000",textColor:"#ffffff"})
    return Jumpto365API.getTenantSettings(keyName)
    .then(tenantSettings =>{
      
     
          
          this._setState({tenantSettings})
       
    
    
    })
   
    //this.registerCommandBar();


    return 

    var tenantObject = new TenantObject();
    this._setState({ tenant: tenantObject.tenant, tenantObject });

    var tableName = this.tableName();

    Jumpto365API.findItemByKey(tableName, keyName)
      .then(result => {
        if (result.length !== 1) {
          // return this.raiseError(
          //   `Could not find "${keyName}" within "${tableName}" `
          // );
          return
        }

        //this.registerCommandBar(keyName, tableName);

        try {
          var data = JSON.parse(result[0].Json);
          var tenantObject = new TenantObject();
          if (!tenantObject.import(data)) {
            return this.raiseError("Could not load ");
          }

          var tenant = tenantObject.tenant;

          this._setState({ keyName, tenant, tenantObject, data });
        } catch (error) {
          return this.raiseError(error.message);
        }
      })
      .catch(error => {
        this.raiseError(error.message);
      });
  };
  tenantSave = (tenantSettings) => {
    
    this._setState({tenantSettings})
    
    return Jumpto365API.saveTenantSettings(this.props.keyName, tenantSettings);
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
          message: "A Tenant with that key already exists"
        });
      });
    });
  };

  _calculateScaling = (tenantHeight, tenantWidth) => {
    if (
      this.state.tenantHeight === tenantHeight &&
      this.state.tenantWidth === tenantWidth
    )
      return;

    var scaleH = this.props.height / tenantHeight;
    var scaleW = this.props.width / tenantWidth;
    var scale = Math.min(scaleH, scaleW);

    this._setState({ tenantHeight, tenantWidth, scale });
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
          <Tenant
            registerEditor={editor => {
              this._setState({ editor });
            }}
            registerTenant={tenant => {
              this._setState({ tenant });
            }}
            onSizeChange={(tenantHeight, tenantWidth) => {
              this._calculateScaling(tenantHeight, tenantWidth);
            }}
            onTenantEditorAction={this.dispatcher}
            context={this.props.context}
            {...this.state}
            {...this.props}
            {...this._methods}
            headerUpdated={this.props.headerUpdated}
            onSaveSettings={this.tenantSave}
            
            tenantDomain={this.props.keyName}
            interactMode={this.props.interactMode}
            showHeader = {this.props.showHeader}
            {...this.state.tenantSettings}
            tenant={this.state.tenant}
          />
        </div>

        {this.state.onSaveAs && (
          <TenantDialog
            title="Save a copy"
            label="Key"
            placeholder="Integrated part of the Url"
            validate={this.validateSaveAs}
            action={this.tenantSaveAs}
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
              Inner tenant dimensions
              <div>
                width: {this.state.tenantWidth} x height: {this.state.tenantHeight}
              </div>
              <div>scale: {this.state.scale}</div>
            </div>
          </div>
        )}
      </div>
    );
  }
}
