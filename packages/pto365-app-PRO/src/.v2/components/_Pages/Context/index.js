import React, { Component } from "react";
import PropTypes from "prop-types";
import PeriodicTable from "../../PeriodicTable";
import PageLayoutMain from "../../_Layouts/PageLayoutMain";
import PageHeader from "../../PageHeader";
import $ from "jquery";
import Testdata from "../../../data/TestData";
import Jumpto365Service from "../../../services";
import AppIcon from "../../AppIcon";
import { CommandBar } from "office-ui-fabric-react/lib/CommandBar";
import Jumpto365App, {
  getSetting,
  setSetting,
  setEditMode,
  licenseInfo,
  EditorActions,
  ActionTypes,
  logAction
} from "../../_Contexts/Jumpto365App";
import { navigate } from "@reach/router";
import PageBody from "../../PageBody";
import UserGlobalContextMenu from "../../UserGlobalContextMenu";
import { Subscribe } from "react-contextual";
import {
  NavigationLeftContext,
  NavigationLeftGroup,
  NavigationLeftSettings
} from "../../NavigationLeft";
import Util from "../../../utilities";
import {
  PeriodicTableEditor,
  PeriodicTableProperties,
  GroupBoxProperties
} from "../../../logic/editors";
import Wizard from "../../Wizard";
import { Link } from "@reach/router";
import ReactJson from "react-json-view";
const Jumpto365API = require("../../../services/Jumpto365API");
import factoryGif from "./factory.gif";
import CommandBarTableEditor from "../../CommandBarTableEditor";
import loadingGif from "../../../media/Table Publisher Loading/color together WT BG/1-wt-bg-500-500.gif"
import {CopyToClipboard} from 'react-copy-to-clipboard'
//import "./context.css"

///Users/niels/code/pto365-app/src/.v2/data/TestData/index.js
/**
 * Describe overall purpose of the component
 *
 * @export
 * @class ContextPage
 * @extends {Component}
 */
export default class ContextPage extends Component {
  static propTypes = {
    context: PropTypes.string, // sample - remove or rename
    language: PropTypes.string,
    globalContext: PropTypes.object,
    isMobile: PropTypes.string
  };

  constructor(props) {
    super(props);

    this.state = {};
  }
  updateDimensions = () => {
    //this.setState({ });
    var win = $(window);
    var h = win.height();
    var mastHead = $("#header");
    var pageHead = $("#pageheader");

    this.setState({
      search: Util.ParametersFromSearch(
        this.props.location ? this.props.location.search : ""
      ),
      title: "Office 365",
      height: h - 40 - (mastHead ? mastHead.height() : 0) - 10, //- (pageHead ? pageHead.height() : 0),
      width: pageHead ? pageHead.width() : 1200
    });
  };

  _setBannerState(settings) {
    this.setState({
      isScaled : settings.isScaled ? settings.isScaled : false,
      bannerHideOurLogo: settings.hideLogo,
      bannerTitlegraphics: settings.titlegraphics
        ? settings.titlegraphics
        : "https://jumpto365.com/resources/images/app/Title-EN.png",
      bannerTeaser: settings.teaser
        ? settings.teaser
        : "Entrypoint to the modern workspace",
      bannerHideZoneInfo: settings.hidezoneinfo ? settings.hidezoneinfo : false,
      bannerByline: settings.byline
        ? settings.byline
        : "Table designed by Matt Wade, @thatmattwade",
      bannerBorder: settings.border,
      bannerTextColor: settings.textColor ? settings.textColor : "#000000",
      bannerBackgroundColor: settings.backgroundColor
        ? settings.backgroundColor
        : "#ffffff",
      titleGraphicUrl: settings.titlegraphics,
      version: settings.version ? settings.version : 1
    });
  }

