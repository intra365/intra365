import React, { Component } from 'react'
import { TextField, DefaultButton, PrimaryButton, ProgressIndicator, IconNames,Toggle,TooltipHost } from 'office-ui-fabric-react';
import { ColorPicker } from 'office-ui-fabric-react/lib/ColorPicker';
import { Pivot, PivotItem } from 'office-ui-fabric-react/lib/Pivot';
import ReactJson from 'react-json-view'
import "./editor.css"
import _ from "lodash"
import {EditorDialog} from "./core"
import PeriodicTableBanner from '../components/PeriodicTableBanner'
import TableHeader from '../components/Table/TableHeader';
import ImagePicker from "../pickers/ImagePicker";
export class TableProperties extends Component {
  state = {}
    render() {
  
        var context = this.props.context
        var userSettings = context && context.me && context.me.JSON ? JSON.parse(context.me.JSON) : {}
        
        var isDeveloper = userSettings.developer
        return (
            <div style={{minHeight:"470px",maxHeight:"470px",width:"450px",overflow:"hidden"}}>
             {/* <ReactJson collapsed="0" src={this.state} />  */}
            <div style={{xdisplay:"flex",padding:"16px",alignItems:"strech"}}>
            <div style={{marginLeft:"20px"}}>
                <TableHeader imageUrl={this.props.titlegraphics} />
                
            </div>
            <div>
            {this.state.upload && (
              <ImagePicker
                onDismiss={() => {
                  this.setState({ upload: false });
                }}
                onSelect={titlegraphics => {
                  if (this.props.onChange) this.props.onChange({ titlegraphics });
                  this.setState({ titlegraphics, upload: false, hasChanged: true });
                }}
              />
            )}
            {/* <Pivot  className="pivotItemEditor">
            <PivotItem headerText="Details" className="pivotItemEditor"> */}
                 <div style={{padding:"0px"}}>
                 {/* <TextField label="Title" placeholder="Enter a Title" value={this.state.title} ariaLabel="Title" onChange={(e,v)=>{

this.setState({title:v})

if (this.props.onChange) this.props.onChange({title:v})
}} />             */}
        
                    {/* <TextField label="Prologue" placeholder="Enter a Prologue" value={this.state.teaser} ariaLabel="Prologue" onChange={(e,v)=>{

                        this.setState({teaser:v})
                    
                        if (this.props.onChange) this.props.onChange({teaser:v})
                    }} /> */}
<div style={{ padding: "4px",paddingLeft:"8px", display: "flex" }}>
                    <div style={{ flexGrow: "1" }}>
                      <TextField
                        placeholder="Upload your own or paste in any address"
                        value={this.props.titlegraphics}
                        ariaLabel="Icon"
                        onChange={(e, v) => {
                          
                          if (this.props.onChange)
                            this.props.onChange({ titlegraphics: v });
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
                    {/* <TextField label="Image" placeholder="Image URL" value={this.props.titlegraphics} ariaLabel="Logo" onChange={(e,v)=>{
                        this.setState({titlegraphics:v})
                        if (this.props.onChange) this.props.onChange({titlegraphics:v})
                    }} /> */}
                    
                    {/* <Toggle label="Protected by login" defaultChecked={this.props.isProtected} onChange={(e,v)=>{
                        this.setState({isProtected:v})
                        if (this.props.onChange) this.props.onChange({isProtected:v})
                    }}></Toggle> */}
{/* <div style={{display:"flex"}}>
    <div>
   
   
                    <Toggle
          
                      checked={this.state.isScaled}
                      label="Scale"
                      onText="Yes"
                      offText="On"
                      onFocus={() => console.log("onFocus called")}
                      onBlur={() => console.log("onBlur called")}
                      onChange={(e, on) => {
                        this.setState({ isScaled: on });
                        if (this.props.onChange)
                          this.props.onChange({ isScaled: on });
                      }}
                    />
                    </div><div style={{margin:"16px"}}>
           The Table is responsive and will remove/add elements of the tiles and groups based on the available screen width and height.
     You can alter this by enabling the "Scale" which will make everything stay the same in all renditions
     
                  </div>
                </div> */}
                </div>
            {/* </PivotItem> */}
         

            {/* <PivotItem headerText="Color">
            <div style={{display:"flex",padding:"8px"}}>
            <div> Background
                    <ColorPicker color={this.state.backgroundColor} onColorChanged={
                        (backgroundColor)=>{
                            this.setState({backgroundColor})
                            if (this.props.onChange) this.props.onChange({backgroundColor})

                    }
                        
                        
                        } />
                </div>
                <div>Text
                    <ColorPicker color={this.state.textColor} onColorChanged={
                        (textColor)=>{
                            this.setState({textColor})
                            if (this.props.onChange) this.props.onChange({textColor})

                    }
                        
                        
                        } />
                </div></div>
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
              </PivotItem>
              {isDeveloper &&
              <PivotItem headerText="For developer">
                <div style={{ overflow: "auto" }}>
                  <p>
                   Ýou only see this is you are a certified JUMTO developer 
                  </p>
                  
                  <TextField placeholder="Version" value={this.state.version} ariaLabel="Version" onChange={(e,v)=>{
                        this.setState({version:v})
                        if (this.props.onChange) this.props.onChange({version:v})
                    }} />
                </div>
              </PivotItem> */}
              
            {/* </Pivot> */}
            </div>
            </div>
            
            </div>

)
    }
}

export  class TablePropertiesEditor extends Component {
state = {}
    _init = () =>{
      
        this.setState({tableProperties:{...this.props.settings}})
    }

    componentDidMount(){
        this._init()
    }
    componentDidUpdate (previousProps, previousState) {
        
        if (previousProps !== this.props ){
            this._init()
        }
   

      }
    render() {
       
            return  (
            <EditorDialog title={"Table Properties " } 
                          width="500px"
                          onSelect={()=>{
                             
                              if (this.props.onUpdate){
                                  this.props.onUpdate("contentRef",this.state.tableProperties)
                              }
                          }}

                          onDismiss={()=>{
                            if (this.props.onDismiss){
                                this.props.onDismiss()
                            }
                           
                           
                        }}
                          buttonSelectText="Update"
                          canSelect={this.state.canSelect} 
                          isSelect
            >
             
                            <TableProperties {...this.state.tableProperties}
                                
                                context={this.props.context} 
                                onChange={(properties)=>{
                                var tableProperties = this.state.tableProperties
                                    _.keysIn(properties).map(key=>{
                                        tableProperties[key] = properties[key]
                                    })
                                    this.setState({tableProperties,canSelect:true})
                            
                                }}
                            />
                            {/* {this.state.celldata && this.state.celldata.centerData &&
                            <ReactJson collapsed="0" src={this.state.celldata.centerData} />} */}
            </EditorDialog>)
        }
       

}