import React, { Component } from "react";
import { isFunction } from "util";
import {
  TextField,
  DefaultButton,
  elementContainsAttribute
} from "office-ui-fabric-react";
import "react-app-polyfill/ie11"; // For IE 9-11 support
import "office-ui-fabric-react/dist/css/fabric.min.css";
import { initializeIcons } from "office-ui-fabric-react/lib/Icons";
import ReactJson from "react-json-view";
import "@intranets/css/toolbar.css";
import { runInThisContext } from "vm";
import _ from "lodash";
export * from "./Developer"
initializeIcons();
const sections = [];

export function loadConfig(js) {
  return new Promise((resolve, reject) => {
    try {
      js =
        js +
        `
    ;
    resolve(config);
    `;
      eval(js);
    } catch (error) {
      return reject(error);
    }
  });
}

class DebugPageSections extends Component {
  render() {
    var i = 0;
    if (!this.props.sections) {
      return <div>No Sections</div>;
    }
    return (
      <div>
        Sections
        {this.props.sections.map((section, key) => {
          return (
            <div
              style={{
                border: "1px dotted grey",
                margin: "8px",
                padding: "8px",
                display: "flex"
              }}
            >
              {section.columns.map((column, key) => {
                return (
                  <div
                    style={{
                      border: "1px dashed grey",
                      margin: "8px",
                      padding: "8px",
                      display: "block"
                    }}
                  >
                    {column.controls.map((control, key) => {
                      return (
                        <div
                          key={key}
                          style={{
                            border: "1px solid grey",
                            margin: "8px",
                            padding: "8px"
                          }}
                        >
                          <b>{control.title}</b>

                          <div>{control.description}</div>
                          <div>{control.id}</div>
                          <div />
                          <div />
                        </div>
                        // <ReactJson
                        //   collapsed={1}
                        //   src={{ control: control.json }}
                        // />
                      );
                    })}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    );
  }
}

export class PageTab extends Component {
  render() {
    var html = `
    <!-- tab placeholder ${this.props.data} -->
    <div data-tabid="${this.props.data}" data-tabs="tag" ></div>`;

    return <div dangerouslySetInnerHTML={{ __html: html }} />;
  }
}


export class SharePointControlZone extends Component {
  // data-automation-id="ControlZone"
  state = {};
  constructor(props) {
    super(props);
    this.zoneRef = React.createRef();
  }

  load = (config, tag) => {
    var that = this;

    if (!config || !tag) return 

      var actions = config[tag] ? config[tag] : [];

      actions.map(action => {
        switch (action.type) {

          case "html":
            
            var injects = that.state.injects ? that.state.injects : [];
            injects.push(
              `${action.html}
              `
            );
            that.setState({injects})
            break;
          case "css":
            var injects = that.state.injects ? that.state.injects : [];
            injects.push(
              `
            <style>
          ${action.style}
            </style>`
            );
            that.setState({injects})
            break;
          case "js":
            try {
              eval(action.script);
            } catch (error) {
              console.log("script",action.script)
              console.log("error",error)
            }
            
            break;
          case "parentAction":
            if (that.zoneRef.current) {
              applySetting(that.zoneRef.current, action);
            }
            break;
          default:
            break;
        }
      });
    

    function applySetting(element, action) {
      if (!element) return;
      var matchElement = false;
      if (element.dataset) {
        var dataset = Object.assign({}, element.dataset);
        _.forIn(dataset, function(value, key) {
          if (key.toUpperCase() === "AUTOMATIONID" && value === "ControlZone") {
            matchElement = true;
          }
        });
      }

      if (matchElement) {
        try {
          eval(action.script);
          return;
        } catch (error) {
          console.log(
            "SharePointControlZone applySetting onMatchAutomationId error",
            error
          );
          return;
        }
      }

      if (element.parentElement) {
        applySetting(element.parentElement, action);
      }
    }
  };
  componentDidMount() {
    this.load(this.props.config, this.props.tag);
  }

  componentDidUpdate(oldProps) {
    if (oldProps.config !== this.props.config) {
      this.load(this.props.config, this.props.tag);
    }
  }
  render() {
    var injects = this.state.injects ? this.state.injects : [];
    return (
      <ZoneTag data={this.props.tag}>
      <div ref={this.zoneRef}>
        {injects.map((html, key) => {
          
          return <div dangerouslySetInnerHTML={{ __html: html }} />;
        })}

        {this.props.children}
      </div>
      </ZoneTag>
    );
  }
}

export class ZoneTag extends Component {
  render() {
    debugger
    var html = `
    <!-- zone placeholder ${this.props.data} -->
    <div data-swissknifezoneid="${this.props.data}" ></div>`;

    return <div><div dangerouslySetInnerHTML={{ __html: html }} />{this.props.children}</div>;
  }
}

export class PageTabs extends Component {
  state = { tabs: [], selected: 0 };

  handleTabs = selectedTab => {
    function hideThis(element) {
      if (!element) return;
      if (
        element.dataset &&
        (element.dataset.automationId === "CanvasZone" ||
          element.dataset.automationid === "CanvasZone")
      ) {
        element.style.display = "none";
      }
      if (element.parentElement) {
        hideThis(element.parentElement);
      }
    }
    function showThis(element) {
      if (!element) return;
      if (
        element.dataset &&
        (element.dataset.automationId === "CanvasZone" ||
          element.dataset.automationid === "CanvasZone")
      ) {
        element.style.display = "";
      }
      if (element.parentElement) {
        showThis(element.parentElement);
      }
    }

    // var zones = document.querySelectorAll(
    //   'div[data-automation-id="CanvasZone"]'
    // );

    // zones.forEach(function(zone) {
    //   zone.style.border = "3px dotted red";
    // });

    setTimeout(function() {
      var tabs = document.querySelectorAll('div[data-tabs="tag"]');
      if (!selectedTab) {
        selectedTab = 0;
      }
      // console.log("Tabs", tabs);

      tabs.forEach(function(tab) {
        //tab.style.border = "3px dotted green";

        if (
          tab.dataset &&
          parseInt(tab.dataset.tabid) !== parseInt(selectedTab)
        ) {
          hideThis(tab);
        } else {
          showThis(tab);
        }
      });
    }, 100);
  };

  load = () => {
    if (
      this.props.host &&
      this.props.hosts.registerWithHost &&
      isFunction(this.props.hosts.registerWithHost)
    ) {
      this.props.hosts.registerWithHost(this);
    }

    var tabs =
      this.props.tabs && this.props.tabs.length > 0
        ? this.props.tabs
        : [
            { title: "Collect", ref: "1" },
            { title: "Prioritise", ref: "2" },
            { title: "Analyse", ref: "3" },
            { title: "Design", ref: "4" },
            { title: "Solve", ref: "5" }
          ];

    this.setState({ tabs });

    if (this.props.onChanged) {
      this.props.onChanged(tabs);
    }
    this.handleTabs();
  };
  componentDidMount() {
    this.load();
  }
  componentDidUpdate(prevProps) {
    if (
      prevProps.tabs !== this.props.tabs ||
      prevProps.page !== this.props.page
    ) {
      this.load();
    }
  }
  insert = newTabValue => {
    this.setState({ newTabValue: "" });
    var tabs = this.state.tabs;
    tabs.push({ title: newTabValue, ref: "" });
    this.setState({ tabs });
    if (this.props.onChanged) {
      this.props.onChanged(tabs);
    }
  };
  change = (index, newTabValue) => {
    var tabs = this.state.tabs;
    tabs[index].title = newTabValue;
    this.setState({ tabs });
    if (this.props.onChanged) {
      this.props.onChanged(tabs);
    }
  };

  remove = key => {
    var tabs = this.state.tabs;
    tabs.splice(key, 1);
    this.setState({ tabs });
    if (this.props.onChanged) {
      this.props.onChanged(tabs);
    }
  };
  render() {
    var tabs = this.state.tabs;
    var that = this;

    var sections =
      this.props.page && this.props.page.sections
        ? this.props.page.sections
        : [];

    if (!this.props.editMode) {
      return (
        <div>
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {this.state.tabs.map((tab, key) => {
              var isOver = this.state.over === key ? true : false;
              var isSelected = this.state.selected === key ? true : false;
              return (
                <div
                  onMouseEnter={() => {
                    this.setState({ over: key });
                  }}
                  onMouseLeave={() => {
                    this.setState({ over: "" });
                  }}
                  onClick={() => {
                    this.setState({ selected: key });
                    this.handleTabs(key);
                  }}
                  className={`tab ${isSelected ? "selected" : ""} ${
                    isOver && !isSelected ? "over" : ""
                  }`}
                  key={key}
                >
                  {tab.title}
                </div>
              );
            })}
          </div>
          {/* {this.state.selected !== "" && (
            <div
              style={{
                fontSize: "96px",
                margin: "auto",
                width: "120px",
                height: "120px",
                borderRadius: "50%",
                textAlign: "center",
                border: "1px solid grey"
              }}
            >
              {this.state.selected}
            </div>
          )} */}

          {/* <DebugPageSections sections={sections} /> */}
        </div>
      );
    }

    return (
      <div>
        {tabs.map((tab, key) => {
          return (
            <div style={{ padding: "8px", display: "flex" }}>
              <div style={{ maxWidth: "300px" }}>
                <TextField
                  value={tab.title}
                  onChange={(e, newTabValue) => {
                    this.change(key, newTabValue);
                  }}
                />
              </div>
              <div>
                {" "}
                <DefaultButton
                  text="Remove"
                  onClick={() => {
                    that.remove(key);
                  }}
                />
              </div>
            </div>
          );
        })}
        <div style={{ padding: "8px", display: "flex" }}>
          <div style={{ maxWidth: "300px" }}>
            <TextField
              value={this.state.newTabValue}
              onChange={(e, newTabValue) => {
                this.setState({ newTabValue });
              }}
            />
          </div>
          <div>
            {" "}
            <DefaultButton
              text="Insert"
              disabled={!this.state.newTabValue}
              onClick={() => {
                this.insert(this.state.newTabValue);
              }}
            />
          </div>
        </div>
        {/* <DebugPageSections sections={sections} /> */}

        <PageTabs editMode={false} tabs={this.state.tabs} />
        {/* <ReactJson
          collapsed={1}
          src={{
            page: this.props.page ? this.props.page : null,
            state: this.state
          }}
        /> */}
      </div>
    );
  }
}
