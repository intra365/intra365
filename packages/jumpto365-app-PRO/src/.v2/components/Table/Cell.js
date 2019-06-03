import React, { Component } from "react";
import PropTypes from "prop-types";
import HeaderActionButton from "./HeaderActionButton";
import _ from "lodash";
import "./table.css";
import "./celltype.css";
import { Icon } from "office-ui-fabric-react";
import { CellType } from "./CellTypeSelector";
import json from "format-json";
const APPICONSIZE = 160;
const CELLSIZE = 160;
export class GroupCell extends Component {
  render() {
    var cellType = this.props.type;
    var body = json.plain(this.props);
    var name = this.props.editMode ? <div>{cellType}</div> : null;
    var groupSize = 53; //parseInt(this.props.height / 3);
    var groupMargin = this.props.editMode ? this.props.width - groupSize : 0;
    var topMargin = this.props.editMode ? this.props.height - groupSize * 2 : 0;
    var leftMargin = this.props.editMode
      ? this.props.height - groupSize * 2
      : 0;
    var backgroundColor = this.props.color ? this.props.color : "#dddddd";
    var color = this.props.textColor ? this.props.textColor : "#000000";

    var height = 0;
    var width = 0;
    var verticalMargin = 8;
    var horisontalMargin = 8;

    var connectors = this.props.connectors ? this.props.connectors : {};

    switch (cellType) {
      case CellType.Left:
        height = this.props.height;
        width = groupSize;
        groupMargin = this.props.editMode ? height - width : 0;
        horisontalMargin = 0;
        body = (<div className={this.props.editMode ? "" :"cellTextVerticalContainer"}>
          <div className={this.props.editMode ? "" :"cellTextLeftContainer"}>
            <div
              className={this.props.editMode ? "" :"cellTextLeft"}
              style={{
                height : this.props.editMode ? height : width,
                marginLeft: groupMargin,
                width : this.props.editMode ? width: height,
                backgroundColor,
                color
              }}
            >
            <div className="centeredContainer">
              <span className="centeredSpan">{this.props.title}{" "}
              </span>
              </div>
            </div>
          </div>
          </div>
        );

        break;
      case CellType.Right:
        height = this.props.height;
        width = groupSize;
        groupMargin = this.props.editMode ? height - width : 0;
        horisontalMargin = 0;
        body = (<div className={this.props.editMode ? "" :"cellTextVerticalContainer"}>
          <div className={this.props.editMode ? "" :"cellTextRightContainer"}>
            <div
              className={this.props.editMode ? "" : "cellTextRight"}
              style={{
                height : this.props.editMode ? height : width,
                marginRight: groupMargin,
                width : this.props.editMode ? width :  height,
                backgroundColor,
                color
              }}
            >
              <div className="centeredContainer">
              <span className="centeredSpan">{this.props.title}{" "}
              </span>
              </div>
            </div>
          </div>  </div>
        );

        break;
      case CellType.Top:
        height = groupSize;
        width = this.props.width;
        groupMargin = width - height 
        verticalMargin = 0;
        body = (
          <div className="cellTextTopContainer">
            <div
              className="cellTextTop"
              style={{
                height,
                marginTop: groupMargin,
                width,
                backgroundColor,
                color
              }}
            > 
              <div className="centeredContainer">
              <span className="centeredSpan">{this.props.title}{" "}
              </span>
              </div>
            </div>
          </div>
        );
        break;
      case CellType.Bottom:
        height = groupSize;
        width = this.props.width;
        groupMargin = this.props.editMode ? width - height  : 0;
        verticalMargin = 0;
        body = (
          <div className="cellTextBottomContainer">
            <div className="cellTextBottom">
              <div
                style={{
                  
                  height,
                  marginBottom: groupMargin,
                  width,
                  backgroundColor,
                  color
                }}
              >
                <div className="centeredContainer">
              <span className="centeredSpan">{this.props.title}{" "}
              </span>
              </div>
              </div>
            </div>
          </div>
        );

        break;
      case CellType.SpacerHorisontal:
        height = this.props.height;
        width = this.props.width+2;
        groupMargin = this.props.editMode ? width - height : 0;
        body = (
          <div
            style={{
              height,
              marginTop: groupMargin / 2,
              marginBottom: groupMargin / 2,
              width,
              backgroundColor: this.props.editMode ? "#cccccccc" : "#ffffff00",
              color
            }}
          />
        );
        break;
      case CellType.SpacerVertical:
        height = this.props.height;
        width = this.props.width;
        groupMargin = this.props.editMode ? height - width : 0;
        body = (
          <div
            style={{
              height,
              marginLeft: groupMargin / 2,
              marginRight: groupMargin / 2,
              width,
              backgroundColor: this.props.editMode ? "#cccccccc" : "#ffffff00",
              color
            }}
          />
        );
        break;

      case CellType.SpacerFull:
        height = CELLSIZE;
        width = CELLSIZE;

        body = (
          <div
            style={{
              height,

              width,
              backgroundColor: this.props.editMode ? "#cccccccc" : "#ffffff00",
              color
            }}
          />
        );
        break;
      case CellType.Title:
        height = this.props.editMode ? CELLSIZE : CELLSIZE;
        width = this.props.editMode ? CELLSIZE : CELLSIZE * 2;

        body = (
          <div
            style={{
              height,

              width,
              backgroundColor: this.props.editMode ? "#cc00cc" : "#ffff00",
              color
            }}
          />
        );
        break;
      case CellType.None:
        height = this.props.editMode ? CELLSIZE : 0;
        width = this.props.editMode ? CELLSIZE : 0;

        body = (
          <div
            style={{
              height,

              width,
              backgroundColor: this.props.editMode ? "#00cc00" : "#00ff00",
              color
            }}
          />
        );
        break;
      case CellType.SpacerCorner:

      default:
        height = groupSize;
        width = groupSize;
        body = (
          <div
            style={{
              height,
              marginTop: groupMargin / 2,
              marginLeft: groupMargin / 2,
              marginRight: groupMargin / 2,
              marginBottom: groupMargin / 2,
              width,
              backgroundColor: this.props.editMode ? "#cccccccc" : "#ffffff",
              color
            }}
          />
        );
        break;
    }
    if (this.props.reportSize) {
      this.props.reportSize(height, width);
    }
    return (
      <div>
        {!verticalMargin && (
          <div style={{ display: "flex" }}>
            <div
              style={{
                width: "72px",
                height: "8px",
                backgroundColor: "#ffffff"
              }}
            />
            <div
              className={
                this.props.connectingMode
                  ? "GridConnector GridConnectorVertical"
                  : null
              }
              onClick={() => {
                if (this.props.onConnectorClick) {
                  this.props.onConnectorClick(this.props.cellId, "up");
                }
              }}
              style={{
                width: "32px",
                height: "8px",
                backgroundColor: connectors.up
              }}
            />
            <div
              style={{
                width: "72px",
                height: "8px",
                backgroundColor: "#ffffff"
              }}
            />
          </div>
        )}
        <div style={{ display: "flex" }}>
          {!horisontalMargin && (
            <div>
              <div
                style={{
                  width: "8px",
                  height: "72px",
                  backgroundColor: "#ffffff"
                }}
              />
              <div
                className={
                  this.props.connectingMode
                    ? "GridConnector GridConnectorHorisontal"
                    : null
                }
                onClick={() => {
                  if (this.props.onConnectorClick) {
                    this.props.onConnectorClick(this.props.cellId, "left");
                  }
                }}
                style={{
                  width: "8px",
                  height: "32px",
                  backgroundColor: connectors.left
                }}
              />
              <div
                style={{
                  width: "8px",
                  height: "72px",
                  backgroundColor: "#ffffff"
                }}
              />
            </div>
          )}

          <div
            onClick={() => {
              if (this.props.onGroupClick) {
                this.props.onGroupClick(this.props.cellId);
              }
            }}
            onMouseOver={() => {
              if (this.props.onGroupOver) {
                this.props.onGroupOver(this.props.cellId);
              }
            }}
            onMouseOut={() => {
              if (this.props.onGroupOut) {
                this.props.onGroupOut(this.props.cellId);
              }
            }}
            style={{
              marginTop: `${verticalMargin}px`,
              marginBottom: `${verticalMargin}px`,
              marginLeft: `${horisontalMargin}px`,
              marginRight: `${horisontalMargin}px`
            }}
          >
            <div className={`group${cellType}`}>{body}</div>
          </div>
          {!horisontalMargin && (
            <div style={{}}>
              <div
                style={{
                  width: "8px",
                  height: "72px",
                  backgroundColor: "#ffffff"
                }}
              />
              <div
                className={
                  this.props.connectingMode
                    ? "GridConnector GridConnectorHorisontal"
                    : null
                }
                onClick={() => {
                  if (this.props.onConnectorClick) {
                    this.props.onConnectorClick(this.props.cellId, "right");
                  }
                }}
                style={{
                  width: "8px",
                  height: "32px",
                  backgroundColor: connectors.right
                }}
              />
              <div
                style={{
                  width: "8px",
                  height: "72px",
                  backgroundColor: "#ffffff"
                }}
              />
            </div>
          )}
        </div>
        {!verticalMargin && (
          <div style={{ display: "flex" }}>
            <div
              style={{
                width: "72px",
                height: "10px",
                backgroundColor: "#ffffff"
              }}
            />
            <div
              className={
                this.props.connectingMode
                  ? "GridConnector GridConnectorVertical"
                  : null
              }
              onClick={() => {
                if (this.props.onConnectorClick) {
                  this.props.onConnectorClick(this.props.cellId, "down");
                }
              }}
              style={{
                width: "32px",
                height: "10px",
                backgroundColor: connectors.down
              }}
            />
            <div
              style={{
                width: "72px",
                height: "10px",
                backgroundColor: "#ffffff"
              }}
            />
          </div>
        )}
      </div>
    );
  }
}

