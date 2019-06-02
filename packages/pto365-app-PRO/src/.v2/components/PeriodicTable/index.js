import React, { Component } from "react";
import PropTypes from "prop-types";
import { Image } from "office-ui-fabric-react/lib/Image";
import { navigate } from "@reach/router";
import Testdata from "../../data/TestData";
import AppIconGeneric from "../AppIconGeneric";
import GroupBox from "../GroupBox";
import { isRegExp } from "util";
import PeriodicTableBanner from "../PeriodicTableBanner";
import { Callout, DirectionalHint } from "office-ui-fabric-react/lib/Callout";
import ReactJson from "react-json-view";
import { Panel, PanelType } from "office-ui-fabric-react/lib/Panel";
import Column from "./Column";
import "./table.css";

function maxRow(grid) {
  if (!grid) return 0;

  return grid.length;
}

function maxColumn(grid) {
  if (!grid) return 0;
  if (!grid[0]) return 0;
  return grid[0].length;
}
/**
 * Describe overall purpose of the component
 *
 * @export
 * @class PeriodicTable
 * @extends {Component}
 */
export default class PeriodicTable extends Component {
  static propTypes = {
    title: PropTypes.string,
    language: PropTypes.string,
    icon: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number,
    onScale: PropTypes.func,
    onAppClick: PropTypes.func,
    grid: PropTypes.arrayOf(PropTypes.object),
    config: PropTypes.arrayOf(PropTypes.object),
    debug: PropTypes.bool,
    renditions: PropTypes.arrayOf(PropTypes.object)
  };

  constructor(props) {
    super(props);

    var gridstate = [];
    for (let row = 0; row < 20; row++) {
      for (let col = 0; col < 12; col++) {
        gridstate.push({ col, row, active: true, dimmed: false });
      }
    }

    this.state = { gridstate };
  }

  _load = () => {
    var options = this.props.options ? this.props.options : {};

    var debugging = this.props.search ? this.props.search.debug : false;
    var lang = this.props.language ? this.props.language.toUpperCase() : "EN";
    var bannerImageRef = this.props.titleGraphicUrl
      ? this.props.titleGraphicUrl
      : `https://jumpto365.com/resources/images/app/Title-${lang}.png`;
    var bannerImage = this.props.titleGraphicUrl;

    if (this.props.focusedtools) {
      var gridstate = this.copyArray(this.state.gridstate);
      for (let row = 0; row < maxRow(grid); row++) {
        for (let column = 0; column < maxColumn(grid); column++) {
          var grid = this.props.grid;
          var cell = grid && grid[row] ? grid[row][column] : null;
          var dimmed = true;
          if (cell && cell.centerData) {
            this.props.focusedtools.forEach(tool => {
              if (tool === cell.centerData.key) {
                dimmed = false;
              }
            });

            gridstate[row * 8 + column].dimmed = dimmed;
          }
        }
      }
      this.setState({ gridstate });
    }
    var grid = this.props.grid;
    this.setState({
      debugging,
      bannerImage,
      maxRow: maxRow(grid),
      maxColumn: maxColumn(grid)
    });
  };
  componentDidMount = () => {
    this._load();
    if (this.props.gridHandler) {
      this.props.gridHandler(this.getGridState, this.setGridState);
    }
  };
  getGridState = () => {
    return this.state.gridstate;
  };

  setGridState = gridstate => {
    this.setState({ gridstate });
  };

  componentDidUpdate = (previousProps, previousState) => {
    if (
      this.props.grid !== previousProps.grid ||
      this.props.search !== previousProps.search ||
      this.props.focusedtools !== previousProps.focusedtools ||
      this.props.area !== previousProps.area ||
      this.props.isNew !== previousProps.isNew ||
      this.props.groups !== previousProps.groups ||
      this.props.context !== previousProps.context
    ) {
      this._load();
    }
  };
  copyArray = array => {
    const newArray = [];
    for (let i = 0; i < array.length; i++) {
      newArray[i] = array[i];
    }
    return newArray;
  };

  _onScale = text => {
    if (this.state.text === text) return;
    this.setState({ text });
    if (this.props.onScale) this.props.onScale(text);
  };

