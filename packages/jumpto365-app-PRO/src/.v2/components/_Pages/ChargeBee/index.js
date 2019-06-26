import React, { Component } from "react";
import PropTypes from "prop-types";
import PageLayoutMain from "../../_Layouts/PageLayoutMain";
import PageHeader from "../../PageHeader";
import Jumpto365App, {
  getSetting,
  setSetting,
  licenseInfo
} from "../../_Contexts/Jumpto365App";
import PageBody from "../../PageBody";
import "./tool.css";
import { navigate, Link } from "@reach/router";
import {
  ChoiceGroup,
  IChoiceGroupOption
} from "office-ui-fabric-react/lib/ChoiceGroup";
import $ from "jquery";
import { RectangleEdge } from "office-ui-fabric-react/lib/utilities/positioning";
import PageContainer from "../../../containers/PageContainer";
import WebPartContainer from "../../../containers//WebPartContainer";
import { EditorExperienceContext } from "../../../logic/EditorExperience/EditorExperienceContext";
import _ from "lodash";

import {
  Dropdown,
  DropdownMenuItemType,
  IDropdownStyles,
  IDropdownOption
} from "office-ui-fabric-react/lib/Dropdown";
import { Toggle, nullRender } from "office-ui-fabric-react";

const Jumpto365API = require("../../../services/Jumpto365API");
export var OnboardingStages = {
  Start: 0,
  SubscripedNotSignedIn: 1,
  SubscripedSignedIn: 2,
  AlreadyTried: 3,
  Onboarded: 4
};

Object.freeze(OnboardingStages);

class Message extends Component {
  state = {};
  constructor(props) {
    super(props);
    this.messageRef = React.createRef();
  }

  componentDidMount() {
    if (this.messageRef && this.messageRef.current) {
      var marginTop =
        (this.props.height - this.messageRef.current.clientHeight) / 2;
      this.setState({ marginTop: marginTop > 0 ? marginTop : null });
    }
  }
  render() {
    return (
      <div ref={this.messageRef} style={{ marginTop: this.state.marginTop }}>
        {this.props.children}
      </div>
    );
  }
}

class Price extends Component {
  render() {
    return (
      <div>
        <div className="priceContainer">
          <div
            className="priceValue"
            style={{ leftMargin: this.props.priceLeftMargin }}
          >
            {this.props.price}
          </div>
          <div className="priceText">
            <div className="priceCurrency">&nbsp;</div>
            <div className="priceLength">{this.props.currency}</div>
          </div>
        </div>
      </div>
    );
  }
}
class StageSelector extends Component {
  state = {};
  componentDidMount() {
    var stages = [];
    _.mapKeys(OnboardingStages, (key, text, obj) => {
      stages.push({ key, text });
    });
    this.setState({ stages });
  }
  render() {
    return (
      <Dropdown
        onChange={(x, y, index) => {
          if (this.props.onChange) {
            this.props.onChange(this.state.stages[index]);
          }
        }}
        label="Select stage"
        selectedKey={this.props.stage}
        options={this.state.stages}
        disabled={false}
      />
    );
  }
}

class Section extends Component {
  render() {
    return (
      <div>
        <div
          class="ms-font-xl"
          style={{
            margin: "8px",
            padding: "8px",
            borderBottom: "1px solid #888888"
          }}
        >
          {this.props.title}
        </div>

        <div style={{ margin: "16px" }}>{this.props.children}</div>
      </div>
    );
  }
}

export default class ChargeBeePage extends React.PureComponent {
  static propTypes = {
    context: PropTypes.any, // todo - Refactor and callit globalContext : PropTypes.obj
    user: PropTypes.any,
    store: PropTypes.any,
    folder: PropTypes.any,
    file: PropTypes.any
  };

  constructor(props) {
    super(props);

    this.bodyRef = React.createRef();
    this.messageRef = React.createRef();
  }
  state = { sku: "" };
  init = { editors: "250", length: "Monthly", stage: OnboardingStages.Start };

  get $subscriptionId() {
    return this.props.subscriptionId;
  }
  get $context() {
    return this.props.context;
  }
  get $width() {
    return this.props.width;
  }
  get $height() {
    return this.props.height;
  }
  get $canEdit() {
    return this.props.canEdit && this.state.viewMockup;
  }

