import { ApplicationCustomizerContext } from "@microsoft/sp-application-base";
import * as React from "react";
import * as ReactDom from "react-dom";
import { Label } from "office-ui-fabric-react/lib/Label";
import { Icon } from "office-ui-fabric-react/lib/Icon";
import {
  PivotItem,
  IPivotItemProps,
  Pivot
} from "office-ui-fabric-react/lib/Pivot";

import {
  Customizer,
  CommandBar,
  ContextualMenu,
  GroupedList,
  findElementRecursive
} from "office-ui-fabric-react";
import { FluentCustomizations } from "@uifabric/fluent-theme";

//import data from "./globaltool.js";

import ReactJson from "react-json-view";
import {
  MSGraphClient,
  HttpClient,
  SPHttpClient,
  SPHttpClientResponse,
  SPHttpClientCommonConfiguration
} from "@microsoft/sp-http";
import * as MicrosoftGraph from "@microsoft/microsoft-graph-types";

import {
  ComboBox,
  Fabric,
  IComboBox,
  IComboBoxOption,
  IDropdownOption,
  IDropdownProps,
  mergeStyles,
  PrimaryButton,
  SelectableOptionMenuItemType
} from "office-ui-fabric-react/lib/index";

import {
  readConfig
} from "../../api/config"
// var mammoth: any = require("mammoth");
// var WORD : any = require("../../api/word")

export interface IHeaderProps {
  context: ApplicationCustomizerContext;
}

export interface IHeaderState {
  groups: IComboBoxOption[];
  groupData: any;
  error: String;
  user: MicrosoftGraph.User;
  memberships: any;
  localNav: any[];
  configError: any;
  file: any;
  tree: any;
  properties: any;
  errors: any;
  myIndexFile: any;
}

// https://github.com/typescript-cheatsheets/react-typescript-cheatsheet
export class Header extends React.Component<IHeaderProps, IHeaderState> {
  public render(): React.ReactElement<IHeaderProps> {
    try {
      return (
        <div>
          <CommandBar
            items={this.getItems(this.state)}
            overflowItems={this.getOverlflowItems()}
            overflowButtonProps={{ ariaLabel: "More commands" }}
            farItems={this.getFarItems(this.state)}
            ariaLabel={
              "Use left and right arrow keys to navigate between commands"
            }
          />
        </div>
      );
    } catch (error) {
      return <div>Error: {error.message ? error.message : error}</div>;
    }
  }

  private _buildMenu = () => {};
  private _onRender = (data: any): JSX.Element => {
    return (
      <div style={{ display: "flex" }}>
        <div style={{ marginTop: "0px" }}>
          <iframe
            style={{ overflow: "hidden", borderStyle: "hidden" }}
            src="https://pro.jumpto365.com/@/jumpto365.com/Digital Workplace Generic Model v1"
            height="500px"
            width="800px"
          />
        </div>
      </div>
    );
  };

  private _onRender2 = (data: any): JSX.Element => {
    return (
      <div style={{ display: "flex" }}>
        <div style={{ marginTop: "0px" }}>
          <iframe
            style={{ overflow: "hidden", borderStyle: "hidden" }}
            src="https://pro.jumpto365.com/@/jumpto365.com/Default"
            height="500px"
            width="800px"
          />
        </div>
      </div>
    );
  };

  private _readMe() {
    this.props.context.msGraphClientFactory
      .getClient()
      .then((client: MSGraphClient) => {
        client
          .api("https://graph.microsoft.com/beta/me")
          .get((error, user: MicrosoftGraph.User, rawResponse?: any) => {
            if (error) {
              return this.setState({ error: error.message });
            }
            this.setState({ user });
            // handle the response
          });
      })
      .catch(error => {
        this.setState({ error: error.message });
      });
  }

