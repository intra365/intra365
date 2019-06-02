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

export default class PageDialog extends Component {
  state = {};
  dismiss = () => {
    if (this.props.onDismiss) this.props.onDismiss();
  };
  render() {
    return (
      <Dialog
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
          label={this.props.label}
          placeholder={this.props.placeholder}
          ariaLabel="Icon"
          onChange={(e, tag) => {
            if (!this.props.validate) return;
            this.props.validate(tag).then(result => {
              if (result.isValid) {
                this.setState({ newTag: tag });
              } else {
                this.setState({
                  newTag: null,
                  conflict: result.message
                });
              }
            });
          }}
        />
        {this.state.conflict}
        <DialogFooter>
          <PrimaryButton
            disabled={!this.state.newTag}
            onClick={() => {
              if (!this.props.action) return;
              this.props
                .action(this.state.newTag, this.state)
                .then(result => {
                  this.setState({ onSaveAs: false });
                  if (!this.props.onSuccess) return false;
                  this.props.onSuccess(this.state.newTag);
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
