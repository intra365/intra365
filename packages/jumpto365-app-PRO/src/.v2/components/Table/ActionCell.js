import React, { Component } from "react";
import Cell from "./Cell";
import "./table.css";

import { Spring } from "react-spring/renderprops";

import { EventType } from "./EventType";
import { DefaultButton } from "office-ui-fabric-react";
export default class ActionCell extends Component {
  state = {};

  emit = action => {
    if (this.props.onAction) {
      this.props.onAction(action, this.props.id);
    }
  };

  timer = null;
  render() {
    var className = this.props.editMode ? "cellEditMode" : "cell";
    var cellSize = {...this.props.cellSize}
    cellSize.height +=2
    cellSize.width +=2
    return (
      <div
        onClick={() => {}}
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
        <Cell
          {...cellSize}
          className={className}
          onClick={e => {
            e.stopPropagation();
            this.emit(EventType.CellSelectType);
            //this.emit(EventType.CellEdit);
          }}
        >
          <div style={{ position: "relative" }}>
            <div style={{ position: "absolute" }}>
              {/* <div style={{ fontSize: 48, backgroundColor: "#bbbbbb" }}>
                {this.props.id} Actions
              </div>  */}
            </div>
            {this.state.mouseOver && (
              <Spring
                from={{ height: 0, opacity: 0.0 }}
                to={{
                  height: 40, //parseInt(this.props.cellSize.height / 2),
                  opacity: 1
                }}
              >
                {styles => (
                  <div
                    style={{
                      position: "absolute",
                      xbackgroundColor: "#eeeeee",
                      top: 0,
                      margin: "-8px",
                      width: this.props.cellSize.width,
                      opacity: styles.opacity,
                      height: styles.height
                    }}
                  >
                    <div style={{ margin: "8px" }}>
                      <div>
                        <DefaultButton
                          onClick={e => {
                            e.stopPropagation();

                            this.emit(EventType.CellSelectType);
                          }}
                        >
                          Edit
                        </DefaultButton>
                      </div>

                      <div>
                        <DefaultButton
                          onClick={e => {
                            e.stopPropagation();

                            this.emit(EventType.CellCopy);
                          }}
                        >
                          Copy
                        </DefaultButton>
                      </div>
                      {/* <div>
                        <DefaultButton
                          onClick={e => {
                            e.stopPropagation();

                            this.emit(EventType.CellCut);
                          }}
                        >
                          Cut
                        </DefaultButton>
                      </div> */}
                      <div>
                        <DefaultButton
                          onClick={e => {
                            e.stopPropagation();

                            this.emit(EventType.CellPaste);
                          }}
                        >
                          Paste
                        </DefaultButton>
                      </div>
                      <div>
                        <DefaultButton
                          onClick={e => {
                            e.stopPropagation();

                            this.emit(EventType.CellClear);
                          }}
                        >
                          Clear
                        </DefaultButton>
                      </div>
                      <div>
                        <DefaultButton
                          onClick={e => {
                            e.stopPropagation();

                            this.emit(EventType.CellChangeType);
                          }}
                        >
                          Type
                        </DefaultButton>
                      </div>
                    </div>
                  </div>
                )}
              </Spring>
            )}
          </div>
        </Cell>
      </div>
    );
  }
}
