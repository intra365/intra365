import React, { Component } from "react";
import "./grid.css";
import columnSelector from "./columnSelector.svg"
export default class RenderGrid extends Component {
  
  render() {

    
    var grid = this.props.grid ? this.props.grid : [[]];
    var renderCell = this.props.renderCell
      ? this.props.renderCell
      : () => {
          return null;
        };
    var renderColumnHeader = this.props.renderColumnHeader
      ? this.props.renderColumnHeader
      : () => {
          return null;
        };

    var renderRowHeader = this.props.renderRowHeader
      ? this.props.renderRowHeader
      : () => {
          return null;
        };

    var editMode = this.props.editMode;
    if (this.props.reportSize){
      this.props.reportSize(0,0,0,0,true)
    }
    var body = (
      <div>
        {grid.map((row, rowIndex) => {
          
          return (
            <div style={{ display: "flex" }}>
              {editMode &&
                rowIndex === 0 &&
                row.map((cell, columnIndex) => {
                  
                  return (
                    <div>
                      <div key={columnIndex}>
                        {renderColumnHeader(cell.id)}
                      </div>
                    </div>
                  );
                })}
                
              {
                
                row.map((cell, columnIndex) => {
                
                return (
                  <div key={columnIndex} style={{ display: "flex" }}>
                    
                    {renderCell(cell ? cell.id : {}, rowIndex, columnIndex, cell,(height,width)=>{
                      if (this.props.reportSize){
                        this.props.reportSize(rowIndex,columnIndex,height,width)
                      }
                      },this.props.gridClasses ? this.props.gridClasses[cell ? cell.id:0] : null,
                      this.props.onConnectorClick)}
                    {" "}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    )
   
    return body
  }
}
