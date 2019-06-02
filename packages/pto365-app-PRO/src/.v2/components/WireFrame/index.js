import React, { Component } from "react";
import "./wireframe.css";
export default class WireFrame extends Component {
  get $title() {
    return this.props.title;
  }
  get $height() {
    return this.props.height;
  }
  get $width() {
    return this.props.width;
  }
  render() {
    return (
        <div style={{
          
          ...this.props.style,
          
          position:"relative",height:this.$height,width:this.$width}}>
      <div
        className="wireframe"
        style={{
          position: "absolute",
          top: 0,
          left: 0,

          minHeight: this.$height,
          minWidth: this.$width,

        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            textAlign: "center",
            lineHeight: this.$height,
            width: this.$width
          }}
        >
          {this.$title}
        </div>
      </div></div>
    );
  }
}