  private _readGraph(url: string, stateProperty: string): any {
    return new Promise((resolve, reject) => {
      this.props.context.msGraphClientFactory
        .getClient()
        .then((client: MSGraphClient) => {
          client.api(url).get((error, result: any, rawResponse?: any) => {
            if (error) {
              var errors = this.state.errors ? this.state.errors : {};
              errors[stateProperty] = error;
              return this.setState({ errors });
            }
            var state: any = {};
            state[stateProperty] = result;
            this.setState(state);
            resolve({ result });
            // handle the response
          });
        })
        .catch(error => {
          this.setState({ error: error.message });
          resolve({ error });
        });
    });
  }

  private _onRenderOption = (props: IComboBoxOption): JSX.Element => {
    return (
      <div style={{ display: "flex" }}>
        <div>
          <img
            style={{ height: "32px", margin: "4px", width: "auto" }}
            src={props.data.image}
          />
        </div>
        <div style={{ marginLeft: "16px" }}>
          <div className="ms-fontWeight-semibold">{props.text}</div>
          <div>{props.title}</div>
        </div>
      </div>
    );
  };

  private _onRenderTitle = (options: IDropdownOption[]): JSX.Element => {
    const option = options[0];

    return (
      <div>
        {option.data && option.data.icon && (
          <Icon
            style={{ marginRight: "4px" }}
            iconName={option.data.icon}
            aria-hidden="true"
            title={option.data.icon}
          />
        )}
        <span>{option.text}</span>
      </div>
    );
  };

  private _onRenderPlaceholder = (props: IDropdownProps): JSX.Element => {
    return (
      <div className="dropdownExample-placeholder">
        <Icon
          style={{ marginRight: "8px" }}
          iconName={"MessageFill"}
          aria-hidden="true"
        />
        <span>{props.placeholder}</span>
      </div>
    );
  };

  private _listGroups = (data: any): JSX.Element => {
    var groups = this.state && this.state.groups ? this.state.groups : []; //this.state.groups ? this.state.groups : []

    return (
      <div style={{ display: "flex", marginTop: "5px" }}>
        <ComboBox
          allowFreeform
          autoComplete="on"
          options={groups}
          placeholder="Select Team"
          // onRenderPlaceholder={this._onRenderPlaceholder}
          //onRenderTitle={this._onRenderTitle}
          onRenderOption={this._onRenderOption}
          onChange={(e, option) => {
            this._readGroup(option.key);
          }}
        />
      </div>
    );
  };

  private _readGraphBlob(url: string): any {
    return new Promise((resolve, reject) => {
      this.props.context.msGraphClientFactory
        .getClient()
        .then((client: MSGraphClient) => {
          client
            .api(url)
            .responseType("blob")
            .get((error, blob: Blob, rawResponse?: any) => {
              if (error) {
                return resolve(error);
              }
              // const URL = window.URL
              return resolve({ result: URL.createObjectURL(blob) });
            });
        })
        .catch(error => {
          this.setState({ error: error.message });
        });
    });
  }
  private _readGraphEntry(url: string) {
    return new Promise((resolve, reject) => {
      this.props.context.msGraphClientFactory
        .getClient()
        .then((client: MSGraphClient) => {
          client.api(url).get((error, result: any, rawResponse?: any) => {
            if (error) {
              return resolve({ error });
            }
            return resolve({ result: result.json() });
          });
        })
        .catch(error => {
          return resolve({ error });
        });
    });
  }

