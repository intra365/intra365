import React, { Component } from "react";
import ArticleExplorer from "../components/ArticleExplorer";
import {
  TextField,
  DefaultButton,
  PrimaryButton,
  ProgressIndicator,
  IconNames
} from "office-ui-fabric-react";
import { Toggle } from "office-ui-fabric-react/lib/Toggle";
import AppIconGeneric from "../components/AppIconGeneric";
import {
  DatePicker,
  DayOfWeek,
  IDatePickerStrings
} from "office-ui-fabric-react/lib/DatePicker";
import { ColorPicker } from "office-ui-fabric-react/lib/ColorPicker";
import { Pivot, PivotItem } from "office-ui-fabric-react/lib/Pivot";
import ReactJson from "react-json-view";
import "./editor.css";
import _ from "lodash";
import ScenarioList from "../components/ScenarioList";
import IconExplorer from "../components/IconExplorer";

import { EditorDialog } from "./core";
import ToolPage from "../components/_Pages/Tool";
import ImagePicker from "../pickers/ImagePicker";
import Editor from "../components/Editor";
import GetArticle from "../components/Page/GetArticle";
const Jumpto365API = require("../services/Jumpto365API");

var firstDayOfWeek = DayOfWeek.Monday;
const DayPickerStrings = {
  months: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ],

  shortMonths: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ],

  days: [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ],

  shortDays: ["S", "M", "T", "W", "T", "F", "S"],

  goToToday: "Go to today",
  prevMonthAriaLabel: "Go to previous month",
  nextMonthAriaLabel: "Go to next month",
  prevYearAriaLabel: "Go to previous year",
  nextYearAriaLabel: "Go to next year",
  closeButtonAriaLabel: "Close date picker"
};
export class TileProperties extends Component {
  constructor(props) {
    super(props);
    this.state = {
      key: "",
      color: "#ffffff",
      selectedTab: this.props.selectedTab
    };
  }

  _init = () => {
    var p =
      this.props.celldata && this.props.celldata.centerData
        ? this.props.celldata.centerData
        : {};

    if (this.props.value) {
      p = this.props.value;
    }

    this.setState({
      isImplemented:
        p.isImplemented !== null || p.isImplemented !== undefined
          ? p.isImplemented
          : true,
      implementationDate: p.implementationDate ? p.implementationDate : null,
      size: 128,
      isLicenseCheckSuppressed: p.isLicenseCheckSuppressed,
      isHashed: p.isHashed,
      contentRef: p.contentRef,
      key: p.key,
      title: p.title,
      textcolor: p.textcolor ? p.textcolor : "#ffffff",
      color: p.color ? p.color : "#377AB9",
      icon: p.icon,
      isPremium: p.isPremium,
      isFullyShareable: p.isFullyShareable,
      isPartlyShareable: p.isPartlyShareable,
      inShort: p.inShort,
      options: null,
      jumpto: p.jumpto,
      subTitle: p.subTitle,
      gridState: null,
      state: "",
      area: null,
      contentEdited:false
    });

    if (!this.state.imagesLoaded) {
      Jumpto365API.itemTables("images").then(images => {
        this.setState({ imagesLoaded: true, images });
      });
    }
  };

