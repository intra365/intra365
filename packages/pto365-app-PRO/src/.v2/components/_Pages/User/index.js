import React, { Component } from "react";
import PropTypes from "prop-types";
import PageLayoutMain from "../../_Layouts/PageLayoutMain";
import PageHeader from "../../PageHeader";
import Login from "../../Login";
import Jumpto365App, {
  getSetting,
  setSetting,
  licenseInfo
} from "../../_Contexts/Jumpto365App";
import Jumpto365Service, { mdPropertiesToHeader } from "../../../services";
import OfficeGraphService, {
  getWordMarkdown,
  download2
} from "../../../services/OfficeGraph";
import { subscribe, Subscribe } from "react-contextual";
import {
  DefaultButton,
  PrimaryButton
} from "office-ui-fabric-react/lib/Button";
import ReactJson from "react-json-view";
import PageBody from "../../PageBody";
import { CommandBar } from "office-ui-fabric-react/lib/CommandBar";
import ScenarioList from "../../ScenarioList";
import "./tool.css";
import { navigate, Link } from "@reach/router";
var MarkdownParser = require("../../../utilities/MarkdownParser");
var mammoth = require("mammoth");
import {
  IPersonaSharedProps,
  Persona,
  PersonaSize,
  PersonaPresence
} from "office-ui-fabric-react/lib/Persona";
import { Checkbox } from "office-ui-fabric-react/lib/Checkbox";
import { Label } from "office-ui-fabric-react/lib/Label";
import v1util from "../../../../util";
//import Word from '../../../utilities/Word'
import { Toggle } from "office-ui-fabric-react/lib/Toggle";
import { ThemeSettingName } from "@uifabric/styling";
import moment from "moment";
import TableContainer from "../../../containers/TableContainer";
import MyTablesBrowser from "../../MyTablesBrowser";
const Jumpto365API = require("../../../services/Jumpto365API");
const axios = require("axios");
const http = require("https");

const TABLENAME = "Table"

class Jumpto365Module extends React.PureComponent {
  state = {};
  componentDidMount = () => {
    const moduleName = "module-" + this.props.name;
    //  debugger
    this.setState({
      moduleName,
      enabled: getSetting(moduleName, { enabled: false }).enabled
    });
  };
  render() {
    var that = this;
    return (
      <div style={{ margin: "16px", display: "flex", alignContent: "stretch" }}>
        <div style={{ marginRight: "16px", alignSelf: "flex-start" }}>
          <Toggle
            onChanged={() => {
              setSetting(that.state.moduleName, {
                enabled: !that.state.enabled
              });
              that.setState({ enabled: !that.state.enabled });
            }}
            checked={this.state.enabled}
            disabled={!this.props.enabled}
            xlabel="Introduction"
            onText=""
            offText=""
            style={{ color: "#ffffff" }}
            onFocus={() => console.log("onFocus called")}
            onBlur={() => console.log("onBlur called")}
          />
        </div>
        <div style={{ flex: 1 }}>
          {" "}
          <div className="ms-font-l">{this.props.text}</div>
          {
            <div>
              {" "}
              <a
                href="javascript:void(0)"
                data-cb-type="checkout"
                data-cb-plan-id={this.props.productId}
                data-cb-plan-quantity="1"
              >
                Buy
              </a>
            </div>
          }
          <div>
            {" "}
            <Link to={`/pages/docs/features/${this.props.name}`}>
              Read more{" "}
            </Link>{" "}
          </div>
        </div>
      </div>
    );
  }
}
/**
 * Describe overall purpose of the component
 *
 * @export
 * @class UserPage
 * @extends {Component}
 */

export default class UserPage extends React.PureComponent {
  static propTypes = {
    context: PropTypes.any, // todo - Refactor and callit globalContext : PropTypes.obj
    user: PropTypes.any,
    store: PropTypes.any,
    folder: PropTypes.any,
    file: PropTypes.any
  };

  state = {};

  constructor(props) {
    super(props);
  }

  componentDidUpdate = (previousProps, previousState) => {
    if (previousProps.level1 !== this.props.level1) {
      this.setState({ files: null, body: null,sele });
      this._load();
    }
  };
  componentDidMount = () => {
    this._load();

    if (window.Chargebee) {
      var Chargebee = window.Chargebee;
      Chargebee.registerAgain();
      var cbInstance = Chargebee.getInstance();
      var cart = cbInstance.getCart();
      var customer = {
        email: this.props.context ? this.props.context.userId : ""
      };
      // debugger
      cart.setCustomer(customer);

      //    console.log(cbInstance)
      //    var product = cbInstance.initializeProduct('jumpto365-personal');
    }
  };

  _load = () => {
    //return
    if (!this.props.context) return;
    if (!this.props.context.isAuthenticated) return;

    var Jumpto365Licenses = getSetting("Jumpto365Licenses");
    this.setState(Jumpto365Licenses);

    // Jumpto365API.itemTables(TABLENAME).then(myTables => {
    //   this.setState({ myTables, loaded: true ,currentTableKey:null,currentItem:null});
    // });

    if (this.props.level1) {
      let graph = new OfficeGraphService();
      var filepath = this.props.uri.replace("/beta/me/home/", "");

      var parse = text => {
        var j = new Jumpto365Service();
        j.parseMarkDown(text).then(document => {
          this.setState({ components: document.components });
        });
      };
      var key = "onedrive:" + filepath;
      var data = sessionStorage.getItem(key);
      if (data) {
        return parse(data);
      }

      graph.me_file(filepath).then(filedata => {
        parse(filedata.file);
        sessionStorage.setItem(key, filedata.file);
      });
    } else {
      this._getDrive();
      let graph = new OfficeGraphService();
      graph
        .me()
        .then(me => {
          this.setState({
            me
          });
        })
        .catch(error => {
          Jumpto365App.emitError(this, error, "Getting me");
        });

      graph
        .me_licenseDetails()
        .then(license => {
          //debugger

          setSetting("licenseDetails", license.value);

          this.setState({ license: licenseInfo() });
        })
        .catch(error => {
          Jumpto365App.emitError(this, error, "Getting me_licenseDetails");
        });

      graph.drives_root().then(drive => {
        setSetting("drivesRoot", drive);
        this.setState({ drive });
      });
      graph.sites_root().then(sites => {
        setSetting("sitesRoot", sites);
        this.setState({ sites });
      });

      graph
        .me_photo()
        .then(me_photo => {
          this.setState({
            me_photo
          });
        })
        .catch(error => {
          Jumpto365App.emitError(this, error, "Getting photo");
        });
    }
  };

