import React, { Component } from "react";
import PropTypes from "prop-types";
import PageLayoutPublisher from "../../_Layouts/PageLayoutPublisher";
import PageHeader from "../../PageHeader";
import FileUpload from "../../FileUpload";
import ReactJson from "react-json-view";
import {
  Dialog,
  DialogType,
  DialogFooter
} from "office-ui-fabric-react/lib/Dialog";
import Jumpto365App from "../../_Contexts/Jumpto365App";
import $ from "jquery";
import { __positioningTestPackage } from "office-ui-fabric-react/lib/utilities/positioning";
import { getExcel } from "../../../services/OfficeGraph";
import Excel from "../../../utilities/Excel";
import { navigate } from "@reach/router";
import {
  MessageBar,
  MessageBarType
} from "office-ui-fabric-react/lib/MessageBar";
import { MessageBarButton } from "office-ui-fabric-react/lib/Button";
import { ProgressIndicator } from "office-ui-fabric-react";
import background from "../../../media/Upload Page Graphic 2.png";

const storagename = "jumpto365excel";

var parseSheet = (excel, sheetName) => {
  // debugger
  return new Promise((resolve, reject) => {
    if (!excel) return reject("no excel data");
    if (!sheetName) return reject("no sheetname");

    var format = Excel.detectFormat(excel, sheetName);
    switch (format) {
      case "TOOLS":
        Excel.parseTools(excel, sheetName)
          .then(tools => {
            resolve({ format, data: tools, sheetName });
          })
          .catch(err => {
            reject(err);
          });
        break;
      case "GROUPS":
        Excel.parseGroups(excel, sheetName)
          .then(groups => {
            resolve({ format, data: groups, sheetName });
          })
          .catch(err => {
            reject(err);
          });
        break;
      case "WTW":
        Excel.parseWTW(excel, sheetName)
          .then(wtw => {
            resolve({ format, data: wtw, sheetName });
          })
          .catch(err => {
            reject(err);
          });
        break;
      case "PTO":
        Excel.parsePTO(excel, sheetName)
          .then(pto => {
            resolve({ format, data: pto, sheetName });
          })
          .catch(err => {
            reject(err);
          });
        break;
      default:
        var data = Excel.sheetToJSON(excel, sheetName);
        resolve({ format: "unknown", data, sheetName });

        break;
    }
  });
};
class Warning extends Component {
  render() {
    return this.props.message;
  }
}
/**
 * Describe overall purpose of the component
 *
 * @export
 * @class LoginPage
 * @extends {Component}
 */
export default class ExcelPage extends Component {
  static propTypes = {
    globalContext: PropTypes.obj
  };

  constructor(props) {
    super(props);
    this.state = {
      showError: false,
      sheet: null,
      type: null,
      hideDialog: true,
      files: []
    };
  }
  _closeDialog = () => {
    this.setState({ hideDialog: true });
  };

  _load = () => {
    var that = this;
    if (!this.props.filename) return;

    getExcel(this.props.filename)
      .then(excel => {
        console.log(document);
        that.setState({
          data: [
            { data: excel.data2, key: 0, file: { name: that.props.filename } }
          ]
        });
        var buf = Buffer.from(excel.data2, "base64");
        this.setState({
          excelData: buf,
          selectedFile: 0,
          id: 0,
          type: null,
          sheet: null
        });

        parseSheet(buf, that.props.sheet)
          .then(data => {
            that.setState({
              sheet: data.data,
              type: data.format,
              sheetname: that.props.sheet
            });
          })
          .catch(err => {
            that.setState({
              error: Jumpto365App.emitError(that, err, "#PARSER-GROUPS")
            });
          });
      })

      .catch(e => {
        console.log(e);
        that.setState({
          errors: (that.state.errors ? that.state.errors : []).push(e.message),
          initState: 0
        });
      });
  };
  componentDidMount = () => {
    var data = null; //sessionStorage.getItem(storagename)
    this.setState({ id: -1, data: data ? JSON.parse(data) : [] });
    window.addEventListener("resize", this.updateDimensions);
    this.updateDimensions();
    this._load();
  };

  componentDidCatch(error, info) {
    // Display fallback UI
    this.setState({
      error: Jumpto365App.emitError(this, error, "SHARING PAGE")
    });
    // You can also log the error to an error reporting service
    //logErrorToMyService(error, info);
  }

  updateDimensions = () => {
    //this.setState({ });
    var win = $(window);
    var h = win.height();
    var mastHead = $("#header");
    var pageHead = $("#pageheader");
    var toolbar = $("#toolbar");
    this.setState({
      //title: "",
      height:
        h -
        (mastHead ? mastHead.height() : 0) -
        (pageHead ? pageHead.height() : 0) -
        (toolbar ? toolbar.height() : 0),
      width: pageHead ? pageHead.width() / 2.2 : 400
    });
  };

  componentWillUnmount = () => {
    window.removeEventListener("resize", this.updateDimensions);
  };