  resize() {}

  componentDidMount = () => {
    this.setState(this.init);
    this.recalc(this.init.editors, this.init.length);
    this._read();

    if (window.Chargebee) {
      var Chargebee = window.Chargebee;
      Chargebee.registerAgain();
      var cbInstance = Chargebee.getInstance();
      var cart = cbInstance.getCart();
      var customer = {
        email: this.$context ? this.$context.userId : ""
      };
      // debugger
      cart.setCustomer(customer);

      //    console.log(cbInstance)
      //    var product = cbInstance.initializeProduct('jumpto365-personal');
    }
    this.resize();
  };
  componentDidUpdate = () => {
    if (window.Chargebee) {
      var Chargebee = window.Chargebee;
      Chargebee.registerAgain();
    }
  };
  recalc = (editors, length) => {
    var priceList = {
      ProMonthly: {
        lengthTxt: "1 month",
        priceTxt: "$99",
        priceLeftMargin: "20px"
      },
      ProMonth1000: { lengthTxt: "1 month", priceTxt: "   $299" },
      ProMonth5000: { lengthTxt: "1 month", priceTxt: "   $499" },
      ProMonth20000: { lengthTxt: "1 month", priceTxt: "   $749" },
      ProMonth20000Plus: { lengthTxt: "1 month", priceTxt: "   $999" },

      ProAnnual: { lengthTxt: "1 year", priceTxt: " $999" },
      ProAnnual1000: { lengthTxt: "1 year", priceTxt: " $2,999" },
      ProAnnual5000: { lengthTxt: "1 year", priceTxt: " $4,999" },
      ProAnnual20000: { lengthTxt: "1 year", priceTxt: " $7,499" },
      ProAnnual20000Plus: { lengthTxt: "1 year", priceTxt: " $9,999" }
    };

    var sku = "Pro" + length //+ editors;
    
    var price = priceList[sku]
      ? priceList[sku]
      : { lengthTxt: "n.a.", priceText: "n.a." };

    this.setState({ ...price, sku: sku + "NoTrial", trialSKU: sku + "WithTrial" });
  };
  _onChangeEditors = (e, value) => {
    this.setState({ editors: value.key });
    this.recalc(value.key, this.state.length);
  };

  _onChangeLength = (e, value) => {
    this.setState({ length: value.key });
    this.recalc(this.state.editors, value.key);
  };

  _login = () => {
    Jumpto365App.login();
  };
  _report = () => {
    if (window.zE) {
      zE("webWidget", "open");
    }
  };
  _activate = () => {
    this.setState({ hasError: false, error: null, wait: true });

    Jumpto365API.activateSubscription(this.props.subscriptionId)
      .then(result => {

        if (result.hasError){
          return this.setState({
            stage: OnboardingStages.Error,
            hasError: true,
            error: result.error,
            wait: false
          });
        }
        this.setState({ stage: OnboardingStages.Onboarded, wait: false });
        
      })
      .catch(error => {
        var errorMessage = error && error.response && error.response.data && error.response.data.message ? error.response.data.message : error && error.message ? error.message : error

        this.setState({
          stage: OnboardingStages.Error,
          hasError: true,
          error:errorMessage,
          wait: false
        });
      });
  };
  _calcMargin = () => {
    var height =
      this.bodyRef && this.bodyRef.current
        ? this.bodyRef.current.clientHeight
        : 0;
    var messageHeight =
      this.messageRef && this.messageRef.current
        ? this.messageRef.current.clientHeight
        : 0;

    var marginTop = (height - messageHeight) / 2;

    this.setState({
      marginTop: messageHeight > 0 && marginTop > 0 ? marginTop : 0
    });
  };
  _read = () => {
    //  debugger
    var that = this;
    if (!this.$subscriptionId) return;
    setTimeout(() => this._calcMargin(), 1);
    switch (this.$subscriptionId) {
      case "step1":
        return this.setState({ stage: OnboardingStages.SubscripedNotSignedIn });
        break;
      case "step2":
        return this.setState({ stage: OnboardingStages.SubscripedSignedIn });
        break;
      case "step3":
        return this.setState({ stage: OnboardingStages.AlreadyTried });
      case "step4":
        return this.setState({ stage: OnboardingStages.Onboarded });
        break;
      default:
        break;
    }

    if (!this.isSignedIn){
      return this.setState({

        stage: OnboardingStages.SubscripedNotSignedIn
      });
    }
    Jumpto365API.getSubscription(this.$subscriptionId)
      .then(subscriptionData => {
        this.setState({
          subscriptionData,
          stage: this.isSignedIn
            ? OnboardingStages.SubscripedSignedIn
            : OnboardingStages.SubscripedNotSignedIn
        });
      })
      .catch(error => {
        var errorMessage = error && error.response && error.response.data && error.response.data.message ? error.response.data.message : error && error.message ? error.message : error
        this.setState({ hasError: true, error: errorMessage, wait: false });
      });
  };
  checkOutCode = sku => {
    return `
  <a 
                        href="javascript:void(0)"
                        data-cb-type="checkout"
                        data-cb-plan-id="${sku}"
                      >
                        <div class="actionButton Buy">Buy now</div>
                      </a>`;
  };

