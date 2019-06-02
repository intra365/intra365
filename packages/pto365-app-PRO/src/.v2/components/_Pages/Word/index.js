import React, { Component } from "react";
import PropTypes from "prop-types";
import PageLayoutMain from "../../_Layouts/PageLayoutMain";
import PageHeader from "../../PageHeader";
import Login from "../../Login";

import Jumpto365Service from "../../../services";
import { subscribe, Subscribe } from "react-contextual";
import { DefaultButton } from "office-ui-fabric-react/lib/Button";
import Jumpto365App, { getSetting } from "../../_Contexts/Jumpto365App";
import PeriodicTable from "../../PeriodicTable";
import Testdata from "../../../data/TestData";
import $ from "jquery";
import PageBody from "../../PageBody";
import "./tenant.css";
import ReactJson from "react-json-view";
import OfficeGraphService, {
  getWordMarkdown,
  getWordMarkdownCached,
  download2
} from "../../../services/OfficeGraph";
import { Fabric } from "office-ui-fabric-react";
import ReactPlacerHolder from "react-placeholder";
import { CommandBar } from "office-ui-fabric-react/lib/CommandBar";
import {
  PivotLinkSize,
  PivotLinkFormat,
  PivotItem,
  Pivot
} from "office-ui-fabric-react/lib/Pivot";
import "office-ui-fabric-react/dist/css/fabric.css";
import { Panel, PanelType } from "office-ui-fabric-react/lib/Panel";
import Masonry from "react-masonry-component";
import { TextField } from "office-ui-fabric-react/lib/TextField";
import json from "format-json";
import mammoth from "mammoth";
import MarkdownParser from "../../../utilities/MarkdownParser";
import Parser from "../../../services/Parser";
import { splitMarkdown, MemoryStorage } from "../../../utilities/Word";
import { Nav, INavLink } from "office-ui-fabric-react/lib/Nav";
import Wizard from "../../Wizard";
import { Link } from "@reach/router";
import AppIconGeneric from "../../AppIconGeneric";
const Jumpto365API = require("../../../services/Jumpto365API");
const storagename = "jumpto365excel";
//import { ToolbarTS } from './ToolbarTS.tsx'
/**
 * Describe overall purpose of the component
 *
 * @export
 * @class WordPage
 * @extends {Component}
 */

var verbose = true;
function log(a, b, c, d, e, f) {
  if (!verbose) return;
  console.log(a, b, c, d, e, f);
}

export default class WordPage extends React.PureComponent {
  static propTypes = {
    context: PropTypes.any
  };

  constructor(props) {
    super(props);
    this.state = {
      showPublisherWizard: false,
      isDebugging: getSetting("debug", false),
      megamenuOn: false,
      publishOn: false,
      color: "#466FAC",
      icon: "https://jumpto365.com/resources/images/app/Word.png"
    };
  }

  jumpTo = path => {
    this.props
      .navigate(path)
      .then(x => {
        log(x);
      })
      .catch(e => {
        console.error(e);
      });
  };
  updateDimensions = () => {
    //this.setState({ });
    var win = $(window);
    var h = win.height();
    var w = win.width();
    var mastHead = $("#header");
    var pageHead = $("#pageheader");
    var height =
      h -
      40 -
      (mastHead ? mastHead.height() : 0) -
      (pageHead ? pageHead.height() : 0);
    var width = w;

    this.setState({
      color: "#3E5897",
      height,
      width, //: w(pageHead ? pageHead.width() : 1200),
      navTop: top < 120 ? 120 - top : 0,
      navHeight: height - 80
    });
  };

  componentDidUpdate = (previousProps, previousState) => {
    if (previousProps.tenant !== this.props.tenant) {
      this.init();
    }
    if (previousProps.filename !== this.props.filename) {
      this.init();
    }
    var that = this;
    $(".internallink").click(function(event, b, c) {
      // alert(1)
      event.preventDefault();
      var basePath = event.target.pathname;
      var lastChar = basePath.substring(basePath.length - 1);
      if (basePath.length > 1 && lastChar === "/") {
        basePath = basePath.substring(0, basePath.length - 1);
      }
      that.jumpTo(basePath);
    });
  };

