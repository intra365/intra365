import React, { Component } from "react";
import PropTypes from "prop-types";
import PageLayoutMain from "../../_Layouts/PageLayoutMain";
import PageHeader from "../../PageHeader";
import Jumpto365App, {
  getSetting,
  setSetting,
  licenseInfo
} from "../../_Contexts/Jumpto365App";
import OfficeGraphService, {
  getWordMarkdown,
  download2
} from "../../../services/OfficeGraph";
import ReactJson from "react-json-view";
import PageBody from "../../PageBody";
import ScenarioList from "../../ScenarioList";
import {
  Dialog,
  DialogType,
  DialogFooter
} from "office-ui-fabric-react/lib/Dialog";
import {
  PrimaryButton,
  DefaultButton
} from "office-ui-fabric-react/lib/Button";
import { navigate, Link } from "@reach/router";
import _ from "lodash";
import { CommandBar } from "office-ui-fabric-react/lib/CommandBar";

import ArticleExplorer from "../../ArticleExplorer";
import GenericItemExplorer from "../../GenericItemExplorer";

export default class DatabaseExplorerPage extends React.PureComponent {
  state = {};

  constructor(props) {
    super(props);
  }

  componentDidUpdate = (previousProps, previousState) => {
    if (previousProps.level1 !== this.props.level1) {
      this.setState({ files: null, body: null });
    }
  };

  _onSelection = selection => {
    this.setState({ selection });

    if (selection && selection.length && selection.length === 1) {
      navigate(`me/home/jumpto365/${selection[0].file.name}`);
      //this._download(selection[0].file["@microsoft.graph.downloadUrl"],selection[0].file.name)
    }
  };

  render() {
    let ctx = this.props.context;

    if (!ctx) return "No context";
    if (!ctx.isAuthenticated) return "Not authenticated";
    if (!ctx.user) return "No user object in context";

    function prompt(id) {
      return Jumpto365App.prompt(id, ctx);
    }
    var tableName = this.props.tableName;
    switch (tableName) {
      case "mytables":
        tableName = "My Tables";
        break;

      default:
        break;
    }
    var farItems = [];
    if (this.state.explorer && this.state.explorer.deleteItem) {
      farItems.push({
        disabled: !this.state.selectedItem,
        key: "delete",
        name: "Delete",

        onClick: () => {
          this.setState({ confirmDelete: true });
        },
        iconProps: { iconName: "Delete" }
      });
    }
    return (
      <PageLayoutMain>
        <PageHeader title={tableName} color="#2a7ab9" />
        <div
          style={{
            marginLeft: "-8px",
            marginRight: "-8px",
            marginTop: "-8px",
            marginBottom: "8px"
          }}
        >
          <CommandBar
            isSearchBoxVisible={false}
            searchPlaceholderText="Search "
            elipisisAriaLabel="More options"
            items={[
              {
                disabled: !this.state.selectedItem,
                key: "open",
                name: "Open",

                onClick: () => {
                  if (this.state.explorer && this.state.explorer.openItem)
                    this.state.explorer.openItem();
                },
                iconProps: { iconName: "OpenFile" }
              }
            ]}
            farItems={farItems}
          />
        </div>
        <PageBody>
          <div>
            <div style={{ display: "flex" }}>
              <div style={{ flexGrow: "3" }}>
                <Dialog
                  hidden={!this.state.confirmDelete}
                  onDismiss={() => {
                    this.setState({ confirmDelete: false });
                  }}
                  dialogContentProps={{
                    type: DialogType.normal,
                    title: "Delete Table?",
                    subText: "The Table will permantly deleted"
                  }}
                  modalProps={{
                    isBlocking: true,
                    containerClassName: "ms-dialogMainOverride"
                  }}
                >
                  <DialogFooter>
                    <DefaultButton
                      onClick={() => {
                        this.setState({ confirmDelete: false });
                        if (this.state.explorer.deleteItem)
                          this.state.explorer.deleteItem();
                      }}
                      text="Delete"
                    />
                    <PrimaryButton
                      onClick={() => {
                        this.setState({ confirmDelete: false });
                      }}
                      text="Cancel"
                    />
                  </DialogFooter>
                </Dialog>
                <GenericItemExplorer
                  context={this.props.context}
                  tableName={this.props.tableName}
                  onRegister={explorer => {
                    this.setState({ explorer });
                  }}
                  onitemselected={selectedItem => {
                    this.setState({ selectedItem });
                  }}
                />
              </div>
              <div>
                {/* <ReactJson src={{ state:this.state,props:this.props}} collapsed={2}/>   */}
              </div>
            </div>
          </div>
        </PageBody>
      </PageLayoutMain>
    );
  }
}
