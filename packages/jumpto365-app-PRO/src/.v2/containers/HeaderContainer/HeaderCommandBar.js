import React, { Component } from "react";

import { CommandBar } from "office-ui-fabric-react/lib/CommandBar";
import { Pivot, PivotItem } from "office-ui-fabric-react/lib/Pivot";
import { Label } from "office-ui-fabric-react/lib/Label";
import {
  Dropdown,
  IDropdown,
  DropdownMenuItemType,
  IDropdownOption
} from "office-ui-fabric-react/lib/Dropdown";
import "./page.css";
import jumpto365Logo from "../../media/Logo horizontal color - transparent background.png";
import { Link } from "@reach/router";
import { Toggle } from "office-ui-fabric-react";
import { EditorExperienceContext } from "../../logic/EditorExperience/EditorExperienceContext";

import {tree} from "@intra365/navigation-components"
import { readConfig } from "../../api/config";
import $ from "jquery";
export default class HeaderCommandBar extends Component {
  state = {};
  emit = (e, cmd) => {
    var key = cmd.key;
    if (!this.props.HeaderContainer) return;
    if (this.props.HeaderContainer[key]) {
      console.log("Emitting", key);
      this.props.HeaderContainer[key]();
    }
  };
  updateDimensions = () => {
    //this.setState({ });
    var win = $(window);
    var width =  win.width()
     if (width!==this.state.width){
       this.setState({width})
     }
  };
  componentDidMount(){
    window.addEventListener("resize", this.updateDimensions);
  }
  componentWillUnmount = () => {
    window.removeEventListener("resize", this.updateDimensions);
  };
  isDisabled = key => {
    if (!this.props.HeaderContainer) return true;
    if (this.props.HeaderContainer[key]) {
      return !this.props.HeaderContainer[key](true);
    }
  };

  newItem = (key, name, iconName, subMenuProps) => {
    return {
      key,
      name,
      iconProps: { iconName },
      disabled: this.isDisabled(key),
      onClick: this.emit,
      iconOnly: name === "",
      // split: true, //menuProps?true:false,
      subMenuProps
    };
  };

  logo = {
    key: "cmdPageName",
    name: "Name",
    hidden: true,
    disabled: false,
    onClick: this.emit,
    onRender: (a, b, c) => {
      return (
        <div style={{ display: "flex" }}>
          <div style={{ marginTop: "8px", marginRight: "16px" }}>
            <Link to="/">
              <img
                style={{ height: "24px", width: "auto" }}
                src={this.props.logoUrl ? this.props.logoUrl : jumpto365Logo}
              />
              {/* <Label>Page: {this.props.pageName} Table: {this.props.tableName}</Label>
               */}{" "}
            </Link>
          </div>
        </div>
      );
    }
  };
  megaMenu = {
    key: "cmdMegaMenu",
    name: "Name",
    hidden: true,
    disabled: false,
    onClick: this.emit,
    onRender: (a, b, c) => {
      return (
        <div style={{ display: "flex" }}>
          <div style={{ margin: "20px", height: "400px", width: "1000px" }}>
            <Link to="/">
              <img
                style={{ height: "24px", width: "auto" }}
                src={jumpto365Logo}
              />
              {/* <Label>Page: {this.props.pageName} Table: {this.props.tableName}</Label>
               */}{" "}
            </Link>
          </div>
        </div>
      );
    }
  };
  options = editor => {
    var context = this.props.context;

    var userSettings =
      context && context.me && context.me.JSON
        ? JSON.parse(context.me.JSON)
        : {};

    var isDeveloper = userSettings.developer;
    var canEdit = userSettings.canEdit;

    return {
      key: "cmdToogleOptions",
      name: "Name",
      hidden: true,
      disabled: false,
      onClick: this.emit,
      onRender: (a, b, c) => {
        return (
          <div style={{ display: "flex" }}>
            {canEdit && (
              <div style={{ marginTop: "4px" }}>
                <Toggle
                  defaultChecked={editor ? editor.on : false}
                  onText="Options"
                  offText="Options"
                  onChange={(e, option) => {
                    editor.toggle();
                  }}
                />
              </div>
            )}
          </div>
        );
      }
    };
  };
  componentDidMount() {}
  _homeCommands = editor => {
    var context = this.props.context;

    var userSettings =
      context && context.me && context.me.JSON
        ? JSON.parse(context.me.JSON)
        : {};

    var isDeveloper = userSettings.developer;
    var canEdit = userSettings.canEdit;

    var loggedInMenu = [];
    // loggedInMenu.push({
    //   key: "cmdMe",
    //   name: `Me`,
    //   icon: "PlayerSettings",
    //   iconProps: { iconName: "AccountManagement" },
    //   onClick: this.emit
    // });
    loggedInMenu.push({
      key: "cmdHelp",
      name: `Documentation`,
      icon: "Documentation",
      iconProps: { iconName: "Documentation" },
      onClick: this.emit
    });

    if (canEdit) {
      loggedInMenu.push({
        key: "cmdDashboard",
        name: `Dashboard`,
        iconProps: { iconName: "ViewDashboard" },
        onClick: this.emit
      });
      loggedInMenu.push({
        key: "cmdAccounts",
        name: `Settings`,
        iconProps: { iconName: "Settings" },
        onClick: this.emit
      });
    }
    if (isDeveloper) {
      loggedInMenu.push({
        key: "cmdDeveloper",
        name: `Developer`,
        icon: "PlayerSettings",
        iconProps: { iconName: "PlayerSettings" },
        onClick: this.emit
      });
    }

    if (context.me) {
      loggedInMenu.push({
        key: "cmdLogout",
        name: `Sign Out (${context.me.upn})`,
        iconProps: { iconName: "SignOut" },
        //disabled: this.isDisabled(key),
        onClick: this.emit
      });
    }
    var farItems =
      context && context.me
        ? [
            this.options(editor),
            this.newItem("cmdSettings", "", "Waffle", { items: loggedInMenu })
          ]
        : [
            {
              key: "cmdLogin",
              name: "Sign in",
              iconProps: {},
              //disabled: this.isDisabled(key),
              onClick: this.emit
            }
          ];

    return {
      items: [
        this.logo

        //  this.megaMenu
        //  this.newItem("cmdPageExportExcel", "Export to Excel", "ExcelDocument")
      ],
      overflowItems: [
        //   this.newItem(
        //     "cmdTranslatedVersions",
        //     "Translated Version",
        //     "LocaleLanguage"
        //   ),
        //   this.newItem("cmdWhichToolWhen", "Which Tool When?", "DeveloperTools"),
        //   this.newItem("cmdEmbed", "Embed", "Embed"),
        //   this.newItem("cmdNews", "News", "News"),
        //   this.newItem("cmdHelp", "Help", "Help"),
        //   this.newItem("cmdAbout", "About", "Info")
      ],

      farItems
    };
  };

  render() {
    var items =
      this.props.navigation &&
      this.props.navigation.properties &&
      this.props.navigation.tree
        ? tree(this.props.navigation.properties, this.props.navigation.tree,this.state.width)
        : null;
   

    return (
      <div>
        <EditorExperienceContext.Consumer>
          {editor => (
            <div>
              {!items && 
              <CommandBar
                elipisisAriaLabel="More options"
                {...this._homeCommands(editor)}
              />}
              {items && <CommandBar items={items}  farItems={this._homeCommands(editor).farItems}/>}
            </div>
          )}
        </EditorExperienceContext.Consumer>
      </div>
    );
  }
}
