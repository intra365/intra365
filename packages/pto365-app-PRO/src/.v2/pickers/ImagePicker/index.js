import React, { Component } from "react";
import {
  DefaultButton,
  MessageBarButton,
  PrimaryButton,
  Dialog,
  DialogType,
  DialogFooter,
  TooltipHost,
  ContextualMenu
} from "office-ui-fabric-react";
import FileUpload from "../../components/FileUpload";

import {
  MessageBar,
  MessageBarType
} from "office-ui-fabric-react/lib/MessageBar";
import moment from "moment";
import Jumpto365Service from "../../services";
import ImageEditor from "../../components/ImageEditor";
import { Subscribe } from "react-contextual";
const Jumpto365API = require("../../services/Jumpto365API");

export default class ImagePicker extends Component {
  state = {};

  base64toBinary(imgBase64){
    var base64 = imgBase64.split(",")[1]
    var fileType = imgBase64.split(",")[0].split(";")[0].split("/")[1]

    var data = atob(base64)
    return {data,fileType}
  }
  save = (data,extention,name,upn) => {
    return new Promise((resolve, reject) => {
      var that = this;
      this.setState({
        showSaveMessage: false,
        showStatus: true,
        status: "Saving ..."
      });

      function getChar(s, p) {
        if (!s) return "-";
        if (p > s.length) return "-";
        var c = s.substring(p, p + 1);

        return c;
      }

      var s = upn;

      var domain = s[1];
      var user = s[0];
     

      var blobName =
        getChar(domain, 0) +
        "/" +
        getChar(domain, 1) +
        "/" +
        getChar(domain, 2) +
        "/" +
        s[1] +
        "/";
      blobName += getChar(user, 0) + "/" + this.props.domain + "/";
      blobName += moment().format("YYYY/MM");

      var fileName =
        name + "-" + moment().format("YYYYMMDD-HHmmss") + extention;

        
        debugger
      Jumpto365API.blobSave(
        "-",
        "default",
        "images",
        blobName,
        fileName,
        data
      )
        .then(url => {
          this.setState({
            showSaveMessage: false,
            showStatus: false
            
          });
          resolve(url);
        })

        .catch(error => {
          this.setState({
            showSaveMessage: false,
            showStatus: false
            
          });
          reject(error);
        });
    });
  };
  saveFile = (file,extention,name,upn) => {
    return new Promise((resolve, reject) => {
      var that = this;
      this.setState({
        showSaveMessage: false,
        showStatus: true,
        status: "Saving ..."
      });

      function getChar(s, p) {
        if (!s) return "-";
        if (p > s.length) return "-";
        var c = s.substring(p, p + 1);

        return c;
      }

      var s = upn.split("@");

      var domain = s[1];
      var user = s[0];
     

      var blobName =
        getChar(domain, 0) +
        "/" +
        getChar(domain, 1) +
        "/" +
        getChar(domain, 2) +
        "/" +
        s[1] +
        "/";
      blobName += getChar(user, 0) + "/" + upn + "/";
      blobName += moment().format("YYYY/MM");

      var fileName =
        name + "-" + moment().format("YYYYMMDD-HHmmss") + extention;

        
        
      Jumpto365API.blobSaveFile(
        "-",
        "default",
        "images",
        blobName,
        fileName,
        file
      )
        .then(url => {
          this.setState({
            showSaveMessage: false,
            showStatus: false
            
          });
          resolve(url);
        })

        .catch(error => {
          this.setState({
            showSaveMessage: false,
            showStatus: false
            
          });
          reject(error);
        });
    });
  };

  render() {
    var that = this
    return (
      <Subscribe>
        {context => (
          <div>
            <Dialog
              minWidth="700px"
              hidden={false}
              onDismiss={this.dismiss}
              dialogContentProps={{
                type: DialogType.normal,
                title: "Upload Image"
              }}
              modalProps={{
                isBlocking: true,
                containerClassName: "ms-dialogMainOverride"
              }}
            >
              {this.state.showSavedMessage && (
                <MessageBar
                  messageBarType={MessageBarType.info}
                  isMultiline={false}
                  onDismiss={() => {
                    this.setState({ showSavedMessage: false });
                  }}
                  dismissButtonAriaLabel="Close"
                >
                  Document saved
                </MessageBar>
              )}
              {this.state.showSaveMessage && (
                <MessageBar
                  messageBarType={MessageBarType.warning}
                  isMultiline={false}
                  onDismiss={() => {
                    this.setState({ showSaveMessage: false });
                  }}
                  actions={
                    <MessageBarButton
                      onClick={() => {
                        this.save();
                      }}
                    >
                      Save
                    </MessageBarButton>
                  }
                  dismissButtonAriaLabel="Close"
                >
                  Content has not been saved. Check that the content looks like
                  you want it to, then click save.
                </MessageBar>
              )}
              {this.state.showStatus && (
                <MessageBar
                  messageBarType={MessageBarType.info}
                  isMultiline={false}
                >
                  {this.state.status}
                </MessageBar>
              )}
              {this.state.showError && (
                <MessageBar
                  messageBarType={MessageBarType.error}
                  isMultiline={false}
                  onDismiss={() => {
                    this.setState({ showError: false });
                  }}
                  dismissButtonAriaLabel="Close"
                >
                  {this.state.error}
                </MessageBar>
              )}

              <div style={{ display: "flex" }}>
                {this.state.document && (
                  <div
                    style={{}}
                    dangerouslySetInnerHTML={{
                      __html: this.state.document.body
                    }}
                  />
                )}
                {!this.state.hasDocument && (
                  <div>
                    <div
                      style={{
                        height: "400px",
                        width: "640px",
                        
                      }}
                    >
                     {!this.state.url &&
                      <div >
                        <ImageEditor
                          width={600}
                          height={300}
                          aspect={2}
                          onFileLoaded={(file) => {
                          var name = file.name
                           var ext = name.substring(_.lastIndexOf(name,"."))
                           
                           this.saveFile(file,ext,name,
                              context && context.me ? context.me.upn : null
                            ).then(url => {
                              this.setState({url});
                              })
                            
                            
                            
                          }}
                          onImageSelected={(imgBase64,name) => {
                            debugger
                            var {img,extention} = this.base64toBinary(imgBase64)
                            this.save(img,extention,name,
                              context && context.me ? context.me.upn : null
                            ).then(url => {
                              this.setState({url});
                              })
                            
                            
                            
                          }}
                        />
                      </div>}
                      {this.state.url &&
                      <div >
                        <img
                          style={{ height: "auto", width: "160px" }}
                          src={this.state.url}
                        />
                      </div>}
                    </div>
                  </div>
                )}

       

              </div>
              <DialogFooter>
                <PrimaryButton
                  disabled={!this.state.url}
                  onClick={() => {
                    if (this.props.onSelect) this.props.onSelect(this.state.url);
                  }}
                  text="Return"
                />
                <DefaultButton
                  onClick={() => {
                    if (this.props.onDismiss) this.props.onDismiss();
                  }}
                  text="Cancel"
                />
              </DialogFooter>
            </Dialog>
          </div>
        )}
      </Subscribe>
    );
  }
}
