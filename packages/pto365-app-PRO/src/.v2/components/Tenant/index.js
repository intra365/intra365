import React, { Component } from "react";
import { navigate } from "@reach/router";

import ReactJson from "react-json-view";
import { TenantProperties } from "./TenantProperties";
import { PrimaryButton } from "office-ui-fabric-react";
import {
  MessageBar,
  MessageBarType
} from "office-ui-fabric-react/lib/MessageBar";
import "./tenant.css"
const Jumpto365API = require("../../services/Jumpto365API");
export default class Tenant extends Component {
  state = {}

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

        <div style={{ display: "flex", margin: "16px" }}>
          <div style={{ flexGrow: 3 }}>
            {/* <h3>Published Tables</h3> */}
            <h3>Active Users</h3>
            {users.map((user, key) => {
              return <div className="User" key={key} onClick={()=>{navigate(`/@/${user.UserName}`)}}>{user.UserName}</div>;
            })}
          </div>
          <div style={{ flexGrow: 2 }}>
            <h3>General Settings</h3>
            <div>
              <TenantProperties
              onSave={this.props.onSaveSettings}
              logoUrl={this.props.logoUrl}
              contactText={this.props.contactText}
              requireLogin={this.props.requireLogin}
              />
            </div>
            
            {/*       
        <ReactJson
          collapsed="2"
          src={{ state: this.state, props: this.props }}
        /> */}
          </div>
        </div>
      </div>
    );
  }
}
