import React, { Component } from "react";
import { Image } from "office-ui-fabric-react";

export default class ToolbarHeader extends Component {
  render() {
    var url = this.props.imageUrl ? this.props.imageUrl : "https://jumpto365.com/resources/images/app/Title-EN.png"
    return (
      <div>
        <div className="HeaderContainer">
          <div>
            <img
              className="HeaderImage"
              src={url}
            />
          </div>
        </div>
        <div />
      </div>
    );
  }
}
