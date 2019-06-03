import React, { Component } from "react";
import {
  TextField,
  DefaultButton,
  PrimaryButton,
  ProgressIndicator,
  IconNames,
  Toggle,
  TooltipHost,
  Label
} from "office-ui-fabric-react";
import { ColorPicker } from "office-ui-fabric-react/lib/ColorPicker";

import _ from "lodash";
import ImagePicker from "../../pickers/ImagePicker";

export class TenantProperties extends Component {
  state = {};
  handleChange = (key, value) => {
    this.setState({ [key]: value, hasChanged: true });
  };
  _load = () =>{
    this.setState({contactText:this.props.contactText,logoUrl:this.props.logoUrl,requireLogin:this.props.requireLogin?true:false})
  }
  componentDidMount (){
    this._load()
    //debugger
  }

  componentDidUpdate (oldProps){
    if (this.props !== oldProps){
      
    this._load()}
  }
  render() {
    return (
      <div>
        {this.state.upload &&
        <ImagePicker
        onDismiss={()=>{
          this.setState({upload:false})
        }}
        onSelect={(logoUrl)=>{
          this.setState({logoUrl,upload:false,hasChanged: true})
        }}
        />}
        <TextField
          label="Contact information"
          placeholder="Who to contact for support in your organisation"
          value={this.state.contactText}
          onChange={(e, v) => {
            this.handleChange("contactText", v);
          }}
        />
        <Label value="Logo"/>
<div style={{display:"flex"}}><div style={{flexGrow:1}}>
        <TextField
         
          placeholder="Your organisations logo"
          value={this.state.logoUrl}
          ariaLabel="Logo"
          onChange={(e, v) => {
            this.handleChange("logoUrl", v);
          }}/>
          </div>
          <div style={{flexGrow:0}}>
        <DefaultButton onClick={()=>{this.setState({upload:true})}} text="Upload"/>
        </div></div>
        {/* <Toggle
          label="Access to your organisations content"
          onText="Login required"
          offText="Anonymous (recommended)"
          defaultChecked={this.state.requireLogin}
          onChange={(e, v) => {
            this.handleChange("requireLogin", v);
          }}
        /> */}
        <div style={{marginTop:"16px"}}>
          <PrimaryButton
            disabled={!this.state.hasChanged}
            onClick={() => {
              if (this.props.onSave) {
                this.props.onSave(this.state)
                .then(()=>{
                  this.setState({hasChanged:false})
                })
              }
            }}
            text="Save"
          />
        </div>
      </div>
    );
  }
}
