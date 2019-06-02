import "./less.css";
import "./dragable.css";
import React, { Component } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import RenderGrid from "./RenderGrid";
import _ from "lodash";
import "./toolbar.css";
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
import ToolbarHeader from "./ToolbarHeader";
import $ from "jquery";
import json from "format-json";
import Tree, { TreeNode } from "rc-tree";
import Tooltip from "rc-tooltip";
import {
  ComboBox,
  CommandBar,
  Pivot,
  PivotItem,
  DefaultButton,
  Panel
} from "office-ui-fabric-react";
import { CmdLink } from "./CmdLink";
import iPhonePortait from "../../../media/HostFrames/iphone-portrait.png";
import sharepointappPortrait from "../../../media/HostFrames/sharepointapp-portrait.png";
import sharepointDesktop from "../../../media/HostFrames/sharepointDesktop.png";
import appleAir from "../../../media/HostFrames/appleAir.png";
import { imgElement } from "mammoth/lib/images";
import { Depths } from '@uifabric/fluent-theme/lib/fluent/FluentDepths';

export function getProperty(props, key, propertyName, defaultValue) {
  return props && props[key] && props[key][propertyName] !== undefined
    ? props[key][propertyName]
    : defaultValue;
}
export function newItem(key, name, iconName, checked, props, onCmd, maxWidth) {
  var itemProps = props && props[key] ? props[key] : {};
  var itemType = itemProps.type ? itemProps.type.toUpperCase() : "";
  var onRender = null;

  switch (itemType) {
    case "IFRAME":
      onRender = data => {
        return (
          <div style={{ display: "flex" }}>
            <div style={{ marginTop: "0px" }}>
              <iframe
                style={{ overflow: "hidden", borderStyle: "hidden" }}
                src={itemProps.href}
                height={itemProps.height ? itemProps.height : "500px"}
                width={itemProps.width ? itemProps.width : "800px"}
              />
            </div>
          </div>
        );
      };
      break;
    case "MEGAMENU":
      onRender = data => {
       // debugger
       var width = megaMenuWidth(maxWidth)
       if (data.isSubtree ){
        return (
         
          <div
            className="megamenuLevel0"
            style={{ width,position:"relative",zIndex:10  }}
          >
            {renderMegaMenu(data, props, 1)}
          </div>
          
          
        );
       }
        return (
          <div
            className="megamenuLevel0"
            style={{ width}}
          >
            {renderMegaMenu(data, props, 1)}
          </div>
        );
      };
      break;
    case "IMAGE":
      onRender = data => {
        return (
          <div style={{ marginTop: "14px", marginRight: "6px" }}>
            <img
              src={itemProps.href}
              alt={itemProps.title}
              style={{ height: "16px", width: "auto" }}
            />
          </div>
        );
      };
      break;
    case "DROPDOWN":
      onRender = null;
      break;

    case "LINK":
      onRender = null;
      break;
    case "TILE":
      onRender = null;
      break;
    default:
      onRender = null;
      break;
  }
  return {
    checked: checked ? true : false,
    key,
    name,
    iconProps: iconName ? { iconName } : null,
    // disabled:this.isDisabled(key) ,
    onRender,
    onClick: () => {
      switch (itemType) {
        case "IFRAME":
          break;

        case "DROPDOWN":
          break;

        case "LINK":
          window.open(itemProps.href, "_blank");
          break;
        case "TILE":
          break;
        default:
          break;
      }
      if (onCmd) onCmd({ key, name, iconName, checked });
    }
  };
}

export function tree(props, data, level, onCmd, width) {
  if (!data) return [];
  return data.map(item => {


   
    var itemProps = props && props[item.key] ? props[item.key] : {};
    var itemType = itemProps.type ? itemProps.type.toUpperCase() : "";
    var sample = itemProps.sample ? itemProps.sample : "[]"
        

    var children = item.children ? item.children : []
    if ( false && itemType==="FILE"){
    try {
    var  sampleArray = JSON.parse(sample)
    if ( 0 < sampleArray.length ) {looping++}
     children =  children.concat(sampleArray)

    } catch (error) {
      console.log("parse sample error",error)
    }

  }


    if (children && children.length) {
      var actionItem = newItem(
        item.key,
        getProperty(props, item.key, "title", item.title),
        getProperty(props, item.key, "icon", ""),
        false,
        props,
        onCmd,
        width
      );
      actionItem.subMenuProps = {
        items: tree(props, children, level ? level + 1 : 1, onCmd, width)
      };
      return actionItem;
    }
    return newItem(
      item.key,
      getProperty(props, item.key, "title", item.title),
      getProperty(props, item.key, "icon", ""),
      false,
      props,
      onCmd,
      width
    );
  });
}

