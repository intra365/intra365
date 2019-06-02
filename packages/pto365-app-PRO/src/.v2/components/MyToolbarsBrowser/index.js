import React, { Component } from "react";

import {
  DefaultButton,
  PrimaryButton
} from "office-ui-fabric-react/lib/Button";

import { navigate, Link } from "@reach/router";

import moment from "moment";
import ToolbarContainer from "../../containers/ToolbarContainer";
import "./browser.css";
import {
  Dialog,
  DialogType,
  DialogFooter
} from "office-ui-fabric-react/lib/Dialog";
const Jumpto365API = require("../../services/Jumpto365API");

const TABLENAME = "Toolbar";
export default class MyToolbarsBrowser extends Component {
  state = {};

  componentDidUpdate = (previousProps, previousState) => {
    if (previousProps.upn !== this.props.upn) {
      this._load();
    }
  };
  componentDidMount = () => {
    this._load();
  };

  _load = () => {
    //TODO: Added API call
    return
    if (!this.props.context) return;
    if (!this.props.context.isAuthenticated) return;

    Jumpto365API.itemToolbarsForUpn(this.upn, TABLENAME).then(myToolbars => {
      this.setState({
        myToolbars: myToolbars.result,
        loaded: true,
        currentToolbarKey: null,
        currentItem: null
      });
      if (myToolbars.result.length > 0) {
        this.setState({
          currentToolbarKey: myToolbars.result[0].ToolbarKey,
          currentItem: myToolbars.result[0]
        });
      }
    });
  };

  get upn() {
    return this.props.upn;
  }
  render() {
    let ctx = this.props.context;

    if (!ctx) return "No context";
    if (!ctx.isAuthenticated) return "Not authenticated";
    if (!ctx.user) return "No user object in context";
    var upn = ctx.me.upn;
    var myToolbars = this.state.myToolbars ? this.state.myToolbars : [];
    var height = this.props.height;
    var halfWidth = this.props.width / 2;

    var isMine = this.upn === upn;
    return (
      <div style={{ display: "flex" }}>
        <div style={{ flexGrow: "5" }}>
          <div style={{ marginRight: "16px" }}>
            <div style={{ overflow: "auto", height: `${height}px` }}>
              {myToolbars.map((item, key) => {
                return (
                  <div
                    key={key}
                    className={
                      this.state.currentToolbarKey === item.ToolbarKey
                        ? "myToolbarSelected"
                        : "myToolbar "
                    }
                    onClick={() => {
                      this.setState({
                        currentToolbarKey: item.ToolbarKey,
                        currentItem: item
                      });
                    }}
                  >
                    <div>
                      <div>
                        {item.ToolbarKey} (version {item.VersionNumber})
                      </div>
                      <div>{moment(item.Created).toLocaleString()}</div>
                      <div />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div style={{ flexGrow: "5" }}>
          {this.state.currentToolbarKey && (
            <ToolbarContainer
              onTileClicked={() => {}}
              context={ctx}
              height={height}
              width={halfWidth}
              domain={this.upn}
              tag={this.state.currentToolbarKey}
            />
          )}
        </div>
        <div style={{ flexGrow: "1" }}>
          <div style={{ margin: "8px" }}>
            <PrimaryButton
              disabled={!this.state.currentToolbarKey}
              onClick={() => {
                navigate(`/@/${this.upn}/${this.state.currentToolbarKey}`);
              }}
              text="Open"
            />
          </div>
          {isMine && (
            <div style={{ margin: "8px" }}>
              <DefaultButton
                onClick={() => {
                  navigate(`/@/${upn}/(new)`);
                }}
                text="New"
              />
            </div>
          )}
          {isMine && (
            <div style={{ margin: "8px" }}>
              <DefaultButton
                disabled={!this.state.currentToolbarKey}
                onClick={() => {
                  this.setState({ confirmDelete: true });
                }}
                text="Delete"
              />
              <Dialog
                minWidth="600px"
                hidden={!this.state.confirmDelete}
                onDismiss={this.dismiss}
                dialogContentProps={{
                  type: DialogType.normal,
                  title: "Please Confirm"
                }}
                modalProps={{
                  isBlocking: true,
                  containerClassName: "ms-dialogMainOverride"
                }}
              >
                <div style={{ margin: "auto" }}>
                Are you sure that you want to delete this toolbar? 
                </div>

                <DialogFooter>
                  <PrimaryButton
                    disabled={false}
                    onClick={() => {
                      var item = this.state.currentItem;
                      item.__DELETED = 1;
                      item.key = item.ToolbarKey;
                      item.title = item.Title;
                      this.setState({ confirmDelete: false });
                      Jumpto365API.itemPatch(TABLENAME, item).then(() => {
                        this._load();
                      });
                    }}
                    text="Yes"
                  />
                  <DefaultButton
                    onClick={() => {
                      this.setState({ confirmDelete: false });
                    }}
                    text="Cancel"
                  />
                </DialogFooter>
              </Dialog>
            </div>
          )}
        </div>
      </div>
    );
  }
}