  private _readMemberships() {
    this.props.context.msGraphClientFactory
      .getClient()
      .then((client: MSGraphClient) => {
        client
          .api("https://graph.microsoft.com/beta/me/joinedTeams")
          .get(async (error, memberships: any, rawResponse?: any) => {
            if (error) {
              return this.setState({ error: error.message });
            }
            try {
              memberships.value.map(async (value: any) => {
                var photo = await this._readGraphBlob(
                  `https://graph.microsoft.com/v1.0/groups/${
                    value.id
                  }/photo/$value`
                );
                var details = this._readGraphEntry(
                  `https://graph.microsoft.com/v1.0/groups/${value.id}`
                );
                var groups = this.state.groups ? this.state.groups : [];
                var image = photo.error ? null : photo.result;
                groups.push({
                  key: value.id,
                  text: value.displayName,
                  title: value.description,

                  data: {
                    details,
                    image
                  }
                });

                this.setState({
                  groups: groups.sort((a, b) => {
                    if (a.text < b.text) {
                      return -1;
                    }
                    if (a.text > b.text) {
                      return 1;
                    }
                    return 0;
                  })
                });
              });
            } catch (error) {
              return this.setState({ error: error.message });
            }

            this.setState({ memberships });
            // handle the response
          });
      })
      .catch(error => {
        this.setState({ error: error.message });
      });
  }
  private _readGroup(groupId: any) {
    this.props.context.msGraphClientFactory
      .getClient()
      .then((client: MSGraphClient) => {
        client
          .api(
            `https://graph.microsoft.com/v1.0/groups/${groupId}/drive/root/webUrl`
          )
          .get((error, groupData: any, rawResponse?: any) => {
            if (error) {
              return this.setState({ error: error.message });
            }
            window.open(groupData.value, "_blank");
            //this.setState({ groupData });
            // handle the response
          });
      })
      .catch(error => {
        this.setState({ error: error.message });
      });
  }

  private _readSharePointList(url: string, stateProperty: string) {
    return new Promise((resolve, reject) => {
      this.props.context.spHttpClient
        .get(url, SPHttpClient.configurations.v1)
        .then(
          (res: SPHttpClientResponse): Promise<{ Title: string }> => {
            return res.json();
          }
        )
        .then(
          (list: any): void => {
            var localNav = [];
            list.value.forEach(item => {
              localNav.push(item);
            });
            var state: any = {};
            state[stateProperty] = localNav;
            this.setState(state);
            return resolve({ result: state });
          }
        )
        .catch(error => {
          var errors = this.state.errors ? this.state.errors : {};
          errors[stateProperty] = error;
          this.setState({ errors });
          return resolve({ error });
        });
    });
  }

  private _readList() {
    this.props.context.spHttpClient
      .get(
        `${
          this.props.context.pageContext.web.absoluteUrl
        }/_api/lists/getbytitle('Navigation')/items`,
        SPHttpClient.configurations.v1
      )
      .then(
        (res: SPHttpClientResponse): Promise<{ Title: string }> => {
          return res.json();
        }
      )
      .then(
        (list: any): void => {
          var localNav = [];
          list.value.forEach(item => {
            localNav.push({ title: item.Title, link: item.Link });
          });
          this.setState({ localNav });
          console.log(list);
        }
      );
  }
  // private _readFile(url: string, stateProperty: string): any {
  //   return new Promise((resolve, reject) => {
  //     var that: any = this;
  //     fetch(url)
  //       .then(response => {
  //         return response.arrayBuffer();
  //       })
  //       .then(async arrayBuffer => {
  //         // var arrayBuffer = await new Response(blob).arrayBuffer();
  //         // var reader = new FileReader();
  //         // reader.readAsDataURL(blob);
  //         // reader.onloadend = function() {
  //         //   var base64data = reader.result;
  //         //   console.log(base64data);
  //         //   var state: any = {};
  //         //   state[stateProperty] = true;
  //         //   localStorage.setItem("jumpto365." + stateProperty, base64data);

  //         //   that.setState(state);
  //         //   return resolve({ result: state });
  //         // };

  //         var options = {
  //           arrayBuffer
  //         };
  //         mammoth.convertToMarkdown(options).then(result => {
            
  //           localStorage.setItem(
  //             "jumpto365." + stateProperty,
  //             result.value
  //           );
  //           WORD.parseMarkdown(result.value)
  //           .then(tree=>{
  //             localStorage.setItem(
  //               "jumpto365." + stateProperty + ".tree",
  //               JSON.stringify(tree)
  //             );

  //           })


  //         });
  //       })
  //       .catch(error => {
  //         var errors = this.state.errors ? this.state.errors : {};
  //         errors[stateProperty] = error;
  //         this.setState({ errors });
  //         return resolve({ error });
  //       });
  //   });
  // }
  private _read(url: string): any {
    return new Promise((resolve, reject) => {
      fetch(url)
        .then(data => {
          return data.json();
        })
        .then(json => {
          return resolve({ result: json });
        })
        .catch(error => {
          console.log("error", url, error);
          return resolve({ error });
        });
    });
  }
 
