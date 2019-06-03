import React, { Component } from "react";
import { Provider, Subscribe } from "react-contextual";
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

import GenericItemExplorer from "../../components/GenericItemExplorer";

export default class TableDialog extends Component {
  state = {};
  dismiss = () => {
    if (this.props.onDismiss) this.props.onDismiss();
  };
  render() {
    return (
      <Subscribe>
        {context => (
          <Dialog
            minWidth="700px"
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
            <div style={{ height: "400px", overflow: "auto" }}>
              <GenericItemExplorer
                renderPreview= {this.props.renderPreview}
                context={context}
                tableName={this.props.tableName}
                onItemLoaded={item => {
                  this.setState({ item });
                }}
              />
            </div>

            <DialogFooter>
              <PrimaryButton
                disabled={!this.state.item}
                onClick={() => {
                  if (!this.props.onSelected) return false;
                  this.props.onSelected(this.state.item);
                }}
                text={this.props.actionLabel}
              />
              <DefaultButton onClick={this.dismiss} text="Cancel" />
            </DialogFooter>
          </Dialog>
        )}
      </Subscribe>
    );
  }
}
