import React, { Component } from "react";
import "./celltype.css";
import imgCellFull from "./images/App Tile.png";
import imgCellTop from "./images/Top Group.png";
import imgCellBottom from "./images/Bottom Group.png";
import imgCellLeft from "./images/Left Group.png";
import imgCellRight from "./images/Right Group.png";
import imgCellTitle from "./images/Title.png";
import imgCellTileSpaecer from "./images/Tile Spacer.png";
import imgVerticalSpacer from "./images/Vertical Spacer.png"
import imgHorizontalSpacer from "./images/Horizontal Spacer.png"
import imgCellNone from "./images/None.png";
import { navigate } from "@reach/router";
import {
  Dialog,
  DialogType,
  DialogFooter
} from "office-ui-fabric-react/lib/Dialog";
import { TextField, Toggle, ChoiceGroup } from "office-ui-fabric-react";
import {
  PrimaryButton,
  DefaultButton,
  IconButton
} from "office-ui-fabric-react/lib/Button";

//import imgCellFiller from "./images/filler.png"

export var CellType = {

  Full : "full",
  Left : "left",
  Right : "right",
  Top : "top",
  Bottom : "bottom",
  SpacerHorisontal : "horisontal",
  SpacerVertical:"vertical",
  SpacerFull:"spacer",
  SpacerCorner:"corner",
  Title:"title",
  None:"none",
  
}

Object.freeze(CellType)
export default class CellTypeSelector extends Component {
  state = {};
  _load(){
    this.setState({tag:this.props.value})
  }
  componentDidMount(){
    
    
    this._load()
  }

  componentDidUpdate(oldProps,oldState){
      if (oldProps.cellType !== this.props.cellType){
        this._load()
      }
  }
  dismiss = () => {
    if (this.props.onDismiss) this.props.onDismiss();
  };
  render() {
    var choices = [
      { tag: CellType.Full, img: imgCellFull, text: "App Tile" },
      { tag: CellType.Left, img: imgCellLeft, text: "Left Group" },
      { tag: CellType.Right, img: imgCellRight, text: "Right Group" },
      { tag: CellType.Top, img: imgCellTop, text: "Top Group" },
      { tag: CellType.Bottom, img: imgCellBottom, text: "Bottom Group" },
      { tag: CellType.SpacerFull, img: imgCellTileSpaecer, text: "Tile Spacer" },
      { tag: CellType.SpacerVertical, img: imgVerticalSpacer, text: "Vertical Spacer" },
      { tag: CellType.SpacerHorisontal, img: imgHorizontalSpacer, text: "Horizontal Spacer" },
     // { tag: CellType.SpacerCorner, img: imgCellTop, text: "Corner Spacer" },
      { tag: CellType.Title, img: imgCellTitle, text: "Title" },
      { tag: CellType.None, img: imgCellNone, text: "None" }
    ];
    return (
      <div>
        <Dialog
        minWidth="500px"
          hidden={false}
          onDismiss={this.dismiss}
          dialogContentProps={{
            type: DialogType.normal,
            title: "Select tile type"
          }}
          modalProps={{
            isBlocking: true,
            containerClassName: "ms-dialogMainOverride"
          }}
        >
          <ChoiceGroup
            xlabel="Pick tile type"
            selectedKey={this.state.tag}
            onChange={(e, choice) => {
              this.setState({ tag: choice.key });
            }}
            options={choices.map((choice, index) => {
              return {
                key: choice.tag,
                imageSrc: choice.img,
                imageAlt: choice.tag,
                selectedImageSrc: choice.img,
                imageSize: { width: 32, height: 32 },
                text: choice.text
              };
            })}
          />
          <DialogFooter>
            <PrimaryButton
              disabled={!this.state.tag}
              onClick={() => {
                if (!this.props.onSelected) return;
                
                this.props.onSelected(this.state.tag);
              }}
              text="Select"
            />
            <DefaultButton onClick={this.dismiss} text="Cancel" />
          </DialogFooter>
        </Dialog>
      </div>
    );
  }
}