  load = editMode => {
    var that = this;
    var search = this.props.location && this.props.location.search;

    var hash = this.props.location && this.props.location.hash;

    if (search) {
      var p1 = search.split("?");
      var p2 = p1[1].split("&");
      var state = {};
      for (let index = 0; index < p2.length; index++) {
        const s = p2[index].split("=");
        state[s[0]] = decodeURIComponent(s[1]);
      }
      this.setState({ search: state });
    }
    if (hash) {
      var hash = hash.toLowerCase();
      var elements = hash.split("/");

      switch (elements[1]) {
        case "periodictable":
          return navigate(`/context/office365/${elements[2]}`);
          break;
        case "service":
          return navigate(`/tool/${elements[2]}/${elements[3]}`);
          break;
        case "license":
          var map = {
            businessessentials: "Business% Essentials",
            business: "Business",
            businesspremium: "Business Premium",
            enterprisee1: "Enterprise E1",
            enterprisee3: "Enterprise E3",
            enterprisee5: "Enterprise E5",
            enterprisef1: "Enterprise F1",
            edua1: "Edu A1",
            edua3: "Edu A3",
            edua5: "Edu A5",
            usgovg1: "US Gov G1",
            usgovg3: "US Gov G3",
            usgovg5: "US Gov G5",
            usgovf1: "US Gov F1"
          };
          if (map[elements[1]]) {
            return navigate(`/license//${elements[2]}`);
          }

          break;

        default:
          break;
      }
    }

    var isFalseDomainRoot = this.props.language
      ? _.startsWith(this.props.language, "@")
      : false;
    if (isFalseDomainRoot) {
      var domain = this.props.language.substr(1);
      return navigate(`/@/${domain}/-`);
    }

    let service = new Jumpto365Service();
    var that = this;
    //  var editMode = this.props.globalContext ? this.props.globalContext.editMode : false
    // if (this.props.isNew && !this.props.globalContext.isEditMode) {
    //     setEditMode(this.props.globalContext,true)
    // }
    var contextPath = !this.props.tenant
      ? `/@/${this.props.area}/${this.props.context}`
      : `/@/${this.props.tenant}/${this.props.area}`;
    service
      .getContext(
        this.props.context,
        this.props.language,
        this.props.tenant,
        this.props.isNew,
        this.props.area
      )
      .then(context => {
        var license = that.props.license;
        if (this.state.search && this.state.search.licenseFilter) {
          license = this.state.search.licenseFilter;
        }

        if (license && !editMode) {
          service
            .getJSON2("hexatown", "docs", "microsoft/licenses/")
            .then(licenses => {
              var currentLicense = licenses.licenses[license];
              //this.state.grid
              currentLicense.no.forEach(l => {
                var toolsMap = licenses.map[l];
                if (toolsMap) {
                  var map = toolsMap.split(",");
                  map.forEach(tool => {
                    this.state.grid.forEach(row => {
                      row.forEach(col => {
                        if (col && col.key === tool && col.centerData) {
                          col.centerData.color = "#aaaaaa";
                        }
                      });
                    });
                  });
                }
              });
              currentLicense.soon.forEach(l => {
                var toolsMap = licenses.map[l];
                if (toolsMap) {
                  var map = toolsMap.split(",");
                  map.forEach(tool => {
                    this.state.grid.forEach(row => {
                      row.forEach(col => {
                        if (col && col.key === tool && col.centerData) {
                          col.centerData.color = "#aaaaaa";
                        }
                      });
                    });
                  });
                }
              });

              this.setState(licenses);
            })
            .catch(error => {
              console.warn("getting licenses", error);
            });
        } else {
          var myLicenses = licenseInfo();

          function hasPlan(key) {
            var foundPlan = _.find(myLicenses, plan => {
              return _.startsWith(plan.servicePlanName, key);
            });
            //console.log("PLAN",key,foundPlan)
            return foundPlan;
          }

          function missingLicense(key) {
            //debugger
            var grayOut =
              that.state &&
              that.state.search &&
              that.state.search.mylicenses &&
              that.state.search.mylicenses === "1"
                ? true
                : false;
            if (!grayOut) return false;
            switch (key ? key.toUpperCase() : "") {
              case "DYNAMICS365":
                return hasPlan("DYN365_ENTERPRISE") === undefined;

                break;
              case "PROJECT":
                return hasPlan("PROJECTONLINE_PLAN") === undefined;

                break;
              case "POWERBI":
                return (
                  hasPlan("BI_AZURE_P1") === undefined &&
                  hasPlan("BI_AZURE_P2") === undefined
                );

                break;
              case "VISIO":
                return hasPlan("VISIO") === undefined;

                break;
              case "STREAM":
                return hasPlan("STREAM") === undefined;

                break;
              case "SWAY":
                return hasPlan("SWAY") === undefined;

                break;
              case "POWERAPPS":
                return hasPlan("POWERAPPS") === undefined;

                break;
              case "FORMS":
                return hasPlan("FORMS") === undefined;

                break;
              case "FLOW":
                return hasPlan("FLOW") === undefined;

                break;
              case "DELVE":
                return hasPlan("EXCHANGE_ANALYTICS") === undefined;

                break;
              case "SHAREPOINT":
              case "ONEDRIVE":
                return (
                  hasPlan("SHAREPOINTENTERPRISE") === undefined &&
                  hasPlan("SHAREPOINTSTANDARD") === undefined
                );

                break;
              case "PLANNER":
                return hasPlan("PROJECTWORKMANAGEMENT") === undefined;

                break;
              case "TODO":
                return hasPlan("BPOS_S_TODO") === undefined;

                break;
              case "YAMMER":
                return hasPlan("YAMMER") === undefined;

                break;
              case "TEAMS":
                return hasPlan("TEAMS") === undefined;

                break;
              case "SKYPE":
                return hasPlan("MCO") === undefined;

                break;
              case "STAFFHUB":
                return hasPlan("Deskless") === undefined;

                break;

              case "WORD":
              case "ONENOTE":
              case "EXCEL":
              case "POWERPOINT":
                return hasPlan("SHAREPOINTWAC") === undefined;

                break;
              case "MAIL":
              case "CALENDAR":
              case "PEOPLE":
              case "TASKS":
              case "BOOKINGS":
                return hasPlan("EXCHANGE_S") === undefined;

                break;
              default:
                return false;
                break;
            }
          }

          var x = that.props.globalContext.isAuthenticated;

          if (x && myLicenses && !editMode) {
            var grid = context.grid;

            grid.forEach(row => {
              row.forEach(col => {
                if (col && col.centerData && missingLicense(col.key)) {
                  col.centerData.color = "#aaaaaa";
                }
              });
            });
          }
        }

        var settings = context.settings ? context.settings : {};
        var titleGraphicUrl = settings.titlegraphics;
        this._setBannerState(settings);
        this.setState({
          contextPath,

          editor: new PeriodicTableEditor({
            onUpdateTile: (tile, updateType, updateValue) => {
              if (!tile && !tile.tileid) return;
              if (!updateValue) return;

              var idSplit = tile.tileid.split(".");

              var rowId = idSplit[0];
              var columnId = idSplit[1];
              this.state.grid[rowId][columnId].centerData = updateValue;
              this.setState({ grid: this.state.grid });
            }
          }),
          version: context.version,
          grid: context.grid,
          groups: context.groups,
          title: context.title,
          subtitle: this.props.license,
          connectors: context.connectors,
          currentTableKey: this.props.area
        });
      })
      .catch(error => {
        console.log("loading context", error);
        this.setState({ error: "Context was not found  ", tenant: {} });
      });
  };
  componentDidUpdate = (previousProps, previousState) => {
    if (
      previousProps.context !== this.props.context ||
      previousProps.license !== this.props.license ||
      previousProps.isNew !== this.props.isNew ||
      previousProps.area !== this.props.area ||
      previousProps.tenant !== this.props.tenant ||
      previousProps.language !== this.props.language ||
      (this.props.location
        ? this.props.location.search !== previousProps.location.search
        : false)
    ) {
      this.load(false);
    }
  };