export function subtree(key, props, data, level, onCmd, width) {
  var subItems = [];

  function subs(key, props, data, level, onCmd, width,looping) {
    if (!data || looping > 1) return [];
    return data.map(item => {
      if (item.children && item.children.length) {
        var actionItem = newItem(
          item.key,
          getProperty(props, item.key, "title", item.title),
          getProperty(props, item.key, "icon", ""),
          false,
          props,
          onCmd,
          width
        );


        var children = item.children ? item.children : []
        var itemProps = props && props[key] ? props[key] : {};
        var itemType = itemProps.type ? itemProps.type.toUpperCase() : "";
      
        if (false && itemType==="FILE"){
        var sample = itemProps.sample ? itemProps.sample : "[]"
        
        try {
        var  sampleArray = JSON.parse(sample)
        if ( 0 < sampleArray.length ) {looping++}
         children =  children.concat(sampleArray)

        } catch (error) {
          console.log("parse sample error",error)
        }}
        actionItem.subMenuProps = {
          items: subs(
            key,
            props,
            children,
            level ? level + 1 : 1,
            onCmd,
            width,
            looping
          )
        };
        if (item.key === key) {
          actionItem.isSubtree = true
          subItems.push(actionItem);
        }
        return actionItem;
      }
      var actionItem = newItem(
        item.key,
        getProperty(props, item.key, "title", item.title),
        getProperty(props, item.key, "icon", ""),
        false,
        props,
        onCmd,
        width
      );
      if (item.key === key) {
        actionItem.isSubtree = true
        subItems.push(actionItem);
      }
      return actionItem;
    });
  }

  subs(key, props, data, level, onCmd, width,0);

  return subItems;
}
export function renderMegaMenu(data, props, level) {
  switch (level) {
    case 1:
      return (data.subMenuProps && data.subMenuProps.items
        ? data.subMenuProps.items
        : []
      ).map((item, key) => {
        var itemProps = props && props[item.key] ? props[item.key] : {};
        return (
          <div className={`megamenuLevel${level}`}>
            <ul>
              <div className="ms-Menu-heading">
                {false && item.iconProps && item.iconProps.iconName && (
                  <i
                    class={`ms-Icon ms-Icon--${item.iconProps.iconName}`}
                    aria-hidden="true"
                  />
                )}
                {itemProps.href ? (
                  <a href={itemProps.href} target="_blank">
                    {item.name}
                  </a>
                ) : (
                  item.name
                )}
              </div>
              {(item.subMenuProps && item.subMenuProps.items
                ? item.subMenuProps.items
                : []
              ).map((item, key) => {
                return <li>{renderMegaMenu(item, props, level + 1)}</li>;
              })}
            </ul>
          </div>
        );
      });

    case 2:
      var itemProps = props && props[data.key] ? props[data.key] : {};
      return (
        <div className={`megamenuLevel${level}`}>
          <ul>
            <div className="ms-Menu-item">
              {false && data.iconProps && data.iconProps.iconName && (
                <i
                  class={`ms-Icon ms-Icon--${data.iconProps.iconName}`}
                  aria-hidden="true"
                />
              )}

              {itemProps.href ? (
                <a href={itemProps.href} target="_blank">
                  {data.name}
                </a>
              ) : (
                data.name
              )}
            </div>
            {(data.subMenuProps &&
            data.iconProps.iconName &&
            data.subMenuProps.items
              ? data.subMenuProps.items
              : []
            ).map((item, key) => {
              return <li>{renderMegaMenu(item, props, level + 1)}</li>;
            })}
          </ul>
        </div>
      );
    case 3:
      var itemProps = props && props[data.key] ? props[data.key] : {};
      return (
        <div className={`megamenuLevel${level}`}>
          <div className="ms-Menu-item">
            {false && data.iconProps && data.iconProps.iconName && (
              <i
                class={`ms-Icon ms-Icon--${data.iconProps.iconName}`}
                aria-hidden="true"
              />
            )}

            {itemProps.href ? (
              <a href={itemProps.href} target="_blank">
                {data.name}
              </a>
            ) : (
              data.name
            )}
            {data.subMenuProps && data.subMenuProps.items && "***"}
          </div>
        </div>
      );
  }
}
export function megaMenuWidth(width) {
  return parseInt(width / 1.3 / 300) * 300;
}
export function generateData(x = 5, y = 2, z = 1, gData = []) {
  var lastKey = 0;
  function _loop(_level, _preKey, _tns) {
    const preKey = _preKey || "0";
    const tns = _tns || gData;

    const children = [];
    for (let i = 0; i < x; i++) {
      lastKey++;
      const key = lastKey; // `${preKey}-${i}`;
      tns.push({ title: `${key}-label`, key: `${key}-key` });
      if (i < y) {
        children.push(key);
      }
    }
    if (_level < 0) {
      return tns;
    }
    const __level = _level - 1;
    children.forEach((key, index) => {
      tns[index].children = [];
      return _loop(__level, key, tns[index].children);
    });

    return null;
  }
  _loop(z);
  return gData;
}
export function calcTotal(x = 3, y = 2, z = 1) {
  /* eslint no-param-reassign:0 */
  const rec = n => (n >= 0 ? x * y ** n-- + rec(n) : 0);
  return rec(z + 1);
}