export default class Cell extends Component {
  render() {
    var getSize = this.props.getSize
      ? this.props.getSize
      : () => {
          return {};
        };

    var dashed = false; //this.props.dashed
    var border = null; //dashed ? null : "1px dashed grey"

    var padding = this.props.noborder ? 0 : 4;

    var outerBackgroundColor = this.props.outerBackgroundColor
      ? this.props.outerBackgroundColor
      : "#ffffff00";
    var backgroundColor = this.props.backgroundColor
      ? this.props.backgroundColor
      : "#ffffff00";
    var width = this.props.width;
    var height = this.props.height;
    var innerHeigh = width - padding * 2;
    var innerWidth = height - padding * 2;
    if (this.props.reportSize) {
      this.props.reportSize(height+padding * 2, width+padding * 2);
    }
    return (
      <div
        onClick={this.props.onClick}
        className={this.props.className}
        style={{
          overflow: "hidden",
          padding: `${padding}px`,
          width: `${width}px`,
          height: `${height}px`,
          maxWidth: `${width}px`,
          maxHeight: `${height}px`,
          backgroundColor: outerBackgroundColor
        }}
      >
        <div
          style={{
            padding: `${padding}px`,
            width: `${innerWidth}px`,
            height: `${innerHeigh}px`,
            backgroundColor,
            border
          }}
        >
          {this.props.children}
        </div>
      </div>
    );
  }
}