  selectFile = selection => {
    if (selection.length === 0) return;
    if (!this.state.data) return;
    var ix = selection[0].key;

    try {
      var buf = Buffer.from(this.state.data[ix].data, "base64");
      this.setState({
        excelData: buf,
        selectedFile: ix,
        id: ix,
        type: null,
        sheet: null
      });
    } catch (error) {
      this.setState({
        error: Jumpto365App.emitError(this, error, "SELECT FILE")
      });
    }
  };

  onDrop = files => {
    this.setState({ files });
  };
  /**
   * Required method return the output of the component
   *
   * @returns
   * @memberof ScenarioPage
   */
  render() {
    var that = this;
    let storedFiles = this.state.data
      ? this.state.data.map(function(item, ix) {
          return { key: item.key, name: item.file.name };
        })
      : [];

    var context = this.props.globalContext;
    function prompt(id) {
      return Jumpto365App.prompt(id, context);
    }

    return (
      <PageLayoutPublisher>
        <PageHeader
          title={
            prompt("42") + " - drop a file or click to upload ..." /* Upload */
          }
          color="#2a7ab9"
        />

        <div>
          {this.state.errors && (
            <ReactJson collapsed="0" src={this.state.errors} />
          )}
          {this.state.showError && (
            <div style={{ marginRight: "-16px", marginTop: "-8px" }}>
              {" "}
              <MessageBar
                className="messagedialog"
                messageBarType={MessageBarType.error}
                isMultiline={false}
                actions={null}
                onDismiss={() => {
                  that.setState({ showError: false });
                }}
                dismissButtonAriaLabel="Dismiss"
              >
                {this.state.error}
              </MessageBar>
            </div>
          )}
          <div style={{ display: "flex" }}>
            <div
              style={{
                flexGrow:2,
                backgroundColor: "#c3c3c3",
                marginTop: "-8px",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundImage: `url(${background})`
              }}
            >
              <FileUpload
                label="Upload"
                onUpload={(data, file) => {
                  try {
                    switch (file.type) {
                      case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
                        var buf = Buffer.from(data, "base64");
                        this.state.data.push({
                          key: this.state.data.length,
                          file: {
                            name: file.name,
                            size: file.size,
                            type: file.type,
                            lastModified: file.lastModified
                          },
                          data
                        });
                        sessionStorage.setItem(
                          storagename,
                          JSON.stringify(this.state.data)
                        );
                        navigate(
                          `/excel/local/${this.state.data.length}/of Office365`
                        );
                        this.setState({
                          data: this.state.data,
                          selectedFile: sessionStorage.length,
                          excelData: buf,
                          file: { filename: file.name, size: file.size }
                        });
                        break;
                      case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
                        var buf = Buffer.from(data, "base64");
                        this.state.data.push({
                          key: this.state.data.length,
                          file: {
                            name: file.name,
                            size: file.size,
                            type: file.type,
                            lastModified: file.lastModified
                          },
                          data
                        });
                        sessionStorage.setItem(
                          storagename,
                          JSON.stringify(this.state.data)
                        );
                        navigate(`/word/local/${this.state.data.length}`);
                        this.setState({
                          data: this.state.data,
                          selectedFile: sessionStorage.length,
                          excelData: buf,
                          file: { filename: file.name, size: file.size }
                        });
                        break;
                      case "image/jpeg":
                        debugger;
                        var buf = Buffer.from(data, "base64");

                        this.state.data.push({
                          key: this.state.data.length,
                          file: {
                            name: file.name,
                            size: file.size,
                            type: file.type,
                            lastModified: file.lastModified
                          },
                          data
                        });

                        break;
                      default:
                        this.setState({
                          showError: true,
                          error: `${prompt("44")} "${file.type}" ${prompt(
                            "45"
                          )} `
                        });

                        break;
                    }
                  } catch (error) {
                    this.setState({ showError: true, error: error.message });
                  }
                }}
              />
            </div>
            <div
              style={{
               
                padding: "16px",
              
                flexGrow:1,
              }}
            >
              <h3>Templates</h3>
              <p>
              Grab one of the templates to get started
              </p>
              <div>
                  
                  Word
                <ul>
                    
                    <li>
                    <a href="https://github.com/jumpto365/microsoft365/raw/master/templates/New%20Article.docx">
                     New Article
                    </a>
                    </li>
                  <li>                   
                    
                    <a href="https://github.com/jumpto365/microsoft365/raw/master/templates/Periodic%20Table%20of%20Office%20365.docx">
                      All articles used in the Periodic Table of Office 365 in
                      english
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                {" "}
                Excel
                <ul>
                    
                  <li>
                    <a href="https://github.com/jumpto365/microsoft365/raw/master/templates/Customised%20Periodic%20Table%20of.xlsx">
                      Periodic Table of Office 365 - English version
                    </a>
                  </li>
                </ul>{" "}
              </div>
            </div>
          </div>

          {/* <ReactJson collapsed="2" src={this.state} />  */}
        </div>
      </PageLayoutPublisher>
    );
  }
}
