import React, { Component } from "react";

import { CopyToClipboard } from "react-copy-to-clipboard";
import {
  Dialog,
  DialogType,
  DialogFooter
} from "office-ui-fabric-react/lib/Dialog";
import { TextField, Toggle } from "office-ui-fabric-react";
import {
  PrimaryButton,
  DefaultButton,
  IconButton
} from "office-ui-fabric-react/lib/Button";
const Jumpto365API = require("../../services/Jumpto365API");

var publisheddUrl = (domain, tag) => {
  return  encodeURI("https://pro.jumpto365.com/@/" + domain + "/" + tag);
};
export default class ToolbarConfirm extends Component {
  state = {};
  dismiss = () => {
    if (this.props.onDismiss) this.props.onDismiss();
  };
  render() {
    return (
      <Dialog
      minWidth="600px"
      hidden={false}
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
      <div style={{ margin: "auto" }}>
      {this.props.question}
      </div>
               
              
      <DialogFooter>
        <PrimaryButton
          disabled={false}
          onClick={this.props.onSuccess}
          text="Yes"
        />
        <DefaultButton onClick={this.dismiss} text="Cancel" /> 
      </DialogFooter>
    </Dialog>
             
           );
  }
}
