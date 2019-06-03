// baseline
// https://reach.tech/router/

import React, { Component } from "react";
import Loadable from "react-loadable";
import { Router, Match, Location, navigate } from "@reach/router";
import MastHead from "./components/MastHead";
import Jumpto365App, {
  messageDialogStage,
  splitHash,
  setSetting,
  licenseInfo
} from "./components/_Contexts/Jumpto365App";
import { Provider, Subscribe } from "react-contextual";
import { initializeIcons } from "@uifabric/icons";
import { Fabric } from "office-ui-fabric-react/lib/Fabric";
import NavigationLeft from "./components/NavigationLeft";
import OfficeGraphService from "./services/OfficeGraph";
import "../App.css";
import _ from "lodash";
import axios from "axios";
import {
  MessageBar,
  MessageBarType
} from "office-ui-fabric-react/lib/MessageBar";
import {
  MessageBarButton,
  DefaultButton
} from "office-ui-fabric-react/lib/Button";
import $ from "jquery";
import { Link } from "office-ui-fabric-react/lib/Link";
import { Customizer } from "office-ui-fabric-react";
import { FluentCustomizations } from "@uifabric/fluent-theme";
import { isIE } from "react-device-detect";
import Hello from "./components/Hello";
import PivotGlobal from "./components/PivotGlobal";
import { EditorExperienceContext } from "./logic/EditorExperience/EditorExperienceContext";
import { jumpto365API } from "../api/pto365";
import "./root.css";

const API = require("./services/Jumpto365API");

//
//const store = Jumpto365App.store()

initializeIcons();

function Loading(props) {
  if (props.error) {
    var reloaded = sessionStorage.getItem("reloaded");

    if (!reloaded) {
      sessionStorage.setItem("reloaded", "1");
      if (window && window.parent && window.parent !== window) {
        window.location.reload(true);
      } else {
        return window.location.reload(true);
      }
    }

    var message = props && props.error ? props.error.message : "UPS ";
    //debugger
    return (
      <div className="pageBody">
        <h1 className="errorCenterHeader">
          Sorry! Something not working as expected
        </h1>

        <div className="errorCenterHeader">
          <div>
            <DefaultButton
              style={{ margin: "16px", width: "300px" }}
              primary
              text="Visit our Help Center"
              onClick={() => {
                window.open("https://jumpto365.zendesk.com/hc/en-us", "_blank");
              }}
            />
          </div>
          <div>
            <DefaultButton
              style={{ margin: "16px", width: "300px" }}
              text="Check service availabiliy"
              onClick={() => {
                window.open("https://uptime.com/s/overview", "_blank");
              }}
            />
          </div>
          {/* <div>
          <DefaultButton
            style={{ margin: "16px", width: "300px" }}
            text="File a support request"
            onClick={() => {
              if (window.zE) {
                zE(function() {
                  debugger;
                });
              }
            }}
          />
        </div> */}

          <div>
            <textarea
              style={{ width: "100%" }}
              readOnly
              rows="30"
              cols="80"
              value={message}
            />{" "}
          </div>
        </div>
      </div>
    );
  } else if (props.pastDelay) {
    return <div>Loading....</div>;
  } else {
    return null;
  }
}

let ScenarioPage = Loadable({
  loader: () => import("./components/_Pages/Scenario"),
  loading: Loading,
  timeout: 10000,
  delay: 300
});
let HomePage = Loadable({
  loader: () => import("./components/_Pages/Home"),
  loading: Loading,
  timeout: 10000,
  delay: 300
});
let GenericPage = Loadable({
  loader: () => import("./components/_Pages/GenericPage"),
  loading: Loading,
  timeout: 10000,
  delay: 300
});
let DevPage = Loadable({
  loader: () => import("./components/_Pages/DevPage"),
  loading: Loading,
  timeout: 10000,
  delay: 300
});
let PageEditorPage = Loadable({
  loader: () => import("./components/_Pages/PageEditor"),
  loading: Loading,
  timeout: 10000,
  delay: 300
});
let WebPartTesterPage = Loadable({
  loader: () => import("./components/_Pages/WebPartTester"),
  loading: Loading,
  timeout: 10000,
  delay: 300
});
let EmbedPage = Loadable({
  loader: () => import("./components/_Pages/Embed"),
  loading: Loading,
  timeout: 10000,
  delay: 300
});
let LanguagePage = Loadable({
  loader: () => import("./components/_Pages/Language"),
  loading: Loading,
  timeout: 10000,
  delay: 300
});
let LoginPage = Loadable({
  loader: () => import("./components/_Pages/Login"),
  loading: Loading,
  timeout: 10000,
  delay: 300
});
let ExcelPage = Loadable({
  loader: () => import("./components/_Pages/Excel"),
  loading: Loading,
  timeout: 10000,
  delay: 300
});
let ExcelPage2 = Loadable({
  loader: () => import("./components/_Pages/Excel2"),
  loading: Loading,
  timeout: 10000,
  delay: 300
});
let WordPage = Loadable({
  loader: () => import("./components/_Pages/Word"),
  loading: Loading,
  timeout: 10000,
  delay: 300
});
let TenantPage = Loadable({
  loader: () => import("./components/_Pages/Tenant"),
  loading: Loading,
  timeout: 10000,
  delay: 300
});

