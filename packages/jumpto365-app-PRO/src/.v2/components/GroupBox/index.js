import React, { Component } from "react";
import PropTypes from "prop-types";
import "./groupbox.css";
import { Provider, Subscribe } from "react-contextual";
/**
 * Describe overall purpose of the component
 *
 * @export
 * @class GroupBox
 * @extends {Component}
 */
export default class GroupBox extends Component {
  state = {};

  static propTypes = {
    text: PropTypes.string,
    fontsize: PropTypes.string,
    height: PropTypes.string,
    width: PropTypes.string,
    color: PropTypes.string,
    textColor: PropTypes.string,
    rotation: PropTypes.string //supported - 0,90,180,270
  };

  constructor(props) {
    super(props);
  }

  /**
   * Required method return the output of the component
   *
   * @returns%
   * @memberof GroupBox
   */
  render() {
    var height = this.props.height;
    var width = this.props.width;
    var className = "gb0";
    var marginLeft = 0;
    var marginTop = 0;

    var onGroupClicked =
      this.props.editMode && this.props.editor
        ? this.props.editor.onGroupClicked
        : null;
var pencilTop = ""
    switch (this.props.rotation ? this.props.rotation.toUpperCase() : "") {
      case "90":
      pencilTop = `3px`
      height = this.props.width;
        width = this.props.height;
        className = "gb90";
        marginLeft = width;
        break;
      case "180":
        className = "gb180";

        break;
      case "270":
        height = this.props.width;
        width = this.props.height;
        className = "gb270";
        marginTop = height;
        pencilTop = `-${height}px`
        break;

      default:
        // "0"
        break;
    }
    var that = this;
    var hideBox = this.props.row === 0 && this.props.column === 3;
    var editMode = this.props.editMode ? (hideBox ? false : true) : false;
   
    return (
      <Subscribe>
        {context => (
          <div
            style={{
              position: "relative",
              border: "0px dashed red",
              width,
              height
            }}
            onClick={() => {
              if (onGroupClicked) onGroupClicked(context, this);
            }}
          >
            <div
              className={className}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginLeft: marginLeft,
                marginTop,
                border: editMode ? "1px dashed #aaaaaa" : null,
                padding: editMode ? "0px" : "1px",
                fontSize: this.props.fontsize,
                lineHeight: this.props.lineheight,
                backgroundColor: this.props.color,
                color: this.props.textColor ? this.props.textColor : "#000000",
                height: this.props.height,
                width: this.props.width,
                cursor: editMode ? "pointer " : "default"
              }}
            >
              <div className="gbText">
                {this.props.children ? this.props.children : this.props.text}
              </div>
              {editMode &&
                this.state.showProperties &&
                this.state.editorClicked &&
                context.editor.groupProperties({ ...this.props }, () => {
                  this.setState({ showProperties: false });
                })}
            </div>
            {context && editMode && this.state.editorClicked && context.editor && (
              <div
                onClick={(e, c) => {
                  e.stopPropagation();

                  that.setState({ showProperties: !that.state.showProperties });
                }}
                style={{
                  top: pencilTop,
                  left: "3px",
                  position: "absolute",
                  cursor: "pointer"
                }}
                className="groupboxeditor"
              >
                <i
                  class={
                    this.state.showProperties
                      ? "ms-Icon ms-Icon--EditSolid12"
                      : "ms-Icon ms-Icon--Edit"
                  }
                  aria-hidden="true"
                />
              </div>
            )}
          </div>
        )}
      </Subscribe>
    );
  }
}