  _upgradeGridToV2 = grid => {
    for (let rowIndex = 0; rowIndex < grid.length; rowIndex++) {
      var row = grid[rowIndex];
      for (let columnIndex = 0; columnIndex < row.length; columnIndex++) {
        var cell = row[columnIndex];
        if (cell.centerData && !cell.centerData.contentRef) {
          var contentRef =
            "/github.com/jumpto365/microsoft365/master/docs/" +
            cell.centerData.key;
          cell.centerData.contentRef = contentRef;
        }
      }
    }
    return grid;
  };

  _upgradeGridToV3 = grid => {
    grid = this._upgradeGridToV2(grid);

    for (let rowIndex = 0; rowIndex < grid.length; rowIndex++) {
      var row = grid[rowIndex];
      for (let columnIndex = 0; columnIndex < row.length; columnIndex++) {
        var cell = row[columnIndex];
        if (cell.centerData && cell.centerData.contentRef )  {

        
          var contentRef = cell.centerData.contentRef;
          if (_.startsWith(contentRef, "/github.com/")){
          contentRef = contentRef.replace(
            "/github.com/",
            "https://raw.githubusercontent.com/"
          );
          
          contentRef += "/index.md";

          cell.centerData.contentRef = contentRef;
        }
        }
      }
    }

    return grid;
  };
  _upgradeGridToV4 = (grid,connectors) => {

    for (let rowIndex = 0; rowIndex < grid.length; rowIndex++) {
      var row = grid[rowIndex];
      for (let columnIndex = 0; columnIndex < row.length; columnIndex++) {
        var cell = row[columnIndex];
        if (cell.centerData && cell.centerData.contentRef )  {

        
        
        }
        }
      }
    

    return grid;
  };
  _wizardLoaded = wizard => {
    this.setState({ wizard });
  };