let TenantEditorPage = Loadable({
  loader: () => import("./components/_Pages/TenantEditor"),
  loading: Loading,
  timeout: 10000,
  delay: 300
});
let ToolPage = Loadable({
  loader: () => import("./components/_Pages/Tool"),
  loading: Loading,
  timeout: 10000,
  delay: 300
});
let UsecasePage = Loadable({
  loader: () => import("./components/_Pages/Usecase"),
  loading: Loading,
  timeout: 10000,
  delay: 300
});
let PreviewPage = Loadable({
  loader: () => import("./components/_Pages/Preview"),
  loading: Loading,
  timeout: 10000,
  delay: 300
});
let _DeveloperToolsPage = Loadable({
  loader: () => import("./components/_Pages/_DeveloperTools"),
  loading: Loading,
  timeout: 10000,
  delay: 300
});
let UserPage = Loadable({
  loader: () => import("./components/_Pages/User"),
  loading: Loading,
  timeout: 10000,
  delay: 300
});
let MetadataPage = Loadable({
  loader: () => import("./components/_Pages/Metadata"),
  loading: Loading,
  timeout: 10000,
  delay: 300
});
let ExplorerPage = Loadable({
  loader: () => import("./components/_Pages/Explorer"),
  loading: Loading,
  timeout: 10000,
  delay: 300
});
let ContextPage = Loadable({
  loader: () => import("./components/_Pages/Context"),
  loading: Loading,
  timeout: 10000,
  delay: 300
});
let ChargeBeePage = Loadable({
  loader: () => import("./components/_Pages/ChargeBee"),
  loading: Loading,
  timeout: 10000,
  delay: 300
});
//let SharePage = Loadable({loader:()=>import( './components/_Pages/Share'),loading: Loading,timeout:10000,delay:300})
let PersonalHomePage = Loadable({
  loader: () => import("./components/_Pages/PersonalHome"),
  loading: Loading,
  timeout: 10000,
  delay: 300
});
let IconsPage = Loadable({
  loader: () => import("./components/_Pages/Icons"),
  loading: Loading,
  timeout: 10000,
  delay: 300
});
let TableEditorPage = Loadable({
  loader: () => import("./components/_Pages/TableEditor"),
  loading: Loading,
  timeout: 10000,
  delay: 300
});
let ToolbarEditorPage = Loadable({
  loader: () => import("./components/_Pages/ToolbarEditor"),
  loading: Loading,
  timeout: 10000,
  delay: 300
});
let ImageEditorPage = Loadable({
  loader: () => import("./components/_Pages/ImageEditor"),
  loading: Loading,
  timeout: 10000,
  delay: 300
});
let DatabaseExplorerPage = Loadable({
  loader: () => import("./components/_Pages/DatabaseExplorer"),
  loading: Loading,
  timeout: 10000,
  delay: 300
});
let DashboardPage = Loadable({
  loader: () => import("./components/_Pages/Dashboard"),
  loading: Loading,
  timeout: 10000,
  delay: 300
});
let EditorPage = Loadable({
  loader: () => import("./components/_Pages/EditorPage"),
  loading: Loading,
  timeout: 10000,
  delay: 300
});

let Dash = () => <div>Dash</div>;
let NotFound = () => <div>Not found</div>;

let Context = () => <div>Context</div>;

//__webpack_public_path__ = "./"

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // You can also log the error to an error reporting service
    this.setState({ error, info });
    console.log("componentDidCatch", error, info);
    //logErrorToMyService(error, info);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className="pageBody">
          <h1 className="errorCenterHeader">
            Sorry! Something not working as expected
          </h1>
          {this.state.error && this.state.error.message && (
            <h2>{this.state.error.message}</h2>
          )}
          <div className="errorCenterHeader">
            <div>
              <DefaultButton
                style={{ margin: "16px", width: "300px" }}
                primary
                text="Visit our Help Center"
                onClick={() => {
                  window.open(
                    "https://jumpto365.zendesk.com/hc/en-us",
                    "_blank"
                  );
                }}
              />
            </div>
            <div>
              <DefaultButton
                style={{ margin: "16px", width: "300px" }}
                text="Check service availabiliy"
                onClick={() => {
                  window.open("https://uptime.com/s/overview", "_blank");
                }}
              />
            </div>
            {/* <div>
              <DefaultButton
                style={{ margin: "16px", width: "300px" }}
                text="File a support request"
                onClick={() => {
                  if (window.zE) {
                    zE(function() {
                      debugger;
                    });
                  }
                }}
              />
            </div> */}

            <div>
              <DefaultButton
                style={{ margin: "16px", width: "300px" }}
                text="View error details"
                onClick={() => {
                  this.setState({ viewDetails: true });
                }}
              />
            </div>
          </div>
          {this.state.info &&
          this.state.info.componentStack &&
          this.state.viewDetails ? (
            <div>
              <textarea
                style={{ width: "100%" }}
                readOnly
                rows="30"
                cols="80"
                value={this.state.info.componentStack}
              />{" "}
            </div>
          ) : null}
        </div>
      );
    }
    if (isIE && false) {
      const defaultContext = "office365";

      return (
        <div>
          <div style={{ marginRight: "-16px" }}>
            {" "}
            <MessageBar
              className="messagedialog"
              messageBarType={MessageBarType.severeWarning}
              isMultiline={true}
              dismissButtonAriaLabel="Dismiss"
            >
              We currently have some issues with Internet Explorer in version
              2.0 - a version with full reader capabilities will be provided
              before moving into production. Use Chrome, Firefox, Safari &amp;
              Edge for now.
            </MessageBar>
          </div>

          <Subscribe>
            {globalContext => (
              <div>
                <ContextPage
                  isMobile={this.state.isMobile}
                  useImageForBanner
                  path="/"
                  language="en"
                  context={defaultContext}
                  globalContext={globalContext}
                />
              </div>
            )}
          </Subscribe>
        </div>
      );
    }
    return <AppV2 />;
  }
}

