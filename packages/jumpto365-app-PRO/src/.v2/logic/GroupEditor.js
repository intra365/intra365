import React, { Component } from 'react'
import { TextField, DefaultButton, PrimaryButton, ProgressIndicator, IconNames } from 'office-ui-fabric-react';
import { ColorPicker } from 'office-ui-fabric-react/lib/ColorPicker';
import { Pivot, PivotItem } from 'office-ui-fabric-react/lib/Pivot';
import ReactJson from 'react-json-view'
import "./editor.css"
import _ from "lodash"
import {EditorDialog} from "./core"

export class GroupProperties extends Component {
    state = {}
    _init = () =>
    {   
        
        this.setState({
            title: this.props.title,
            key: this.props.groupKey,
            color:this.props.color,
            textColor:this.props.textColor

        }) 
    }

    componentDidMount = () =>{
        this._init()
    }
    componentDidUpdate = (previousProps, previousState) => {
        
        if (previousProps !== this.props ){
            this._init()
        }
   

      }
    render() {
        
        return (
            <div style={{minHeight:"500px",maxHeight:"500px",overflow:"hidden"}}>
             {/* <ReactJson collapsed="0" src={this.state} />  */}
            <div style={{display:"flex",padding:"16px",alignItems:"strech"}}>
            <div>
           
            <Pivot  className="pivotItemEditor">
            <PivotItem headerText="Details" className="pivotItemEditor">
                 <div style={{padding:"16px"}}>
                
        
                    <TextField placeholder="Title" value={this.state.title} ariaLabel="Title" onChange={(e,v)=>{

                        this.setState({title:v})
                    
                        if (this.props.onChange) this.props.onChange({title:v})
                    }} />
{/* 
                    <TextField placeholder="Key" value={this.state.key} ariaLabel="Key" onChange={(e,v)=>{
                        this.setState({key:v})
                        if (this.props.onChange) this.props.onChange({key:v})
                    }} /> */}

                        
                </div>
            </PivotItem>
         

            <PivotItem headerText="Color">
            <div style={{display:"flex"}}>
                <div>
                    Background color
                    <ColorPicker color={this.state.color} onColorChanged={
                        (color)=>{
                            this.setState({color})
                            if (this.props.onChange) this.props.onChange({color})

                    }
                        
                        
                        } />
                </div>
                <div>
                    Text color
                    <ColorPicker color={this.state.textColor} onColorChanged={
                        (textColor)=>{
                            this.setState({textColor})
                            if (this.props.onChange) this.props.onChange({textColor})

                    }
                        
                        
                        } />
                </div>
                </div>
            </PivotItem>

                
      
                {/* <PivotItem  headerText="JSON"  >
                     <ReactJson collapsed="1" src={this.state} />  
                </PivotItem> */}
            </Pivot>
            </div>
            </div>
            
            </div>

)
    }
}

export  class GroupPropertiesEditor extends Component {
    state = {groupProperties : {}}
    _init = () =>{
        var group = this.props.group ? this.props.group : {}
        this.setState({groupProperties:{
            title: group.title ? group.title : "",
            key : group.key ? group.key : "unknown",
            color: group.color ? group.color : "#222222",
            textColor : group.textColor ? group.textColor : "#000000"
        }})
    }

    componentDidMount = () =>{
        
        this._init()
    }
    componentDidUpdate = (previousProps, previousState) => {
        
        if (previousProps !== this.props ){
            this._init()
        }
   

      }
    render() {
       var that = this
            return  (
            <EditorDialog title={"Group Tile Builder" } 
                          onSelect={()=>{
                             
                              if (that.props.updateProperties){
                                that.props.updateProperties("contentRef",this.state.groupProperties)
                              }
                          }}

                          onDismiss={()=>{
                            if (that.props.onDismiss){
                                that.props.onDismiss()
                            }
                           
                           
                        }}
                          buttonSelectText="Update"
                          canSelect={this.state.canSelect} 
                          isSelect
            >
            <GroupProperties title={this.state.groupProperties.title} 
                              groupKey={this.state.groupProperties.key} 
                              color={this.state.groupProperties.color} 
                              textColor ={this.state.groupProperties.textColor} 
                              context={this.props.context} 
                                onChange={(properties)=>{
                                    
                                var groupProperties = this.state.groupProperties
                                

                                _.keysIn(properties).map(key=>{
                                    
                                    groupProperties[key] = properties[key]
                                })
                                this.setState({groupProperties,canSelect:true})
                                
                            
                            }}/>
                            {/* {this.state.celldata && this.state.celldata.centerData &&
                            <ReactJson collapsed="0" src={this.state.celldata.centerData} />} */}
            </EditorDialog>)
        }
       

}