  _onMouseEnter = (e, group) => {
    if (this.props.context && this.props.context.editMode) return;
    var groups =
      group && group.props && group.props.groups ? group.props.groups : null;

    if (!groups) return;
    var children = group && group.props ? group.props.children : null;
    var tools = null;
    groups.forEach(g => {
      if (g.title === children) {
        tools = g.members && g.members.members ? g.members : null;
      }
    });

    if (!tools || (tools.members && tools.members.length === 0)) return;
    var gridstate = this.copyArray(this.state.gridstate);
    for (let row = 0; row < this.state.maxRow; row++) {
      for (let column = 0; column < this.state.maxColumn; column++) {
        var grid = group.props.grid;
        var cell = grid && grid[row] ? grid[row][column] : null;
        var dimmed = true;
        if (cell && cell.centerData) {
          tools.members.forEach(tool => {
            if (tool === cell.centerData.key) {
              dimmed = false;
            }
          });

          gridstate[row * 8 + column].dimmed = dimmed;
        }
      }
    }

    this.setState({ gridstate });
  };
  _onMouseLeave = (e, group) => {
    if (this.props.context && this.props.context.editMode) return;
    var gridstate = this.copyArray(this.state.gridstate);
    for (let row = 0; row < this.state.maxRow; row++) {
      for (let column = 0; column < this.state.maxColumn; column++) {
        gridstate[row * 8 + column].dimmed = false;
      }
    }
    this.setState({ gridstate });
  };

  _buildGrid() {}




  gotConnector(tileId,data){
    if (!this.props.scanner) return
    this.props.scanner(tileId,data)
  }

  getConnectorColor(tileId,connectorColor,property){
    if (!this.props.connectors ) return connectorColor
    if (!this.props.connectors[tileId]) return connectorColor
    return this.props.connectors[tileId][property]
  }