  async componentDidMount() {
    try {
      var config = await readConfig(
        this.props.context.pageContext.site.absoluteUrl
      );

      if (!config.error) {
        config = config.result;
        var navigation = config.navigation;
        var match = false;
        var sitepath = this.props.context.pageContext.site.serverRelativeUrl.toUpperCase();
        config.rules.forEach(rule => {
          var subpath = rule.path.toUpperCase();
          var matchPath = sitepath.substr(0, subpath.length);
          if (subpath === matchPath) {
            match = true;
            navigation = rule.navigation;
          }
        });

        var file = await this._read(navigation);
        if (!file.error) {
          file = file.result;

          this.setState({ tree: file.tree, properties: file.properties });
        } else {
          this.setState({ file });
        }
        //this._readMe();

        this._readSharePointList(
          `${
            this.props.context.pageContext.web.absoluteUrl
          }/_api/lists/getbytitle('Navigation')/items`,
          "localNav"
        );

        this._readGraph("https://graph.microsoft.com/beta/me", "me");

        var myDrive = await this._readGraph(
          "https://graph.microsoft.com/v1.0/me/drive/root",
          "me.drive.root"
        );
        this._readMemberships();
        // if (!myDrive.error) {
        //   var file = await this._readGraph(
        //     "https://graph.microsoft.com/v1.0/me/drive/root:/jumpto365/index.docx:",
        //     "my.index"
        //   );
        //   if (!file.error) {
        //     this.setState({ myIndexFile: file.result.webUrl });
        //     var indexFile = await this._readFile(
        //       file.result["@microsoft.graph.downloadUrl"],
        //       "index.file"
        //     );
        //   }
        // }
        //
      } else {
        this.setState({ configError: config.error });
      }
    } catch (error) {
      console.log("componentDidMount", error);
    }
  }

  private _info = (command: any): JSX.Element => {
    return (
      <div style={{ margin: "16px", minWidth: "320px", minHeight: "180px" }}>
        <h3>Info</h3>

        <ReactJson
          collapsed={1}
          src={{ context: this.props.context, command, state: this.state }}
        />
      </div>
    );
  };

  getProperty(store, key, propertyName, defaultValue) {
    return store && store[key] && store[key][propertyName] !== undefined
      ? store[key][propertyName]
      : defaultValue;
  }

  private newItem = (key, name, iconName, checked): any => {
    var itemProps =
      this.state.properties && this.state.properties[key]
        ? this.state.properties[key]
        : {};
var itemType = itemProps.type ? itemProps.type.toUpperCase() : ""
    var onRender = null;

    switch (itemType) {
      case "IFRAME":
          onRender = (data: any): JSX.Element => {
            return (
              <div style={{ display: "flex" }}>
                <div style={{ marginTop: "0px" }}>
                  <iframe
                    style={{ overflow: "hidden", borderStyle: "hidden" }}
                    src={itemProps.href}
                    height={itemProps.height ? itemProps.height  :  "500px"}
                    width={itemProps.width ? itemProps.width  :  "800px"}
                  />
                </div>
              </div>
            );
          };
        break;
        // case "MEGAMENU":
        //     onRender = data => {
        //       return (
        //         <div style={{ display: "flex" }}>
        //           <div style={{ marginTop: "0px",maxWidth:this.props.width/3 }}>
        //            {JSON.stringify(data)}
        //           </div>
        //         </div>
        //       );
        //     };
        //     break;
            case "IMAGE":
              onRender = data => {
                return (
                  <div style={{marginTop:"14px",marginRight:"6px" }}>
                  <img  src={itemProps.href} alt={itemProps.title} style={{ height: "16px",width:"auto" }} />
                  </div>
                );
              };
              break;
      case "DROPDOWN":
        onRender = null;
        break;

      case "LINK":
        onRender = null;
        break;
      case "TILE":
        onRender = null;
        break;
      default:
        onRender = null;
        break;
    }

    return {
      checked: checked ? true : false,
      key,
      name,
      iconProps: iconName ? { iconName } : null,
      // disabled:this.isDisabled(key) ,

      onRender,
      onClick: () => {
        switch (itemType) {
          case "IFRAME":
            break;

          case "DROPDOWN":
            break;

          case "LINK":
            window.open(itemProps.href, "_blank");
            break;
          case "TILE":
            break;
          default:
            break;
        }
      }
    };
  };