  init = () => {
    this.updateDimensions();
    var that = this;
    var title = "Word";

    switch (this.props.store) {
      case "session":
        var data = sessionStorage.getItem(storagename);
        var localFiles = JSON.parse(data);
        var index =
          parseInt(this.props.filename) > 0
            ? parseInt(this.props.filename)
            : -1;
        var that = this;
        if (index < 1) {
          return this.setState({ error: "Cannot read from local storage" });
        }
        var buf = Buffer.from(localFiles[index - 1].data, "base64");

        title = localFiles[index - 1].file.name;

        var options = {
          arrayBuffer: buf
        };

        var that = this;
        //debugger
        mammoth
          .convertToMarkdown(options)
          .then(function(result) {
            var functionalVersion = 0;
            var html = result.value; // The generated HTML
            var messages = result.messages; // Any messages, such as warnings during conversion
            var document = MarkdownParser(
              html,
              "",
              "",
              functionalVersion,
              false
            );
            document.markDown = html;
            var components = Parser.parseComponents(html, 1);

            splitMarkdown("area", "tool", "", html, MemoryStorage())
              .then(targetFiles => {
                var length = json.plain(targetFiles).length;
                that.setState({ length, targetFiles });
              })
              .catch(function(err) {
                console.log(err);
              });

            that.setState({ messages, document, components, title });

            // fs.writeJsonSync(path.join(__dirname,"step1.json"),result)
          })
          .catch(function(err) {
            console.log(err);
          });
        break;

      default:
        break;
    }
    this.setState({
      title
    });
    function onedriveLoad(errorState, filename) {
      //debugger
      getWordMarkdownCached(filename, localStorage, 1, true)
        .then(document => {
          that.setState({
            markDown: document.markDown,
            components: document.components,
            editLink: document.editLink,
            links: document.links,
            state: 0,
            initState: 0
          });
          that._loadMenu(document.links);
        })
        .catch(e => {
          log(e);
          that.setState({
            errors: [e],
            initState: 0,
            state: errorState
          });
        });

      getWordMarkdown(filename, localStorage, 1, true)
        .then(document => {
          var lenght = json.plain(this.state.targetFiles).length;
          that.setState({
            lenght,
            markDown: document.markDown,
            components: document.components,
            editLink: document.editLink,
            links: document.links,
            state: 0,
            initState: 0
          });
          that._loadMenu(document.links);
        })
        .catch(e => {
          log(e);
          that.setState({
            errors: (that.state.errors ? that.state.errors : []).push(
              e.message
            ),
            initState: 0,
            state: errorState
          });
        });
    }
  };
  _loadMenu = links => {
    // log("toolbar _load", links)

    var items = (node, ix) => {
      //log("Loading links", node)

      return {
        key: "link" + ix,
        name: node.text,
        disabled: false,
        target: "_blank",
        href: node.link,
        subMenuProps: !node.childrens
          ? []
          : node.childrens.map((child, ix) => {
              return items(child, ix);
            })
      };
    };

    var myLinks = [];

    if (this.state.links && this.state.links.childrens) {
      // log("Loading root links")
      myLinks = this.state.links.childrens.map((l, ix) => {
        // log("Level 1", l)
        return items(l, ix);
      });
    }

    log("toolbar loaded");
    var megaMenu = this._getMegaMenu(this.state.links, 1, []);
    this.setState({
      megaMenu,
      myLinks
    });
  };

  componentWillMount = () => {};

  componentDidMount = () => {
    var that = this;

    this.init();

    window.addEventListener("resize", this.updateDimensions);
  };

  componentWillUnmount = () => {
    window.removeEventListener("resize", this.updateDimensions);
  };