export const gData = generateData();
export default class Toolbar extends Component {
  state = {
    gData,
    autoExpandParent: true,
    expandedKeys: ["0-0-key", "0-0-0-key", "0-0-0-0-key"],
    display: "desktop"
  };

  componentDidMount() {
    if (this.props.registerToolbar) {
      this.props.registerToolbar(this);
    }
  }

  onDragStart = info => {
    console.log("start", info);
  };
  onDragEnter = info => {
    console.log("enter", info);
    this.setState({
      expandedKeys: info.expandedKeys
    });
    // localStorage.setItem("tree", JSON.stringify(this.state));
  };
  onDrop = info => {
    console.log("drop", info);
    const dropKey = info.node.props.eventKey;
    const dragKey = info.dragNode.props.eventKey;
    const dropPos = info.node.props.pos.split("-");
    const dropPosition =
      info.dropPosition - Number(dropPos[dropPos.length - 1]);

    const loop = (data, key, callback) => {
      data.forEach((item, index, arr) => {
        if (item.key === key) {
          callback(item, index, arr);
          return;
        }
        if (item.children) {
          loop(item.children, key, callback);
        }
      });
    };
    const data = [...this.state.gData];

    // Find dragObject
    let dragObj;
    loop(data, dragKey, (item, index, arr) => {
      arr.splice(index, 1);
      dragObj = item;
    });

    if (!info.dropToGap) {
      // Drop on the content
      loop(data, dropKey, item => {
        item.children = item.children || [];
        // where to insert 示例添加到尾部，可以是随意位置
        item.children.push(dragObj);
      });
    } else if (
      (info.node.props.children || []).length > 0 && // Has children
      info.node.props.expanded && // Is expanded
      dropPosition === 1 // On the bottom gap
    ) {
      loop(data, dropKey, item => {
        item.children = item.children || [];
        // where to insert 示例添加到尾部，可以是随意位置
        item.children.unshift(dragObj);
      });
    } else {
      // Drop on the gap
      let ar;
      let i;
      loop(data, dropKey, (item, index, arr) => {
        ar = arr;
        i = index;
      });
      if (dropPosition === -1) {
        ar.splice(i, 0, dragObj);
      } else {
        ar.splice(i + 1, 0, dragObj);
      }
    }

    this.setState({
      gData: data,
      version : this.state.version ? this.state.version +1 : 1
    });
    // localStorage.setItem("tree", JSON.stringify(this.state));
  };
  onExpand = expandedKeys => {
    console.log("onExpand", expandedKeys);
    this.setState({
      expandedKeys,
      autoExpandParent: false
    });
    // localStorage.setItem("tree", JSON.stringify(this.state));
  };

