import React, { Component } from "react";
import PropTypes from "prop-types";
import RenderGrid from "./RenderGrid";
import _ from "lodash";
import "./table.css";
import store from "./store";
import Cell, { GroupCell } from "./Cell";
import { CellColumRowHeader, CellRowHeader, CellColumnHeader } from "./Headers";
import ActionCell from "./ActionCell";
import { EditorActions } from "../_Contexts/Jumpto365App";
import AppIconGeneric from "../AppIconGeneric";
import { TileEditor } from "../../logic/TileEditors";
import { CellType } from "./CellTypeSelector";
import { EventType } from "./EventType";
import ReactJson from "react-json-view";
import TableHeader from "./TableHeader";
import $ from "jquery"

const APPICONSIZE = 160;
const CELLSIZE = 174;

export default class Table extends Component {
  state = {
    renderActions: true,
    renderContent: true,
    renderPipe: false,
    renderGrid: false,

    cellSize: {
      margin: 8,
      height: 174,
      width: 174,
      border: 2,
      cross: 32,
      spacer: 70, //64+64+32==160
      headerHeight: 36,
      groupHeight: 53
    }
  };

  static propTypes = {
    title: PropTypes.string,
    height: PropTypes.number,
    width: PropTypes.number,
    grid: PropTypes.array
  };

  updateDimensions = () => {
    //this.setState({ });
    
    // var scale = this.props.scale && this.props.scale !== 0 ? this.props.scale : 1;
    // var scaledHeight = this.props.height / scale;
    // var scaledWidth = this.props.width / scale;

    // var containerWidth = $("#TableOuter").width()

    // console.log(containerWidth)
    // var marginLeft = (containerWidth - scaledWidth / 2)
    // if (this.state.marginLeft !== marginLeft ){

       
    //      this.setState({marginLeft});
    // }


    

}
  componentDidMount() {
    window.addEventListener("resize", this.updateDimensions);
    if (this.props.registerTable) {
      this.props.registerTable(this);
    }
    this.updateDimensions()
  }
  componentWillUnmount = () => {
  window.removeEventListener("resize", this.updateDimensions);
}
  emit = (event, id) => {
    if (this.props.onTableEditorAction) {
      this.props.onTableEditorAction(event, id);
    }
  };

  cellDimensions = cell => {
    var height = this.state.cellSize.height - this.state.cellSize.margin * 2;
    var width = this.state.cellSize.width - this.state.cellSize.margin * 2;
    var margin = this.state.cellSize.margin;
    var border = this.state.cellSize.border;
    if (true && cell) {
      switch (cell.type) {
        case CellType.Full:
          break;
        case CellType.Left:
          width = this.state.cellSize.groupHeight;
          break;
        case CellType.Right:
          width = this.state.cellSize.groupHeight;
          break;
        case CellType.Top:
          height = this.state.cellSize.groupHeight;
          break;
        case CellType.Bottom:
          height = this.state.cellSize.groupHeight;
          break;
        case CellType.SpacerFull:
          width = this.state.cellSize.width;
          height = this.state.cellSize.groupHeight;
          break;
        case CellType.SpacerHorisontal:
          height = this.state.cellSize.groupHeight;
          break;
        case CellType.SpacerVertical:
          width = this.state.cellSize.groupHeight;

          break;

        default:
          break;
      }
    }

    return { height, width, border, margin };
  };
  _clearSize = () => {
    this.sizes = [];
    if (!this.props.grid) return;
    this.props.grid.map(row => {
      this.sizes.push(
        row.map(cell => {
          return { height: 0, width: 0 };
        })
      );
    });
  };

  _calculateSize = () => {
    console.log("Calculating sizes", this.sizes);

    if (this.props.editMode) {
      var totalHeight =
        (this.sizes.length - 1) * this.state.cellSize.height +
        this.state.cellSize.headerHeight +
        60;
      var totalWidth =
        (this.sizes[0].length - 1) * this.state.cellSize.width +
        this.state.cellSize.headerHeight +
        60;
      this.props.onSizeChange(totalHeight, totalWidth);
    } else {
      var maxRowWidth = 0;
      var totalHeight = 0;
      for (let rowIndex = 0; rowIndex < this.sizes.length; rowIndex++) {
        var row = this.sizes[rowIndex];

        var columnWidth = 0;
        var maxRowHeight = 0;
        for (let columnIndex = 0; columnIndex < row.length; columnIndex++) {
          const cell = row[columnIndex];
          columnWidth += cell.width;
          maxRowHeight = Math.max(maxRowHeight, cell.height);
        }
        maxRowWidth = Math.max(maxRowWidth, columnWidth);
        totalHeight += maxRowHeight;
      }

      if (this.props.onSizeChange) {
        this.props.onSizeChange(totalHeight, maxRowWidth);
      }
    }
  };

