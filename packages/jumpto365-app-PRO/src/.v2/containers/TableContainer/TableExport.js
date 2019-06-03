import React, { Component } from "react";

import { navigate } from "@reach/router";
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

export default class TableExport extends Component {
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
        <TextField
          multiline
          readOnly
          value={this.props.value}
          label={this.props.label}
          placeholder={this.props.placeholder}
          ariaLabel="Icon"
    
        />
        {this.state.conflict}
        <DialogFooter>
          <PrimaryButton
            disabled={false}
            onClick={this.dismiss}
            text={this.props.actionLabel}
          />
          <DefaultButton onClick={this.dismiss} text="Cancel" />
        </DialogFooter>
      </Dialog>
    );
  }
}