  private getTree = (properties, tree, level) => {
    if (!tree) return [];
    return tree.map(item => {
      if (item.children && item.children.length) {
        var actionItem = this.newItem(
          item.key,
          this.getProperty(properties, item.key, "title", item.title),
          this.getProperty(properties, item.key, "icon", ""),
          false
        );
        var items =  this.getTree(properties, item.children, level ? level + 1 : 1)
        if (actionItem.subMenuProps && actionItem.subMenuProps.items ){
          actionItem.subMenuProps.items =  actionItem.subMenuProps.items.concat(items)
        }else
        actionItem.subMenuProps = {
         items
        };
        return actionItem;
      }
      return this.newItem(
        item.key,
        this.getProperty(properties, item.key, "title", item.title),
        this.getProperty(properties, item.key, "icon", ""),
        false
      );
    });
  };
  // Data for CommandBar
  private getItems = (state: any) => {
    if (this.state.tree) {
      return this.getTree(this.state.properties, this.state.tree, 0);
    }

    //  const items =

    var localNav = state && state.localNav ? state.localNav : [];

    return [
      {
        key: "Insights",
        name: "Insights",
        cacheKey: "Insights", // changing this key will invalidate this items cache
        iconProps: {
          iconName: "PowerBILogo"
        },
        ariaLabel: "Insights",
        subMenuProps: {
          items: [
            {
              key: "Our Digital Workspace",
              name: "Our Digital Workspace",
              cacheKey: "Our Digital Workspace", // changing this key will invalidate this items cache
              iconProps: {
                iconName: "waffle"
              },
              ariaLabel: "Insights",
              subMenuProps: {
                items: [
                  {
                    key: "calendarEvent",
                    name: "Overview",
                    iconProps: {
                      iconName: "Calendar"
                    },
                    onRender: this._onRender
                  }
                ]
              }
            },
            {
              key: "My Reports",
              name: "My Reports",
              cacheKey: "My Reports", // changing this key will invalidate this items cache
              iconProps: {
                iconName: "waffle"
              },
              ariaLabel: "My Reports",
              subMenuProps: {
                items: [
                  {
                    key: "calendarEvent",
                    name: "Overview",
                    iconProps: {
                      iconName: "Calendar"
                    },
                    onRender: this._onRender2
                  }
                ]
              }
            }
          ]
        }
      },
      {
        key: "upload",
        name: "Communicate",
        iconProps: {
          iconName: "Communications"
        },
        href: "https://office.com",
        ["data-automation-id"]: "uploadButton",
        subMenuProps: {
          items: [
            {
              key: "emailMessage",
              name: "Email message",
              iconProps: {
                iconName: "Mail"
              },
              ["data-automation-id"]: "newEmailButton"
            },
            {
              key: "calendarEvent",
              name: "Calendar event",
              iconProps: {
                iconName: "Calendar"
              }
            }
          ]
        }
      },

      {
        key: "Find Documentation",
        name: "Find Documentation",
        cacheKey: "Find Documentation", // changing this key will invalidate this items cache
        iconProps: {
          iconName: "DocumentSearch"
        },
        ariaLabel: "New",
        subMenuProps: {
          items: [
            {
              key: "emailMessage",
              name: "Email message",
              iconProps: {
                iconName: "Mail"
              },
              ["data-automation-id"]: "newEmailButton"
            },
            {
              key: "calendarEvent",
              name: "Calendar event",
              iconProps: {
                iconName: "Calendar"
              }
            }
          ]
        }
      },
      ,
      {
        key: "Share Documentation",
        name: "Share Documentation",
        cacheKey: "Share Documentation", // changing this key will invalidate this items cache
        iconProps: {
          iconName: "Share"
        },
        ariaLabel: "New",
        subMenuProps: {
          items: [
            {
              key: "emailMessage",
              name: "Email message",
              iconProps: {
                iconName: "Share"
              },
              ["data-automation-id"]: "newEmailButton"
            },
            {
              key: "calendarEvent",
              name: "Calendar event",
              iconProps: {
                iconName: "Calendar"
              }
            }
          ]
        }
      },
      {
        key: "newItem",
        name: "Plan",
        cacheKey: "myCacheKey", // changing this key will invalidate this items cache
        iconProps: {
          iconName: "PlannerLogo"
        },
        ariaLabel: "New",
        subMenuProps: {
          items: [
            {
              key: "emailMessage",
              name: "Email message",
              iconProps: {
                iconName: "Mail"
              },
              ["data-automation-id"]: "newEmailButton"
            },
            {
              key: "calendarEvent",
              name: "Calendar event",
              iconProps: {
                iconName: "Calendar"
              }
            }
          ]
        }
      },
      {
        key: "tile",
        name: "Get Access",
        ariaLabel: "Grid view",
        iconProps: {
          iconName: "NetworkTower"
        },
        iconOnly: false,
        onClick: () => console.log("Tiles")
      },
      {
        key: "info",
        name: "Local navigation",
        disabled: localNav.length === 0,
        ariaLabel: "Info",
        iconProps: {
          iconName: "GlobalNavButton"
        },
        iconOnly: false,
        onClick: () => console.log("Info"),
        subMenuProps: {
          items: localNav.map(item => {
            return {
              key: "local" + item.Title,
              name: item.Title,
              href: item.Link
              // iconProps: {
              //   iconName: "Calendar"
              // }
            };
          })
        }
      }
    ];
  };