  _wizardUnloaded = () => {
    this.setState({ wizard: null });
  };

  _save = newKey => {
    var key = newKey ? newKey : this.props.area;

    logAction(this.props.globalContext, ActionTypes.EditSave);
    var gridV2 = this._upgradeGridToV3(this.state.grid);
    var gridV4 = this._upgradeGridToV4(gridV2);

    var newVersion = 4
    var tableOf = {
      title: this.state.title,
      version: newVersion, //this.state.version ? this.state.version : newVersion,
      settings: {
        byline: `Developed by ${this.props.globalContext.me.displayName} ${
          this.props.globalContext.me.upn
        }`,
        isScaled: this.state.isScaled,
        teaser: this.state.bannerTeaser,
        titlegraphics: this.state.bannerTitlegraphics
          ? this.state.bannerTitlegraphics
          : "https://jumpto365.com/resources/images/app/Title-EN.png",
        hidezoneinfo: this.state.bannerHideZoneInfo,
        hideLogo: this.state.bannerHideOurLogo,
        textColor: this.state.bannerTextColor,
        backgroundColor: this.state.bannerBackgroundColor,
        border: this.state.bannerBorder
      },
      groups: this.state.groups,
    
      grid: gridV4,
      connectors: this.state.connectors
    };

    var item = {
      key,
      title: "Default",
      tableOf
    };

    Jumpto365API.itemPatch("mytables", item)
      .then(() => {
        setEditMode(this.props.globalContext, false);
        navigate("/@/" + this.props.globalContext.me.upn + "/" + key);

        //window.location = "/@/" + this.props.globalContext.me.upn + "/-"
      })
      .catch(error => {
        alert(error);
      });
  };
  componentDidMount = () => {
    var that = this;
    if (this.props.context) {
      Jumpto365App.setEditor(this.props.globalContext, {
        name: "default",
        validateSaveAs: name => {
          return new Promise((resolve, reject) => {
            resolve({ isValid: true, message: "Valid" });
          });
        },
        setEditMode: on => {
          that.load(on);
        },

        isInGroup: (groupname, toolname) => {
          var inGroup = false;
          if (that && that.state && that.state.groups) {
            that.state.groups.forEach(group => {
              if (group.key === groupname) {
                if (group.members && group.members.members) {
                  group.members.members.forEach(member => {
                    if (member === toolname) {
                      inGroup = true;
                    }
                  });
                }
              }
            });
          }

          return inGroup;
        },
        groupAdd: groupName => {},
        groupRemove: groupName => {},

        groupMembershipAdd: (groupname, toolname) => {
          var inGroup = false;
          if (that && that.state && that.state.groups) {
            that.state.groups.forEach(group => {
              if (group.key === groupname) {
                if (group.members && group.members.members) {
                  group.members.members.forEach(member => {
                    if (member === toolname) {
                      inGroup = true;
                    }
                  });
                }
                if (!inGroup) {
                  console.log(
                    "adding member before",
                    JSON.stringify(group.members.members)
                  );

                  group.members.members.push(toolname);
                  console.log(
                    "adding member after",
                    JSON.stringify(group.members.members)
                  );

                  that.setState({ groups: that.state.groups });
                }
              }
            });

            return;
          } else {
            return;
          }
        },
        groupMembershipRemove: (groupname, toolname) => {
          var memberIndex = -1;
          if (that && that.state && that.state.groups) {
            that.state.groups.forEach(group => {
              if (group.key === groupname) {
                if (group.members && group.members.members) {
                  for (
                    let index = 0;
                    index < group.members.members.length;
                    index++
                  ) {
                    const member = group.members.members[index];
                    if (member === toolname) {
                      memberIndex = index;
                    }
                  }
                }
                if (memberIndex > -1) {
                  console.log(
                    "removing member before",
                    JSON.stringify(group.members.members)
                  );

                  group.members.members.splice(memberIndex, 1);
                  console.log(
                    "removing member after",
                    JSON.stringify(group.members.members)
                  );

                  that.setState({ groups: that.state.groups });
                }
              }
            });
          }
        },
        groupProperties: (groupToEdit, onDismiss) => {
          return (
            <div>
              <GroupBoxProperties
                updateProperties={(ref, groupProperties) => {
                  var key = groupToEdit.name;
                  var groups = that.state.groups;
                  groups.forEach(group => {
                    if (group.key === key) {
                      group.title = groupProperties.title;
                      group.color = groupProperties.color;
                      group.textColor = groupProperties.textColor;
                    }
                  });

                  var grid = that.state.grid;

                  for (let rowIndex = 0; rowIndex < grid.length; rowIndex++) {
                    const row = grid[rowIndex];
                    for (
                      let columnIndex = 0;
                      columnIndex < row.length;
                      columnIndex++
                    ) {
                      const column = row[columnIndex];
                      if (
                        column.rightData &&
                        column.rightData.key &&
                        column.rightData.key === key
                      ) {
                        column.rightData.title = groupProperties.title;
                        column.rightData.color = groupProperties.color;
                        column.rightData.textColor = groupProperties.textColor;
                      }
                      if (
                        column.leftData &&
                        column.leftData.key &&
                        column.leftData.key === key
                      ) {
                        column.leftData.title = groupProperties.title;
                        column.leftData.color = groupProperties.color;
                        column.leftData.textColor = groupProperties.textColor;
                      }
                    }
                  }

                  that.setState({ groups, grid });

                  if (onDismiss) onDismiss();
                }}
                group={groupToEdit}
                onDismiss={onDismiss}
              />
            </div>
          );
        },
        tableProperties: (g, onDismiss) => {
          return (
            <div>
              <PeriodicTableProperties
                tableProperties={{
                  titlegraphics: that.state.bannerTitlegraphics,
                  hideLogo: that.state.bannerHideOurLogo,
                  isScaled: that.state.isScaled,
                  teaser: that.state.bannerTeaser,
                  hidezoneinfo: that.state.bannerHideZoneInfo,
                  byline: that.state.bannerByline,
                  border: that.state.bannerBorder,
                  textColor: that.state.textColor,
                  backgroundColor: that.state.bannerBackgroundColor,
                  version: that.state.version
                }}
                onDismiss={onDismiss}
              />
            </div>
          );
        },
        onUpdateTable: (tableEditor, updateType, updateData) => {
          that._setBannerState(updateData);
        },
        onUpdateGroup: group => {},
        onUpdateTile: tile => {},
        action: (editorAction, parm1) => {
          console.log("Editor called with action", editorAction, parm1);
          switch (editorAction) {
            case EditorActions.Publish:
              this._save();
              this.setState({
                isPublishing: true,
                tableToPublish: this.props.area
              });

              break;
            case EditorActions.Save:
              this._save();
              break;
            case EditorActions.SaveAs:
              this._save(parm1);
              setEditMode(this.props.globalContext, false);

              break;
            default:
              setEditMode(this.props.globalContext, false);
              alert("Not implemented yet");

              break;
          }
        }
      });
      console.log("Set editor on");
    }
    window.addEventListener("resize", this.updateDimensions);
    this.updateDimensions();
    this.load(false);
  };

