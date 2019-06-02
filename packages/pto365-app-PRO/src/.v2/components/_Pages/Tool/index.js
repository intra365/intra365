import React, { Component } from "react";
import PropTypes from "prop-types";
import PageLayoutMain from "../../_Layouts/PageLayoutMain";
import PageHeader from "../../PageHeader";
import Jumpto365Service from "../../../services";
import PeriodicTableofOffice365 from "../../../../pages/Beta/PeriodicTableofOffice365";
import ReactPlacerHolder from "react-placeholder";
import { CommandBar } from "office-ui-fabric-react/lib/CommandBar";
import TextBlock from "react-placeholder/lib/placeholders/TextBlock";
import { Link } from "@reach/router";
import "react-placeholder/lib/reactPlaceholder.css";
import _ from "lodash";
import Utility from "../../../utilities";
import {
  PivotLinkSize,
  PivotLinkFormat,
  PivotItem,
  Pivot
} from "office-ui-fabric-react/lib/Pivot";
import PropertyList from "../../PropertyList";
import ToolScenarioDetails from "../../ToolScenarioDetails";
import ToolImage from "../../ToolImage";
import PeriodicTable from "../../PeriodicTable";
import $ from "jquery";
import "./tool.css";
import PageBody from "../../PageBody";
import { DefaultButton } from "office-ui-fabric-react";
import {
  MessageBar,
  MessageBarType
} from "office-ui-fabric-react/lib/MessageBar";
import { MessageBarButton } from "office-ui-fabric-react/lib/Button";
import Assessment from "../../Assessment";
const Jumpto365API = require("../../../services/Jumpto365API");

//import { Document, Page, Text, View, StyleSheet } from '@react-pdf/react-pdf/dist/react-pdf.browser.es.js';

/**
 * Describe overall purpose of the component
 *
 * @export
 * @class ToolPage
 * @extends {Component}
 */
export default class ToolPage extends Component {
  static propTypes = {
    language: PropTypes.string,
    name: PropTypes.string.isRequired,
    scenario: PropTypes.string,
    isMobile: PropTypes.string,
    context: PropTypes.object
  };
  jumpto365Service = null;
  state = { width: 100 };

  constructor(props) {
    super(props);

    this.state = {
      ready: false,
      body: <div style={{ height: "80%" }} />,
      scenario: this.props.scenario
        ? Utility.ScenarioFromProp(this.props.scenario)
        : null
    };
  }

  _mapDocumentToState(title, document) {
    this.setState({
      document,
      body: document.body,
      color: document.properties.color
        ? document.properties.color
        : this.state.color != null
        ? this.state.color
        : "#666666",
      icon: document.properties.icon
        ? document.properties.icon
        : this.state.icon,
      inshort: document.properties.inshort,
      byline: document.properties.byline, // ? document.properties.byline : "Matt Wade (@thatmattwade)",
      imageurl: document.properties.imageurl, //? document.properties.imageurl : "https://placeimg.com/800/240/any",
      imagecopyright: document.properties.imagecopyright
        ? document.properties.imagecopyright
        : "All rights reserved to the copyright owner",
      previewer: document.properties.previewer,
      showMessage:
        document.properties.translator === "Microsoft Cognitive Services",
      message:
        "This article was machine-translated using Microsoft Cognitive Services from the original English version.",
      toolContextGrid: null,
      ready: true,
      title
    });
  }
  _load2 = async (domain, area, key, language) => {
    var publicSettings = await this.jumpto365Service.getDomainPublicContext(
      domain,
      area,
      language
    );

    var context = publicSettings.contexts.default;
    var contextAddress =
      "/@/" + domain + "/" + area + "/" + key + "/" + language;

    this.setState({
      grid: context.grid,
      contextFullSize: "/@/" + domain + "/" + area,
      gridVersion: context.version ? context.version : 1,
      contextPath: "/@/" + domain + "/" + area
    });

    var contentRef = context.references && context.references[key]
        ? context.references[key]
        : null;
        debugger
    if (contentRef) {
      
      
      var baseUrl = contentRef.originalUrl ? contentRef.originalUrl.substring(0, _.lastIndexOf(contentRef.originalUrl, "/")) : null

      var document = await this.jumpto365Service.getContent(
        context.references[key].url,
        baseUrl
      );
    }

    for (let rowIndex = 0; rowIndex < context.grid.length; rowIndex++) {
      const row = context.grid[rowIndex];
      for (let columnIndex = 0; columnIndex < row.length; columnIndex++) {
        const cell = row[columnIndex];

        if (cell.centerData && cell.centerData.key === key) {
          document.properties.color = cell.centerData.color;
          document.properties.icon = cell.centerData.icon;
          var title = cell.centerData.title;
        }
      }
    }

    this._mapDocumentToState(title, document);

    //   var licenses = await service.getJSON2("hexatown","docs","microsoft/licenses/")
  };
  _loadPreview = async (icon, title, color, contentRef, grid, href) => {
    var url = contentRef;

    this.setState({
      grid,
      icon,
      title,
      color,
      contextFullSize: null,
      gridVersion: 1
    });
    try {
      var document = await this.jumpto365Service.getContent(url, href);
      document.properties.color = color;
      document.properties.icon = icon;

      this._mapDocumentToState(title, document);
    } catch (error) {
      console.log("Preview loader error", error);
    }

    //   var licenses = await service.getJSON2("hexatown","docs","microsoft/licenses/")
  };

