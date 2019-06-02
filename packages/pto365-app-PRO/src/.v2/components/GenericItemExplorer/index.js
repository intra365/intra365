import React, { Component } from "react";
import PropTypes from "prop-types";
import PageLayoutMain from "../_Layouts/PageLayoutMain";
import PageHeader from "../PageHeader";
import ScenarioList from "../ScenarioList";
import PageBody from "../PageBody";
import Jumpto365Service from "../../services";
import {LINK} from "../../components/_Contexts/Jumpto365App"
import { Link, navigate } from "@reach/router"
import "./panel.css"
import { Shimlist } from "../Shims";
import { CommandBar } from 'office-ui-fabric-react/lib/CommandBar';
import {
  DetailsList,
  DetailsListLayoutMode,
  Selection
} from "office-ui-fabric-react/lib/DetailsList";

import {
  Dropdown,
  DropdownMenuItemType
} from "office-ui-fabric-react/lib/Dropdown";

import $ from "jquery";
import AppGroup from "../AppGroup";

import Views from "../_Views";
import "./panel.css";
import ReactJson from "react-json-view";
import PeriodicTable from "../PeriodicTable";
import Loadable from 'react-loadable';

function Loading(props) {
  if (props.error) {
      //debugger
    return <div>Error: {props.error.message}<button onClick={ props.retry }>Retry</button></div>;
  } else if (props.pastDelay) {
    return <div>Loading....</div>;
  } else {
    return null;
  }
}

let ContextPage = Loadable({loader:()=>import( '../_Pages/Context'),loading: Loading,timeout:10000,delay:300})
const Jumpto365API = require("../../services/Jumpto365API");
var mapEvents = [];

export default class GenericItemExplorer extends Component {
  static propTypes = {
    UPN: PropTypes.string,
    onSelect: PropTypes.func
  };

  state = { loaded: false, tableNames: [] };

  jumpto365Service = null;
  _readTool = (key, language, contentRef) => {
    var that = this;

    this.jumpto365Service
      .getToolDocument(key, language, contentRef)
      .then(document => {
        that.setState({
          document,
          // subject: scenario.subject,
          body: document.body,
          color: document.properties.color
            ? document.properties.color
            : this.state.color != null
            ? this.state.color
            : "#666666",
          icon: document.properties.icon
            ? document.properties.icon
            : this.state.icon,
          inshort: document.properties.inshort,
          byline: document.properties.byline, // ? document.properties.byline : "Matt Wade (@thatmattwade)",
          imageurl: document.properties.imageurl, //? document.properties.imageurl : "https://placeimg.com/800/240/any",
          imagecopyright: document.properties.imagecopyright
            ? document.properties.imagecopyright
            : "All rights reserved to the copyright owner",
          previewer: document.properties.previewer,
          ready: true
        });
      })
      .catch(error => {
        that.setState({
          noitem: true,
          jsontext: error ? error.jsontext : null,
          error: error
            ? error.message
              ? error.message
              : error
            : "No document ",
          showError: true
        });
      });
  };
  _init = () => {
    if (this.props.tableName){
      this._loadTable(this.props.tableName)
    }else
    {
    Jumpto365API.itemTables().then(tableNames => {
      this.setState({ tableNames, loaded: true });
    });
  }
  };

  componentDidUpdate = (previousProps, previousState) => {};
  updateDimensions = () => {
    
    //this.setState({ });
    var win = $(window);
    var h = win.height();
    var w = win.width() - 300;
    var navHeight = h - 140;
    if (navHeight < 0) {
      return console.log("skipping at height", navHeight);
    }

    this.setState({ height: navHeight,itemHeight:navHeight,itemWidth: w});
  };

  componentDidMount = () => {
    window.addEventListener("resize", this.updateDimensions);
    if (this.props.onRegister){
      this.props.onRegister(this)
    }

    this.jumpto365Service = new Jumpto365Service();
    this.updateDimensions()
    this._init();
  };
  componentWillUnmount = () => {
    window.removeEventListener("resize", this.updateDimensions);
  };
  _loadTable(tableName){
    this.setState({ selectedArea:tableName, items: [], body: null });

    Jumpto365API.itemTables(tableName).then(items => {
      this.setState({ items });
    });}