  _loadImage = id => {
    Jumpto365API.itemTables("images", id).then(image => {
      if (image.length === 1) {
        var imageData = JSON.parse(image[0].Json);

        this.setState({ imageData, icon: imageData.json });
        if (this.props.onChange) this.props.onChange({ icon: imageData.json });
      }
    });
  };
  componentDidMount = () => {
    this._init();
   
  };
  componentDidUpdate = (previousProps, previousState) => {
    if (previousProps !== this.props) {
      this._init();
    }
  };
  render() {
    var context = this.props.context;
    var domain = context.me.upn;
    return (
      <div
        style={{
          minHeight: "540px",
          maxHeight: "540px",
          minWidth: "800px",
          maxWidth: "800px",
          xoverflow: "hidden"
        }}
      >
        {/* <ReactJson collapsed="0" src={this.state} />  */}
        <div style={{ display: "flex", padding: "16px", alignItems: "strech" }}>
          <div>
            <div style={{ marginTop: "16px", marginRight: "16px" }}>
              <AppIconGeneric
                editMode={false}
                size={160}
                name={this.state.key}
                isHashed={this.state.isHashed}
                isLicenseCheckSuppressed={this.state.isLicenseCheckSuppressed}
                title={this.state.title}
                textcolor={
                  this.state.textcolor ? this.state.textcolor : "#ffffff"
                }
                backgroundColor={this.state.color}
                iconUrl={this.state.icon}
                isPremium={this.state.isPremium}
                isFullyShareable={this.state.isFullyShareable}
                isPartlyShareable={this.state.isPartlyShareable}
                description={this.state.inShort}
                options={null}
                jumpto={this.state.jumpto}
                subTitle={this.state.subTitle}
                gridState={null}
                state={""}
                area={null}
              />
            </div>
          </div>

          <div style={{ width: "620px" }}>
            {this.state.upload && (
              <ImagePicker
                onDismiss={() => {
                  this.setState({ upload: false });
                }}
                onSelect={icon => {
                  if (this.props.onChange) this.props.onChange({ icon });
                  this.setState({ icon, upload: false, hasChanged: true });
                }}
              />
            )}
            <Pivot
              onLinkClick={(item, y, z) => {
                this.setState({ selectedTab: item.props.itemKey });
                return true;
              }}
              className="pivotItemEditor"
              selectedKey={this.state.selectedTab}
            >
              <PivotItem headerText="Details" className="pivotItemEditor">
                <div style={{ padding: "16px" }}>
                  <TextField
                    label="Title"
                    placeholder="Short, descriptive title"
                    value={this.state.title}
                    ariaLabel="Title"
                    onChange={(e, v) => {
                      this.setState({ title: v });

                      if (this.props.onChange)
                        this.props.onChange({ title: v });
                    }}
                  />

                  <TextField
                    label="Subtitle"
                    placeholder="Short qualifier, useful for indicating App is in preview or retiring soon"
                    value={this.state.subTitle}
                    ariaLabel="Sub Title"
                    onChange={(e, v) => {
                      this.setState({ subTitle: v });
                      if (this.props.onChange)
                        this.props.onChange({ subTitle: v });
                    }}
                  />
                  <TextField
                    label="Description"
                    placeholder="Short explanation about the App"
                    value={this.state.inShort}
                    ariaLabel="In short"
                    multiline
                    rows={3}
                    onChange={(e, v) => {
                      this.setState({ inShort: v });
                      if (this.props.onChange)
                        this.props.onChange({ inShort: v });
                    }}
                  />

                  <TextField
                    label="Link"
                    placeholder="URL that opens when the launch icon is clicked"
                    value={this.state.jumpto}
                    ariaLabel="External link"
                    onChange={(e, v) => {
                      this.setState({ jumpto: v });
                      if (this.props.onChange)
                        this.props.onChange({ jumpto: v });
                    }}
                  />
                  {this.state.jumpto && (
                    <a href={this.state.jumpto} target="_blank">
                      Test
                    </a>
                  )}
                  <TextField
                    label="Tag"
                    placeholder="Text that goes into the URL of the associated App Article"
                    value={this.state.key}
                    ariaLabel="Key"
                    onChange={(e, v) => {
                      this.setState({ key: v });
                      if (this.props.onChange) this.props.onChange({ key: v });
                    }}
                  />
                  {/* <TextField
                  label="Mouseover text"
                    placeholder="Additional descriptive spot for when a mouse hovers over the App Tile"
                    value={this.state.mouseOver}
                    ariaLabel="Mouse over"
                    multiline
                    rows={5}
                    onChange={(e, v) => {
                      this.setState({ mouseOver: v });
                      if (this.props.onChange)
                        this.props.onChange({ mouseOver: v });
                    }}
                  /> */}
                  <div style={{ display: "flex" }}>
                    <div />
                    <div />
                    <div />
                    <div />
                  </div>
                </div>
              </PivotItem>
              <PivotItem
                headerText="Icon"
                className="pivotItemEditor"
                itemKey="Icon"
              >
                <div>
                  <div
                    style={{
                      padding: "4px",
                      paddingLeft: "8px",
                      display: "flex"
                    }}
                  >
                    <div style={{ flexGrow: "1" }}>
                      <TextField
                        placeholder="Select from our list, upload your own or paste in any address"
                        value={this.state.icon}
                        ariaLabel="Icon"
                        onChange={(e, v) => {
                          this.setState({ icon: v });
                          if (this.props.onChange)
                            this.props.onChange({ icon: v });
                        }}
                      />
                    </div>
                    <div>
                      <DefaultButton
                        onClick={() => {
                          this.setState({ upload: true });
                        }}
                        text="Upload"
                      />
                    </div>
                  </div>
                  <div className="pivotContent">
                    <IconExplorer
                      supressBackgroundTester
                      onClick={icon => {
                        this.setState({ icon });
                        if (this.props.onChange) this.props.onChange({ icon });
                      }}
                    />
                  </div>
                </div>
              </PivotItem>

              <PivotItem headerText="Color" itemKey="Color">
                <div style={{ display: "flex" }}>
                  <div>
                    <div style={{ marginLeft: "16px" }}>Background</div>
                    <ColorPicker
                      color={this.state.color}
                      onColorChanged={color => {
                        this.setState({ color });
                        if (this.props.onChange) this.props.onChange({ color });
                      }}
                    />
                  </div>
                  <div>
                    <div style={{ marginLeft: "16px" }}>Text</div>
                    <ColorPicker
                      color={this.state.textcolor}
                      onColorChanged={textcolor => {
                        this.setState({ textcolor });
                        if (this.props.onChange)
                          this.props.onChange({ textcolor });
                      }}
                    />
                  </div>
                </div>
              </PivotItem>

              <PivotItem
                headerText="Article"
                className="pivotItemEditor"
                itemKey="Article"
              >
                <div
                  // style={{
                  //   display: "flex",
                  //   padding: "16px",
                  //   borderBottom: "1px solid #cccccc",
                  //   marginBottom: "8px"
                  // }}
                >
                  {/* <div style={{ flexGrow: 1 }}>
                    <TextField
                      placeholder="Article reference"
                      value={this.state.contentRef}
                      ariaLabel="Article reference"
                      onChange={(e, v) => {
                        this.setState({ contentRef: v });
                        if (this.props.onChange)
                          this.props.onChange({ contentRef: v });
                      }}
                    />
                  </div> */}
                  {/* <div style={{width:"120px"}}>
                    <DefaultButton text="Upload Document" onClick={()=>{this.setState({pickArticle:true})}}/>
                  </div>  */}
                </div>
                <div className="pivotContent" style={{ padding: "16px" }}>
                  {this.state.selectedTab && (
                    <GetArticle
                      height="300px"
                      registerEditor={editorReference => {
                        
                        if (this.props.registerEditorReference){
                          this.props.registerEditorReference(editorReference)
                         
                        }
                      
                      }}
                      onChange={(delta, oldDelta, source) => {
                        if (this.props.onChange)
                          this.props.onChange({ contentEdited: true });
                      }}
                      editable={true}
                      associateTileWithUrl={(x, y, contentRef) => {
                        return new Promise((resolve, reject) => {
                          this.setState({ contentRef });
                          if (this.props.onChange) {
                            this.props.onChange({ contentRef });
                          }
                          resolve();
                        });
                      }}
                      domain={domain}
                      contentRef={this.state.contentRef}
                    />
                  )}
                </div>
              </PivotItem>
              <PivotItem headerText="Status" itemKey="Status">
                <div style={{ padding: "16px" }}>
                  <div>
                    <Toggle
                      checked={this.state.isHashed}
                      label="Hashed"
                      onText="Yes"
                      offText="On"
                      onFocus={() => console.log("onFocus called")}
                      onBlur={() => console.log("onBlur called")}
                      onChange={(e, on) => {
                        this.setState({ isHashed: on });
                        if (this.props.onChange)
                          this.props.onChange({ isHashed: on });
                      }}
                    />
                  </div>
                  <div>
                    {/* <Toggle
  checked={this.state.isLicenseCheckSuppressed}
  label="Suppress license check"
  onText="Yes"
  offText="On"
  onFocus={() => console.log('onFocus called')}
  onBlur={() => console.log('onBlur called')}
  onChange={(e,on)=>{
    this.setState({isLicenseCheckSuppressed:on})
    if (this.props.onChange) this.props.onChange({isLicenseCheckSuppressed:on})
  }}
/> */}
                  </div>
                  {/* <div>
         
            
                 <Toggle
          checked={this.state.isImplemented}
          label="Implemented"
          onText="Yes"
          offText="No"
          onFocus={() => console.log('onFocus called')}
          onBlur={() => console.log('onBlur called')}
          onChange={(e,on)=>{
            this.setState({isImplemented:on})
            if (this.props.onChange) this.props.onChange({isImplemented:on})
          }}
        />
            </div>
            {!this.state.isImplemented &&
            <div>
            <DatePicker
            label="Select expected implementation date"
            value={this.state.implementationDate}
          firstDayOfWeek={firstDayOfWeek}
          strings={DayPickerStrings}
          placeholder="Select a date..."
          ariaLabel="Select a date"
          onSelectDate={(v)=>{
              debugger
            this.setState({implementationDate:v})
            if (this.props.onChange) this.props.onChange({implementationDate:v})
          }}
          // tslint:disable:jsx-no-lambda
          onAfterMenuDismiss={() => console.log('onAfterMenuDismiss called')}
          // tslint:enable:jsx-no-lambda
        />
            </div>} */}
                </div>
              </PivotItem>

              <PivotItem
                headerText="Features"
                className="pivotItemEditor"
                itemKey="Features"
              >
                <div style={{ padding: "16px" }}>
                  <div>
                    <Toggle
                      checked={this.state.isFullyShareable}
                      label="Fully shareable"
                      onText="On"
                      offText="Off"
                      onChange={(e, on) => {
                        this.setState({ isFullyShareable: on });
                        if (this.props.onChange)
                          this.props.onChange({ isFullyShareable: on });
                      }}
                    />
                  </div>
                  <div>
                    <Toggle
                      checked={this.state.isPartlyShareable}
                      label="Partly shareable"
                      onText="On"
                      offText="Off"
                      onChange={(e, on) => {
                        this.setState({ isPartlyShareable: on });
                        if (this.props.onChange)
                          this.props.onChange({ isPartlyShareable: on });
                      }}
                    />
                  </div>
                  <div>
                    <Toggle
                      checked={this.state.isPremium}
                      label="Premium"
                      onText="On"
                      offText="Off"
                      onChange={(e, on) => {
                        this.setState({ isPremium: on });
                        if (this.props.onChange)
                          this.props.onChange({ isPremium: on });
                      }}
                    />
                  </div>
                </div>
              </PivotItem>
              {/* 
              <PivotItem headerText="Tile sizes">
                <div className="pivotContentTile">
                  xx-small
                  <AppIconGeneric
                    editMode={false}
                    size={24}
                    isHashed={this.state.isHashed}
                    name={this.state.key}
                    title={this.state.title}
                    isLicenseCheckSuppressed={
                      this.state.isLicenseCheckSuppressed
                    }
                    textcolor={this.state.textcolor}
                    backgroundColor={this.state.color}
                    iconUrl={this.state.icon}
                    isPremium={this.state.isPremium}
                    isFullyShareable={this.state.isFullyShareable}
                    isPartlyShareable={this.state.isPartlyShareable}
                    description={this.state.inShort}
                    options={null}
                    jumpto={this.state.jumpto}
                    subTitle={this.state.subTitle}
                    gridState={null}
                    state={""}
                    area={null}
                  />
                </div>
                <div>
                  x-small
                  <AppIconGeneric
                    editMode={false}
                    size={28}
                    isHashed={this.state.isHashed}
                    isLicenseCheckSuppressed={
                      this.state.isLicenseCheckSuppressed
                    }
                    name={this.state.key}
                    title={this.state.title}
                    textcolor={this.state.textcolor}
                    backgroundColor={this.state.color}
                    iconUrl={this.state.icon}
                    isPremium={this.state.isPremium}
                    isFullyShareable={this.state.isFullyShareable}
                    isPartlyShareable={this.state.isPartlyShareable}
                    description={this.state.inShort}
                    options={null}
                    jumpto={this.state.jumpto}
                    subTitle={this.state.subTitle}
                    gridState={null}
                    state={""}
                    area={null}
                  />
                </div>
                <div>
                  small
                  <AppIconGeneric
                    editMode={false}
                    size={40}
                    name={this.state.key}
                    isHashed={this.state.isHashed}
                    isLicenseCheckSuppressed={
                      this.state.isLicenseCheckSuppressed
                    }
                    title={this.state.title}
                    textcolor={this.state.textcolor}
                    backgroundColor={this.state.color}
                    iconUrl={this.state.icon}
                    isPremium={this.state.isPremium}
                    isFullyShareable={this.state.isFullyShareable}
                    isPartlyShareable={this.state.isPartlyShareable}
                    description={this.state.inShort}
                    options={null}
                    jumpto={this.state.jumpto}
                    subTitle={this.state.subTitle}
                    gridState={null}
                    state={""}
                    area={null}
                  />
                </div>
                <div>
                  medium
                  <AppIconGeneric
                    editMode={false}
                    size={56}
                    name={this.state.key}
                    isHashed={this.state.isHashed}
                    isLicenseCheckSuppressed={
                      this.state.isLicenseCheckSuppressed
                    }
                    title={this.state.title}
                    textcolor={this.state.textcolor}
                    backgroundColor={this.state.color}
                    iconUrl={this.state.icon}
                    isPremium={this.state.isPremium}
                    isFullyShareable={this.state.isFullyShareable}
                    isPartlyShareable={this.state.isPartlyShareable}
                    description={this.state.inShort}
                    options={null}
                    jumpto={this.state.jumpto}
                    subTitle={this.state.subTitle}
                    gridState={null}
                    state={""}
                    area={null}
                  />
                </div>
                <div>
                  large
                  <AppIconGeneric
                    editMode={false}
                    size={100}
                    name={this.state.key}
                    isHashed={this.state.isHashed}
                    isLicenseCheckSuppressed={
                      this.state.isLicenseCheckSuppressed
                    }
                    title={this.state.title}
                    textcolor={this.state.textcolor}
                    backgroundColor={this.state.color}
                    iconUrl={this.state.icon}
                    isPremium={this.state.isPremium}
                    isFullyShareable={this.state.isFullyShareable}
                    isPartlyShareable={this.state.isPartlyShareable}
                    description={this.state.inShort}
                    options={null}
                    jumpto={this.state.jumpto}
                    subTitle={this.state.subTitle}
                    gridState={null}
                    state={""}
                    area={null}
                  />
                </div>
                <div>
                  x-large
                  <AppIconGeneric
                    editMode={false}
                    size={160}
                    isHashed={this.state.isHashed}
                    isLicenseCheckSuppressed={
                      this.state.isLicenseCheckSuppressed
                    }
                    name={this.state.key}
                    title={this.state.title}
                    textcolor={this.state.textcolor}
                    backgroundColor={this.state.color}
                    iconUrl={this.state.icon}
                    isPremium={this.state.isPremium}
                    isFullyShareable={this.state.isFullyShareable}
                    isPartlyShareable={this.state.isPartlyShareable}
                    description={this.state.inShort}
                    options={null}
                    jumpto={this.state.jumpto}
                    subTitle={this.state.subTitle}
                    gridState={null}
                    state={""}
                    area={null}
                  />
                </div>
                <div>
                  xx-large
                  <AppIconGeneric
                    editMode={false}
                    size={320}
                    isHashed={this.state.isHashed}
                    isLicenseCheckSuppressed={
                      this.state.isLicenseCheckSuppressed
                    }
                    name={this.state.key}
                    title={this.state.title}
                    textcolor={this.state.textcolor}
                    backgroundColor={this.state.color}
                    iconUrl={this.state.icon}
                    isPremium={this.state.isPremium}
                    isFullyShareable={this.state.isFullyShareable}
                    isPartlyShareable={this.state.isPartlyShareable}
                    description={this.state.inShort}
                    options={null}
                    jumpto={this.state.jumpto}
                    subTitle={this.state.subTitle}
                    gridState={null}
                    state={""}
                    area={null}
                  />
                </div>
              </PivotItem> */}
              {/* <PivotItem headerText="For support">
                <div style={{ overflow: "auto" }}>
                  <p>
                    If you have issues with the look and feel of your tile, and
                    your think it is a bug, please do the following:
                  </p>
                  <ul>
                    <li>
                      Copy the follow data by moving your mouse of the "root"
                      then click the "copy clipboard" icon.
                    </li>
                    <li>
                      Click the help icon in the lower right side, create and
                      request for us explaining your issue and paste what you
                      previously copied.
                    </li>
                  </ul>
                  <ReactJson collapsed="0" src={this.state} />
                </div>
              </PivotItem> */}
            </Pivot>
          </div>
        </div>
      </div>
    );
  }
}