  __onPatChanged = (v, newValue, a, b, c) => {
    console.log(v, newValue, a, b, c);
    var f = this.state.publishForm ? this.state.publishForm : {};
    f.PAT = newValue;
    this.setState({ publishForm, f });
  };
  /**
   * Required method return the output of the component
   *
   * @returns
   * @memberof ScenarioPage
   */
  render() {
    // if (!this.state.tenant  ) return null
    //   var icon = this.state.tenant && this.state.tenant.properties ? this.state.tenant.properties.logo : null

    var that = this;
    var pivotHeadings =
      this.state.links && this.state.links.childrens
        ? this.state.links.childrens.map((heading, ix) => {
            return <PivotItem key={ix} linkText={heading.text} />;
          })
        : [];
    var lastLanguage = this.props.language ? this.props.language : "en";

    const farItems = [
    //   {
    //     key: "word",
    //     xname: "Edit in Word Online",
    //     icon: "WordDocument",
    //     disabled: this.state.editLink ? false : true,
    //     href: this.state.editLink,
    //     target: "_blank",
    //     iconProps: { iconName: "WordDocument" }
    //   }
    ];

    //var items = this.state.myLinks
    var items = [
      {
        key: "publish",
        name: "Publish",
        icon: "Info",
        onClick: () =>
          this.setState({ publishOn: false, showPublisherWizard: true }),
        iconProps: { iconName: "WebPublish" }
      }
    ];

    const overflowItems = [];

    var links = [];
    var links =
      this.state.targetFiles && this.state.targetFiles.mapTitleToFile
        ? this.state.targetFiles.mapTitleToFile.map((map, index) => {
            return { icon: "", name: map.title, url: "", key: map.file };
          })
        : [];

    var documentMap = (
      <Nav
        groups={[
          {
            links
          }
        ]}
        onLinkClick={(e, item) => {
          var key = item.key;
          if (!key) return;
          var elem = $(`#${key}`);
          if (!elem || elem.length < 1) return;

          var newTop = elem[0].offsetTop - 200;

          $(".documentbody").animate(
            {
              scrollTop: newTop
            },
            1000
          );
          return (e.cancelable = true);
        }}
        expandedStateText={"expanded"}
        collapsedStateText={"collapsed"}
        selectedKey={"key3"}
        expandButtonAriaLabel={"Expand or collapse"}
      />
    );

    documentMap = (
      <div>
        {this.state.targetFiles && this.state.targetFiles.mapTitleToFile
          ? this.state.targetFiles.mapTitleToFile.map((map, index) => {
              var iconUrl =
                this.state.document &&
                this.state.document.images &&
                this.state.document.images[index] &&
                this.state.document.images[index][0]
                  ? this.state.document.images[index][0]
                  : null;
              var jumtoTag =
                this.state.document &&
                this.state.document.metadata &&
                this.state.document.metadata[index]
                  ? this.state.document.metadata[index]
                  : null;

              return (
                <HeadingIcon
                  iconUrl={iconUrl}
                  jumtoTag={jumtoTag}
                  title={map.title}
                  item={map}
                  onClick={item => {
                    var key = item.key;
                    if (!key) return;
                    var elem = $(`#${key}`);
                    if (!elem || elem.length < 1) return;

                    var newTop = elem[0].offsetTop - 200;

                    $(".documentbody").animate(
                      {
                        scrollTop: newTop
                      },
                      1000
                    );
                  }}
                />
              );
            })
          : []}
      </div>
    );

    return (
      <Fabric>
        <PageHeader
          icon={this.state.icon}
          title={this.state.title}
          color={this.state.color}
        />
        <div
          style={{
            marginLeft: "-8px",
            marginRight: "-8px",
            marginTop: "-8px",
            marginBottom: "8px"
          }}
        >
          <CommandBar
            isSearchBoxVisible={true}
            searchPlaceholderText="Search "
            elipisisAriaLabel="More options"
            items={items}
            xoverflowItems={overflowItems}
            farItems={farItems}
          />
        </div>

        {this.state.showPublisherWizard && (
          <Wizard
            title="Article Publisher"
            onDismiss={() => {
              that.setState({ showPublisherWizard: false });
            }}
            steps={[
        
              {
                body: (
                    <div>
                      <h3>Publish your App Articles?</h3>
                    Once published, your App Articles will be saved in the Article directory and will be available to assign to App Tiles on your Tables. 
                    For details on how Article publishing work, see this <a
                      href="https://jumpto365.zendesk.com/hc/en-us/articles/360021251351"
                      target="_blank"
                    >article</a>
   
                  </div>
                ),
                actionNextLabel: "Publish",
                onNext: () => {
                  return new Promise((resolve, reject) => {
                    var that = this;

                    var data = that.state.targetFiles;
                    data.metadata = that.state.document
                      ? that.state.document.metadata
                      : null;
                    data.images = that.state.document
                      ? that.state.document.images
                      : null;

                    Jumpto365API.directorySave(
                      "-",
                      "default",
                      "articles",
                      that.props.context.me.upn,
                      that.state.title + ".json",
                      that.state.targetFiles,
                      that.state.title
                    )
                      .then(publishedDirectory => {
                        resolve();
                        that.setState({ publishedDirectory });
                      })

                      .catch(error => {
                        reject(error);
                      });
                    // setTimeout(()=>{
                    //     resolve()
                    // },3000)
                  });
                }
              },
              {
                body: (
                  <div>
                    {" "}
                    <h3>
                      Your App Articles are published!
                    </h3><p>
                 You can find your App Articles is the Article directory.
                 Gear menu > Content > Articles, or <Link to="/-/articles">click here</Link> </p>
                 
<p>
To assign your App Articles to App Tiles, <a href="https://jumpto365.zendesk.com/hc/en-us/articles/360024991511-Create-or-Edit-an-App-Tile" target="_blank">click here</a> 

</p>
                    
                  </div>
                ),
                actionNextLabel: "View Articles",
                onNext: () => {
                  navigate("/-/articles")
                }
              }
            ]}
          />
        )}
        <PageBody noscroll>
          {/* <ToolbarTS compiler="1" framework="2" /> */}

          <div
            xstyle={{
              display: "flex",
              width: "100%",
              height: "100%",
              minHeight: "400px"
            }}
          >
            {this.state.xerrors}

            <div>
              {/* <PeriodicTable width={this.state.width} height={this.state.height} grid={Testdata.pto} onScale={this._onScale}/> */}

              <ReactPlacerHolder
                delay={3000}
                type="text"
                showLoadingAnimation
                rows={14}
                ready={this.state.components}
              >
                {this.state.components && (
                  <div style={{ display: "flex", minHeight: "500px",width:"100%"}}>
                    {/* <div class="ms-font-xxl" style={{marginBottom:"16px"}}>Document </div> */}
                    <div
                      className="ms-font-m toolbody markdown documentbody"
                      id="documentbody"
                      style={{
                        flexGrow: "3",
                        height: this.state.navHeight,
                        overflowY: "auto",
                        backgroundColor: "#f8f8f8",
                        margin: "8px",
                        padding: "16px",
                        border: "1px solid #888888"
                      }}
                    >
                      <div
                        style={{}}
                        dangerouslySetInnerHTML={{
                          __html: this.state.document.body
                        }}
                      />
                    </div>

                    <div>
                      {/* <div class="ms-font-xxl" style={{marginBottom:"16px"}}>Document Headings</div> */}
                      <div
                        className="ms-font-m toolbody "
                        style={{
                          flexGrow: "2",
                          width:"400px",
                          minWidth: "400px",
                          height: this.state.navHeight,
                          overflowY: "auto",
                          border: "0px dashed red",
                          padding: "8px"
                        }}
                      >
                        {documentMap}
                      </div>
                    </div>
                  </div>
                )}
              </ReactPlacerHolder>
              <Panel
                isOpen={this.state.megamenuOn}
                type={PanelType.large}
                isLightDismiss={true}
                onDismiss={() => this.setState({ megamenuOn: false })}
                // tslint:disable-next-line:jsx-no-lambda

                xheaderText="Links"
              >
                {/* <ReactJson src={{props:this.props,state:this.state}} collapsed={1}/>  */}
                <Pivot>{this.state.megaMenu}</Pivot>
              </Panel>

              <Panel
                isOpen={this.state.publishOn}
                type={PanelType.medium}
                isLightDismiss={true}
                onDismiss={() => this.setState({ publishOn: false })}
                // tslint:disable-next-line:jsx-no-lambda

                xheaderText="Publish"
              >
                {this.state.targetFiles && this.state.targetFiles.data && (
                  <div>
                    <textarea
                      style={{ width: "100%", height: this.state.height }}
                      value={json.plain(this.state.targetFiles)}
                    />
                  </div>
                )}
              </Panel>
            </div>
            {/* <ReactJson src={{props:this.props,state:this.state}} collapsed={0}/>    */}
          </div>

          {/* <ReactJson src={{state:this.state}} collapsed={2}/>   */}
        </PageBody>
      </Fabric>
    );
  }
}

class HeadingIcon extends Component {
  _onClick = () => {
    if (this.props.onClick) {
      this.props.item.key = this.props.item.file;
      this.props.onClick(this.props.item);
    }
  };
  render() {
    return (
      <div
        onClick={this._onClick}
        style={{ display: "flex" }}
        className="headingGroup"
      >
        <div style={{ padding: "4px" }}>
          <AppIconGeneric
            size="40"
            iconUrl={this.props.iconUrl}
            backgroundColor={
              this.props.jumtoTag && this.props.jumtoTag.rgbcolor
                ? this.props.jumtoTag.rgbcolor
                : "#444444"
            }
            title=""
          />{" "}
        </div>
        <div>
          <div style={{ lineHeight: "12px", padding: "4px" }}>
            <b>{this.props.title}</b>{" "}
          </div>
          <div style={{ lineHeight: "12px", padding: "4px" }}>
            {this.props.jumtoTag ? this.props.jumtoTag.inshort : ""}
          </div>
          {/* <div style={{lineHeight:"12px",padding:"4px"}}>{this.props.jumtoTag ? "has link" : ""}</div> */}
          {/* { icon :"", name: map.title, url: '', key:map.file } */}
        </div>
      </div>
    );
  }
}