  openItem = () => {
    var area = this.state.item && this.state.item[0] ? this.state.item[0].TableKey : null
    if (!area) return
    var url = LINK.PeriodicTableForTenant(this.props.context.me.upn,area) 
    navigate(url)
  }  
  _itemInspector = () => {
    var inspector =  <ReactJson src={this.state.item} />
    if (this.props.renderPreview && this.state.item && this.state.item[0]){
      return this.props.renderPreview(this.state.item[0].TableKey,this.state.item[0])
    }


    switch (this.state.selectedArea) {
      case "mytables":
      
      var table = null
      if (this.state.item && this.state.item[0]){
      try {
        table =  this.state.item[0].Json ?  JSON.parse(this.state.item[0].Json )   : null
      } catch (error) {
        table = {error}
      }
    }
      var area = this.state.item && this.state.item[0] ? this.state.item[0].TableKey : null
      var url = LINK.PeriodicTableForTenant(this.props.context.me.upn,area) 
        inspector = 
        <div >
<iframe style={{width:this.state.itemWidth,height:this.state.itemHeight}} src={url}></iframe>
        <div style={{scale:"(0.5)"}}>

        </div>
        <div>

        </div>

        {/* <ReactJson src={table} /> */}
        </div>                
       
        break;
    
      default:

        break;
    }

    return (
      <div>
        <div>
          <div>
           {inspector}
          </div>
          <div />
        </div>
        <div /> 
        <div />
      </div>
    );
  };
  render() {
    var itemSelected = this.state.item && this.state.item[0] 
    return (
      <div >
      
      <div style={{ display: "flex", minHeight: "500px" }} className="DatabaseExplorerContainer">
      

      <div style={{ display: "flex"}}>
        {!this.props.tableName &&
        <div style={{ minWidth: "300px" }}>
          <ScenarioList
            singleSelection
            customView={(renderToolCell, _onColumnClick) => {
              var columns = [
                {
                  key: "column2",
                  name: "Table",
                  fieldName: "title",
                  minWidth: 100,
                  maxWidth: 600,
                  isRowHeader: true,
                  isResizable: true,
                  isSorted: false,
                  isSortedDescending: false,
                  onColumnClick: _onColumnClick,
                  data: "string",
                  isPadded: true,
                  onRender: (item, rowId, colData, d) => {
                    var title = item[colData.fieldName];
                    return item.isHeading ? <b>{title}</b> : title;
                  }
                }
              ];

              return columns;
            }}
            defaultView="key"
            tasks={
              this.state.tableNames
                ? this.state.tableNames.map((table, ix) => {
                    return { key: table.TableName, title: table.TableName };
                  })
                : []
            }
            onSelectionChanged={selection => {

              if (!selection) return;
              if (selection.length < 1) {
                this.setState({ selectedArea: null });
                if (this.props.onitemselected) {
                  this.props.onitemselected(null);
                }
                return;
              }
              var selectedArea = selection[0].key;
              this._loadTable(selectedArea)
             
            }}
          />
          {!this.state.loaded && <Shimlist />}
        </div>
}
        <div style={{ minWidth: "300px" }}>
          <ScenarioList
            className="DatabaseExplorerList"
            singleSelection
            customView={(renderToolCell, _onColumnClick) => {
              var columns = [
                {
                  key: "column1",
                  name: "Tag",
                  fieldName: "tableKey",
                  minWidth: 100,
                  maxWidth: 100,
                  isRowHeader: true,
                  isResizable: true,
                  isSorted: true,
                  isSortedDescending: false,
                  onColumnClick: _onColumnClick,
                  data: "string",
                  isPadded: true,
                  onRender: (item, rowId, colData, d) => {
                    var title = item[colData.fieldName];
                    return item.isHeading ? <b>{title}</b> : title;
                  }
                },
                // {
                //   key: "column2",
                //   name: "Name",
                //   fieldName: "title",
                //   minWidth: 100,
                //   maxWidth: 600,
                //   isRowHeader: true,
                //   isResizable: true,
                //   isSorted: false,
                //   isSortedDescending: false,
                //   onColumnClick: _onColumnClick,
                //   data: "string",
                //   isPadded: true,
                //   onRender: (item, rowId, colData, d) => {
                //     var title = item[colData.fieldName];
                //     return item.isHeading ? <b>{title}</b> : title;
                //   }
                // }
              ];

              return columns;
            }}
            tasks={
              this.state.items
                ? this.state.items.map((item, ix) => {
                    return {
                      key: item.genericId,
                      title: item.Title,
                      tableKey: item.TableKey
                    };
                  })
                : []
            }
            onSelectionChanged={selection => {
              
              if (!selection) return;
              if (selection.length < 1) {
                this.setState({ selecteditem: null });
                if (this.props.onitemselected) {
                  this.props.onitemselected(null);
                }
                return;
              }
debugger
              var selecteditem = selection[0].key;
              this.setState({ selecteditem });

              var path = `/@/${this.props.context.me.upn}/-/tool/${
                this.state.selectedArea
              }/${selecteditem}`;
              this.setState({ selecteditem, path, body: null });

              if (this.props.onitemselected) {
                this.props.onitemselected(path);
              }
              Jumpto365API.itemTables(this.state.selectedArea,selecteditem).then(item => {
                if (this.props.onItemLoaded && item.length===1) {
                  this.props.onItemLoaded(item[0])
                }
                this.setState({ item });
              });

              // this._readTool("","en",path)
            }}
          />
          {!this.state.items && <Shimlist />}
        </div>
        </div>
        <div className="DatabaseExplorerInspector">
          {this._itemInspector()}
          <div
            className="ms-font-m toolbody"
            style={{
              padding: "16px",
              height: this.state.height,
              overflowY: "auto",
              overflowX: "hidden"
            }}
            dangerouslySetInnerHTML={{ __html: this.state.body }}
          />
        </div>
      </div>
      </div>
    );
  }
}