  /**
   * Required method return the output of the component
   *
   * @returns
   * @memberof PeriodicTable
   */
  render() {
    if (!this.props.grid) {
      return <div />;
    }
    var zoneText =
      this.props.context &&
      this.props.context.isAuthenticated &&
      this.props.context.me
        ? `${
            this.props.context.me.displayName
          } [${this.props.context.me.domain.toUpperCase()}]`
        : "You are not signed in";
    var options = this.props.options ? this.props.options : {};
    var debugging = this.state.debugging; // this.props.debug ? true : false
    var w = this.props.width;
    var h = this.props.height;
    var iterate = true;
    var thoughts = "";
    var tableSize = 0;
    var contextPath = this.props.contextPath;

    var editMode = this.props.context ? this.props.context.editMode : false;
    var sizes = [
      {
        width: 240,
        size: 24,
        margin: 2,
        groupsize: 8,
        groupFontSize: "0",
        bannerSize: 60,
        bannerFontSize: 2
      },
      {
        width: 320,
        size: 28,
        margin: 3,
        groupsize: 10,
        groupFontSize: "0",
        bannerSize: 80,
        bannerFontSize: 3
      },
      {
        width: 480,
        size: 40,
        margin: 4,
        groupsize: 13,
        groupFontSize: "0",
        bannerSize: 110,
        bannerFontSize: 4
      },
      {
        width: 768,
        size: 56,
        margin: 4,
        groupsize: 18,
        groupFontSize: "0px",
        lineheight: "0px",
        bannerSize: 180,
        bannerFontSize: 6
      },
      {
        width: 1200,
        size: 100,
        margin: 6,
        groupsize: 24,
        groupFontSize: "9px",
        lineheight: "9px",
        bannerSize: 240,
        bannerFontSize: 10
      },
      {
        width: 1920,
        size: 160,
        margin: 8,
        groupsize: 53,
        groupFontSize: "14px",
        lineheight: "14px",
        bannerSize: 400,
        bannerFontSize: 16
      },
      {
        width: 3840,
        size: 320,
        margin: 16,
        groupsize: 106,
        groupFontSize: "20px",
        lineheight: "20px",
        bannerSize: 800,
        bannerFontSize: 32
      }
    ];

    var sizeIndex =
      w <= 240
        ? 0
        : w <= 320
        ? 1
        : w <= 480
        ? 2
        : w <= 768
        ? 3
        : w <= 1200
        ? 4
        : w <= 1920
        ? 5
        : 6;
    var selectedSize = null;
    do {
      if (this.props.isScaled){
      
      sizeIndex = 4
    }
      selectedSize = sizes[sizeIndex];
      var table = sizes[sizeIndex].width; // w <= 240 ? 240 : w <= 320 ? 320 : w <= 480 ? 480 : w <= 768 ? 768 : w <= 1200 ? 1200 : w <= 1920 ? 1920 : 3840

      var size = sizes[sizeIndex].size; //w <= 240 ? 24 :w <= 320 ? 28 : w <= 480 ? 40 : w <= 768 ? 56 : w <= 1200 ? 100 : w <= 1920 ? 160 : 320
      var margin = sizes[sizeIndex].margin; //w <= 240 ? 2 :w <= 320 ? 4 : w <= 480 ? 4 : w <= 768 ? 8 : w <= 1200 ? 10 : w <= 1920 ? 16 : 32
      var groupsize = sizes[sizeIndex].groupsize; // w <= 240 ? 8 :w <= 320 ? 10 : w <= 480 ? 13 : w <= 768 ? 18 : w <= 1200 ? 33 : w <= 1920 ? 53 : 106
      var maxCalculatedWidth = 0;
      var calculatedHeight = 0;
      var groupFontSize = sizes[sizeIndex].groupFontSize;
      var lineheight = sizes[sizeIndex].lineheight;

      var grid = this.props.grid
        ? this.copyArray(this.props.grid)
        : Testdata.pto;

      tableSize = table;
      // [
      //             [{l:1,c:1,r:0},     {l:0,c:0,r:0},      {l:0,c:0,r:0},      {l:1,c:0,r:0},      {l:0,c:0,r:0},      {l:0,c:0,r:0},      {l:0,c:1,r:1}],
      //             [{l:1,c:1,r:0},     {l:0,c:1,r:0},      {l:0,c:2,r:0},      {l:1,c:1,r:0},      {l:0,c:1,r:0},      {l:0,c:1,r:0},      {l:0,c:1,r:1}],
      //             [{l:1,c:1,r:0},     {l:0,c:1,r:0},      {l:0,c:1,r:0},      {l:1,c:1,r:0},      {l:0,c:1,r:0},      {l:0,c:1,r:0},      {l:0,c:1,r:1}],
      //             [{l:1,c:1,r:0},     {l:0,c:1,r:0},      {l:0,c:1,r:0},      {l:0,c:1,r:1},      {l:0,c:1,r:0},      {l:0,c:1,r:0},      {l:0,c:1,r:1}],
      //             [{l:1,c:1,r:0},     {l:0,c:1,r:0},      {l:0,c:1,r:0},      {l:0,c:1,r:1},      {l:0,c:1,r:0},      {l:0,c:1,r:0},      {l:0,c:1,r:1}]
      //         ]

      function hasValue(s) {
        if (s === "") return false;
        if (s == "") return false;

        if (!s) return false;
        if (s === undefined) return false;
        return true;
      }

      function findColor(columns, startIndex, key) {
        if (key === ">") {
          for (var index = startIndex - 1; index >= 0; index--) {
            var col = columns[index];
            var color = col.connectorColor; //rightData && col.rightData.color ? col.rightData.color : ""

            if (col && color) {
              var c = color;
              return { c, index };
            }
          }
        } else {
          for (var index = startIndex; index < columns.length; index++) {
            var col = columns[index];
            var color = col.rightData ? col.rightData.color : null;
            if (col && color) {
              var c = color;
              return { c, index };
            }
          }
        }
        return { c: null };
      }
      function findTopColor(grid, startRow, startColumn, key) {
        if (!grid) return;
        for (var row = startRow; row >= 0; row--) {
          var col = grid[row][startColumn];
          var color = col.topData && col.topData.color ? col.topData.color : "";
          if (col && color) {
            var c = color;
            return c;
          }
        }
      }

      var showNextLeftMargin = true;
      var rows = [];
      if (this.props.scanner){this.props.scanner(null,{scannerStarted:true})}
    
      for (let rowNumber = 0; rowNumber < maxRow(grid); rowNumber++) {
        var columns = [];
        var topColumns = [];
        var calculatedWidth = 0;

        //  get connector colours
        for (
          let columnNumber = 0;
          columnNumber < maxColumn(grid);
          columnNumber++
        ) {
          let leftData = grid[rowNumber][columnNumber].leftData;
          if (leftData) {
            if (leftData.key === "<" || leftData.key === ">") {
              leftData.colorMatch = findColor(
                this.copyArray(grid[rowNumber]),
                columnNumber,
                leftData.key
              );
              leftData.color = leftData.colorMatch.c;
            }
          }
          let rightData = grid[rowNumber][columnNumber].rightData;
          if (rightData) {
            if (rightData.key === "<" || rightData.key === ">") {
              rightData.colorMatch = findColor(
                this.copyArray(grid[rowNumber]),
                columnNumber,
                rightData.key
              );
              rightData.color = rightData.colorMatch.c;
            }
          }
          let topData = grid[rowNumber][columnNumber].topData;
          if (topData) {
            if (topData.key === "V") {
              topData.color = findTopColor(grid, rowNumber, columnNumber);
            }
          }
        }
        for (
          let columnNumber = 0;
          columnNumber < maxColumn(grid);
          columnNumber++
        ) {
          var tileId = rowNumber + "." + columnNumber;
          let hideLeftMargin =
            rowNumber === 0 && columnNumber > 0 && columnNumber < 6;
          let celldata = grid[rowNumber][columnNumber];
          let color = celldata ? (celldata.c === 1 ? "gray" : "white") : "red";

          let cellType = celldata.c === 2 ? 2 : 1;

          if (celldata.l === 1) {
            var thisColor = celldata.leftData
              ? celldata.leftData.color
              : celldata.rightData
              ? celldata.rightData.color
              : "green";
            var text = celldata.leftData
              ? celldata.leftData.title === "_"
                ? null
                : celldata.leftData.title
              : null;
            if (columnNumber > 0) {
              topColumns.push(
                <TopMargin
                  editMode={editMode}
                  editor={this.props.editor}
                  debugging={debugging}
                  color="purple"
                  width={margin}
                  height={margin}
                />
              );
              if (showNextLeftMargin)
                columns.push(
                  <LeftMargin
                  editMode={editMode}
                    debugging={debugging}
                    hidden={hideLeftMargin}
                    color="white"
                    borderColor="white"
                    size={size}
                    margin={margin}
                  />
                );
              showNextLeftMargin = true;
            }
            topColumns.push(
              <TopMargin
                editMode={editMode}
                editor={this.props.editor}
                debugging={debugging}
                color="orange"
                width={groupsize}
                margin={margin}
                height={margin}
              />
            );
            var textColor = celldata.leftData.textColor;
            columns.push(
              <Group
                name={celldata.leftData.key}
                editMode={editMode}
                editor={this.props.editor}
                textColor={textColor}
                debugging={debugging}
                height={size}
                width={groupsize}
                margin={margin}
                color={thisColor}
                fontsize={groupFontSize}
                lineheight={lineheight}
                onMouseEnter={editMode ? null : this._onMouseEnter}
                groups={this.props.groups}
                grid={this.props.grid}
                onMouseLeave={editMode ? null : this._onMouseLeave}
                row={rowNumber}
                column={columnNumber}
              >
                {text}
              </Group>
            );
            calculatedWidth = calculatedWidth + groupsize + margin;
          }

          switch (cellType) {
            case 1:
              var thisColor = celldata.centerData
                ? celldata.centerData.color
                : color;
              var thisTextColor = celldata.centerData
                ? celldata.centerData.textcolor
                : "#ffffff";
              var icon =
                celldata.centerData && celldata.centerData.icon
                  ? celldata.centerData.icon
                  : null;
              var path =
                celldata.centerData && celldata.centerData.key
                  ? `/tool/${celldata.centerData.key}` +
                    (this.props.language ? "/" + this.props.language : "")
                  : null;
              var title = celldata.centerData
                ? celldata.centerData.title
                : null;
              var isPremium = celldata.centerData
                ? celldata.centerData.isPremium
                : false;
              var isFullyShareable = celldata.centerData
                ? celldata.centerData.isFullyShareable
                : false;
              var isPartlyShareable = celldata.centerData
                ? celldata.centerData.isPartlyShareable
                : false;
              var inShort = celldata.centerData
                ? celldata.centerData.inShort
                : "";
              var name = celldata.centerData ? celldata.centerData.key : "";
              var jumpto = celldata.centerData
                ? celldata.centerData.jumpto
                : "";
              var subtitle = celldata.centerData
                ? celldata.centerData.subtitle
                : null;
              var isHashed = celldata.centerData
                ? celldata.centerData.isHashed
                : false;
              if (
                celldata &&
                celldata.centerData &&
                celldata.centerData.contentRef
              ) {
                path = celldata.centerData.contentRef;
              }

              topColumns.push(
                <TopMargin
                  editMode={editMode}
                  editor={this.props.editor}
                  debugging={debugging}
                  color="purple"
                  width={margin}
                  height={margin}
                />
              );

              let connect = celldata.leftData
                ? celldata.leftData.isConnector
                  ? true
                  : celldata.leftData.color === ""
                  ? false
                  : true
                : false;

              let connectorColor = connect
                ? celldata.leftData.color === ""
                  ? "lightgrey"
                  : celldata.leftData.color
                : "#ffffff";
              let connectorBorderColor = connect
                ? celldata.leftData.borderColor === ""
                  ? "darkgrey"
                  : celldata.leftData.borderColor
                : "#ffffff";

              let connectRight = celldata.rightData
                ? celldata.rightData.isConnector
                  ? true
                  : celldata.rightData.color === ""
                  ? false
                  : true
                : false;

              let connectorColorRight = connectRight
                ? celldata.rightData.color === ""
                  ? "lightgrey"
                  : celldata.rightData.color
                : "#ffffff";
              let connectorBorderColorRight = connectRight
                ? celldata.rightData.borderColor === ""
                  ? "darkgrey"
                  : celldata.rightData.borderColor
                : "#ffffff";

              let topConnect = celldata.topData
                ? celldata.topData.isConnector
                  ? true
                  : celldata.topData.color === ""
                  ? false
                  : true
                : false;

              let topConnectorColor = topConnect
                ? celldata.topData.color === ""
                  ? "lightgrey"
                  : celldata.topData.color
                : "#ffffff";
              let topConnectorBorderColor = topConnect
                ? celldata.topData.borderColor === ""
                  ? "darkgrey"
                  : celldata.topData.borderColor
                : "#ffffff";

              celldata.connectorColor = connectorColor;
              var key = celldata.leftData ? celldata.leftData.key : "";
                
              if (showNextLeftMargin){ 
              this.gotConnector(tileId,{leftColor:connectorColor})

              connectorColor = this.getConnectorColor(tileId,connectorColor,"leftColor")
                columns.push(
                  <LeftMargin
                    tileId={tileId}
                    connector="leftColor"
                    context={this.props.context}
                    onConnectorClicked={this.props.onConnectorClicked}
                    editMode={editMode}
                    editor={this.props.editor}
                    debugging={debugging}
                    hidden={hideLeftMargin}
                    color={connectorColor}
                    borderColor={connectorBorderColor}
                    size={size}
                    margin={margin}
                  >
                    {key}
                  </LeftMargin>
                );
          }
              showNextLeftMargin = true;
              this.gotConnector(tileId,{topColor:topConnectorColor})
              connectorColor = this.getConnectorColor(tileId,topConnectorColor,"topColor")

              topColumns.push(
                <TopConnector
                tileId={tileId}
                connector="topColor"
                context={this.props.context}

                onConnectorClicked={this.props.onConnectorClicked}
                  editMode={editMode}
                  editor={this.props.editor}
                  debugging={debugging}
                  color={topConnectorColor}
                  borderColor={topConnectorBorderColor}
                  size={margin}
                  width={size}
                  height={margin}
                />
              );
              var state = this.state.gridstate[rowNumber * 8 + columnNumber];
              columns.push(
                rowNumber === 0 && columnNumber > 0 && columnNumber < 6 ? (
                  <DummyColumn
                    debugging={debugging}
                    size={size}
                    margin={margin}
                  />
                ) : (
                  <Column
                    tileid={tileId}
                    version={this.props.version ? this.props.version : 1}
                    editMode={editMode}
                    editor={this.props.editor}
                    onClick={
                      this.props.onAppClick
                        ? () => {
                            this.props.onAppClick(
                              celldata,
                              rowNumber,
                              columnNumber
                            );
                          }
                        : null
                    }
                    debugging={debugging}
                    celldata={celldata}
                    size={size}
                    name={name}
                    margin={margin}
                    color={thisColor}
                    contextPath={contextPath}
                    tileaction={options.tileactiontype}
                    path={path}
                    area={this.props.area}
                    language={this.props.language}
                  >
                    <AppIconGeneric
                      launcherMode={this.props.launcherMode}
                      editMode={editMode}
                      size={size}
                      name={name}
                      title={title}
                      textcolor={thisTextColor}
                      backgroundColor={thisColor}
                      iconUrl={icon}
                      isHashed={isHashed}
                      isPremium={isPremium}
                      isFullyShareable={isFullyShareable}
                      isPartlyShareable={isPartlyShareable}
                      description={inShort}
                      options={options}
                      jumpto={jumpto}
                      subTitle={subtitle}
                      gridState={state}
                      state={
                        state.dimmed
                          ? "dimmed"
                          : state.disabled
                          ? "disabled"
                          : ""
                      }
                      area={this.props.area}
                    />
                  </Column>
                )
              );
              if (tileId === "3.3" && name === "tasks") {

                this.gotConnector(tileId,{rightColor:"#AAe29f"})
                connectorColor = this.getConnectorColor(tileId,"#AAe29f","rightColor")

                columns.push(
                  <RightMargin
                  tileId={tileId}
                  connector="rightColor"
                  context={this.props.context}

                  onConnectorClicked={this.props.onConnectorClicked}
                    editMode={editMode}
                    editor={this.props.editor}
                    debugging={debugging}
                    hidden={hideLeftMargin}
                    color={connectorColor}
                    borderColor={connectorBorderColorRight}
                    size={size}
                    margin={margin}
                  >
                    {key}
                  </RightMargin>
                );
                showNextLeftMargin = false;
              }
              calculatedWidth = calculatedWidth + size + margin;
              break;
            case 2:
              var thisColor = celldata.centerData
                ? celldata.centerData.color
                : color;

                
              topColumns.push(
                <TopMargin
                  editMode={editMode}
                  editor={this.props.editor}
                  debugging={debugging}
                  color="red"
                  width={margin}
                  height={margin}
                />
              );

              if (showNextLeftMargin)

              
                columns.push(
                  <LeftMargin
                  editMode={editMode}
                    debugging={debugging}
                    hidden={hideLeftMargin}
                    color="white"
                    borderColor="white"
                    size={size}
                    margin={margin}
                  />
                );
              showNextLeftMargin = true;
              topColumns.push(
                <TopConnector
                  editMode={editMode}
                  editor={this.props.editor}
                  debugging={debugging}
                  color="#ffffff"
                  borderColor="#ffffff"
                  size={margin}
                  width={size}
                  height={margin}
                />
              );
              var text = celldata.centerData ? celldata.centerData.title : null;
              var textColor = celldata.centerData.textColor;

              columns.push(
                <GroupLow
                  editMode={editMode}
                  editor={this.props.editor}
                  textColor={textColor}
                  debugging={debugging}
                  height={groupsize}
                  width={size}
                  margin={margin}
                  marginTop={size - groupsize}
                  color={thisColor}
                  row={rowNumber}
                  column={columnNumber}
                  fontsize={groupFontSize}
                  lineheight={lineheight}
                  onMouseEnter={this._onMouseEnter}
                  groups={this.props.groups}
                  grid={this.props.grid}
                  onMouseLeave={this._onMouseLeave}
                >
                  {text}
                </GroupLow>
              );
              calculatedWidth = calculatedWidth + size + margin;
              break;
            default:
              break;
          }

          if (celldata.r === 1) {
            var thisColor = celldata.rightData
              ? celldata.rightData.color
              : "blue";
            topColumns.push(
              <TopMargin
                editMode={editMode}
                editor={this.props.editor}
                debugging={debugging}
                color="purple"
                width={margin}
                height={margin}
              />
            );
            var text = celldata.rightData ? celldata.rightData.title : null;

            if (showNextLeftMargin)
          {
            this.gotConnector(tileId,{leftColor:thisColor})
            thisColor = this.getConnectorColor(tileId,thisColor,"leftColor")

              columns.push(
                <LeftMargin
                tileId={tileId}
                connector="leftColor"
                context={this.props.context}

                onConnectorClicked={this.props.onConnectorClicked}
                editMode={editMode}
                  debugging={debugging}
                  hidden={hideLeftMargin}
                  color={thisColor}
                  borderColor="darkgrey"
                  size={size}
                  margin={margin}
                />
              );
            }
            showNextLeftMargin = true;
            topColumns.push(
              <TopMargin
                editMode={editMode}
                editor={this.props.editor}
                debugging={debugging}
                color="orange"
                width={groupsize}
                height={margin}
              />
            );
            var textColor = celldata.rightData
              ? celldata.rightData.textColor
              : "";

            columns.push(
              <GroupRight
                name={celldata.rightData.key}
                editMode={editMode}
                editor={this.props.editor}
                textColor={textColor}
                debugging={debugging}
                row={rowNumber}
                column={columnNumber}
                height={size}
                width={groupsize}
                margin={margin}
                color={thisColor}
                fontsize={groupFontSize}
                lineheight={lineheight}
                onMouseEnter={this._onMouseEnter}
                groups={this.props.groups}
                grid={this.props.grid}
                onMouseLeave={this._onMouseLeave}
              >
                {text}
              </GroupRight>
            );
            calculatedWidth = calculatedWidth + groupsize + margin;
          }
        }

        if (calculatedWidth > maxCalculatedWidth)
          maxCalculatedWidth = calculatedWidth;
        calculatedHeight += margin + size;
        if (rowNumber === 4) {
          columns.push(
            <span
              style={{
                width: "20px",
                height: "20px",
                backgroundColor: "#ffffff"
              }}
              onClick={e => {
                this.setState({ debugging: !this.state.debugging });
              }}
            />
          );
        }
        if (rowNumber > 0)
          rows.push(
            <Row debugging={debugging} key={rowNumber}>
              {topColumns}
            </Row>
          );
        rows.push(
          <Row debugging={debugging} key={rowNumber}>
            {columns}
          </Row>
        );
      }
      if (this.props.scanner){this.props.scanner(null,{scannerEnded:true})}
      w = Math.min(this.props.width, calculatedWidth);
      h = Math.min(this.props.height, calculatedHeight);

      if (this.props.isScaled){
        iterate = false
      }
      else
      {
      iterate = (calculatedWidth > w || calculatedHeight > h) && sizeIndex > 0;
      if (iterate) {
        sizeIndex--;
      }
    }
    } while (iterate);

    var scaleH = this.props.height / calculatedHeight;
    var scaleW = this.props.width / calculatedWidth;
    var scale = Math.min(scaleH, scaleW);

    var scalingInfo = `${tableSize}: Size ${h} x ${w} Request size ${
      this.props.height
    } x ${
      this.props.width
    } | Calculated Size ${calculatedHeight} x ${maxCalculatedWidth} | Applied scaling ${scale}`;
    this._onScale(scalingInfo);
    var leftMargin = this.props.center
      ? (this.props.width - scale * calculatedWidth) / 2
      : 0;

    return (
      <div
        style={{
          border: "0px dashed green",
          xheight: this.props.height * scale,
          minHeight: scale * calculatedHeight,
          paddingLeft: `${leftMargin}px`
        }}
      >
        <div style={{ width: "100%", overflowY: "grow", xoverflowX: "auto" }}>
          <div
            style={{ transformOrigin: " 0 0 0 ", transform: `scale(${scale})` }}
          >
            <div style={{ position: "relative" }}>
              <div
                style={{
                  zIndex: "100",
                  position: "absolute",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: calculatedWidth,
                  zIndex: -1
                }}
              >
                <div
                  style={{
                    flexGrow: "none",
                    flexShrink: "none",
                    width: selectedSize.bannerSize
                  }}
                >
                  <PeriodicTableBanner
                    bannerTeaser={this.props.bannerTeaser}
                    bannerByline={this.props.bannerByline}
                    hideOurLogo={this.props.bannerHideOurLogo}
                    zoneText={this.props.bannerHideZoneInfo ? "" : zoneText}
                    border={this.props.bannerBorder}
                    textColor={this.props.bannerTextColor}
                    backgroundColor={this.props.bannerBackgroundColor}
                    image={this.state.bannerImage}
                    width={selectedSize.bannerSize}
                    height={selectedSize.bannerSize / 3}
                    text={this.props.title}
                    subtitle={this.props.subtitle}
                    bannerFontSize={selectedSize.bannerFontSize}
                  />
                </div>
              </div>

              {rows}
              {false && this.props.context && this.props.context.editMode && (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <div
                    className="tableproperties"
                    style={{
                      marginTop: "10px",
                      marginLeft: "-23px",
                      position: "absolute",
                      width: selectedSize.bannerSize,
                      height: selectedSize.bannerSize / 3,
                      top: "0",
                      border: "1px solid green"
                    }}
                  >
                    <div>Properties</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

class Debugger extends Component {
  state = {};
  _setShowPanel = showPanel => {
    this.setState({ showPanel: showPanel });
  };
  render() {
    var p =
      this.props.parentProps &&
      this.props.parentProps.celldata &&
      this.props.parentProps.celldata.leftData
        ? this.props.parentProps.celldata
        : {
            leftData: { colorMatch: { col: {} } },
            centerData: {},
            rightData: {}
          };
    var left = p.leftData;
    return (
      <div>
        <span
          onClick={e => {
            this.setState({ showPanel: !this.state.showPanel });
          }}
          className="ms-Icon ms-Icon--Code"
        />
        {p.centerData.key}
        {this.props.tileid}
        <div style={{ backgroundColor: left.color }}>{left.key}</div>
        {left.colorMatch && left.colorMatch.col && (
          <div style={{ backgroundColor: left.colorMatch.c }}>
            {left.colorMatch.index}:{left.colorMatch.col.key}
          </div>
        )}
        <Panel
          isBlocking={true}
          isOpen={this.state.showPanel}
          onDismiss={e => {
            this._setShowPanel(false);
          }}
          type={PanelType.medium}
          headerText="Non-Modal Panel"
          closeButtonAriaLabel="Close"
        >
          {this.props.children}
        </Panel>
      </div>
    );
  }
}

class LeftMargin extends Component {


  _click = () =>{ 
    if (this.props.tileId && this.props.editMode){
      if (this.props.onConnectorClicked)  this.props.onConnectorClicked(this.props.tileId,this.props.connector)
  
  }
  }
   
  render() {
    var tenth = this.props.size / 10;
    var margin = tenth * 4;
    var height = tenth * 2;
    var borderHeight = (tenth / 10) * 2;

    var sum = margin + borderHeight * 2 + height;

    if (this.props.hidden) {
      return (
        <div
          style={{
            marginTop: margin,

            width: this.props.margin,
            height: height
          }}
        />
      );
    }

    return (
      <div onClick={this._click}
        style={{
          cursor:this.props.editMode && this.props.context  && this.props.context.groupInFocus ?"pointer" :"default",
          backgroundColor:  this.props.color,
          marginTop: margin,
         
          
          borderColor: this.props.borderColor,

          borderTopWidth: borderHeight,
          borderBottomWidth: borderHeight,
          
          borderBottomStyle: this.props.editMode ? "dotted" : "solid",
          borderTopStyle: this.props.editMode ? "dotted" : "solid",
          width: this.props.margin,
          height: height
        }}
      />
    );
  }
}
class RightMargin extends Component {

  _click = () =>{ 
    if (this.props.tileId && this.props.editMode){
      if (this.props.onConnectorClicked)  this.props.onConnectorClicked(this.props.tileId,this.props.connector)
    this.setState({color:"red"})
  }
  }
   
  render() {
    var tenth = this.props.size / 10;
    var margin = tenth * 4;
    var height = tenth * 2;
    var borderHeight = (tenth / 10) * 2;

    var sum = margin + borderHeight * 2 + height;

    if (this.props.hidden) {
      return (
        <div
          style={{
            marginTop: margin,

            width: this.props.margin,
            height: height
          }}
        />
      );
    }

    return (
      <div  onClick={this._click}
        style={{
          cursor:"pointer",
          cursor:this.props.editMode && this.props.context && this.props.context.groupInFocus ?"pointer" :"default",
          backgroundColor: this.props.color,
          marginTop: margin,
          xmarginBottom: margin,
          backgroundColor: this.props.color,
          borderColor: this.props.borderColor,

          borderTopWidth: borderHeight,
          borderBottomWidth: borderHeight,
          borderBottomStyle: this.props.editMode ? "dashed" : "solid",
          borderTopStyle: this.props.editMode ? "dashed" : "solid",
          width: this.props.margin,
          height: height
        }}
      />
    );
  }
}
class TopConnector extends Component {

  _click = () =>{ 
    if (this.props.tileId && this.props.editMode){
    if (this.props.onConnectorClicked)  this.props.onConnectorClicked(this.props.tileId,this.props.connector)
    this.setState({color:"red"})
  }
  }
   
  render() {
    var tenth = this.props.width / 10;
    var margin = tenth * 4;
    var width = tenth * 2;
    var borderHeight = (tenth / 10) * 2;

    var sum = margin + borderHeight * 2 + width;

    return (
      <div  onClick={this._click}
        style={{
          cursor:this.props.editMode && this.props.context && this.props.context.groupInFocus  ?"pointer" :"default",
          marginLeft: margin,
          marginRight: margin,
          backgroundColor: this.props.color,
          borderColor: this.props.borderColor,

          borderLeftWidth: borderHeight,
          borderRightWidth: borderHeight,
          borderLeftStyle: this.props.editMode ? "dashed" : "solid",
          borderRightStyle: this.props.editMode ? "dashed" : "solid",

          height: this.props.height,
          width: width
        }}
      >
        &nbsp;
      </div>
    );
  }
}

class TopMargin extends Component {
  render() {
    return (
      <div
        style={{
          xbackgroundColor: this.props.color,
          height: this.props.height,
          width: this.props.width
        }}
      >
        &nbsp;
      </div>
    );
  }
}
class Row extends Component {
  render() {
    return (
      <div style={{ display: "flex", flexDirection: "row" }}>
        {this.props.children}
      </div>
    );
  }
}
class DummyColumn extends Component {
  render() {
    return (
      <div
        style={{
          minWidth: this.props.size,
          minHeight: this.props.size,
          border: this.props.debugging ? "1px dashed #aaaaaa" : null,
          width: this.props.size,
          height: this.props.size
        }}
      >
        {this.props.debugging ? (
          <Debugger parentProps={this.props} parentState={this.state}>
            <ReactJson collapsed="4" src={this.props.celldata} />
          </Debugger>
        ) : (
          this.props.children
        )}
      </div>
    );
  }
}
class Group extends Component {
  render() {
    return (
      <div
        style={{
          backgroundColor: this.props.color,
          xmarginLeft: this.props.margin,
          minWidth: this.props.width,
          minHeight: this.props.height,
          maxWidth: this.props.width,
          maxHeight: this.props.height,
          xmarginTop: this.props.margin,
          width: this.props.width,
          height: this.props.height
        }}
        onMouseEnter={e => {
          if (this.props.onMouseEnter) this.props.onMouseEnter(e, this);
        }}
        onMouseLeave={e => {
          if (this.props.onMouseLeave) this.props.onMouseLeave(e, this);
        }}
      >
        <GroupBox
          {...this.props}
          height={this.props.width}
          width={this.props.height}
          rotation="270"
        >
          {this.props.children}
        </GroupBox>
      </div>
    );
  }
}

class GroupRight extends Component {
  render() {
    return (
      <div
        style={{
          backgroundColor: this.props.color,
          xmarginLeft: this.props.margin,
          minWidth: this.props.width,
          minHeight: this.props.height,
          maxWidth: this.props.width,
          maxHeight: this.props.height,
          xmarginTop: this.props.margin,
          width: this.props.width,
          height: this.props.height
        }}
        onMouseEnter={e => {
          if (this.props.onMouseEnter) this.props.onMouseEnter(e, this);
        }}
        onMouseLeave={e => {
          if (this.props.onMouseLeave) this.props.onMouseLeave(e, this);
        }}
      >
        <GroupBox
          {...this.props}
          height={this.props.width}
          width={this.props.height}
          rotation="90"
        >
          {this.props.children}
        </GroupBox>
      </div>
    );
  }
}
class GroupLow extends Component {
  render() {
    return (
      <div
        style={{
          backgroundColor: this.props.color,
          marginTop: this.props.marginTop,
          xmarginLeft: this.props.margin,
          minWidth: this.props.width,
          maxWidth: this.props.width,
          maxHeight: this.props.height,
          minHeight: this.props.height,
          minWidth: this.props.width,
          height: this.props.height
        }}
        onMouseEnter={e => {
          if (this.props.onMouseEnter) this.props.onMouseEnter(e, this);
        }}
        onMouseLeave={e => {
          if (this.props.onMouseLeave) this.props.onMouseLeave(e, this);
        }}
      >
        <GroupBox
          {...this.props}
          height={this.props.height}
          width={this.props.width}
          rotation="0"
        >
          {" "}
          {this.props.children}
        </GroupBox>
      </div>
    );
  }
}
