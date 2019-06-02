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
export default class ToolbarPublisher extends Component {
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
               
               <p>Here's the link to your Toolbar</p>
               <a
                 href={publisheddUrl(this.props.domain, this.props.tag)}
                 target="_blank"
               >
                 {publisheddUrl(this.props.domain, this.props.tag)}
               </a>
               <CopyToClipboard
                 text={publisheddUrl(this.props.domain, this.props.tag)}
                 onCopy={() => this.setState({ copied: true })}
               >
                 <span>
                   &nbsp;
                   <i
                     style={{ cursor: "pointer" }}
                     class="ms-Icon ms-Icon--Copy"
                     aria-hidden="true"
                   />
                 </span>
               </CopyToClipboard>

               {this.state.copied ? (
                 <span style={{ marginLeft:"16px"}}>Copied.</span>
               ) : null}
             </div>
      <DialogFooter>
        <PrimaryButton
          disabled={false}
          onClick={this.dismiss}
          text="Done"
        />
        {/* <DefaultButton onClick={this.dismiss} text="Cancel" /> */}
      </DialogFooter>
    </Dialog>
             
           );
  }
}
