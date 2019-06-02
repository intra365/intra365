
import React, { Component } from "react";
import PropTypes from "prop-types";
import HeaderActionButton from "./HeaderActionButton"
import _ from "lodash";
import "./table.css";
import { Icon } from "office-ui-fabric-react";
import {EventType} from "./EventType"

export class CellColumRowHeader extends Component {
    render() {
      var getSize = this.props.getSize
        ? this.props.getSize
        : () => {
            return {};
          };
  
      var dashed = false; //this.props.dashed
      var border = null; //dashed ? null : "1px dashed grey"
  
      var alterSizes = getSize(
        this.props.id,
        this.props.rowIndex,
        this.props.rowIndex,
        this.props.cell
      );
  
      var props = _.assign(this.props, alterSizes);
  
      var padding = this.props.noborder ? 0 : 4;
  
      var outerBackgroundColor = this.props.outerBackgroundColor
        ? this.props.outerBackgroundColor
        : "#ffffff";
      var backgroundColor = this.props.backgroundColor
        ? this.props.backgroundColor
        : "#ffffff00";
      var width = this.props.headerHeight;
      var height = this.props.headerHeight;
      var innerHeigh = width - padding * 2;
      var innerWidth = height - padding * 2;
  
      return (
        <div
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
  
  export class CellRowHeader extends Component {
    state = {}
    emit = (action) => {

        if (this.props.onRowAction){
            this.props.onRowAction(action,this.props.rowNumber)
        }
      }
    render() {
      
      var getSize = this.props.getSize
        ? this.props.getSize
        : () => {
            return {};
          };
  
      var dashed = false; //this.props.dashed
      var border = null; //dashed ? null : "1px dashed grey"
  
      var alterSizes = getSize(
        this.props.id,
        this.props.rowIndex,
        this.props.rowIndex,
        this.props.cell
      );
  
      var props = _.assign(this.props, alterSizes);
  
      var padding = this.props.noborder ? 0 : 4;
  
      var outerBackgroundColor = this.props.outerBackgroundColor
        ? this.props.outerBackgroundColor
        : "#ffffff";
      var backgroundColor = this.props.backgroundColor
        ? this.props.backgroundColor
        : "#ffffff00";
      var width = this.props.headerHeight;
      var height = this.props.height+2;
      var innerHeigh = width - padding * 2;
      var innerWidth = height - padding * 2;
  
      return (
        <div
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
          onMouseOver={() => {
            if (this.timer) {
              clearTimeout(this.timer);
              this.timer = null;
            }
            this.setState({ mouseOver: true });
          }}
          onMouseOut={() => {
            if (!this.timer) {
              this.timer = setTimeout(() => {
                this.setState({ mouseOver: false });
              }, 50);
            }
          }}
        >
          {this.state.mouseOver && (
            <div style={{ display: "flex",flexDirection:"column" ,cursor:"pointer"}}>
                <div style={{ flexGrow: "1" }}><HeaderActionButton onClick={e=>{this.emit(EventType.RowMoveUp)}}  icon="ChevronUpMed" />  </div>
              <div style={{ flexGrow: "1" }}> <HeaderActionButton onClick={e=>{this.emit(EventType.RowInsertBefore,)}}  icon="Add" />  </div>
              <div style={{ flexGrow: "1" }}><HeaderActionButton onClick={e=>{this.emit(EventType.RowDelete)}}  icon="Delete" />  </div>
              <div style={{ flexGrow: "1" }}><HeaderActionButton onClick={e=>{this.emit(EventType.RowInsertAfter)}}  icon="Add" /> </div>
              <div style={{ flexGrow: "1" }}><HeaderActionButton onClick={e=>{this.emit(EventType.RowMoveDown)}}  icon="ChevronDownMed" /> </div>
            </div>
          )}
        </div>
      );
    }
  }
  
  export class CellColumnHeader extends Component {
      state = {}

      emit = (action) => {
          
        if (this.props.onColumnAction){
            this.props.onColumnAction(action,this.props.columnNumber)
        }
      }
    render() {
      var getSize = this.props.getSize
        ? this.props.getSize
        : () => {
            return {};
          };
  
      var dashed = false; //this.props.dashed
      var border = null; //dashed ? null : "1px dashed grey"
  
      var alterSizes = getSize(
        this.props.id,
        this.props.rowIndex,
        this.props.rowIndex,
        this.props.cell
      );
  
      var props = _.assign(this.props, alterSizes);
  
      var padding = this.props.noborder ? 0 : 4;
  
      var outerBackgroundColor = this.props.outerBackgroundColor
        ? this.props.outerBackgroundColor
        : "#ffffff";
      var backgroundColor = this.props.backgroundColor
        ? this.props.backgroundColor
        : "#ffffff00";
      var width = this.props.width+2;
      var height = this.props.headerHeight;
      var innerHeigh = width - padding * 2;
      var innerWidth = height - padding * 2;
  
      return (
        <div
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
          onMouseOver={() => {
            if (this.timer) {
              clearTimeout(this.timer);
              this.timer = null;
            }
            this.setState({ mouseOver: true });
          }}
          onMouseOut={() => {
            if (!this.timer) {
              this.timer = setTimeout(() => {
                this.setState({ mouseOver: false });
              }, 50);
            }
          }}
        >
          {this.state.mouseOver && (
            <div style={{ display: "flex" ,cursor:"pointer"}}>
                <div style={{ flexGrow: "1" }}><HeaderActionButton onClick={e=>{this.emit(EventType.ColumnMoveLeft)}} icon="ChevronLeftMed" />  </div>
              <div style={{ flexGrow: "1" }}> <HeaderActionButton onClick={e=>{this.emit(EventType.ColumnInsertBefore)}} icon="Add" />  </div>
              <div style={{ flexGrow: "1" }}><HeaderActionButton onClick={e=>{this.emit(EventType.ColumnDelete)}} icon="Delete" />  </div>
              <div style={{ flexGrow: "1" }}><HeaderActionButton onClick={e=>{this.emit(EventType.ColumnInsertAfter)}} icon="Add" /> </div>
              <div style={{ flexGrow: "1" }}><HeaderActionButton onClick={e=>{this.emit(EventType.ColumnMoveRight)}} icon="ChevronRightMed" /> </div>
            </div>
          )}
        </div>
      );
    }
  }