  updateSubTree(eventKey){
    var toolwidth = 0;
    var toolmargin = 0;
    var viewMode = this.props.viewMode ? this.props.viewMode : "raw";
    var editMode = this.props.editMode;
    //viewMode = "raw"
  
        toolwidth = this.props.width - (editMode ? 680 : 0);
      
    var subItems = subtree(
      eventKey,
      this.state.gProps,
      this.state.gData,
      0,
      () => {},
      toolwidth
    );
    this.setState({ subItems });
  }
  onSelect = (selectedKeys, info) => {
    console.log("selected", selectedKeys, info);

   
    this.setState({ selectedItem: { ...info.node.props } });
    this.updateSubTree(info.node.props.eventKey)
    // localStorage.setItem("tree", JSON.stringify(this.state));
  };
  onCmd = props => {
    this.setState({
      selectedItem: { eventKey: props.key, title: props.name },
      subItems
    });
    // localStorage.setItem("tree", JSON.stringify(this.state));
  };

  onCheck = (checkedKeys, info) => {
    console.log("onCheck", checkedKeys, info);
  };
  onEdit = () => {
    setTimeout(() => {
      console.log("current key: ", this.selKey);
    }, 0);
  };
  onDel = e => {
    if (!window.confirm("sure to delete?")) {
      return;
    }
    e.stopPropagation();
  };
  getContainer() {
    if (!this.cmContainer) {
      this.cmContainer = document.createElement("div");
      document.body.appendChild(this.cmContainer);
    }
    return this.cmContainer;
  }
  renderCm(info) {
    if (this.toolTip) {
      ReactDOM.unmountComponentAtNode(this.cmContainer);
      this.toolTip = null;
    }

    this.toolTip = (
      <Tooltip
        overlayClassName="contextOption"
        trigger="click"
        placement="bottomRight"
        prefixCls="rc-tree-contextmenu"
        defaultVisible
        overlay={
          <div>
            {/* <h4>{info.node.props.eventKey}</h4> */}
            <div className="itemOption" onClick={() => {}}>
              Add
            </div>
            {/* <div className="itemOption" onClick={()=>{
              
            }}>Child</div>
            <div className="itemOption" onClick={()=>{
              
            }}>Up</div>
            <div className="itemOption" onClick={()=>{
              
            }}>Promote</div>
            <div className="itemOption" onClick={()=>{
              
            }}>Denote</div>
            <div className="itemOption" onClick={()=>{
              
            }}>Down</div> */}
            <div className="itemOption" onClick={() => {}}>
              Delete
            </div>
          </div>
        }
      >
        <span />
      </Tooltip>
    );

    const container = this.getContainer();
    Object.assign(this.cmContainer.style, {
      position: "absolute",
      left: `${info.event.pageX}px`,
      top: `${info.event.pageY}px`
    });

    ReactDOM.render(this.toolTip, container);
  }
  onRightClick = info => {
    console.log("right click", info);
    this.setState({ selectedKeys: [info.node.props.eventKey] });
    this.renderCm(info);
  };

  updateTree(key, change) {
    const loop = (data, key, callback) => {
      data.forEach((item, index, arr) => {
        if (item.key === key) {
          callback(item, index, arr);
          return;
        }
        if (item.children) {
          loop(item.children, key, callback);
        }
      });
    };
    const data = [...this.state.gData];

    // Find dragObject
    loop(data, key, (item, index, arr) => {
      debugger;
    });
  }