  componentWillUnmount = () => {
    window.removeEventListener("resize", this.updateDimensions);
    if (this.props.context) {
      Jumpto365App.setEditor(this.props.globalContext, null);
      console.log("Set editor off");
    }
  };

  _onScale = info => {
    if (this.state === undefined) return;
    if (info != this.state.title) {
      //    this.setState({title:info})
    }
  };

  /**
   * Required method return the output of the component
   *
   * @returns
   * @memberof ContextPage
   */
  render() {
    var area =  this.props.area ? this.props.area : "-"
    var editMode = this.props.globalContext
      ? this.props.globalContext.editMode
      : false;

    var commandBarHeight = false && editMode ? 90 : 0;
    var publisheddUrl = area => {
      return (
        this.props.location.protocol +
        "//" +
        this.props.location.host +
        "/@/" +
        this.props.globalContext.me.domain +
        "/" +
        area
      );
    };
    var renditions = [{ size: 10, element: Cell }];
    return (
      <PageLayoutMain>
        {false && editMode && (
          <div
            style={{
              marginLeft: "-16px",
              marginRight: "-16px",
              paddingLeft: "16px",
              paddingRight: "16px",
              backgroundColor: "#F3F1F1"
            }}
          >
            <CommandBarTableEditor
              style={{
                marginLeft: "-16px",
                marginRight: "-16px",
                paddingLeft: "16px",
                paddingRight: "16px"
              }}
            />
          </div>
        )}
        <div
          style={{ height: "0px", overflow: "hidden", marginBottom: "10px" }}
        >
          <PageHeader
            icon="https://jumpto365.com/resources/images/app/jumpto365-Icon-white.png"
            title={this.state.title}
            color="#3E5897"
          />
        </div>
        <PageBody noscroll>
          <div style={{ border: "0px solid red" }}>
            {this.state.isPublishing && (
              <Wizard
                host={this}
                title="Table Publisher"
                area={this.state.tableToPublish}
                onDismiss={() => {
                  this.setState({ isPublishing: false });
                }}
                steps={[
                  {
                    actionNextLabel: "Publish",
                    onNext: () => {
                      return new Promise((resolve, reject) => {
                          debugger
                        Jumpto365API.publishTableOf(area)
                          .then(() => {
                            setEditMode(this.props.globalContext, false);
                            logAction(
                              this.props.globalContext,
                              ActionTypes.PublishDone
                            );
                            resolve();
                          })
                          .catch(error => reject(error));
                      });
                    },
                    body: (
                      <div xclassName="factory" style={{ margin: "auto" }}>
                        
                      
                        
                        {/* <div >
            <div className='stage'>
            <ul>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
            </ul>
            <div className='band'></div>
                <div className='factory'>
                    <div className='magic'></div>
                    <div className='screen'></div>
                </div>
            </div>
        </div> */}

                        <p>
                          <img width="auto" height="300px" src={loadingGif} />
                        </p>
                       
                      </div>
                    )
                  },

                  
                  {
                    body: (
                      <div style={{ margin: "auto" }}>
                        <h3>Congratulations!</h3>
                       <p>Here's your URL! Copy it and share or embed</p>
                         <a href={publisheddUrl(area)} target="_blank">
                          {publisheddUrl(area)}
                        </a>
                         <CopyToClipboard text={publisheddUrl(area)}
          onCopy={() => this.setState({copied: true})}>
          <span>&nbsp;<i style={{cursor:"pointer"}} class="ms-Icon ms-Icon--Copy" aria-hidden="true"></i></span>
        </CopyToClipboard>
 
        {this.state.copied ? <span style={{color: 'red'}}>Copied.</span> : null}
                        
                       
                      </div>
                    )
                  }
                ]}
              />
            )}
            {/* <Toolbar language={this.props.language} globalContext={this.props.globalContext}/> */}

            <PeriodicTable
              center
              banner
              version={this.state.version}
              connectors = {this.state.connectors}
              contextPath={this.state.contextPath}
              isScaled={this.state.isScaled}

              bannerTeaser={this.state.bannerTeaser}
              bannerHideZoneInfo={this.state.bannerHideZoneInfo}
              bannerByline={this.state.bannerByline}
              bannerHideOurLogo={this.state.bannerHideOurLogo}
              bannerBorder={this.state.bannerBorder}
              bannerTextColor={this.state.bannerTextColor}
              bannerBackgroundColor={this.state.bannerBackgroundColor}
              editor={this.state.editor}
              useImageForBanner={this.props.useImageForBanner}
              titleGraphicUrl={this.state.titleGraphicUrl}
              subtitle={this.state.subtitle}
              groups={this.state.groups}
              search={this.state.search}
              width={this.state.width}
              height={this.state.height - commandBarHeight}
              grid={this.state.grid}
              language={this.props.language}
              onScale={this._onScale}
              renditions={renditions}
              area={this.props.area}
              title={this.state.title}
              context={this.props.globalContext}
              onConnectorClicked = {(tileId,connector)=>{
                if (this.props.globalContext.groupInFocus){
                  console.log("Group in focus",this.props.globalContext.groupInFocus)
                  var connectors = this.state.connectors
                  if (connectors && connectors[tileId]){
                      var color =  connectors[tileId][connector]
                      console.log("connector color",color)

                      var g = _.find(this.state.groups,{key:this.props.globalContext.groupInFocus} )
                      if (g){
                        console.log("group ",g)
                        connectors[tileId][connector] = color === "#ffffff" ? g.color : "#ffffff"
                        this.setState(connectors)
                      }
                      
                  }

                }

                console.log("connector clicked",tileId,connector)
              }}
              scanner={(cellId,eventData)=>{
                return //TODO: Fix
               if (this.state.connectors) return
                if (eventData.scannerStarted){
                  this.connectors = {}
                  return log("scanner starting")
                }
                if (eventData.scannerEnded){
                  this.setState({connectors:this.connectors})
                  console.log(this.connectors)
                  return console.log("scanner done")

                }
                if (!this.connectors) return
  
                var cell =  this.connectors[cellId] ?  this.connectors[cellId] : {}
                cell = Object.assign(cell,eventData)
                this.connectors[cellId] = cell
                //log(cellId,eventData)
              }}
              launcherMode={
                this.state && this.state.search && this.state.search.appLauncher
                  ? true
                  : false
              }
            />
          
            {/* <ReactJson collapsed="0" src={this} /> */}
            {this.props.isMobile && (
              <Subscribe>
                {context => (
                  <div>
                    {/* <UserGlobalContextMenu  isAuthenticated={context.isAuthenticated} 
                userName={context.userName} 
                userId={context.userId}  
                globalContext={context}
                /> */}
                    <div
                      style={{
                        borderTop: "1px solid #cccccc",
                        marginLeft: "-28x",
                        marginRight: "-28x"
                      }}
                    >
                      &nbsp;
                    </div>
                    {/* <NavigationLeftContext globalContext={context} isCollapsed={false} ></NavigationLeftContext> */}
                    <NavigationLeftGroup
                      globalContext={context}
                      backgroundColor="#ffffff"
                      isCollapsed={false}
                    />
                    <NavigationLeftSettings
                      globalContext={context}
                      backgroundColor="#ffffff"
                      isCollapsed={false}
                    />
                  </div>
                )}
              </Subscribe>
            )}
          </div>
        </PageBody>
      </PageLayoutMain>
    );
  }
}

