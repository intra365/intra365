import React, { Component } from "react";
import { navigate } from "@reach/router";

import ReactJson from "react-json-view";
import { TenantProperties } from "./TenantProperties";
import {  TextField,PrimaryButton } from "office-ui-fabric-react";
import {
  MessageBar,
  MessageBarType
} from "office-ui-fabric-react/lib/MessageBar";
import "./tenant.css";
import { Pivot, PivotItem } from "office-ui-fabric-react/lib/Pivot";

var CONFIG = require("@intra365/config");
const Jumpto365API = require("../../services/Jumpto365API");
export default class Tenant extends Component {
  state = {};

  raiseError = message => {
    this.setState({ hasError: true, errorMessage: message });
  };
  clearError = () => {
    this.setState({ hasError: false, errorMessage: null });
  };
  componentDidMount() {
   
    Jumpto365API.getTenantUsers(this.props.tenantDomain)
      .then(users => {
        this.setState({ users });
      })
      .catch(error => {
        this.raiseError(error.message);
      });
  }

  
  render() {
    var users = this.state.users ? this.state.users : [];
    return (
      <div>
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

        <Pivot  style={{ marginLeft: "0px", marginRight: "0px" }}>
          <PivotItem headerText="General Setting" itemKey="general">
            <div style={{margin:"16px"}}>
            <TenantProperties
              onSave={this.props.onSaveSettings}
              logoUrl={this.props.logoUrl}
              contactText={this.props.contactText}
              requireLogin={this.props.requireLogin}
            /></div>
          </PivotItem>
          <PivotItem headerText="Global Toolbars" itemKey="toolbars">

          <div style={{margin:"16px"}}>
          <TextField
          label="SharePoint Online site"
          placeholder="URL of your SharePoint Online site https://xxx.sharepoint.com"
          value={this.state.sharepointUrl}
          onChange={(e, sharepointUrl) => {
            CONFIG.readSharePointConfig(sharepointUrl).then(
              config => {
                this.setState({ config });
              }
            );
            this.setState({sharepointUrl,config:{}})
          }}
        />
            {this.state.config && this.state.config.rules && (
              <div >
                {this.state.config.rules.map((rule, index) => {
                  return (
                    <div style={{ display: "flex" }}>
                      <div>{rule.path}</div>
                      {/* <div>{rule.navigation}</div> */}
                    </div>
                  );
                })}
              </div>
            )}
             </div>
          </PivotItem>
          <PivotItem headerText="Active Users" itemKey="users">
            <div style={{margin:"16px"}}>
              {users.map((user, key) => {
                return (
                  <div
                    className="User"
                    key={key}
                    onClick={() => {
                      navigate(`/@/${user.UserName}`);
                    }}
                  >
                    {user.UserName}
                  </div>
                );
              })}
            </div>
          </PivotItem>
        </Pivot>

        {/* <ReactJson
          collapsed="2"
          src={{ state: this.state, props: this.props }}
        /> */}
      </div>
    );
  }
}