  _loadDraft = async (upn, area, keyName) => {
    try {
      
      var draftSettings = await Jumpto365API.getUserDraftContext(upn, area);
      
      if (draftSettings.length !== 1) return;

      var context = JSON.parse(draftSettings[0].Json).tableOf;
debugger
      this.setState({
        grid: context.grid,
        isScaled: context.settings ?  context.settings.isScaled : false,

        contextFullSize: "/@/" + upn + "/" + area,
        gridVersion: context.version ? context.version : 1,
        contextPath: "/@/" + upn + "/" + area
      });

      for (let rowIndex = 0; rowIndex < context.grid.length; rowIndex++) {
        const row = context.grid[rowIndex];
        for (let columnIndex = 0; columnIndex < row.length; columnIndex++) {
          const cell = row[columnIndex];

          if (cell.centerData && cell.centerData.key === keyName) {
            var url = cell.centerData.contentRef;
            var ix = _.lastIndexOf(url, "/");
            var baseUrl = url.substring(0, ix);
debugger
            console.log("Base URL", baseUrl, "cell", cell);

            var document = await this.jumpto365Service.getContent(url, baseUrl);

            document.properties.color = cell.centerData.color;
            document.properties.icon = cell.centerData.icon;
            var title = cell.centerData.title;
            this._mapDocumentToState(title, document);
          }
        }
      }
    } catch (error) {
      console.log("Preview loader error", error);
    }

    //   var licenses = await service.getJSON2("hexatown","docs","microsoft/licenses/")
  };

