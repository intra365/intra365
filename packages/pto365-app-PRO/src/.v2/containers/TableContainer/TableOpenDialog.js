import React, { Component } from "react";

import { navigate } from "@reach/router";
import {
  Dialog,
  DialogType,
  DialogFooter
} from "office-ui-fabric-react/lib/Dialog";
import { TextField, Toggle, Shimmer, TooltipHost } from "office-ui-fabric-react";
import {
  PrimaryButton,
  DefaultButton,
  IconButton
} from "office-ui-fabric-react/lib/Button";
import "./table.css"
import TableContainer from ".";
const Jumpto365API = require("../../services/Jumpto365API");
const TABLENAME = "Table";
export default class TableOpenDialog extends Component {
  state = { items: [] };
  componentDidMount() {
    Jumpto365API.itemTables(TABLENAME).then(items => {
      this.setState({ items,loaded:true });
    });
  }
  dismiss = () => {
    if (this.props.onDismiss) this.props.onDismiss();
  };
  render() {
    return (
      <Dialog
        hidden={false}
        minWidth="900px"
        minHeight="500px"
        onDismiss={this.dismiss}
        dialogContentProps={{
          type: DialogType.normal,
          title: this.props.title
        }}
        modalProps={{
          isBlocking: true,
          containerClassName: "ms-dialogMainOverride"
        }}
      >
        <div className="tableItemContainer">
          <div className="tableItemList">

          {!this.state.loaded && 
          <div>
            <div style={{margin:"8px"}}>
          <Shimmer  /></div>
          <div style={{margin:"8px"}}>
          <Shimmer  /></div> <div style={{margin:"8px"}}>
          <Shimmer  /></div> <div style={{margin:"8px"}}>
          <Shimmer  /></div> <div style={{margin:"8px"}}>
          <Shimmer  /></div> <div style={{margin:"8px"}}>
          <Shimmer  /></div>
          </div>
          }
            {this.state.items.map((item, index) => {
              return (
                <div key={index}
                  className="tableItem"
                  onClick={() => {
                    this.setState({ selectedItem: item });
                  }}
                >
                  {item.TableKey}&nbsp; v.{item.VersionNumber}
                </div>
              );
            })}
          </div>
          <div className="tableItemInspectorContainer">{
            this.state.selectedItem &&
           
            <div className="tableItemInspector">
             <TableContainer
                  onTileClicked={()=>{}}
                  context={this.props.context}
                  height={400}
                  width={300}
                  domain={this.props.context.me.upn}
                  tag={this.state.selectedItem.TableKey}
                />}
          
        


            </div>
            
            
            }</div>
        </div>
        {this.state.conflict}
        <DialogFooter>
          <PrimaryButton
            disabled={!this.state.selectedItem}
            onClick={() => {
              if (!this.props.action) return;
              this.props
                .action(this.state.selectedItem.TableKey, this.state)
                .then(result => {
                  this.setState({ onSaveAs: false });
                  if (!this.props.onSuccess) return false;
                  this.props.onSuccess(this.state.selectedItem.TableKey);
                })
                .catch(error => {
                  this.setState({
                    newTag: null,
                    conflict: error.message
                  });
                });
            }}
            text={this.props.actionLabel}
          />
          <DefaultButton onClick={this.dismiss} text="Cancel" />
        </DialogFooter>
      </Dialog>
    );
  }
}