class Cell extends Component {
  render() {
    return <AppIcon name={this.props.celldata.key} size={this.props.size} />;
    // return <div style={{backgroundColor:"grey"}}>{this.props.size}</div>
  }
}

class Toolbar extends Component {
  static propTypes = {
    about: PropTypes.string,
    language: PropTypes.string,
    globalContext: PropTypes.object
  };

  render() {
    var context = this.props.globalContext;

    function prompt(id) {
      return Jumpto365App.prompt(id, context);
    }
    //TODO: Implement toolbar
    var lastLanguage = this.props.language ? this.props.language : "en";

    const farItems = [
      //     {
      //     key:"help",
      //     name: "Help",
      //     icon:"Info",
      //     disabled:true,
      //   }
    ];

    var items = [
      {
        key: "share",
        name: prompt("35"),
        icon: "Share",
        subMenuProps: {
          items: [
            {
              key: "embed",
              name: prompt("14"),
              icon: "Embed",
              disabled: false,
              onClick: () => {
                navigate("/embed");
              }
            }
          ]
        },
        disabled: false
      }
    ];

    const overflowItems = [];
    overflowItems.push({
      key: "rename",
      name: "Rename",
      icon: "Rename",
      disabled: true
    });

    return (
      <div
        id="toolbar"
        style={{
          marginTop: "-8px",
          marginLeft: "-8px",
          marginRight: "-8px",
          marginBottom: "8px"
        }}
      >
        <CommandBar
          isSearchBoxVisible={false}
          searchPlaceholderText="Search on this page (not implemented)"
          elipisisAriaLabel="More options"
          items={items}
          //   overflowItems={ overflowItems }
          farItems={farItems}
        />
      </div>
    );
  }
}
