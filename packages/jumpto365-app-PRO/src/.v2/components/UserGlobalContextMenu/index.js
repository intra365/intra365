import React, { Component } from "react";

import Translate from "../../../../src/components/Sidebar/translation";

import PropTypes from "prop-types";

import { ContextualMenuItemType } from "office-ui-fabric-react/lib/ContextualMenu";
import {
  PrimaryButton,
  DefaultButton,
  IconButton
} from "office-ui-fabric-react/lib/Button";
import { TextField, Toggle } from "office-ui-fabric-react";
import Languages from "../../../components/Sidebar/Languages";
import packageData from "../../../../package.json";
import Jumpto365App, { EditorActions } from "../_Contexts/Jumpto365App";
import { Router, Match, Location, navigate } from "@reach/router";
import {
  Dialog,
  DialogType,
  DialogFooter
} from "office-ui-fabric-react/lib/Dialog";
import { EditorExperienceContext } from "../../logic/EditorExperience/EditorExperienceContext";
/**
 * Describe overall purpose of the component
 *
 * @export
 * @class UserGlobalContextMenu
 * @extends {Component}
 */
export default class UserGlobalContextMenu extends Component {
  state = {};
  static propTypes = {
    userName: PropTypes.string, // sample - remove or rename
    userId: PropTypes.string,
    doLogout: PropTypes.func,
    doLogin: PropTypes.func,
    isAuthenticated: PropTypes.bool,
    isMobile: PropTypes.string
  };

  constructor(props) {
    super(props);
  }