  private getOverlflowItems = () => {
    return [
      {
        key: "move",
        name: "Move to...",
        onClick: () => console.log("Move to"),
        iconProps: {
          iconName: "MoveToFolder"
        }
      },
      {
        key: "copy",
        name: "Copy to...",
        onClick: () => console.log("Copy to"),
        iconProps: {
          iconName: "Copy"
        }
      },
      {
        key: "rename",
        name: "Rename...",
        onClick: () => console.log("Rename"),
        iconProps: {
          iconName: "Edit"
        }
      }
    ];
  };

  private getFarItems = (state: IHeaderState) => {
    var items: any[] = [
      {
        key: "editor",
        name: "Editor",
        href: "https://pro.jumpto365.com",
        iconProps: {
          iconName: "Edit"
        }
      },

      {
        key: "debugData",
        name: "Developer data",
        iconProps: {
          iconName: "Tools"
        },

        subMenuProps: {
          items: [
            {
              key: "calendarEvent",
              name: "Calendar event",
              iconProps: {
                iconName: "Calendar"
              },
              onRender: this._info
            }
          ]
        }
      }
    ];

    if (state.myIndexFile) {
      items.push({
        key: "yourlinks",
        name: "Your Links",
        href: state.myIndexFile,
        iconProps: {
          iconName: "WordDocument"
        }
      });
    }
    return [
      {
        key: "Groups",
        name: "Groups",
        ariaLabel: "Groups",
        iconProps: {
          iconName: "NetworkTower"
        },
        iconOnly: false,
        onRender: this._listGroups
      },

      {
        key: "info",
        name: "Info",
        ariaLabel: "Info",
        iconProps: {
          iconName: "Info"
        },
        iconOnly: true,
        onClick: () => console.log("Info"),
        subMenuProps: {
          items
        }
      }
    ];
  };

  private _customRenderer(
    link: IPivotItemProps,
    defaultRenderer: (link: IPivotItemProps) => JSX.Element
  ): JSX.Element {
    return (
      <span>
        {defaultRenderer(link)}
        <Icon iconName="Airplane" style={{ color: "red" }} />
      </span>
    );
  }
}