  _load = () => {
    
    if (this.props.preview) {
      return this._loadPreview(
        this.props.icon,
        this.props.title,
        this.props.color,
        this.props.contentRef,
        this.props.grid,
        this.props.href
      );
    }
    if (this.props.v2) {
      if (_.indexOf(this.props.domain, "@") > -1) {
        return this._loadDraft(
          this.props.domain,
          this.props.area,
          this.props.keyName
        );
      } else {
        return this._load2(
          this.props.domain,
          this.props.area,
          this.props.keyName,
          this.props.language
        );
      }
    }

    var queryParms = {};
    if (this.props && this.props.location && this.props.location.search) {
      var s = this.props.location.search;
      if (_.startsWith(s, "?")) s = s.substring(1);
      var sa = s.split("&");

      sa.forEach(sb => {
        var sc = sb.split("=");
        queryParms[sc[0]] = sc[1];
      });
    }
    this.setState({ ready: false });
    var appData = this.jumpto365Service.getApp(this.props.name);

    var buildDocPath = () => {
      var docPath = "";
      for (let index = 1; index < 10; index++) {
        var p = this.props["level" + index];
        docPath += p ? "/" + p : "";
      }
      return docPath;
    };
    var docPath = buildDocPath();
    var contentRef = this.props.isArticle
      ? `/article/${this.props.domain}/-/${this.props.area}/${this.props.title}`
      : null;

    this.jumpto365Service
      .getToolDocument(
        this.props.name,
        this.props.language,
        contentRef,
        this.props.store,
        docPath
      )
      .then(document => {
        var contexts = document.properties.contexts
          ? document.properties.contexts.split(",")
          : ["office365"];
        if (contexts || this.props.referalContext) {
          //  var this.props.contextsource
          var altContext = this.props.domain ? this.props.domain : null;

          this.jumpto365Service
            .getContext(
              contexts ? contexts[0] : null,
              this.props.language,
              altContext
            )
            .then(context => {
              this.setState({
                grid: context.grid,
                contextFullSize: altContext
                  ? "/@/" + altContext + "/-"
                  : contexts
                  ? "/context/" + contexts[0]
                  : null,

                gridVersion: context.version ? context.version : 1,
                contextPath: this.props.domain
                  ? "/@/" + this.props.domain + `/${this.props.area}`
                  : null
              });
            })
            .catch(error => {
              this.setState({
                warnings: (this.state.warnings ? this.state.warnings : []).push(
                  error
                )
              });
            });
        }
        let service = new Jumpto365Service();
        service
          .getJSON2("hexatown", "docs", "microsoft/licenses/")
          .then(licenses => {
            var that = this;
            //this.state.grid
            _.keys(licenses.map).forEach(key => {
              var toolsMap = licenses.map[key];
              var map = toolsMap.split(",");
              map.forEach(tool => {
                if (tool === that.props.name) {
                  var includedIn = licenses.services[key];
                  that.setState({
                    includedInLicenses: includedIn.yes,
                    includedInLicensesSoon: includedIn.soon
                  });
                }
              });
            });

            this.setState(licenses);
          })
          .catch(error => {
            console.warn("getting licenses", error);
          });

        var title = document.properties.title
          ? document.properties.title
          : this.state.title;
        if (document.properties.previewer) {
          this.jumpto365Service
            .getContext(document.properties.previewer, this.props.language)
            .then(context => {
              this.setState({ toolContextGrid: context.grid });
            })
            .catch(error => {
              this.setState({
                warnings: (this.state.warnings ? this.state.warnings : []).push(
                  error
                )
              });
            });
        }
        if (document.properties.redirect) {
          this.redirectTimer = setTimeout(() => {
            window.location.href = document.properties.redirect;
          }, 1000);

          this.setState({ redirect: document.properties.redirect });
        }
        this._mapDocumentToState(title, document);

        setTimeout(() => {
          this._scrollTo(
            this.props.location && this.props.location.hash
              ? this.props.location.hash
              : null
          );
        }, 10);
      })
      .catch(err => {
        this.setState({
          body: JSON.stringify(err),
          ready: true
        });
      });

    this.setState({
      appData,
      color: appData.color,
      icon: appData.icon
    });
  };
  _scrollTo = key => {
    if (!key) return;
    var elem = $(`${key}`);
    if (!elem || elem.length < 1) return;

    var newTop = elem[0].offsetTop - 200;

    // debugger
    $(".MainBody").animate(
      {
        scrollTop: newTop
      },
      1000
    );
  };
  componentDidUpdate = (previousProps, previousState) => {
    if (previousProps !== this.props) {
      this._load();
    }
    var oldHash =
      previousProps.location && previousProps.location.hash
        ? previousProps.location.hash
        : "";
    var newHash =
      this.props.location && this.props.location.hash
        ? this.props.location.hash
        : "";

    if (oldHash !== newHash) {
      var key = newHash;
      this._scrollTo(newHash);
    }
  };

  componentDidMount() {
    var userSettings =
      this.props.context && this.props.context.me && this.props.context.me.JSON
        ? JSON.parse(this.props.context.me.JSON)
        : {};
    var canSelfAssess = userSettings.canSelfAssess;
    this.setState({ canSelfAssess });
    this.jumpto365Service = new Jumpto365Service();

    this._load();
    window.addEventListener("resize", this.updateDimensions);
    this.updateDimensions();
  }
  updateDimensions = () => {
    //this.setState({ });
    var win = $(window);
    var h = win.height();
    var mastHead = $("#header");
    var pageHead = $("#pageheader");
    this.setState({
      height:
        h -
        40 -
        (mastHead ? mastHead.height() : 0) -
        (pageHead ? pageHead.height() : 0),
      width: pageHead ? pageHead.width() : 1200
    });
  };

  componentWillUnmount = () => {
    if (this.redirectTimer) {
      clearTimeout(this.redirectTimer);
    }
    window.removeEventListener("resize", this.updateDimensions);
  };