  /**
   * Required method return the output of the component
   *
   * @returns
   * @memberof UserGlobalContextMenu
   */
  render() {
    var context = this.props.globalContext;
    var userSettings =
      context && context.me && context.me.JSON
        ? JSON.parse(context.me.JSON)
        : {};
    var canUpload = userSettings.canUpload;

    var canEdit = userSettings.canEdit && context.editor;
    var editMode = context.editMode;

    var isDeveloper = userSettings.developer;
    var canShare = false;

    var hasContextMenuAction = context.hostSettings
      ? context.hostSettings.hasContextMenuAction
      : true;

    if (!hasContextMenuAction) {
      return (
        <DefaultButton
          data-automation-id="jumptoapp"
          text={
            context.hostSettings && context.hostSettings.appText
              ? context.hostSettings.appText
              : "jumpto365 App"
          }
          iconProps={{ iconName: "NavigateExternalInline" }}
          onClick={() => {
            navigate(
              context.hostSettings && context.hostSettings.appURL
                ? context.hostSettings.appURL
                : "https://app.jumpto365.com"
            );
          }}
          style={{ backgroundColor: "#ffffff" }}
          splitButtonMenuButton={{ backgroundColor: "#ffffff" }}
          splitButtonContainer={{ backgroundColor: "#ffffff" }}
        />
      );
    }
    function prompt(id) {
      return Jumpto365App.prompt(id, context);
    }

    function doEmit(func) {
      if (!func != null) return;
      func();
    }
    function languageLink(text, language) {
      return {
        key: language,
        name: text,
        onClick: () => {
          Jumpto365App.setLanguage(context, language);

          navigate(`/periodictable/${language}`);
        }
      };
    }
    function internalLink(text, path) {
      return {
        key: language,
        name: text,
        onClick: () => {
          navigate(`${path}`);
        }
      };
    }

    var loggedInMenu = [];
    loggedInMenu.push({
      key: "me",
      name: `Me`,
      icon: "PlayerSettings",
      iconProps: { iconName: "AccountManagement" },
      onClick: () => {
        navigate("/me");
      }
    });
    if (isDeveloper) {
      loggedInMenu.push({
        key: "dev",
        name: `Developer`,
        icon: "PlayerSettings",
        iconProps: { iconName: "PlayerSettings" },
        onClick: () => {
          navigate("/dev");
        }
      });
    }
    if (canEdit) {
      loggedInMenu.push({
        key: "dev",
        name: `Accounts`,
        iconProps: { iconName: "Accounts" },
        onClick: () => {
          navigate("/buy");
        }
      });
    }
    // {
    //     key:"profile",
    //     name: prompt("37"),
    //     icon:"Info",
    //     onClick: () => {
    //         navigate("/beta/me")
    //         }
    // },

    loggedInMenu.push({
      key: "content",
      name: "Content",
      disabled: false,
      hidden: !canUpload,
      iconProps: { iconName: "DocumentManagement" },
      subMenuProps: {
        items: [
          // {
          //     key:"newtable",
          //     name: `New table`,

          //     iconProps: { iconName: 'PageAdd' },
          //     onClick: () => {
          //         navigate("/new/table")
          //         }

          //     } ,

          {
            key: "articles",
            name: `Articles`,

            iconProps: { iconName: "Articles" },
            onClick: () => {
              navigate("/-/articles");
            }
          },
          // {
          //     key:"icons",
          //     name: `Icons`,

          //     iconProps: { iconName: 'PhotoCollection' },
          //     subMenuProps: {
          //         items:   [
          //             {

          //                 key:"gallery",
          //                 text:"Gallery",
          //                 iconProps:{ iconName: "ImageSearch"},

          //                 onClick:() => {
          //                     navigate("/icons")
          //                     }

          //                 }   ,
          //             {

          //                 key:"rootupload",
          //                 text:"Upload",
          //                 iconProps:{ iconName: "Upload"},

          //                 onClick:() => {
          //                     navigate("/icons/upload")
          //                     }

          //                 }
          //         ] },
          //     onClick: () => {
          //         navigate("/icons")
          //         }

          //     }
          //     ,
          {
            key: "Tables",
            name: `My Tables`,

            iconProps: { iconName: "Database" },
            onClick: () => {
              navigate("/database/mytables");
            }
          }
          // ,{

          // key:"rootupload",
          // text:"Upload",
          // iconProps:{ iconName: "Upload"},

          // onClick:() => {
          //     navigate("/upload")
          //     }

          // }
        ]
      }
    });

    loggedInMenu.push({
      key: "Logout",
      name: `${prompt("36")} (${this.props.userId})`,
      icon: "Clear",
      iconProps: { iconName: "UserRemove" },
      onClick: () => {
        Jumpto365App.logout();
      }
    });
    var userMenu = !this.props.isAuthenticated ? (
      <DefaultButton
        data-automation-id="test"
        text={prompt("25")}
        onClick={() => {
          Jumpto365App.login();
        }}
        style={{ backgroundColor: "#ffffff" }}
        splitButtonMenuButton={{ backgroundColor: "#ffffff" }}
        splitButtonContainer={{ backgroundColor: "#ffffff" }}
      />
    ) : (
      <IconButton
        data-automation-id="test"
        text={prompt("59") /* "Options" */}
        iconProps={{ iconName: "Settings" }}
        split={true}
        splitButtonAriaLabel={
          "Like more information before you decide to logout?"
        }
        aria-roledescription={"split button"}
        style={{
          backgroundColor: "#ffffff",
          paddingLeft: "0px",
          paddingRight: "0px"
        }}
        menuProps={{ items: loggedInMenu }}
      />
    );
    var buttonEdit = () => {
      return (
        <IconButton
          data-automation-id="rootedit"
          text=""
          iconProps={{ iconName: context.editMode ? "EditSolid12" : "Edit" }}
          split={false}
          splitButtonAriaLabel={""}
          aria-roledescription={"split button"}
          style={{
            backgroundColor: "#ffffff",
            paddingLeft: "0px",
            paddingRight: "0px"
          }}
          onClick={() => {
            if (!context.editMode && context.me && context.me.domain) {
              // navigate(`/@/${context.me.upn}/-`)
            }
            Jumpto365App.toogleEdit(context);
          }}
        />
      );
    };

    var buttonPublish = () => {
      return (
        <IconButton
          hidden={!context.editMode}
          Xdisabled={true}
          data-automation-id="explore"
          style={{
            backgroundColor: "#ffffff",
            paddingLeft: "0px",
            paddingRight: "0px"
          }}
          iconProps={{ iconName: "WebPublish" }}
          text="Publish"
          onClick={() => {
            context.editor.action(EditorActions.Publish);
          }}
          split={context.editMode}
          style={{ paddingLeft: "0px", paddingRight: "0px" }}
          splitButtonMenuButton={{ backgroundColor: "#ffffff" }}
          splitButtonContainer={{ backgroundColor: "#ffffff" }}
          menuProps={{
            items: [
              {
                key: "publishGlobe",
                text: "Jumpto365",
                iconProps: { iconName: "Globe" },
                onClick: () => {
                  context.editor.action(EditorActions.Publish);
                }
              },
              {
                key: "publishSharePoint",
                text: "SharePoint 💰 🔒 ",
                disabled: true,
                iconProps: { iconName: "SharepointLogo" },
                onClick: () => {
                  context.editor.action(EditorActions.PublishSharePoint);
                }
              }
            ]
          }}
        />
      );
    };
    var buttonUpload = () => {
      return (
        <IconButton
          data-automation-id="rootupload"
          text=""
          disabled={context.editMode}
          iconProps={{ iconName: "Upload" }}
          split={false}
          splitButtonAriaLabel={""}
          aria-roledescription={"split button"}
          style={{
            backgroundColor: "#ffffff",
            paddingLeft: "0px",
            paddingRight: "0px"
          }}
          onClick={() => {
            navigate("/upload");
          }}
        />
      );
    };

    var buttonSave = () => {
      return (
        <IconButton
          hidden={!context.editMode}
          data-automation-id="save"
          text="Save"
          iconProps={{ iconName: "Save" }}
          split={context.editMode}
          splitButtonAriaLabel={""}
          aria-roledescription={"split button"}
          style={{
            backgroundColor: "#ffffff",
            paddingLeft: "0px",
            paddingRight: "0px"
          }}
          splitButtonMenuButton={{ backgroundColor: "#ffffff" }}
          splitButtonContainer={{ backgroundColor: "#ffffff" }}
          menuProps={{
            items: [
              {
                disable: true,
                key: "save2",
                text: "Save",
                iconProps: { iconName: "Save" },
                onClick: () => {
                  context.editor.action(EditorActions.Save);
                }
              },
              {
                disable: true,
                key: "emailMessage",
                text: "Save a copy",
                iconProps: { iconName: "SaveAs" },
                onClick: () => {
                  this.setState({ showSaveAsDialogue: true });
                }
              }
            ]
          }}
          onClick={() => {
            context.editor.action(EditorActions.Save);
          }}
        />
      );
    };

    var dialogSaveAs = () => {
      return (
        <Dialog
          hidden={!this.state.showSaveAsDialogue}
          onDismiss={() => {
            this.setState({ showSaveAsDialogue: false });
          }}
          dialogContentProps={{
            type: DialogType.normal,
            title: "Save a copy",
            xsubText:
              "Your Inbox has changed. No longer does it include favorites, it is a singular destination for your emails."
          }}
          modalProps={{
            isBlocking: true,
            containerClassName: "ms-dialogMainOverride"
          }}
        >
          <TextField
            placeholder="Name"
            ariaLabel="Icon"
            onChange={(e, v) => {
              context.editor.validateSaveAs(v).then(result => {
                if (result.isValid) {
                  this.setState({ name: v });
                } else {
                  this.setState({ conflict: result.message });
                }
              });
            }}
          />
          {this.state.conflict}
          <DialogFooter>
            <PrimaryButton
              disabled={!this.state.name}
              onClick={() => {
                context.editor.action(EditorActions.SaveAs, this.state.name);
              }}
              text="Save"
            />
            <DefaultButton
              onClick={() => {
                this.setState({ showSaveAsDialogue: false });
              }}
              text="Cancel"
            />
          </DialogFooter>
        </Dialog>
      );
    };
    return (
      <div style={{ marginTop: "4px" }}>
        {dialogSaveAs()}

        {canEdit && editMode && buttonSave()}
        {canEdit && editMode && buttonPublish()}
        {/* {canEdit && buttonEdit()} */}
        {userSettings.canEdit &&
        <EditorExperienceContext.Consumer>
          {editor => (

           
            <IconButton
              data-automation-id="rootedit"
              text=""
              iconProps={{ iconName: editor.on ? "EditSolid12" : "Edit" }}
              split={false}
              splitButtonAriaLabel={""}
              aria-roledescription={"split button"}
              style={{
                backgroundColor: "#ffffff",
                paddingLeft: "0px",
                paddingRight: "0px"
              }}
              onClick={() => {
                editor.toggle();
              }}
            />
          )}
        </EditorExperienceContext.Consumer>}
        {/* {canUpload && buttonUpload()} */}
        {userMenu}
      </div>
    );
  }
}
