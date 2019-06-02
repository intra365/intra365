import React, { Component } from "react";
import PropTypes from "prop-types";
import "./appicon.css";
import { sitesRoot, drivesRoot } from "../_Contexts/Jumpto365App";
import diagonal from "./Hatching.png";
import diagonal2 from "./diagonal-stripes-graphic-overlay-pattern-black.png";
import { Spring } from "react-spring/renderprops";
import { isIE } from "react-device-detect";
import { Subscribe } from "react-contextual";
import { TooltipHost } from "office-ui-fabric-react";
export default class AppIconGeneric extends Component {
  render() {
    return (
      <Subscribe>
        {context => (
          <AppIconGenericInternal context={context} {...this.props} />
        )}
      </Subscribe>
    );
  }
}
/**
 * Describe overall purpose of the component
 *
 * @export
 * @class AppIconMini
 * @extends {Component}
 */
class AppIconGenericInternal extends Component {
  static propTypes = {
    description: PropTypes.string,
    title: PropTypes.string,
    subTitle: PropTypes.string,
    backgroundColor: PropTypes.string,
    name: PropTypes.string,
    iconUrl: PropTypes.string,
    item: PropTypes.object,
    onClick: PropTypes.func,
    onJumpTo: PropTypes.func,
    jumpto: PropTypes.string,
    isFullyShareable: PropTypes.any,
    isPartlyShareable: PropTypes.any,
    isPremium: PropTypes.any,
    options: PropTypes.any,
    size: PropTypes.number,
    backgroundColor: PropTypes.string,
    dimmedColor: PropTypes.string,
    disabledColor: PropTypes.string,
    editMode: PropTypes.any,
    state: PropTypes.string // "" (Default) "dimmed" "disabled"
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  _onMouseEnter = e => {
    if (this.props.onMouseOver){
      this.props.onMouseOver()
    }
    this.setState({ dimmed: true,mouseOver:true });
  };
  _onMouseLeave = e => {
    if (this.props.onMouseOut){
      this.props.onMouseOut()
    }
    this.setState({ dimmed: false,mouseOver:false });
  };

  _onClick = e => {

    if (this.props.jumpto && !(this.props.contentRef)) {
      window.open(this.props.jumpto, "_blank", "", false);
      e.stopPropagation();

      return;
    }
    
    if (this.props.onClick) {
      this.props.onClick(this.props.item);
    }
  };
  _jumpTo = e => {
    e.stopPropagation();
    if (this.onJumpTo) {
      this.onJumpTo(this.props.item);
    }
  };

  isGoodLink = url => {
    console.log(`#${url}#`);

    if (!url) return false;
    if (url === "null") return false;
    if (url === null) return false;
    return true;
  };
  /**
   * Required method return the output of the component
   *
   * @returns
   * @memberof AppIconGeneric
   */
  render() {
    var w = this.props.size ? this.props.size : 24;
    var sizes = [
      {
        margin: 0,
        fontSizeTitle: 0,
        fontSizeSubTitle: 0,
        fontSizeJumpTo: 0,
        fontSizeDescription: 0,
        iconSize: 0,
        iconWidth1: 0,
        iconWidth2: 0,
        iconMargin: 0,
        size: 24,
        imageHeight: 16,
        imageMargin: 4,
        imageMarginTop: 6,
        heightTop: 0,
        heightCenter: 0,
        heightBottom: 0
      },
      {
        margin: 0,
        fontSizeTitle: 0,
        fontSizeSubTitle: 0,
        fontSizeJumpTo: 0,
        fontSizeDescription: 0,
        iconSize: 0,
        iconWidth1: 0,
        iconWidth2: 0,
        iconMargin: 0,
        size: 28,
        imageHeight: 16,
        imageMargin: 6,
        imageMarginTop: 7,
        heightTop: 0,
        heightCenter: 0,
        heightBottom: 0
      },
      {
        margin: 0,
        fontSizeTitle: 0,
        fontSizeSubTitle: 0,
        fontSizeJumpTo: 0,
        fontSizeDescription: 0,
        iconSize: 0,
        iconWidth1: 0,
        iconWidth2: 0,
        iconMargin: 0,
        size: 40,
        imageHeight: 20,
        imageMargin: 10,
        imageMarginTop: 10,
        heightTop: 0,
        heightCenter: 0,
        heightBottom: 0
      },
      {
        margin: 1,
        fontSizeTitle: 8,
        fontSizeSubTitle: 8,
        fontSizeJumpTo: 10,
        fontSizeDescription: 0,
        iconSize: 8,
        iconWidth1: 3,
        iconWidth2: 6,
        iconMargin: 2,
        size: 56,
        imageHeight: 20,
        imageMargin: 18,
        imageMarginTop: 0,
        heightTop: 16,
        heightCenter: 24,
        heightBottom: 14
      },
      {
        margin: 2,
        fontSizeTitle: 12,
        fontSizeSubTitle: 8,
        fontSizeJumpTo: 12,
        fontSizeDescription: 10,
        iconSize: 8,
        iconWidth1: 8,
        iconWidth2: 5,
        iconMargin: 2,
        size: 100,
        imageHeight: 40,
        imageMargin: 30,
        imageMarginTop: -5,
        heightTop: 30,
        heightCenter: 40,
        heightBottom: 22
      },
      {
        margin: 4,
        fontSizeTitle: 22,
        fontSizeSubTitle: 12,
        fontSizeJumpTo: 14,
        fontSizeDescription: 14,
        iconSize: 12,
        iconWidth1: 11,
        iconWidth2: 8,
        iconMargin: 2,
        size: 160,
        imageHeight: 60,
        imageMargin: 50,
        imageMarginTop: 0,
        heightTop: 42,
        heightCenter: 58,
        heightBottom: 42
      },
      {
        margin: 8,
        fontSizeTitle: 44,
        fontSizeSubTitle: 16,
        fontSizeJumpTo: 24,
        fontSizeDescription: 22,
        iconSize: 16,
        iconWidth1: 22,
        iconWidth2: 14,
        iconMargin: 4,
        size: 320,
        imageHeight: 120,
        imageMargin: 100,
        imageMarginTop: 0,
        heightTop: 84,
        heightCenter: 116,
        heightBottom: 84
      }
    ];

    var sizeIndex =
      w <= 24
        ? 0
        : w <= 28
        ? 1
        : w <= 40
        ? 2
        : w <= 56
        ? 3
        : w <= 100
        ? 4
        : w <= 160
        ? 5
        : 6;

    var s = sizes[sizeIndex];
    var iconsWidth = 0;
    iconsWidth += this.props.isFullyShareable
      ? s.iconSize + s.iconMargin + 2
      : 0;
    iconsWidth += this.props.isPartlyShareable
      ? s.iconSize + s.iconMargin + 2
      : 0;
    iconsWidth += this.props.isPremium ? s.iconSize / 2 + s.iconMargin + 2 : 0;
    var toOppacity = 1;
    var backgroundColor = this.props.backgroundColor;
    var editMode = this.props.context ? this.props.context.editMode : false;
    var state = editMode
      ? ""
      : this.props.state
      ? this.props.state.toUpperCase()
      : "";

    switch (state) {
      case "DIMMED":
        //backgroundColor = this.props.backgroundColor + "88"
        toOppacity = 0.5;
        break;
      case "DISABLED":
        backgroundColor = this.props.disabledColor;
        break;

      default:
        break;
    }

    var jumpto = this.props.jumpto;
    var onJumpTo = this.props.onJumpTo;

    if (this.props.options && this.props.options.tileactiontype) {
      debugger;
      switch (this.props.options.tileactiontype) {
        case "tileactiontype":
          onJumpTo = null;
          break;

        default:
          break;
      }
    }

    function DelveLink(url) {
      if (!url) return null;
      var s = url.split("/personal");
      return s[0] + "/_layouts/15/me.aspx?origin=shell";
    }

    switch (this.props.name ? this.props.name.toUpperCase() : "") {
      case "SHAREPOINT":
        jumpto = sitesRoot().webUrl + "/_layouts/15/sharepoint.aspx";
        break;
      case "ONEDRIVE":
        jumpto = drivesRoot().webUrl;
        break;
      case "DELVE":
        jumpto = DelveLink(drivesRoot().webUrl);
        break;
      case "VISIO":
        jumpto = "https://office.live.com/start/Visio.aspx";
        break;
      case "SKYPE":
        //  jumpto = "https://office.live.com/start/Visio.aspx"
        break;
      case "BOOKINGS":
        jumpto = "https://outlook.office.com/owa/?path=/bookings";
      default:
        break;
    }
    var canOpen = false;

    if (this.props.jumpto) {
      canOpen = true;
    }
    if (this.props.contentRef) {
      canOpen = true;
    }
    var cellImage = this.props.iconUrl ? (
      <img
        src={this.props.iconUrl}
        style={{
          position: "relative",
          height: "auto",
          maxWidth: s.imageHeight,
          maxHeight: s.imageHeight,
          width: "auto",
          marginTop: s.imageMarginTop,
          marginLeft: s.imageMargin
        }}
      />
    ) : (
      ""
    );

    var markup = isIE ? (
      <div
        className="FontSegoeWhite"
        onClick={this._onClick}
        style={{
          backgroundColor,
          opacity: toOppacity,
          width: s.size,
          height: s.size,
          overflow: "hidden",
          cursor: canOpen ? "pointer" : "default"
        }}
        onMouseEnter={this._onMouseEnter}
        onMouseLeave={this._onMouseLeave}
      >
        <div>
          <div
            style={{
              margin: s.margin,
              display: "flex",
              justifyContent: "space-between",

              height: s.heightTop,
              maxHeight: s.heightTop
            }}
          >
            <div
              style={{
                fontSize: s.fontSizeTitle,
                lineHeight: `${s.fontSizeTitle}px`,
                fontWeight: 400
              }}
              title={this.props.title}
            >
              {this.props.title}
            </div>

            {onJumpTo && !jumpto && (
              <div>
                {" "}
                <i
                  class="ms-Icon ms-Icon--OpenInNewWindow"
                  onClick={this.jumpTo}
                  aria-hidden="true"
                  style={{
                    fontSize: s.fontSizeJumpTo,
                    lineHeight: `${s.fontSizeJumpTo}px`
                  }}
                />{" "}
              </div>
            )}
            {jumpto && (
              <div style={{ marginTop: "-3px" }}>
                {" "}
                <a
                  style={{ color: "#ffffff" }}
                  href={jumpto}
                  onClick="return false"
                  target="_blank"
                >
                  <i
                    class="ms-Icon ms-Icon--OpenInNewWindow"
                    aria-hidden="true"
                    style={{
                      fontSize: s.fontSizeJumpTo,
                      lineHeight: `${s.fontSizeJumpTo}px`
                    }}
                  />
                </a>{" "}
              </div>
            )}
          </div>
          <div style={{ height: s.heightCenter }}>{cellImage}</div>
          <div
            style={{
              margin: s.margin,
              display: "flex",
              maxHeight: s.heightBottom,
              height: s.heightBottom,
              alignItems: " flex-end",
              justifyContent: "space-between",
              textOverflow: " elipsis",
              xoverflow: " hidden"
            }}
          >
            <div
              style={{
                fontSize: s.fontSizeDescription,
                lineHeight: `${s.fontSizeDescription}px`,
                fontWeight: 300
              }}
              title={this.props.description}
            >
              {this.props.description}
            </div>

            <div
              style={{
                width: iconsWidth,
                minWidth: iconsWidth,
                flexGrow: "none",
                flexShrink: "none",
                marginRight: 0
              }}
            >
              {this.props.isFullyShareable && (
                <img
                  src="https://jumpto365.com/resources/images/app/Share icon full.png"
                  style={{
                    height: s.iconSize,
                    width: "auto",
                    marginLeft: s.iconMargin
                  }}
                />
              )}
              {this.props.isPartlyShareable && (
                <img
                  src="https://jumpto365.com/resources/images/app/Share icon half.png"
                  style={{
                    height: s.iconSize,
                    width: "auto",
                    marginLeft: s.iconMargin
                  }}
                />
              )}
              {this.props.isPremium && (
                <img
                  src="https://jumpto365.com/resources/images/app/Premium.png"
                  style={{
                    height: s.iconSize,
                    width: "auto",
                    marginLeft: s.iconMargin
                  }}
                />
              )}
            </div>
          </div>
        </div>{" "}
      </div>
    ) : (
      <Spring from={{ opacity: 1,actionHeight: this.state.mouseOver ? 0 : 0 }} to={{ opacity: toOppacity,actionHeight:this.state.mouseOver ? s.size/2 : 0}}>
        {styles => (
          <div>
            <div
              className="FontSegoeWhite"
              onClick={this._onClick}
              style={{
                backgroundColor,
                opacity: styles.opacity,
                width: s.size,
                height: s.size,
                overflow: "hidden",
                cursor: canOpen ? "pointer" : "default"
              }}
              onMouseEnter={this._onMouseEnter}
              onMouseLeave={this._onMouseLeave}
            >
              <div style={{ position: "relative" }}>
                <div style={{ position: "absolute", width: w }}>
                  <div
                    style={{
                      margin: s.margin,
                      display: "flex",
                      justifyContent: "space-between",

                      height: s.heightTop,
                      maxHeight: s.heightTop
                    }}
                  >
                    <div
                      style={{
                        color: this.props.textcolor
                          ? this.props.textcolor
                          : "#ffffff",
                        fontSize: s.fontSizeTitle,
                        lineHeight: `${s.fontSizeTitle}px`,
                        fontWeight: 400
                      }}
                      title={this.props.title}
                    >
                      {this.props.title}
                      <div
                        style={{
                          fontSize: s.fontSizeSubTitle,
                          lineHeight: `${s.fontSizeSubTitle}px`
                        }}
                        title={this.props.subTitle}
                      >
                        {this.props.subTitle}
                      </div>
                    </div>

                    {this.props.onJumpTo && !jumpto && (
                      <div>
                        {" "}
                        <i
                          class="ms-Icon ms-Icon--OpenInNewWindow"
                          onClick={this.jumpTo}
                          aria-hidden="true"
                          style={{
                            fontSize: s.fontSizeJumpTo,
                            lineHeight: `${s.fontSizeJumpTo}px`
                          }}
                        />{" "}
                      </div>
                    )}
                    {jumpto && (
                      <div style={{ marginTop: "-3px" }}>
                        {" "}
                        <a
                          style={{ color: "#ffffff" }}
                          href={jumpto}
                          onClick="return false"
                          target="_blank"
                        >
                          <i
                            class="ms-Icon ms-Icon--OpenInNewWindow"
                            aria-hidden="true"
                            style={{
                              fontSize: s.fontSizeJumpTo,
                              lineHeight: `${s.fontSizeJumpTo}px`
                            }}
                          />
                        </a>{" "}
                      </div>
                    )}
                  </div>
                  <div style={{ height: s.heightCenter }}>{cellImage}</div>
                  <div
                    style={{
                      margin: s.margin,
                      display: "flex",
                      maxHeight: s.heightBottom,
                      height: s.heightBottom,
                      alignItems: " flex-end",
                      justifyContent: "space-between",
                      textOverflow: " elipsis",
                      xoverflow: " hidden"
                    }}
                  >
                    <div
                      style={{
                        color: this.props.textcolor
                          ? this.props.textcolor
                          : "#ffffff",
                        fontSize: s.fontSizeDescription,
                        marginLeft: "2px",
                        marginTop: "2px",
                        marginBottom: "2px",
                        lineHeight: `${s.fontSizeDescription}px`,
                        fontWeight: 300
                      }}
                      title={this.props.description}
                    >
                      {this.props.description}
                    </div>

                    <div
                      style={{
                        width: iconsWidth,
                        minWidth: iconsWidth,
                        flexGrow: "none",
                        flexShrink: "none",
                        marginRight: 0
                      }}
                    >
                      {this.props.isFullyShareable && (
                        <img
                          src="https://jumpto365.com/resources/images/app/Share icon full.png"
                          style={{
                            height: s.iconSize,
                            width: "auto",
                            marginLeft: s.iconMargin
                          }}
                        />
                      )}
                      {this.props.isPartlyShareable && (
                        <img
                          src="https://jumpto365.com/resources/images/app/Share icon half.png"
                          style={{
                            height: s.iconSize,
                            width: "auto",
                            marginLeft: s.iconMargin
                          }}
                        />
                      )}
                      {this.props.isPremium && (
                        <img
                          src="https://jumpto365.com/resources/images/app/Premium.png"
                          style={{
                            height: s.iconSize,
                            width: "auto",
                            marginLeft: s.iconMargin
                          }}
                        />
                      )}
                    </div>
                  </div>
                </div>
                {this.props.isHashed && (
                  <div
                    style={{ position: "absolute", top: "0px", left: "0px" }}
                    className="hashedtile"
                  >
                    <img
                      src={diagonal}
                      style={{
                        height: this.props.size,
                        width: this.props.size
                      }}
                    />
                  </div>
                )}
                {this.props.countDown && (
                  <div
                    style={{
                      position: "absolute",
                      top: "0px",
                      left: "0px",
                      backgroundColor: "#ffffff88"
                    }}
                    className="countDown"
                  >
                    <div
                      style={{
                        color: "yellow",
                        height: this.props.size,
                        width: this.props.size,
                        fontSize: s.fontSizeTitle * 2,
                        lineHeight: `${this.props.size}px`,
                        textAlign: "center"
                      }}
                    >
                      10 days
                    </div>
                  </div>
                )}
{ false && this.props.showMenu && this.state.mouseOver &&
  <div>
    <div>
                <div
                className="HoverContainer"
                  style={{
                    position: "absolute",
                   
                    top: s.size - styles.actionHeight,
                    left: 0,
                    height: styles.actionHeight,
                    width: s.size
                  }}
              >
               <div className="HoverLink" onClick={this.props.onClick}>
              Jump to
              </div>
              {this.props.contentRef &&
              <div className="HoverLink" onClick={this.props.onDetailsClick}>
              Learn more
              </div>}
              </div>
                 </div>
                </div>
                
                }
              </div>
              
            </div>
          </div>
        )}
      </Spring>
    );

    return <div>{markup}</div>;
  }
}