  _renderPipe = (id, rowIndex, columnIndex, cell) => {
    if (columnIndex === 0 || rowIndex === 0) {
      if (!this.props.editMode) return;
      if (columnIndex === 0 && rowIndex === 0) {
        return <CellColumRowHeader {...this.state.cellSize} />;
      }
      if (columnIndex > 0) {
        return (
          <CellColumnHeader
            {...this.state.cellSize}
            columnNumber={columnIndex}
          />
        );
      }
      if (rowIndex > 0) {
        return <CellRowHeader {...this.state.cellSize} rowNumber={rowIndex} />;
      }
    }

    var hasPipe = rowIndex < 2 && columnIndex > 2 && columnIndex < 6;

    var background = {
      backgroundColor: "#ffff0088"
    };
    var cross = this.state.cellSize.cross;
    var spacer = this.state.cellSize.spacer;

    var styleVertical = {
      textAlign: "center",
      lineHeight: `${cross}px`,
      height: `${spacer}px`,
      width: `${cross}px`,
      maxHeight: `${spacer}px`,
      maxWidth: `${cross}px`,
      overflow: "hidden"
    };

    var styleHorisontal = {
      textAlign: "center",
      lineHeight: `${cross}px`,
      height: `${cross}px`,
      width: `${spacer}px`,
      maxHeight: `${cross}px`,
      maxWidth: `${spacer}px`,
      overflow: "hidden"
    };
    var spacerStyleVertical = {
      textAlign: "center",
      lineHeight: `${spacer}px`,
      height: `${spacer}px`,
      width: `${spacer}px`,
      maxHeight: `${spacer}px`,
      maxWidth: `${spacer}px`,
      overflow: "hidden"
    };

    var lineStyle = "1px solid grey";
    var horisontalLines = { borderTop: lineStyle, borderBottom: lineStyle };
    var verticalLines = { borderLeft: lineStyle, borderRight: lineStyle };

    return (
      <Cell {...cell}  {...this.state.cellSize} noborder>
        <div style={{ fontSize: "6px" }}>
          <div style={{ display: "flex" }}>
            <div style={{ ...spacerStyleVertical }} />
            <div
              style={{ ...styleVertical, ...background, ...verticalLines }}
            />
            <div style={{ ...spacerStyleVertical }} />
          </div>
          <div style={{ display: "flex" }}>
            <div
              style={{ ...styleHorisontal, ...background, ...horisontalLines }}
            />
            <div style={{ ...styleHorisontal, ...background }} />
            <div
              style={{ ...styleHorisontal, ...background, ...horisontalLines }}
            />
          </div>
          <div style={{ display: "flex" }}>
            <div style={{ ...spacerStyleVertical }} />
            <div
              style={{ ...styleVertical, ...background, ...verticalLines }}
            />
            <div style={{ ...spacerStyleVertical }} />
          </div>
        </div>
      </Cell>
    );
  };