  _getDrive = () => {
    let graph = new OfficeGraphService();
    graph
      .me_drive()
      .then(me_drive => {
        var files = me_drive.value.map((file, ix) => {
          return { key: ix, title: file.name, file };
        });
        this.setState({ files });
      })
      .catch(error => {
        Jumpto365App.emitError(this, error, "Getting drive");
      });
  };
  _onSelection = selection => {
    this.setState({ selection });

    if (selection && selection.length && selection.length === 1) {
      navigate(`me/home/jumpto365/${selection[0].file.name}`);
      //this._download(selection[0].file["@microsoft.graph.downloadUrl"],selection[0].file.name)
    }
  };

  _login = () => {
    Jumpto365App.login(this.props.context);
  };
  render() {
    let ctx = this.props.context;

    if (!ctx) return "No context";
    if (!ctx.isAuthenticated) return "Not authenticated";
    if (!ctx.user) return "No user object in context";
    var upn = ctx.me.upn;

    function prompt(id) {
      return Jumpto365App.prompt(id, ctx);
    }

    const farItems = [
      {
        key: "help",
        name: "Help",
        icon: "Info",
        disabled: true
      }
    ];

    var items = [
      {
        key: "file",
        name: "File",
        disabled: false,

        subMenuProps: {
          items: [
            {
              key: "open",
              name: "Open",
              disabled: false,
              onClick: this._getDrive
            },
            {
              key: "save",
              name: "Save",
              disabled: true
            },
            {
              key: "saveas",
              name: "Save as",
              disabled: true
            }
          ]
        }
      },
      {
        key: "share",
        name: "Share",
        icon: "Share",
        disabled: true
      },
      {
        key: "download",
        name: "Download",
        icon: "Download",
        disabled: false,
        subMenuProps: {
          items: [
            {
              key: "pdf",
              name: "PDF",
              icon: "PDF",
              disabled: true,
              onClick: this.props.onCreatePDF
            },
            {
              key: "word",
              name: "Word",
              icon: "WordDocument",
              disabled: true
            },
            {
              key: "excel",
              name: "Excel",
              icon: "ExcelDocument",
              disabled: true
            }
          ]
        }
      }
    ];

    const overflowItems = [];
    overflowItems.push({
      key: "rename",
      name: "Rename",
      icon: "Rename",
      disabled: true
    });

    var persona = {
      imageUrl: this.state.me_photo,

      text: this.state.me ? this.state.me.displayName : "",
      secondaryText: this.state.me ? this.state.me.mail : "",
      tertiaryText: this.state.me ? this.state.me.department : ""
      // optionalText: 'Available at 4:00pm'
    };
    var license = null;

    license = getSetting("Jumpto365Licenses", { licenses: [] }).licenses.map(
      (license, ix) => {
        return (
          <Jumpto365Module
            name={license.SKU}
            productId={license.SKU}
            text={license.Description}
            enabled={true}
            preview="private"
          />
        );
      }
    );
    var myTables = this.state.myTables ? this.state.myTables : [];
    var height = this.props.height
    var halfWidth = this.props.width / 2
    return (
      <PageLayoutMain>
        <PageHeader title={`${prompt("61")}: ${ctx.userId}`} color="#2a7ab9" />

        <PageBody>
          <div>
            <Persona
              {...persona}
              size={PersonaSize.size100}
              hidePersonaDetails={false}
            />

            <div
              class="ms-font-xl"
              style={{
                margin: "8px",
                padding: "8px",
                borderBottom: "1px solid #888888"
              }}
            />
            <div
              class="ms-font-xl"
              style={{
                margin: "8px",
                padding: "8px",
                xborderBottom: "1px solid #888888"
              }}
            >
              My Tables
            </div>
            <MyTablesBrowser context={this.props.context} upn={upn}  width={this.props.width} height={this.props.height}
            />
           {/* <div class="ms-font-xl" style={{margin:"8px",padding:"8px",borderBottom:"1px solid #888888"}}>Settings</div>

                        <Toggle
                        checked={this.state.feedbackMode}
                        label="Test &amp; Feedback mode"
                        onText="On"
                        offText="Off"
                        onFocus={() => console.log('onFocus called')}
                        onBlur={() => console.log('onBlur called')}
                        onChange={(e,on)=>{
                          this.setState({feedbackMode:on})
                          if (this.props.onChange) this.props.onChange({isHashed:on})
                        }}
                      /> */}

            {/* <div class="ms-font-xl" style={{margin:"8px",padding:"8px",borderBottom:"1px solid #888888"}}>Your Office 365 Licenses</div>
    {this.state.license &&
       <ScenarioList singleSelection tasks={this.state.license} defaultView="licenseinfo" />
    } */}
          </div>
        </PageBody>
      </PageLayoutMain>
    );
  }
}