  export = () => {
    var data = {
      tree: this.state.gData,
      properties: this.state.gProps
    };
    return json.plain(data);
  };
  import = data => {
    if (!data) return false;
    if (!data.file) return false;
    var file = JSON.parse(data.file);
    this.setState({ gData: file.tree, gProps: file.properties });
    return true;
  };
  showCurrentItem = (toolwidth) =>{
    if (!this.state.subItems) return null 
    var props = this.state.gProps
    var subItem = this.state.subItems[0]
    if (!subItem) return null
    var itemProps = props && props[subItem.key] ? props[subItem.key] : {};
    var itemType = itemProps.type ? itemProps.type.toUpperCase() : "";
    
  
    switch (itemType) {
      case "MEGAMENU":
          var width = megaMenuWidth(toolwidth)
         
           return (
            <div style={{margin:"16px", padding:"16px",border:"2px dashed #dddddd"}}>
             <div
               className="megamenuLevel0 "
               
               style={{width,boxShadow: Depths.depth8  }}
             >
               {renderMegaMenu(subItem, this.state.gProps, 1)}
             </div>
             </div>
             
           );
          
        break;
        case "IFRAME":
          return (
            <div style={{margin:"16px", padding:"16px",border:"2px dashed #dddddd"}}>
            <div style={{ display: "flex" }}>
            <div style={{ marginTop: "0px", width,boxShadow: Depths.depth8 ,height:width*3/4,overflow:"auto"  }}>
              <iframe
                style={{ overflow: "hidden", borderStyle: "hidden" }}
                src={itemProps.href}
                height={itemProps.height ? itemProps.height : "500px"}
                width={itemProps.width ? itemProps.width : "800px"}
              />
            </div>
            </div>
          </div>)
       
        break;
      case "IMAGE":
       
        break;
      case "DROPDOWN":
        
        break;
  
      case "LINK":
        
        break;
      case "TILE":
       
        break;
      default:
       
        break;
    }
    return (
      <div
        style={{
          border: "2px dashed #dddddd",
          margin: "16px",
          padding: "16px"
        }}
      >
         <CommandBar style={{height:"inherit"}} items={[subItem]} /> 
      </div>
    )
  }
  render() {
    const loop = data => {
      return data.map(item => {
        if (item.children && item.children.length) {
          return (
            <TreeNode
              key={item.key}
              title={getProperty(
                this.state.gProps,
                item.key,
                "title",
                item.title
              )}
              icon={(x, y, z) => {
                var name = getProperty(this.state.gProps, item.key, "icon", "");
                if (!name) return null;
                return (
                  <i
                    className={`ms-Icon ms-Icon--${name}`}
                    aria-hidden="true"
                  />
                );
              }}
            >
              {loop(item.children)}
            </TreeNode>
          );
        }
        return (
          <TreeNode
            key={item.key}
            title={getProperty(
              this.state.gProps,
              item.key,
              "title",
              item.title
            )}
            icon={(x, y, z) => {
              var name = getProperty(this.state.gProps, item.key, "icon", "");
              if (!name) return null;
              return (
                <i className={`ms-Icon ms-Icon--${name}`} aria-hidden="true" />
              );
            }}
          />
        );
      });
    };

    const items = tree(
      this.state.gProps,
      this.state.gData,
      0,
      this.onCmd,
      this.props.width
    );
    var scale = 1;
    var toolwidth = 0;
    var toolmargin = 0;
    var viewMode = this.props.viewMode ? this.props.viewMode : "raw";
    var editMode = this.props.editMode;
    //viewMode = "raw"
    switch (viewMode) {
      case "phone":
        scale = (this.props.height - (editMode ? 40 : 0)) / 1001;
        toolwidth = this.props.width - (editMode ? 680 : 0);
        toolmargin = (toolwidth - 1001 * scale) / 2;
        break;

      case "desktop":
        scale = (this.props.width - (editMode ? 680 : 0)) / 2600;
        toolwidth = 2600 * scale;
        break;
      case "raw":
        scale = 1;
        toolwidth = this.props.width - (editMode ? 680 : 0);
        break;
      default:
        break;
    }

    return (
      <div>
        {/* <ReactJson
          collapsed="1"
          src={{  scale, w: this.props.width, toolwidth,toolmargin, state: this.state }}
        /> */}
        <div
          className="editorCanvas"
          style={{
            width: this.props.width,
            height: this.props.height,
            overflow: "auto",
            display: "flex",
            xjustifyContent: "center"
          }}
        >
          {editMode && (
            <div
              className="draggable-container leftEditor"
              style={{
                flexGrow: "1",
                minWidth: "340px",
                maxWidth: "340px",
                height: this.props.height - 120,
                overflow: "auto",
                zIndex: 1
              }}
            >
              <Tree
                expandedKeys={this.state.expandedKeys}
                onExpand={this.onExpand}
                autoExpandParent={this.state.autoExpandParent}
                draggable
                onRightClick={this.onRightClick}
                onDragStart={this.onDragStart}
                onDragEnter={this.onDragEnter}
                onDrop={this.onDrop}
                onSelect={this.onSelect}
              >
                {loop(this.state.gData)}
              </Tree>
            </div>
          )}

          {viewMode === "raw" && (
            <div
              className="centerEditor"
              style={{ minWidth: toolwidth, maxWidth: toolwidth }}
            >
              <CommandBar items={items} />

              {this.showCurrentItem(toolwidth,this.state.version)}
            </div>
          )}
          {viewMode === "phone" && (
            <div
              className="centerEditor"
              style={{ minWidth: toolwidth, maxWidth: toolwidth }}
            >
              {" "}
              <div
                style={{
                  marginLeft: toolmargin / scale,
                  transformOrigin: " 0 0 0 ",
                  transform: `scale(${scale})`
                }}
              >
                <div
                  style={{
                    position: "relative"
                  }}
                >
                  <div
                    style={{ position: "absolute", left: "0px", top: "0px" }}
                  >
                    <img src={iPhonePortait} />
                  </div>
                  <div
                    style={{ position: "absolute", left: "65px", top: "144px" }}
                  >
                    <img
                      className="blur"
                      style={{ width: "390px", height: "auto" }}
                      src={sharepointappPortrait}
                    />
                  </div>

                  <div
                    style={{
                      position: "absolute",
                      left: "65px",
                      top: "380px",
                      width: "390px"
                    }}
                  >
                    {" "}
                    <CommandBar items={items} />
                  </div>
                  <div />
                </div>
              </div>
            </div>
          )}

          {viewMode === "desktop" && (
            <div
              className="centerEditor"
              style={{ minWidth: toolwidth, maxWidth: toolwidth }}
            >
              {" "}
              <div
                style={{
                  transformOrigin: " 0 0 0 ",
                  transform: `scale(${scale})`
                }}
              >
                <div
                  style={{
                    position: "relative",
                    marginRight: "auto",
                    marginLeft: "auto",
                    width: "2000px"
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      left: "-3px",
                      top: "-280px"
                    }}
                  >
                    <img
                      style={{ width: "2510px", height: "auto" }}
                      src={appleAir}
                    />
                  </div>
                  <div
                    style={{
                      position: "absolute",
                      left: "565px",
                      top: "90px",
                      height: "860px",
                      overflow: "hidden"
                    }}
                  >
                    <img
                      className="blur"
                      style={{ width: "1368px", height: "auto" }}
                      src={sharepointDesktop}
                    />
                  </div>

                  <div
                    style={{
                      position: "absolute",
                      left: "565px",
                      top: "134px",
                      width: "1368px"
                    }}
                  >
                    {" "}
                    <CommandBar items={items} />
                  </div>
                  <div />
                </div>
              </div>
            </div>
          )}
          {editMode && (
            <div
              className="draggable-demo"
              style={{
                zIndex: 1,
                flexGrow: "1",
                margin: "0px",
                width: this.props.width
              }}
            >
              <div
                className="rightEditor"
                style={{
                  xalignSelf: "right",
                  minWidth: "360px",
                  maxWidth: "360px",
                  height: this.props.height - 120,
                  overflow: "auto"
                }}
              >
                {this.state.selectedItem && (
                  <div>
                    <CmdLink
                      title={getProperty(
                        this.state.gProps,
                        this.state.selectedItem.eventKey,
                        "title",
                        this.state.selectedItem.title
                      )}
                      icon={getProperty(
                        this.state.gProps,
                        this.state.selectedItem.eventKey,
                        "icon",
                        ""
                      )}
                      sample={getProperty(
                        this.state.gProps,
                        this.state.selectedItem.eventKey,
                        "sample",
                       ""
                      )}
                      script={getProperty(
                        this.state.gProps,
                        this.state.selectedItem.eventKey,
                        "script",
                        ""
                      )}
                      imageSrc={getProperty(
                        this.state.gProps,
                        this.state.selectedItem.eventKey,
                        "imageSrc",
                        ""
                      )}
                      href={getProperty(
                        this.state.gProps,
                        this.state.selectedItem.eventKey,
                        "href",
                        ""
                      )}
                      type={getProperty(
                        this.state.gProps,
                        this.state.selectedItem.eventKey,
                        "type",
                        "link"
                      )}
                      tile={getProperty(
                        this.state.gProps,
                        this.state.selectedItem.eventKey,
                        "tile",
                        ""
                      )}
                      table={getProperty(
                        this.state.gProps,
                        this.state.selectedItem.eventKey,
                        "table",
                        ""
                      )}
                      onChange={change => {
                        var key = this.state.selectedItem.eventKey;
                        function extend(obj, src) {
                          Object.keys(src).forEach(function(key) {
                            obj[key] = src[key];
                          });
                          return obj;
                        }
                        var gProps = this.state.gProps ? this.state.gProps : {};
                        var item = gProps[key] ? gProps[key] : {};
                        item = extend(item, change);
                        gProps[key] = item;
                        this.setState({ gProps });
                        this.updateSubTree(key) 
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}