  _renderGrid = (id, rowIndex, columnIndex, cell) => {
    if (columnIndex === 0 || rowIndex === 0) {
      if (!this.props.editMode) return;
      if (columnIndex === 0 && rowIndex === 0) {
        return <CellColumRowHeader {...this.state.cellSize} />;
      }
      if (columnIndex > 0) {
        return (
          <CellColumnHeader
            columnNumber={columnIndex}
            {...this.state.cellSize}
          />
        );
      }
      if (rowIndex > 0) {
        return <CellRowHeader rowNumber={rowIndex} {...this.state.cellSize} />;
      }
    }
    var dashed = false;
    return (
      <Cell
        {...this.state.cellSize}
        backgroundColor="#ffffff00"
        dashed={dashed}
      />
    );
  };
  _renderCell = (
    id,
    rowIndex,
    columnIndex,
    cell,
    reportSize,
    attributes,
    onConnectorClick
  ) => {
    if (columnIndex === 0 || rowIndex === 0) {
      if (!this.props.editMode) return;

      if (columnIndex === 0 && rowIndex === 0) {
        return <CellColumRowHeader {...this.state.cellSize} />;
      }
      if (columnIndex > 0) {
        return (
          <CellColumnHeader
            columnNumber={columnIndex}
            {...this.state.cellSize}
          />
        );
      }
      if (rowIndex > 0) {
        return <CellRowHeader rowNumber={rowIndex} {...this.state.cellSize} />;
      }
    }

    // var outerBackgroundColor =
    //   (rowIndex === 5 && columnIndex < 3) || (rowIndex === 6 && columnIndex < 4)
    //     ? "grey"
    //     : null;
    var outerBackgroundColor = null;
    var backgroundColor = "#88888800";
    //rowIndex < 2 && columnIndex > 2 && columnIndex < 8 ? null : "green";
    var cellText = {
      lineHeight: "20px",
      fontSize: "20px",
      textAlign: "center"
    };

    var cellSize = this.cellDimensions(cell);
    var body = this.props.editMode ? (
      <Cell
        reportSize={reportSize}
        {...cellSize}
        backgroundColor={backgroundColor}
        outerBackgroundColor={outerBackgroundColor}
      >
        <div style={{ ...cellText }}>
          {cell.type ? cell.type : "Select type"}
        </div>
      </Cell>
    ) : (
      <Cell
        reportSize={reportSize}
        {...cellSize}
        backgroundColor={backgroundColor}
        outerBackgroundColor={outerBackgroundColor}
      >
        <div style={{ ...cellText }} />
      </Cell>
    );

    if (!cell){
      return <div>Blank cell</div>
    }
    
    switch (cell.type ) {
      case CellType.None:
        if (reportSize) {
          reportSize(0, 0);
        }
        body = (
          <div
            style={{
              height: this.props.editMode ? CELLSIZE : 0,
              width: this.props.editMode ? CELLSIZE : 0
            }}
          />
        );
        break;
      case CellType.Title:
        if (reportSize) {
          reportSize(CELLSIZE, CELLSIZE * 2);
        }
        var halfSize = (-1 * CELLSIZE/2) * (this.isOddNumberOfColums?1:0)
        body = (
          <div
            style={{
              marginLeft: -1 * halfSize,
              marginRight: halfSize+4,
              height: CELLSIZE,
              width: this.props.editMode ? CELLSIZE : CELLSIZE * 2
            }}
          >
            <TableHeader
              title={this.props.titleText}
              backgroundColor={this.props.titleBackgroundColor}
              color={this.props.titleColor}
              teaser={this.props.titleTeaser}
              imageUrl={this.props.titleGraphicUrl}
            />
          </div>
        );
        break;
      case CellType.Full:
        if (cell.tile) {
          var tile = cell.tile;
          if (reportSize) {
            reportSize(CELLSIZE, CELLSIZE);
          }
var  appIconGenericState = null
          if (attributes){
           if (attributes.className==="cellDimmed"){
            attributes = null
            appIconGenericState = "dimmed"
           }

        }
          //
          var connectors = cell.connectors ? cell.connectors : {};
          body = (
            <div>
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
                    if (onConnectorClick) {
                      onConnectorClick(cell.id, "up");
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
              <div style={{ display: "flex" }}>
                <div>
                  <div
                    style={{
                      height: "64px",
                      width: "8px",
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
                      if (onConnectorClick) {
                        onConnectorClick(cell.id, "left");
                      }
                    }}
                    style={{
                      height: "32px",
                      width: "8px",
                      backgroundColor: connectors.left
                    }}
                  />
                  <div
                    style={{
                      height: "64px",
                      width: "8px",
                      backgroundColor: "#ffffff"
                    }}
                  />
                </div>
                <div {...attributes}>
                  <AppIconGeneric
                    size={APPICONSIZE}
                    {...tile}
                    state={appIconGenericState}
                    showMenu={this.props.showMenu}
                    backgroundColor={tile.color}
                    description={tile.inShort}
                    iconUrl={tile.icon}
                    onDetailsClick={() => {
                      this.emit(EventType.TileDetailsClick, cell.id);
                    }}
                    onClick={() => {
                      this.emit(EventType.TileClick, cell.id);
                    }}
                    onMouseOver={()=>{
                      this.emit(EventType.TileMouseOver, cell.id);
                    }}
                    onMouseOut={()=>{
                      this.emit(EventType.TileMouseOut, cell.id);
                    }}
                  />
                </div>

                <div>
                  <div
                    style={{
                      height: "64px",
                      width: "8px",
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
                      if (onConnectorClick) {
                        onConnectorClick(cell.id, "right");
                      }
                    }}
                    style={{
                      height: "32px",
                      width: "8px",
                      backgroundColor: connectors.right
                    }}
                  />
                  <div
                    style={{
                      height: "64px",
                      width: "8px",
                      backgroundColor: "#ffffff"
                    }}
                  />
                </div>
              </div>
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
                    if (onConnectorClick) {
                      onConnectorClick(cell.id, "down");
                    }
                  }}
                  style={{
                    width: "32px",
                    height: "8px",
                    backgroundColor: connectors.down
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
            </div>
          );
        }

        break;

      default:
        // case CellType.Left:
        // case CellType.Right:
        // case CellType.Top:
        // case CellType.Bottom:
        // case CellType.SpacerHorisontal:
        // case CellType.SpacerVertical:
        // case CellType.SpacerCorner:
        body = (
          <GroupCell
            onGroupClick={this.props.onGroupClick}
            onGroupOver={this.props.onGroupOver}
            onGroupOut={this.props.onGroupOut}
            reportSize={reportSize}
            connectingMode={this.props.connectingMode}
            {...cellSize}
            cellId={cell.id}
            type={cell.type}
            connectors={cell.connectors}
            editMode={this.props.editMode}
            backgroundColor={backgroundColor} d
            {...cell.groupSetting}
            onConnectorClick={this.props.onConnectorClick}
          />
        );
        break;
    }

    return body;
  };

  _renderActions = (id, rowIndex, columnIndex, cell) => {
    if (columnIndex === 0 || rowIndex === 0) {
      if (!this.props.editMode) return;
      if (columnIndex === 0 && rowIndex === 0) {
        return <CellColumRowHeader {...this.state.cellSize} />;
      }
      if (columnIndex > 0) {
        return (
          <CellColumnHeader
            {...this.state.cellSize}
            columnNumber={columnIndex}
            onColumnAction={(action, id) => {
              this.emit(action, id);
            }}
          />
        );
      }
      if (rowIndex > 0) {
        return (
          <CellRowHeader
            {...this.state.cellSize}
            rowNumber={rowIndex}
            onRowAction={(action, id) => {
              this.emit(action, id);
            }}
          />
        );
      }
    }

    var props = {
      id,
      rowIndex,
      columnIndex,
      cell,
      cellSize: this.state.cellSize
    };
    // props.cellSize.height += 2;
    // props.cellSize.width += 2;
    return (
      <ActionCell
        {...props}
        onAction={(action, id) => {
          this.emit(action, id);
        }}
        editMode={this.props.editMode}
      />
    );
  };

  get isOddNumberOfColums () {
    if (!this.props.cells) return false
    if (!this.props.cells.length) return false
    var n = this.props.cells[0].length
   
    return n === 0 || !!(n && (n%2));
  }

  render() {
    var scale =
      this.props.scale && this.props.scale !== 0 ? this.props.scale : 1;
   
   var height=this.props.tableWidth
   var width=this.props.tableWidth
   var scaledHeight = height / scale;
    var scaledWidth = width / scale;
    
    var scaledMargin = this.props.marginLeft / scale;
    var dimensions = { height: this.props.height, width: this.props.width };
    var grid = this.props.grid ? this.props.grid : [[]]; // Empty 2 dim grid
    var props = { editMode: this.props.editMode };

    return (
      <div
      id="TableOuter"
        style={{
          xheight:  height,
          width: width,
          
          display: this.props.preRender ? "none" : "block"
        }}
        className="TableOuter"
      >
        <div
          style={{
            position: "absolute",
            xheight: scaledHeight,
            width: width,
            marginLeft: scaledMargin,
            
          }}
          className="TableInner"
        >
          {this.state.renderGrid && (
            <div style={{ position: "fixed" }} className="GridContainer">
              <RenderGrid
                {...props}
                {...dimensions}
                grid={grid}
                renderCell={this._renderGrid}
                level="1"
              />
            </div>
          )}
          {this.state.renderPipe && this.props.editMode && (
            <div style={{ position: "fixed" }} className="PipeContainer">
              <RenderGrid
                {...props}
                {...dimensions}
                grid={grid}
                renderCell={this._renderPipe}
                level="2"
              />
            </div>
          )}
          {this.state.renderContent  &&(
            <div style={{ position: "fixed" }} className="ContentContainer">
              <RenderGrid
                {...props}
                {...dimensions}
                gridClasses={this.props.gridClasses}
                onConnectorClick={this.props.onConnectorClick}
                reportSize={(
                  row,
                  column,
                  height,
                  width,
                  isStarting,
                  isDone
                ) => {
                  if (isStarting) {
                    this._clearSize();
                    if (!this.timer) {
                      this.timer = setTimeout(() => {
                        this.timer = null;
                        this._calculateSize();
                      }, 1);
                    }
                    return; //console.log("Size reporter starting");
                  }
                  if (isDone) {
                    return; //console.log("Size reporter done");
                  }
                  this.sizes[row][column] = { height, width };
                  // console.log(row, column, height, width);
                }}
                grid={grid}
                renderCell={this._renderCell}
                level="3"
              />
            </div>
          )}
          {this.state.renderActions && this.props.editMode && (
            <div style={{ position: "fixed" }} className="ActionContainer">
              <RenderGrid
                {...props}
                {...dimensions}
                onConnectorClick={this.props.onConnectorClick}
                grid={grid}
                renderCell={this._renderActions}
                level="4"
              />
            </div>
          )}
        </div>
      </div>
    );
  }
}