  checkOutTrialCode = skuTrial => {
    return `<div><div>
  <a 
                        href="javascript:void(0)"
                        data-cb-type="checkout"
                        data-cb-plan-id="${skuTrial}"
                      >
                        <div class="actionButton Try"> Free trial</div>
                      </a></div><div class="nopayment">(No payment info required for trial)</div></div>`;
  };

  get isSignedIn() {
    return this.$context && this.$context.me ? true : false;
  }
  render() {
    const WEBPARTTAG = "pricelist3";
    var subscriptionId = this.$subscriptionId;
    var centerMessageStyle = {
      marginLeft: this.$width / 3,
      marginRight: this.$width / 3,
      textAlign: "center"
    };

    // let ctx = this.props.context;
    // if (!ctx) return "No context";
    // if (!ctx.isAuthenticated) return "Not authenticated";
    // if (!ctx.user) return "No user object in context";

    function prompt(id) {
      return Jumpto365App.prompt(id, ctx);
    }

    var height = this.state.height;
    return (
      <PageLayoutMain>
        {/* <PageHeader title="Table Builder" color="#2a7ab9" />
        
                
                Ag == Silver
                Au = Gold
                Pt = Platinum
                */}
        <EditorExperienceContext.Consumer>
          {editor => (
            <PageBody>
              <div
                height={this.$height}
                className={
                  this.state.stage !== OnboardingStages.Start
                    ? null
                    : "pageBody"
                }
              >
                <div ref={this.bodyRef}>
                  <div className="PageHeader">Table Builder</div>
                  {false && editor.on && (
                    <div style={{ backgroundColor: "#aaaaaa" }}>
                      <div
                        style={{
                          position: "relative",
                          marginLeft: "auto",
                          marginRight: "auto",
                          width: "300px",
                          backgroundColor: "#aaaaaa",
                          padding: "10px"
                        }}
                      >
                        <div style={{ display: "flex" }}>
                          <div style={{ flexGrow: 1 }}>
                            <StageSelector
                              stage={this.state.stage}
                              onChange={stage => {
                                this.setState({ stage: stage.key });
                              }}
                            />
                          </div>
                          <div>
                            <Toggle
                              label="Mockup"
                              onText="On"
                              offText="Off"
                              onChange={() => {
                                this.setState({
                                  viewMockup: !this.state.viewMockup
                                });
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  {this.state.stage ===
                    OnboardingStages.SubscripedNotSignedIn && (
                      <Message height={this.$height}>
                    <div
                      className="priceCenterHeader"
                      style={centerMessageStyle}
                      ref={this.messageRef}
                     
                    >
                      <p>
                        Thanks for signing up for jumpto365 Pro! You're almost
                        there. Sign in with your Office 365 account to get
                        going.
                      </p>

                      <div
                        className="actionButton Signin ms-font-xxl"
                        onClick={this._login}
                      >
                        Sign In
                      </div>
                    </div></Message>
                  )}

                  {this.state.stage === OnboardingStages.Onboarded && (
                     <Message height={this.$height}>
                    <div
                      ref={this.messageRef}
                     
                    >
                      {" "}
                      <div
                        className="priceCenterHeader"
                        style={centerMessageStyle}
                      >
                        <p>
                          Welcome! You’ve joined an exclusive club and we’re
                          excited to have you. From here, you can launch your
                          personal dashboard to begin building the launchpad to
                          your modern workplace.
                        </p>
                      </div>
                      <div
                        className="actionButton Signin ms-font-xxl"
                        onClick={() => {
                          window.open("/dashboard","_top");
                        }}
                      >
                        Open your dashboard
                      </div>
                    </div></Message>
                  )}

                  {this.state.stage === OnboardingStages.SubscripedSignedIn && (
                    <Message height={this.$height}>
                      <div
                        ref={this.messageRef}
                       
                      >
                        <div>
                          <div
                            className="priceCenterHeader"
                            style={centerMessageStyle}
                          >
                            <p>
                              Thank you for signing in. Please activate your
                              subscription to jumpto365 Pro to get working on
                              the launchpad for modern workplace!{" "}
                            </p>
                          </div>
                        </div>

                        {this.state.hadError && (
                          <div
                            className="priceCenterBodyError"
                            ref={this.messageRef}
                            style={{ marginTop: this.state.marginTop }}
                          >
                            <p>
                              Sorry, your Subscription could not get activated{" "}
                            </p>
                            <p>Server says: "{this.state.error}"</p>
                            <div
                              className="actionButton Signin"
                              onClick={this._report}
                            >
                              Help
                            </div>
                          </div>
                        )}
                        {!this.state.wait && !this.state.error && (
                          <div
                            className="actionButton Signin ms-font-xxl"
                            onClick={this._activate}
                          >
                            Activate Subscription
                          </div>
                        )}
                        {this.state.wait && (
                          <div className="priceCenterBody">
                            <p>Your Subscription is getting activated</p>
                          </div>
                        )}
                      </div>
                    </Message>
                  )}
                  {this.state.hasError && (
                    <Message height={this.$height}>
                   <div
                     ref={this.messageRef}
                     
                   >
                   
                     <div
                       className="priceCenterHeader"
                       style={centerMessageStyle}
                     >
                       <p>
                        {this.state.error}
                       </p>
                     </div>
                     
                   </div></Message>
                 )}
                  {this.state.stage === OnboardingStages.AlreadyTried && (
                     <Message height={this.$height}>
                    <div
                      ref={this.messageRef}
                      
                    >
                      <div
                        className="priceCenterHeader"
                        style={centerMessageStyle}
                      >
                        <p>
                          Whoops! Sorry, your organization has already used up
                          its 14-day free trial. To continue building the
                          launchpad to your modern workplace, please purchase a
                          subscription.
                        </p>
                      </div>
                      <div
                        className="actionButton Signin ms-font-xxl"
                        onClick={() => {
                          this.setState({ stage: OnboardingStages.Start });
                          navigate("/pricing");
                        }}
                      >
                        Purchase a subscription
                      </div>
                    </div></Message>
                  )}
                  {this.state.stage === OnboardingStages.Start &&
                    !this.$subscriptionId && (
                      <div>
                        <div>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center"
                            }}
                          >
                            <div style={{ flexGrow: 0 }}>
                              <div className="priceCenter">
                                <div className="priceCenterHeader">
                                  {" "}
                                  Launchpad to your modern workplace
                                </div>
                                <div className="priceCenterText">
                                  <p>
                                    jumpto365’s Periodic Table series is already
                                    a part of IT adoption programs for thousands
                                    of organizations large and small. Why not
                                    yours?
                                  </p>
                                </div>
                              </div>
                              <div />{" "}
                            </div>
                          </div>
                          <div style={{ display: "flex" }}>
                            <div
                              style={{ flexGrow: 1 }}
                              className="configContainer"
                            >{/* 
                              <div className="configHeader">
                                Number of employees in your organization
                              </div>
                              <div>
                                <ChoiceGroup
                                  className="defaultChoiceGroup"
                                  selectedKey={this.state.editors}
                                  options={[
                                    {
                                      key: "250",
                                      text: "Up to 250"
                                    },
                                    {
                                      key: "1000",
                                      text: "251-1,000"
                                    },
                                    {
                                      key: "5000",
                                      text: "1,001-5,000"
                                    },
                                    {
                                      key: "20000",
                                      text: "5,001-20,000"
                                    },
                                    {
                                      key: "20000Plus",
                                      text: "20,001 or more"
                                    }
                                  ]}
                                  onChange={this._onChangeEditors}
                                  required={true}
                                />
                              </div> */}
                              <div className="configHeader">
                                Billing schedule
                              </div>
                              <div>
                                <ChoiceGroup
                                  className="defaultChoiceGroup"
                                  selectedKey={this.state.length}
                                  options={[
                                    {
                                      key: "Monthly",
                                      text: "Billed monthly"
                                    },
                                    {
                                      key: "Annual",
                                      text: "Billed annually (save 16%)"
                                    }
                                  ]}
                                  onChange={this._onChangeLength}
                                  required={true}
                                />
                              </div>
                            </div>
                            <div style={{ flexGrow: 4 }}>
                              <div className="prod">
                                <div className="prodInner">
                                  <div className="prodFamily ">
                                    {/* <div className=" prodHeader priceCenterHeader">Standard</div> */}
                                    Customize the popular Periodic Table of
                                    Office 365 to match your organization’s
                                    workplace apps. Remove ones you don’t want
                                    and add any cloud or custom apps. Or create
                                    your tables from scratch or build on our
                                    expert-designed templates. With jumpto365
                                    Pro, you’ll build the roadmap to greater
                                    productivity for everyone.
                                    <Price
                                      priceLeftMargin={
                                        this.state.priceLeftMargin
                                      }
                                      price={this.state.priceTxt}
                                      currency="USD"
                                      length={this.state.lengthTxt}
                                    />
                                    <div
                                      dangerouslySetInnerHTML={{
                                        __html: this.checkOutCode(
                                          this.state.sku
                                        )
                                      }}
                                    />
                                   
                                      <div
                                        dangerouslySetInnerHTML={{
                                          __html: this.checkOutTrialCode(
                                            this.state.trialSKU
                                          )
                                        }}
                                      />
                                <div>
                                  
                                </div>
                                    <ul className="Features">
                                      <li>
                                        <i
                                          class="ms-Icon ms-Icon--SkypeCheck"
                                          aria-hidden="true"
                                        />{" "}
                                        Create tables from scratch{" "}
                                      </li>

                                      <li>
                                        <i
                                          class="ms-Icon ms-Icon--SkypeCheck"
                                          aria-hidden="true"
                                        />{" "}
                                        Expert-designed templates{" "}
                                      </li>

                                      <li>
                                        <i
                                          class="ms-Icon ms-Icon--SkypeCheck"
                                          aria-hidden="true"
                                        />{" "}
                                        Include popular cloud apps{" "}
                                      </li>

                                      <li>
                                        <i
                                          class="ms-Icon ms-Icon--SkypeCheck"
                                          aria-hidden="true"
                                        />{" "}
                                        Include custom and on-prem apps{" "}
                                      </li>
                                      <li>
                                        <i
                                          class="ms-Icon ms-Icon--SkypeCheck"
                                          aria-hidden="true"
                                        />{" "}
                                        Write your own articles{" "}
                                      </li>

                                      <li>
                                        <i
                                          class="ms-Icon ms-Icon--SkypeCheck"
                                          aria-hidden="true"
                                        />{" "}
                                        Group your apps for context{" "}
                                      </li>

                                      <li>
                                        <i
                                          class="ms-Icon ms-Icon--SkypeCheck"
                                          aria-hidden="true"
                                        />{" "}
                                        Launch directly to apps from tables{" "}
                                      </li>

                                      <li>
                                        <i
                                          class="ms-Icon ms-Icon--SkypeCheck"
                                          aria-hidden="true"
                                        />{" "}
                                        Provide your own title and icon graphics{" "}
                                      </li>

                                      <li>
                                        <i
                                          class="ms-Icon ms-Icon--SkypeCheck"
                                          aria-hidden="true"
                                        />{" "}
                                        Publish your tables and embed in your
                                        intranet{" "}
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                                <div />
                              </div>
                              <div className="priceCenterBody" />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                </div>
              </div>
            </PageBody>
          )}
        </EditorExperienceContext.Consumer>
      </PageLayoutMain>
    );
  }
}