/**
 *
 *
 *
 * Main component providing routing capabilities
 *
 * @export
 * @class AppV2
 * @extends {Component}
 */
class AppV2 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showLeftNavigation: true,
      isMobile: this._isMobile(),
      hasGlobalPivot: false,
      editorExperience: { toggle: this.editorExperienceToogle, on: false }
    };
  }

  editorExperienceToogle = () => {
    var editorExperience = this.state.editorExperience;
    editorExperience.on = !editorExperience.on;
    this.setState({ editorExperience });
  };
  updateDimensions = () => {
    //this.setState({ });
    var win = $(window);
    var h = win.height();

    var navHeight = h - 32;
    if (navHeight < 0) {
      return console.log("skipping at height", navHeight);
    }
    var newDimensions = {
      pivotGlobalHeight: this.state.hasGlobalPivot ? 32 : 0,
      navHeight: navHeight,
      isMobile: this._isMobile(),
      isSlim: this._isSlim(),
      bodyHeight: win.height() - 64,
      bodyWidth: win.width() - (this.state.canEdit ? 32 : 32)
    };

    if (
      this.state.navHeight !== newDimensions.navHeight ||
      this.state.bodyWidth !== newDimensions.bodyWidth
    ) {
      console.log("updating dimensions", newDimensions);
      this.setState(newDimensions);
    }
  };

  _showLeftNavigation = (pathname, inFrame, context) => {
    //  console.log("pathname",pathname)
    if (context.me) {
      API.trackMe(pathname, {});
    } else {
      API.trackAnomyous(pathname, {});
    }
    var userSettings =
      context && context.me && context.me.JSON
        ? JSON.parse(context.me.JSON)
        : {};

    if (userSettings.canEdit) {
      if (!this.state.canEdit) {
        this.setState({ canEdit: true });
      }
      return false;
    }
    if (window.zE) {
      zE(function() {
        zE.setHelpCenterSuggestions({ url: true });
      });
    }
    if (window.appInsights) {
      window.appInsights.trackPageView(pathname);
    }
    var _hsq = (window._hsq = window._hsq || []);
    _hsq.push(["setPath", pathname]);
    _hsq.push(["trackPageView"]);

    return false;

    if (inFrame) return false;
    return !this.state.isMobile;

    if (pathname === "/") return false;
    function startswith(search, searchfor) {
      return search.substr(0, searchfor.length) === searchfor;
    }
    if (startswith(pathname, "/periodictable")) return false;
    return true;
  };

  _isMobile = () => {
    var win = $(window);
    var w = win.width();
    var h = win.height();

    return h / w > 1 || w < 500;
  };

  _isSlim = () => {
    var win = $(window);
    var w = win.width();
    return w < 800;
  };

  _checkLicense() {
    var that = this;
    const LICENSECHECK = "licensecheck";
    if (sessionStorage.getItem(LICENSECHECK)) return;
    sessionStorage.setItem(LICENSECHECK, "1");
    //return
    var url =
      "https://jumpto365api.azurewebsites.net/api/flow?code=MZFDo5UmIVNNzPFgBpMJS9uezrigT0cmep5nGmtsPRypVQYNVLuaUw==";
    let graph = new OfficeGraphService();
    graph.me("jumpto365/settings/index.json").then(user => {
      axios({
        method: "POST",
        url: url,
        headers: {
          "content-type": "application/json; charset=utf-8"
          // "Content-Type": "application/x-www-form-urlencoded",
        },
        data: {
          body: { Userdata: user },
          token: localStorage.getItem("msal.idtoken"),
          name: "niels@hexatown.com"
        }
      })
        .then(function(response) {
          //  that.setState({license:response.data})
        })
        .catch(function(error) {
          //  that.setState({"error":error})
        });
    });
  }

  handleNewHash = context => {
    var ctx = context ? context : this.state.context;
    var hash = window.location.hash;
    if (!hash) return;
    sessionStorage.setItem("hash", hash);
    Jumpto365App.setHash(context, hash);

    this.setState({ hash: hash });
  };

  componentDidUpdate = (previousProps, previousState) => {
    if (previousProps !== this.props) {
      console.log("App props", this.props);
    }
  };
  componentDidMount = () => {
    if (window && window.parent && window.parent !== window) {
      console.log("in frame");
      this.setState({ inFrame: true });
      if (window.zE) {
        zE(function() {
          zE.hide();
        });
      }
    }

    window.addEventListener("resize", this.updateDimensions);
    window.addEventListener("hashchange", this.handleNewHash, false);
    this.handleNewHash();

    this.updateDimensions();
    try {
      var hash = sessionStorage.getItem("hash");

      //console.log("Read hash",hash)
      if (hash) this.setState({ hash: hash });
    } catch (error) {
      console.log("Read hash error", error);
      // this.setState({hash: sessionStorage.getItem("hash")})
    }
    Jumpto365App.init()
      .then(store => {
        this.setState({ store });
        var hash = sessionStorage.getItem("hash");

        Jumpto365App.setHash(store, hash);

        if (store.isAuthenticated) {
          this._checkLicense();
          let graph = new OfficeGraphService();

          graph
            .me_licenseDetails()
            .then(license => {
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
        }
      })
      .catch(error => {
        console.log("Mounting store error", error);
        this.setState({ error });
      });
  };
  _hello = context => {
    if (window && window.parent && window.parent !== window) {
      return null; //don't show when embedded
    }

    if (context && context.hostSettings && context.hostSettings.isSubsite) {
      return null;
    }
    return <Hello context={context} />;
  };
  componentWillUnmount = () => {
    window.removeEventListener("resize", this.updateDimensions);
  };
  getTenantDomain = context => {
    if (!context) return "Unknown";
    if (!context.me) return "Unknown";
    return context.me.domain;
  };
  render() {
    //     if (isIE){
    //     return (<div>IE Debug</div>)

    // }

    var store = this.state.store;

    const defaultContext =
      store && store.hostSettings && store.hostSettings.rootContext
        ? store.hostSettings.rootContext
        : "office365";

    const rootV2 =
      store && store.hostSettings && store.hostSettings.version === 2
        ? true
        : false;

    if (this.state.error) {
      return <div>{JSON.stringify(this.state.error)}</div>;
    }
    if (!store) {
      return <div>Loading...</div>;
    }
    var that = this;

    var messageDialog = context => {
      if (context.hostSettings && !context.hostSettings.hasIntroMessage) {
        return null;
      }
      var stage = messageDialogStage(context);
      var message = "";
      var actions = null;
      var onDismissHash = () => {
        sessionStorage.setItem("hash", "");
        that.setState({ hash: "" });
      };
      var type = MessageBarType.info;

      if (that.state.hash) {
        //debugger
        var showStep1 = false;
        var p3 = splitHash(that.state.hash);
        if (p3.id_token) {
          message = "You have authenticated";
          type = MessageBarType.info;

          showStep1 = false;
          //return null
        }

        if (p3.access_token) {
          message = "You have authenticated";
          type = MessageBarType.info;

          showStep1 = true;
          return null;
        }
        if (
          p3.error &&
          p3.error === "access_denied" &&
          p3.error_subcode === "cancel"
        ) {
          message = "You cancelled the sign in dialogue";
          type = MessageBarType.error;
          actions = (
            <MessageBarButton
              onClick={() => {
                Jumpto365App.login(context);
              }}
            >
              Sign In
            </MessageBarButton>
          );
          showStep1 = true;
        }

        if (p3.error && p3.error === "consent_required") {
          message = "You haven't got the consent right";
          type = MessageBarType.error;
          actions = (
            <MessageBarButton
              onClick={() => {
                navigate("/beta/me");
              }}
            >
              Check your profile
            </MessageBarButton>
          );
          showStep1 = true;
        }
        if (p3.error && p3.error === "interaction_required") {
          message = p3.error_description;
          type = MessageBarType.error;
          actions = (
            <MessageBarButton
              onClick={() => {
                Jumpto365App.login(context);
              }}
            >
              Sign In
            </MessageBarButton>
          );
          showStep1 = true;
        }
        if (!showStep1 && p3.error) {
          message = p3.error;
          type = MessageBarType.error;
          actions = (
            <MessageBarButton
              onClick={() => {
                Jumpto365App.login(context);
              }}
            >
              Sign In
            </MessageBarButton>
          );
          showStep1 = true;
        }
        //context set hash #error=interaction_required&error_description=AADSTS50076%3a+Due+to+a+configuration+change+made+by+your+administrator%2c+or+because+you+moved+to+a+new+location%2c+you+must+use+multi-factor+authentication+to+access+%2700000003-0000-0000-c000-000000000000%27.%0d%0aTrace+ID%3a+62cf5432-71aa-4142-807e-6f01ee6a8f00%0d%0aCorrelation+ID%3a+a78ed441-3bd4-4595-ae46-3bb89d809cbb%0d%0aTimestamp%3a+2018-10-16+08%3a08%3a42Z&state=f25c1d51-4901-466c-89be-a23b856a726f
        if (showStep1) {
          return (
            <div style={{ marginRight: "-16px" }}>
              {" "}
              <MessageBar
                className="messagedialog"
                messageBarType={type}
                isMultiline={false}
                actions={actions}
                onDismiss={onDismissHash}
                dismissButtonAriaLabel="Dismiss"
              >
                {message}
              </MessageBar>
            </div>
          );
        }
      }

      if (!Jumpto365App.hasMessageDialog(context)) return false;
      var onDismiss = () => {
        Jumpto365App.setStage(context, 99);
      };

      switch (stage) {
        case 0:
          message = (
            <React.Fragment>
              Welcome to Version 2.0 beta. Take a minute to
              <Link target="_blank" href="https://jum.to/V2BetaLaunch">
                find out what's new
              </Link>
              . If you have issues or suggestions, please submit a ticket
              through the help button below.
            </React.Fragment>
          );
          type = MessageBarType.warning;
          // actions = <MessageBarButton  onClick={()=>{Jumpto365App.goingToStage(context,1)}} >Login</MessageBarButton>
          break;
        case 1:
          message = "Thank you for joining the Insider Program! ";

          type = MessageBarType.success;
          var onDismiss = () => {
            Jumpto365App.setStage(context, 99);
          };
          // actions = <MessageBarButton  onClick={()=>{Jumpto365App.goingToStage(context,1)}} >Login</MessageBarButton>
          break;
        case 2:
          message =
            "Looks like you didn't make it through the Sign In dialogue! ";
          type = MessageBarType.warning;
          var onDismiss = () => {
            Jumpto365App.setStage(context, 99);
          };
          //  actions = <MessageBarButton  onClick={()=>{Jumpto365App.goingToStage(context,1)}} >Try to login again</MessageBarButton>
          break;
        default:
          message = `Unknown stage ${stage}`;
          break;
      }

      return (
        <div style={{ marginRight: "-16px" }}>
          {" "}
          <MessageBar
            className="messagedialog"
            messageBarType={type}
            isMultiline={false}
            actions={actions}
            onDismiss={onDismiss}
            dismissButtonAriaLabel="Dismiss"
          >
            {message}
          </MessageBar>
        </div>
      );
    };

    return (
      <EditorExperienceContext.Provider value={this.state.editorExperience}>
        <Provider {...store}>
          <Subscribe>
            {globalContext => (
              <Fabric>
                <div className="ms-Grid" id="header">
                  {!this.props.isOffice && !this.state.inFrame && (
                    <div>
                      <div
                        className="ms-Grid-row"
                        style={{ borderBottom: "1px solid #cccccc" }}
                      >
                        <MastHead
                          context={globalContext}
                          isMobile={this.state.isMobile}
                          isSlim={this.state.isSlim}
                        />
                      </div>
                    </div>
                  )}
                </div>
                <div
                  className="Main"
                  style={{
                    height: this.state.navHeight - this.state.pivotGlobalHeight
                  }}
                >
                  <Location>
                    {({ location }) => (
                      <div
                        className="MainLeft"
                        style={{ backgroundColor: "#E7E7E7" }}
                      >
                        {this._showLeftNavigation(
                          location.pathname,
                          this.state.inFrame,
                          globalContext
                        ) && (
                          <NavigationLeft
                            globalContext={globalContext}
                            tenantHome={
                              globalContext.isAuthenticated
                                ? `/_/${globalContext.userId}`
                                : "/@/-"
                            }
                            tenantName={globalContext.tenant.text}
                            navigation={
                              this.state && this.state.settings
                                ? this.state.settings.navigation
                                : null
                            }
                            onCollaps={collapsed => {
                              this.updateDimensions();
                            }}
                            height={this.state.navHeight}
                          />
                        )}
                      </div>
                    )}
                  </Location>
                  <div
                    className="MainBody"
                    style={{ height: this.state.navHeight }}
                  >
                    {this.state.error}

                    {this._hello(globalContext)}
                    {messageDialog(globalContext)}
                    {this.state.hasGlobalPivot && (
                      <PivotGlobal context={globalContext} />
                    )}
                    <Router>
                      {/* <HomePage  isMobile={this.state.isMobile} path="/" language="en" controlParentLayout={this._changeLayout}/>
                              <HomePage  isMobile={this.state.isMobile} path="/periodictable/:language" controlParentLayout={this._changeLayout}/>
                              <HomePage  isMobile={this.state.isMobile} path="/license/:license" language="en" controlParentLayout={this._changeLayout}/>
                              <HomePage  isMobile={this.state.isMobile} path="/license/:license:/:language" controlParentLayout={this._changeLayout}/> */}
                      <EditorPage
                        isMobile={this.state.isMobile}
                        path="/editor"
                        context={globalContext}
                      />
                      <DevPage
                        isMobile={this.state.isMobile}
                        path="/dev"
                        context={globalContext}
                      />

                      <GenericPage
                        name="docs/dialogues/about"
                        isMobile={this.state.isMobile}
                        path="/about"
                        language="en"
                      />
                      <GenericPage
                        name="docs/dialogues/about"
                        isMobile={this.state.isMobile}
                        path="/about/:language"
                      />

                      <GenericPage
                        isMobile={this.state.isMobile}
                        path="/pages/:level1"
                      />
                      <GenericPage
                        isMobile={this.state.isMobile}
                        path="/pages/:level1/:level2"
                      />
                      <GenericPage
                        isMobile={this.state.isMobile}
                        path="/pages/:level1/:level2/:level3"
                      />
                      <GenericPage
                        isMobile={this.state.isMobile}
                        path="/pages/:level1/:level2/:level3/:level4"
                      />
                      <GenericPage
                        isMobile={this.state.isMobile}
                        path="/pages/:level1/:level2/:level3/:level4/:level5"
                      />
                      <GenericPage
                        isMobile={this.state.isMobile}
                        path="/pages/:level1/:level2/:level3/:level4/:level5/:level6"
                      />
                      <GenericPage
                        isMobile={this.state.isMobile}
                        path="/pages/:level1/:level2/:level3/:level4/:level5/:level6/:level7"
                      />

                      <GenericPage
                        isMobile={this.state.isMobile}
                        repotype="github.com"
                        path="/github.com/:owner/:repo/blob/:branch/:level1"
                      />
                      <GenericPage
                        isMobile={this.state.isMobile}
                        repotype="github.com"
                        path="/github.com/:owner/:repo/blob/:branch/:level1/:level2"
                      />
                      <GenericPage
                        isMobile={this.state.isMobile}
                        repotype="github.com"
                        path="/github.com/:owner/:repo/blob/:branch/:level1/:level2/:level3"
                      />
                      <GenericPage
                        isMobile={this.state.isMobile}
                        repotype="github.com"
                        path="/github.com/:owner/:repo/blob/:branch/:level1/:level2/:level3/:level4"
                      />
                      <GenericPage
                        isMobile={this.state.isMobile}
                        repotype="github.com"
                        path="/github.com/:owner/:repo/blob/:branch/:level1/:level2/:level3/:level4/:level5"
                      />
                      <GenericPage
                        isMobile={this.state.isMobile}
                        repotype="github.com"
                        path="/github.com/:owner/:repo/blob/:branch/:level1/:level2/:level3/:level4/:level5/:level6"
                      />
                      <GenericPage
                        isMobile={this.state.isMobile}
                        repotype="github.com"
                        path="/github.com/:owner/:repo/blob/:branch/:level1/:level2/:level3/:level4/:level5/:level6/:level7"
                      />

                      <EmbedPage
                        isMobile={this.state.isMobile}
                        path="/embed"
                        context={globalContext}
                      />
                      <LanguagePage
                        isMobile={this.state.isMobile}
                        path="/language"
                        globalContext={globalContext}
                      />
                      <LoginPage
                        isMobile={this.state.isMobile}
                        path="/login"
                        context={globalContext}
                      />

                      <ScenarioPage
                        isMobile={this.state.isMobile}
                        path="/fav"
                        domain="microsoft365"
                        view="toolsinonecolumn"
                        technology="microsoft"
                        language="en"
                        globalContext={globalContext}
                      />

                      <ScenarioPage
                        isMobile={this.state.isMobile}
                        path="/scenario"
                        domain="microsoft365"
                        view="toolsinonecolumn"
                        technology="microsoft"
                        language="en"
                        globalContext={globalContext}
                      />
                      <ScenarioPage
                        isMobile={this.state.isMobile}
                        path="/scenario/:technology/:domain"
                        view="toolsinonecolumn"
                        language="en"
                        globalContext={globalContext}
                      />
                      <ScenarioPage
                        isMobile={this.state.isMobile}
                        path="/scenario/:technology/:domain/:view"
                        language="en"
                        globalContext={globalContext}
                      />
                      <ScenarioPage
                        isMobile={this.state.isMobile}
                        path="/scenario/:technology/:domain/:view/:language"
                        globalContext={globalContext}
                      />

                      <ContextPage
                        isMobile={this.state.isMobile}
                        path="/license/:license"
                        context={defaultContext}
                        globalContext={globalContext}
                      />
                      <ToolbarEditorPage
                        isMobile={this.state.isMobile}
                        width={this.state.bodyWidth}
                        height={this.state.bodyHeight}
                        path="/toolbar/:domain/:tag"
                        language="en"
                        context={globalContext}
                      />
                      <TableEditorPage
                        isMobile={this.state.isMobile}
                        width={this.state.bodyWidth}
                        height={this.state.bodyHeight}
                        path="/%40/:domain"
                        isDomainRoot
                        language="en"
                        context={globalContext}
                      />
                      <TableEditorPage
                        isMobile={this.state.isMobile}
                        width={this.state.bodyWidth}
                        height={this.state.bodyHeight}
                        path="/@/:domain"
                        isDomainRoot
                        language="en"
                        context={globalContext}
                      />
                      <TableEditorPage
                        isMobile={this.state.isMobile}
                        width={this.state.bodyWidth}
                        height={this.state.bodyHeight}
                        path="/new/table"
                        language="en"
                        context={globalContext}
                      />
                      <TableEditorPage
                        isMobile={this.state.isMobile}
                        width={this.state.bodyWidth}
                        height={this.state.bodyHeight}
                        path="/%40/:domain/:tag"
                        language="en"
                        context={globalContext}
                      />
                      <TableEditorPage
                        isMobile={this.state.isMobile}
                        width={this.state.bodyWidth}
                        height={this.state.bodyHeight}
                        path="/@/:domain/:tag"
                        language="en"
                        context={globalContext}
                      />
                      <TableEditorPage
                        isMobile={this.state.isMobile}
                        width={this.state.bodyWidth}
                        height={this.state.bodyHeight}
                        path="/beta/@/:domain/:tag"
                        language="en"
                        context={globalContext}
                      />
                      <WebPartTesterPage
                        isMobile={this.state.isMobile}
                        width={this.state.bodyWidth}
                        height={this.state.bodyHeight}
                        domain="system@jumpto365.com"
                        path="/beta/webpart/:tag/:keyName"
                        language="en"
                        context={globalContext}
                      />

                      <PageEditorPage
                        isMobile={this.state.isMobile}
                        width={this.state.bodyWidth}
                        height={this.state.bodyHeight}
                        path="/@/:domain/:tag/:keyName"
                        language="en"
                        context={globalContext}
                      />
                      <PageEditorPage
                        isMobile={this.state.isMobile}
                        width={this.state.bodyWidth}
                        height={this.state.bodyHeight}
                        path="/%40/:domain/:tag/:database/:keyName"
                        language="en"
                        context={globalContext}
                      />
                      <PageEditorPage
                        isMobile={this.state.isMobile}
                        width={this.state.bodyWidth}
                        height={this.state.bodyHeight}
                        path="/%40/:domain/:tag/:keyName"
                        language="en"
                        context={globalContext}
                      />
                      <PageEditorPage
                        isMobile={this.state.isMobile}
                        width={this.state.bodyWidth}
                        height={this.state.bodyHeight}
                        path="/@/:domain/:tag/:database/:keyName"
                        language="en"
                        context={globalContext}
                      />
                      <ContextPage
                        isMobile={this.state.isMobile}
                        useImageForBanner
                        path={rootV2 ? "/root/v1" : "/"}
                        language="en"
                        context={defaultContext}
                        globalContext={globalContext}
                      />

                      <TableEditorPage
                        isMobile={this.state.isMobile}
                        width={this.state.bodyWidth}
                        height={this.state.bodyHeight}
                        isRoot
                        tag={store.hostSettings.rootContext}
                        language="en"
                        context={globalContext}
                        path={
                          rootV2
                            ? !globalContext.me
                              ? "/"
                              : "/root/pro"
                            : "/root/v2"
                        }
                      />

                      <TableEditorPage
                        isMobile={this.state.isMobile}
                        width={this.state.bodyWidth}
                        height={this.state.bodyHeight}
                        isRoot
                        language="en"
                        context={globalContext}
                        path="/root/v2/:tag"
                      />
                      <PageEditorPage
                        isMobile={this.state.isMobile}
                        width={this.state.bodyWidth}
                        height={this.state.bodyHeight}
                        isRoot
                        path="/root/v2/:tag/:keyName"
                        language="en"
                        context={globalContext}
                      />
                      <ContextPage
                        isMobile={this.state.isMobile}
                        useImageForBanner
                        path="/:language"
                        context={defaultContext}
                        globalContext={globalContext}
                      />
                      <ContextPage
                        isMobile={this.state.isMobile}
                        useImageForBanner
                        path="/periodictable/:language"
                        context={defaultContext}
                        globalContext={globalContext}
                      />

                      <ContextPage
                        isMobile={this.state.isMobile}
                        path="/context"
                        context={defaultContext}
                        globalContext={globalContext}
                      />
                      <ContextPage
                        isMobile={this.state.isMobile}
                        path="/context/:context"
                        globalContext={globalContext}
                      />
                      <ContextPage
                        isMobile={this.state.isMobile}
                        path="/context/:context/:language"
                        globalContext={globalContext}
                      />
                      <ContextPage
                        isMobile={this.state.isMobile}
                        path="/context/:context/language/:language"
                        globalContext={globalContext}
                      />
                      <ContextPage
                        isMobile={this.state.isMobile}
                        path="/context/:context/language/:language/scenario/:scenario"
                        globalContext={globalContext}
                      />
                      <ContextPage
                        isMobile={this.state.isMobile}
                        path="/context/:context/language/:language/scenario/:scenario/tool/:tool"
                        globalContext={globalContext}
                      />
                      <ContextPage
                        isMobile={this.state.isMobile}
                        path="/context/:context/language/:language/tool/:tool"
                        globalContext={globalContext}
                      />

                      <ToolPage
                        isMobile={this.state.isMobile}
                        path="/tool/:name"
                        context={globalContext}
                      />
                      <ToolPage
                        isMobile={this.state.isMobile}
                        path="/tool/:name/:language"
                        context={globalContext}
                      />
                      <ToolPage
                        isMobile={this.state.isMobile}
                        path="/tool/:name/:language/context/:referalContext"
                        context={globalContext}
                      />

                      <ToolPage
                        isMobile={this.state.isMobile}
                        path="/tool/:name/language/:language"
                        context={globalContext}
                      />
                      <ToolPage
                        isMobile={this.state.isMobile}
                        path="/tool/:name/scenario/:scenario"
                        context={globalContext}
                      />
                      <ToolPage
                        isMobile={this.state.isMobile}
                        path="/tool/:name/scenario/:scenario/language/:language"
                        context={globalContext}
                      />
                      <ToolPage
                        isMobile={this.state.isMobile}
                        path="/tool/:name/scenario/:scenario/context/:context"
                        context={globalContext}
                      />
                      <ToolPage
                        isMobile={this.state.isMobile}
                        path="/tool/:name/scenario/:scenario/context/:context/language/:language"
                        context={globalContext}
                      />
                      <ToolPage
                        isMobile={this.state.isMobile}
                        path="/tool/:name/context/:contextsource"
                        area="-"
                        context={globalContext}
                      />

                      <UsecasePage
                        isMobile={this.state.isMobile}
                        path="/usecase/:name"
                      />

                      <UsecasePage
                        isMobile={this.state.isMobile}
                        path="/usecase/:name/language/:language"
                      />
                      <UsecasePage
                        isMobile={this.state.isMobile}
                        path="/usecase/:name/scenario/:technology/:domain/:view/"
                      />
                      <UsecasePage
                        isMobile={this.state.isMobile}
                        path="/usecase/:name/scenario/:technology/:domain/:view/language/:language"
                      />
                      <UsecasePage
                        isMobile={this.state.isMobile}
                        path="/usecase/:name/scenario/:technology/:domain/:view/context/:context"
                      />
                      <UsecasePage
                        isMobile={this.state.isMobile}
                        path="/usecase/:name/scenario/:technology/:domain/:view/context/:context/language/:language"
                      />

                      <ExcelPage
                        isMobile={this.state.isMobile}
                        path="/upload"
                        globalContext={globalContext}
                      />
                      <ExcelPage2
                        isMobile={this.state.isMobile}
                        path="/excel/:filename/:sheet"
                        store="onedrive"
                        globalContext={globalContext}
                      />
                      <ExcelPage2
                        isMobile={this.state.isMobile}
                        path="/excel/local/:filename/:sheet"
                        store="session"
                        globalContext={globalContext}
                      />

                      <WordPage
                        isMobile={this.state.isMobile}
                        path="/word/local/:filename"
                        store="session"
                        context={globalContext}
                      />

                      <UserPage
                        isMobile={this.state.isMobile}
                        width={this.state.bodyWidth}
                        height={this.state.bodyHeight}
                        path="/me"
                        context={globalContext}
                      />
                      <UserPage
                        isMobile={this.state.isMobile}
                        path="/me/:action"
                        width={this.state.bodyWidth}
                        height={this.state.bodyHeight}
                        context={globalContext}
                      />

                      <UserPage
                        isMobile={this.state.isMobile}
                        path="/user"
                        width={this.state.bodyWidth}
                        height={this.state.bodyHeight}
                        context={globalContext}
                      />
                      <UserPage
                        isMobile={this.state.isMobile}
                        path="/user/:userid"
                        width={this.state.bodyWidth}
                        height={this.state.bodyHeight}
                        context={globalContext}
                      />
                      <MetadataPage
                        isMobile={this.state.isMobile}
                        path="/metadata"
                        context={globalContext}
                      />
                      <PreviewPage
                        isMobile={this.state.isMobile}
                        path="/PREVIEW/:view/:id/:subpath"
                      />
                      <TenantEditorPage
                        isMobile={this.state.isMobile}
                        path="/tenant"
                        keyName={this.getTenantDomain(globalContext)}
                        context={globalContext}
                        isRootPage
                      />
                      <TenantEditorPage
                        isMobile={this.state.isMobile}
                        path="/tenant/:keyName"
                        context={globalContext}
                        isRootPage
                      />
                      <TenantPage
                        isMobile={this.state.isMobile}
                        path="@"
                        context={globalContext}
                        isRootPage
                      />
                      <TenantPage
                        isMobile={this.state.isMobile}
                        path="@/v1.0/:tenant"
                        filename="index.docx"
                        context={globalContext}
                        isRootPage={true}
                      />

                      <ChargeBeePage
                        width={this.state.bodyWidth}
                        height={this.state.bodyHeight}
                        isMobile={this.state.isMobile}
                        path="/pricing"
                        context={globalContext}
                      />
                      <ChargeBeePage
                        width={this.state.bodyWidth}
                        height={this.state.bodyHeight}
                        isMobile={this.state.isMobile}
                        path="/buy/map/:subscriptionId"
                        context={globalContext}
                      />
                      <ChargeBeePage
                        width={this.state.bodyWidth}
                        height={this.state.bodyHeight}
                        isMobile={this.state.isMobile}
                        path="/products"
                        context={globalContext}
                      />
                      <ChargeBeePage
                        width={this.state.bodyWidth}
                        height={this.state.bodyHeight}
                        isMobile={this.state.isMobile}
                        path="/welcome/register/:subscriptionId"
                        context={globalContext}
                      />
                      {/* <TenantPage  isMobile={this.state.isMobile} path="@/:tenant/:filename" context={globalContext} isRootPage={true} /> */}

                      {/*                             
                              <ContextPage  isMobile={this.state.isMobile} useImageForBanner         path="/@/:tenant/:area/periodictable/:context/:language"  globalContext={globalContext}/> 
                             */}
                      <PersonalHomePage
                        isMobile={this.state.isMobile}
                        path="/_/:user"
                        context={globalContext}
                      />

                      <DashboardPage
                        width={this.state.bodyWidth}
                        height={this.state.bodyHeight}
                        isMobile={this.state.isMobile}
                        path={globalContext.me ? "/" : "/root/pro"}
                        context={globalContext}
                      />
                      <DashboardPage
                        width={this.state.bodyWidth}
                        height={this.state.bodyHeight}
                        isMobile={this.state.isMobile}
                        path="/dashboard"
                        context={globalContext}
                      />

                      <DatabaseExplorerPage
                        isMobile={this.state.isMobile}
                        path="/database"
                        context={globalContext}
                      />
                      <DatabaseExplorerPage
                        isMobile={this.state.isMobile}
                        path="/database/:tableName"
                        context={globalContext}
                      />

                      <ExplorerPage
                        isMobile={this.state.isMobile}
                        path="/-"
                        context={globalContext}
                      />
                      <ExplorerPage
                        isMobile={this.state.isMobile}
                        path="/-/:store"
                        context={globalContext}
                      />
                      <ExplorerPage
                        isMobile={this.state.isMobile}
                        path="/-/:store/:level1"
                        context={globalContext}
                      />
                      <ExplorerPage
                        isMobile={this.state.isMobile}
                        path="/-/:store/:level1/:level2"
                        context={globalContext}
                      />
                      <ExplorerPage
                        isMobile={this.state.isMobile}
                        path="/-/:store/:level1/:level2/:level3"
                        context={globalContext}
                      />
                      <ExplorerPage
                        isMobile={this.state.isMobile}
                        path="/-/:store/:level1/:level2/:level3/:level4"
                        context={globalContext}
                      />
                      <ExplorerPage
                        isMobile={this.state.isMobile}
                        path="/-/:store/:level1/:level2/:level3/:level4/:level5"
                        context={globalContext}
                      />
                      <ExplorerPage
                        isMobile={this.state.isMobile}
                        path="/-/:store/:level1/:level2/:level3/:level4/:level5/:level6"
                        context={globalContext}
                      />
                      <ExplorerPage
                        isMobile={this.state.isMobile}
                        path="/-/:store/:level1/:level2/:level3/:level4/:level5/:level6/:level7"
                        context={globalContext}
                      />
                      <ExplorerPage
                        isMobile={this.state.isMobile}
                        path="/-/:store/:level1/:level2/:level3/:level4/:level5/:level6/:level7/:level8/"
                        context={globalContext}
                      />
                      <ExplorerPage
                        isMobile={this.state.isMobile}
                        path="/-/:store/:level1/:level2/:level3/:level4/:level5/:level6/:level7/:level8/:level9"
                        context={globalContext}
                      />

                      <IconsPage
                        isMobile={this.state.isMobile}
                        path="/icons"
                        context={globalContext}
                      />
                      <IconsPage
                        isMobile={this.state.isMobile}
                        path="/icons/:catalogue"
                        context={globalContext}
                      />
                      <ImageEditorPage
                        isMobile={this.state.isMobile}
                        path="/icons/upload"
                        context={globalContext}
                      />

                      <NotFound default />
                    </Router>
                  </div>
                </div>
              </Fabric>
            )}
          </Subscribe>
        </Provider>
      </EditorExperienceContext.Provider>
    );
  }
}