export class TileEditor extends Component {
  state = {};
  _init = () => {
    var original = JSON.parse(
      JSON.stringify(this.props.celldata ? this.props.celldata : {})
    );
    this.setState({
      celldata: this.props.celldata,
      original,
      value: this.props.value
    });
  };

  componentDidMount = () => {
    this._init();
  };
  componentDidUpdate = (previousProps, previousState) => {
    if (previousProps !== this.props) {
      this._init();
    }
  };
  registerEditor = (editorReference) => {
    
        this.setState({editorReference})
    
    }
  render() {
    var blankRecord = {
      key: null,
      textcolor: "#ffffff",
      title: "",
      color: "#377AB9",
      icon: null,
      inShort: "",
      isFullyShareable: "",
      isPartlyShareable: "",
      isPremium: "",
      jumpto: null,
      subtitle: "",
      contentRef: ""
    };
    if (
      this.props.value ||
      (this.props.tileState && this.props.tileState.editorClicked)
    ) {
      return (
        <EditorDialog
          title={"Tile Builder "}
          onSelect={() => {
            if (this.props.value) {
              
              if (this.state.editorReference && this.state.value.contentEdited && this.props.onSelected){
              
                var promise = this.state.editorReference.save()
                
                promise.then(url=>{
                  
                  var value = this.state.value
                  value.contentRef = url
                  this.props.onSelected(value);
                })
                .catch(error=>{
                  alert(error)
                })
              }
              else
              {
              if (this.props.onSelected) {
                this.props.onSelected(this.state.value);
              }
            }
              return;
            }
            if (this.props.tileState && this.props.tileState.editorClicked)
              this.props.tileState.editorClicked = false;
            if (this.props.updateCell) {
              this.props.updateCell(
                "contentRef",
                this.state.celldata.centerData
              );
            }
          }}
          onDismiss={() => {
            if (this.props.value) {
              if (this.props.onDismiss) {
                this.props.onDismiss();
              }
              return;
            }
            if (this.state.original && this.props.updateCell) {
              this.props.updateCell(
                "contentRef",
                this.state.original.centerData
              );
            }
            if (this.props.tileState && this.props.tileState.editorClicked)
              this.props.tileState.editorClicked = false;
          }}
          // onClear={() => {
          //   var celldata = this.state.celldata;
          //   celldata.centerData = blankRecord;
          //   this.setState({ celldata });
          // }}
          buttonSelectText="Update"
          canSelect={this.state.canSelect}
          isSelect
        >
          <TileProperties
          x="1"
            selectedTab={this.props.selectedTab}
            celldata={this.state.celldata} // version 1
            value={this.state.value} // version 2
            context={this.props.context}
            registerEditorReference={this.registerEditor}
            onChange={properties => {
              if (this.state.value) {
                var celldata = this.state.value;
                _.keysIn(properties).map(key => {
                  celldata[key] = properties[key];
                });
                this.setState({ value: celldata, canSelect: true });
              } else {
                var celldata = this.state.celldata;
                if (!celldata.centerData) celldata.centerData = blankRecord;

                _.keysIn(properties).map(key => {
                  celldata.centerData[key] = properties[key];
                });
                this.setState({ celldata, canSelect: true });
              }
            }}
          />
          {/* {this.state.celldata && this.state.celldata.centerData &&
                            <ReactJson collapsed="0" src={this.state.celldata.centerData} />} */}
        </EditorDialog>
      );
    } else return null;
  }
}
