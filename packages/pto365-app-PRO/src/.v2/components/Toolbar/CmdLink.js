import React, { Component } from "react";

import {
  TextField,
  DefaultButton,
  PrimaryButton,
  ProgressIndicator,
  IconNames,
  ComboBox
} from "office-ui-fabric-react";

import IconExplorer from "../IconExplorer";

import ImagePicker from "../../pickers/ImagePicker";
import Editor from "../Editor";
import "./cmd.css";
import icons from "./icons.json";
const Jumpto365API = require("../../services/Jumpto365API");

export class CmdLink extends Component {
  constructor(props) {
    super(props);
    this.state = { ...this.props };
  }

  componentDidUpdate(oldProps) {
    if (oldProps !== this.props) {
      this.setState({ ...this.props });
    }
  }

  render() {
    var searchQuery = this.state.searchQuery ? this.state.searchQuery : "";
    var hasIcon = (this.state.type === "heading"  ||this.state.type === "link" || this.state.type === "file")
    return (
      <div style={{ display: "flex", padding: "16px", alignItems: "strech" }}>
        <div style={{ flexGrow: "1", maxWidth: "300px", minWidth: "300px" }}>
          {this.state.upload && (
            <ImagePicker
              onDismiss={() => {
                this.setState({ upload: false });
              }}
              onSelect={imageSrc => {
                if (this.props.onChange) this.props.onChange({ imageSrc });
                this.setState({ imageSrc, upload: false, hasChanged: true });
              }}
            />
          )}

          <TextField
            label="Title"
            placeholder="Short, descriptive title"
            value={this.state.title}
            ariaLabel="Title"
            onChange={(e, v) => {
              this.setState({ title: v });

              if (this.props.onChange) this.props.onChange({ title: v });
            }}
          />

          
          <ComboBox
            label="Type"
            defaultValue="heading"
            selectedKey={this.state.type}
            options={[
              { key: "heading", text: "Heading" },
              { key: "link", text: "Link" },
              { key: "iframe", text: "IFrame" },
              { key: "megamenu", text: "Megamenu" },
              { key: "image", text: "Image" },
              { key: "file", text: "File" },
              // { key: "tile", text: "Tile" },
              // { key: "dropdown", text: "Dropdown" }
            ]}
            onChange={(e, option) => {
              this.setState({ type: option.key });
              if (this.props.onChange)
                this.props.onChange({ type: option.key });
            }}
          />
             {(this.state.type === "iframe"  ||this.state.type === "link" ||this.state.type === "file")&& (
          <TextField
            label="Link"
            placeholder="Address"
            value={this.state.href}
            ariaLabel="Link"
            onChange={(e, href) => {
              this.setState({ href });
              if (this.props.onChange) this.props.onChange({ href });
            }}
          />
          )}
          {false && (this.state.type === "file")&& (
            <TextField
              label="Script"
              multiline="true"
              placeholder="Script"
              value={this.state.script}
              ariaLabel="Script"
              onChange={(e, script) => {
                this.setState({ script });
                if (this.props.onChange) this.props.onChange({ script });
              }}
            />
            )}
{(this.state.type === "file")&& (
          <TextField
            label="Sample data"
            multiline="true"
            placeholder="Sample JSON"
            value={this.state.sample ? this.state.sample  :  `[{
              "title":"Hello world",
              },
            
              {
                "title":"Hello there!",
                }]`}
            ariaLabel="Sample"
            onChange={(e, sample) => {
              this.setState({ sample });
              if (this.props.onChange) this.props.onChange({ sample });
            }}
          />
          )}
          {( this.state.type === "tile")&& (
            <div>
              <TextField
                label="Table"
                placeholder="Name of table"
                value={this.state.table}
                ariaLabel="Table"
                onChange={(e, table) => {
                  this.setState({ table });
                  if (this.props.onChange) this.props.onChange({ table });
                }}
              />
            </div>
          )}
           {(this.state.type === "tile")&& (
            <div>
              <TextField
                label="Tile"
                placeholder="Name of tile"
                value={this.state.tile}
                ariaLabel="Tile"
                onChange={(e, tile) => {
                  this.setState({ tile });
                  if (this.props.onChange) this.props.onChange({ tile });
                }}
              />
            </div>
          )}
          {this.state.type === "dropdown" && (
            <div>
              <TextField
                label="Dropdown"
                placeholder="Name of Dropdown"
                value={this.state.dropdown}
                ariaLabel="Dropdown"
                onChange={(e, dropdown) => {
                  this.setState({ dropdown });
                  if (this.props.onChange) this.props.onChange({ dropdown });
                }}
              />
            </div>
          )}
           {this.state.type === "image" && (
               <div style={{display:"flex"}}>
            <div style={{flexGrow:"1"}}>
              <TextField
                label="Image link"
                placeholder="Address of image"
                value={this.state.imageSrc}
                ariaLabel="Dropdown"
                onChange={(e, imageSrc) => {
                  this.setState({ imageSrc });
                  if (this.props.onChange) this.props.onChange({ imageSrc });
                }}
              /></div>
                    <div>
                      <div style={{height:"29px"}}></div>
                      <DefaultButton
                        onClick={() => {
                          this.setState({ upload: true });
                        }}
                        text="Upload"
                      />
                    </div>
            </div>
          )}
           {hasIcon && <div>
          <TextField
            label="Icon"
            placeholder="Iconname"
            value={this.state.icon}
            ariaLabel="Sub Title"
            onChange={(e, icon) => {
              this.setState({ icon });
              if (this.props.onChange) this.props.onChange({ icon });
            }}
          />
         

          
<TextField
            xlabel="Icon"
            placeholder="Enter a part of the icon name to search"
           
            ariaLabel="Sub Title"
            onChange={(e, searchQuery) => {
              this.setState({ searchQuery });
              
            }}
          />
          <div className="icons" style={{ overflow: "auto", xheight: "200px" }}>
            {/* <i
              style={{ lineHeight: "64px", fontSize: "64px" }}
              class={`ms-Icon ms-Icon--${this.state.icon}`}
              aria-hidden="true"
            /> */}
            <ul className="grid_6f5e8221">
              {icons
                .filter(
                  icon =>
                    icon.name
                      .toLowerCase()
                      .indexOf(searchQuery.toLowerCase()) !== -1
                )
                .map((icon, iconIndex) => {
                  let iconClassName = `ms-Icon ms-Icon--${icon.name}`;
                  //  const iconRef = this._iconRefs[icon.name];
                  //   if (iconRef.current && iconRef.current.offsetWidth > 80) {
                  //     iconClassName += ' hoverIcon';
                  //   }

                  return (
                    <li
                      key={iconIndex}
                      aria-label={icon.name + " icon"}
                      onClick={() => {
                        this.setState({  icon: icon.name });
                        if (this.props.onChange)
                          this.props.onChange({ icon: icon.name });
                      }}
                    >
                      <i
                        className={iconClassName}
                        title={icon.name}
                        aria-hidden="true"
                      />
                      {/* <span>{icon.name}</span> */}
                    </li>
                  );
                })}
            </ul>
          </div>
          </div>}
        </div>
        {/* <div style={{flexGrow:"1"}}>
         props
         </div> */}
      </div>
    );
  }
}