  /**
   * Required method return the output of the component
   *
   * @returns
   * @memberof ToolPage
   */
  render() {
    if (this.state.redirect) {
      return <div>Redirecting to {this.state.redirect}</div>;
    }
    let pivotProperties = !this.state.document ? (
      1
    ) : (
      <PivotItem linkText="Properties">
        <div style={{ margin: "10px", overflowY: "auto" }}>
          <PropertyList
            title="Properties"
            properties={_.toPairs(this.state.document.properties)}
          />
        </div>
      </PivotItem>
    );
    let pivotLink =
      this.state.document && this.state.document.sourceUrl ? (
        <PivotItem linkText="Source">
          <div style={{ margin: "10px" }}>
            <a href={this.state.document.sourceUrl} target="_blank">
              GitHub
            </a>
          </div>
        </PivotItem>
      ) : (
        1
      ); // null is an object, and <Pivot checks on the type of children

    let inshort = this.state.inshort ? (
      <div className="ms-font-xl" style={{ marginBottom: "10px" }}>
        {" "}
        {this.state.inshort}
      </div>
    ) : null;
    let byline = this.state.byline ? (
      <div className="ms-font-l" style={{ marginBottom: "0px" }}>
        {" "}
        By: {this.state.byline}
      </div>
    ) : null;
    let headings =
      this.state.document && this.state.document.headings
        ? this.state.document.headings.map((heading, ix) => {
            var text = heading.text.replace(/<[^>]*>/g, "");
            return (
              <div>
                <a href={`#${heading.escapedText}`}>
                  {heading.xlevel} {text}
                </a>
              </div>
            );
          })
        : null;
    var headerActions = null;
    if (
      this.state &&
      this.state.document &&
      this.state.document.properties &&
      this.state.document.properties.link
    ) {
      headerActions = (
        <div style={{ marginTop: "8px" }}>
          <DefaultButton
            split={false}
            style={{ marginBottom: "10px" }}
            target="_blank"
            href={this.state.document.properties.link}
            text="Jump to"
            xmenuProps={{
              items: [
                {
                  key: "emailMessage",
                  text: "Email message",
                  iconProps: { iconName: "Mail" }
                },
                {
                  key: "calendarEvent",
                  text: "Calendar event",
                  iconProps: { iconName: "Calendar" }
                }
              ]
            }}
          />{" "}
        </div>
      );
    }

    var message = this.state.showMessage ? (
      <div style={{ marginRight: "-16px", marginTop: "-16px" }}>
        {" "}
        <MessageBar
          className="messagedialog"
          messageBarType={MessageBarType.warning}
          isMultiline={false}
          //actions={actions}
          onDismiss={() => {
            this.setState({ showMessage: false });
          }}
          dismissButtonAriaLabel="Dismiss"
        >
          {this.state.message}
        </MessageBar>
      </div>
    ) : null;
    var selfAssesment =
      this.state.canSelfAssess && false ? <Assessment {...this.props} /> : null;

    return (
      <div>
        {this.props.isMobile && (
          <PageLayoutMain>
            <PeriodicTable
              focusedtools={[this.props.name]}
              isScaled={this.state.isScaled}
              version={this.state.gridVersion}
              contextPath={this.state.contextPath}
              width={this.state.width}
              height={this.state.height / 2}
              grid={this.state.grid}
              language={this.props.language}
            >
              {headerActions}
            </PeriodicTable>
          {!this.props.notitle &&
            <PageHeader
              icon={this.state.icon}
              title={this.state.title}
              color={this.state.color}
            />}
            <Toolbar onCreatePDF={this.onCreatePDF} />
            {message}
            <PageBody>
              <div className="ms-Grid">
                <div className="ms-Grid-row ">
                  <div
                    className="ms-Grid-col ms-sm12  "
                    style={{
                      minHeight: "400px",
                      marginTop: "-8px",
                      borderRight: "1px solid #cccccc"
                    }}
                  >
                    <ReactPlacerHolder
                      delay={1000}
                      type="text"
                      showLoadingAnimation
                      rows={7}
                      ready={this.state.ready}
                    >
                      <div style={{ height: "16px" }}>&nbsp;</div>
                      {inshort}

                      {byline}
                      {(inshort || byline) && (
                        <div
                          style={{
                            height: "16px",
                            borderTop: "1px solid #777777",
                            marginTop: "4px"
                          }}
                        >
                          &nbsp;
                        </div>
                      )}
                      {this.state.toolContextGrid && (
                        <PeriodicTable
                          name={this.state.previewer}
                          width={this.state.width / 1.6}
                          height={this.state.height}
                          grid={this.state.toolContextGrid}
                        />
                      )}

                      {!this.state.previewer && (
                        <ToolImage
                          imageurl={this.state.imageurl}
                          copyright={this.state.imagecopyright}
                        />
                      )}

                      <div
                        className="ms-font-m toolbody"
                        dangerouslySetInnerHTML={{ __html: this.state.body }}
                      />

                      {this.state.scenario && (
                        <ToolScenarioDetails
                          domain={this.state.scenario.domain}
                          area={this.state.scenario.area}
                          name={this.state.scenario.subject}
                          language={this.state.language}
                        />
                      )}
                      <Pivot
                        linkFormat={PivotLinkFormat.links}
                        linkSize={PivotLinkSize.normal}
                      >
                        {pivotProperties}
                      </Pivot>
                    </ReactPlacerHolder>
                  </div>
                </div>
              </div>
            </PageBody>
          </PageLayoutMain>
        )}

        {!this.props.isMobile && (
          <PageLayoutMain>
          {!this.props.notitle && <PageHeader
              icon={this.state.icon}
              title={this.state.title}
              color={this.state.color}
            >
          

              {headerActions}
            </PageHeader>
            }
            <Toolbar onCreatePDF={this.onCreatePDF} />
            {message}
            <PageBody>
              <div className="ms-Grid">
                <div className="ms-Grid-row ">
                  <div
                    className="ms-Grid-col ms-sm8  "
                    style={{
                      minHeight: "400px",
                      marginTop: "-8px",
                      borderRight: "1px solid #cccccc"
                    }}
                  >
                    <ReactPlacerHolder
                      delay={1000}
                      type="text"
                      showLoadingAnimation
                      rows={7}
                      ready={this.state.ready}
                    >
                      <div style={{ height: "16px" }}>&nbsp;</div>
                      {inshort}

                      {byline}
                      {(inshort || byline) && (
                        <div
                          style={{
                            height: "16px",
                            borderTop: "1px solid #777777",
                            marginTop: "4px"
                          }}
                        >
                          &nbsp;
                        </div>
                      )}
                      {this.state.toolContextGrid && (
                        <PeriodicTable
                          name={this.state.previewer}
                          useImageForBanner={false}
                          width={this.state.width / 1.6}
                          height={this.state.height}
                          grid={this.state.toolContextGrid}
                        />
                      )}

                      {!this.state.previewer && (
                        <ToolImage
                          imageurl={this.state.imageurl}
                          copyright={this.state.imagecopyright}
                        />
                      )}

                      <div
                        className="ms-font-m toolbody"
                        dangerouslySetInnerHTML={{ __html: this.state.body }}
                      />
                    </ReactPlacerHolder>
                  </div>
                  <div className="ms-Grid-col ms-sm4">
                    <div>
                      <div className="xptominiature" style={{ margin: "8px" }}>
                        <PeriodicTable
                                      isScaled={this.state.isScaled}

                          version={this.state.gridVersion}
                          contextPath={this.state.contextPath}
                          area={this.props.area}
                          focusedtools={[this.props.name]}
                          width={this.state.width / 3.4}
                          height={this.state.height / 3}
                          grid={this.state.grid}
                          language={this.props.language}
                        />
                        {/* <PeriodicTableofOffice365 id="ptomini" onChangeService={this.props.onChangeService} language={this.state.language} onRender={this.onRenderPTO} /> */}
                      </div>
                      {this.state.contextFullSize && (
                        <div>
                          <Link to={this.state.contextFullSize}>Full size</Link>
                        </div>
                      )}
                      {selfAssesment}

                      {headings && (
                        <div style={{ marginTop: "10px", marginLeft: "8px" }}>
                          <div className="ms-font-l">Document links</div>
                          {headings}
                        </div>
                      )}
                    </div>
                    {this.state.scenario && (
                      <ToolScenarioDetails
                        domain={this.state.scenario.domain}
                        area={this.state.scenario.area}
                        name={this.state.scenario.subject}
                        language={this.state.language}
                      />
                    )}
                    <Pivot
                      linkFormat={PivotLinkFormat.links}
                      linkSize={PivotLinkSize.normal}
                    >
                      {pivotProperties}
                    </Pivot>
                  </div>
                </div>
              </div>
            </PageBody>
          </PageLayoutMain>
        )}
      </div>
    );
  }
}

class Toolbar extends Component {
  static propTypes = {
    about: PropTypes.string,
    language: PropTypes.string
  };

  render() {
    return <div />;

    //TODO: Implement toolbar
    var lastLanguage = this.props.language ? this.props.language : "en";

    const farItems = [
      {
        key: "help",
        name: "Help",
        icon: "Info",
        disabled: true
      }
    ];

    var items = [
      //   {
      //     key: "fioe",
      //     name: "File",
      //     disabled: false,

      //     subMenuProps: {
      //       items: [{
      //           key: 'open',
      //           name: 'Open',
      //           disabled: true,
      //         },
      //         {
      //           key: 'save',
      //           name: 'Save',
      //           disabled: true,
      //         },
      //         {
      //           key: 'saveas',
      //           name: 'Save as',
      //           disabled: true,
      //         }
      //       ]
      //     }
      //   },
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
