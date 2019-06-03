import React, { Component } from 'react'
import ArticleExplorer from '../components/ArticleExplorer';
import { Subscribe } from 'react-contextual'
import { DatePicker, DayOfWeek, IDatePickerStrings } from 'office-ui-fabric-react/lib/DatePicker';
import "./editor.css"
import _ from "lodash"
import Jumpto365App from '../components/_Contexts/Jumpto365App';
import {GroupPropertiesEditor,GroupProperties} from "./GroupEditor"
import {TablePropertiesEditor,TableProperties} from "./TableEditors"
import {TileEditor,TileProperties} from "./TileEditors"

import { Customizer } from "office-ui-fabric-react";
import { FluentCustomizations } from "@uifabric/fluent-theme";



class GameOfPTO  {
    table = null
    constructor(table) {
        this.table = table
        
      }
    canMove(row,col){

    }


}




class PeriodicTableEditorSelector extends Component {
    state = {}
    render() {
        if (this.props.tileState && this.props.tileState.editorClicked) {
            return  (
            <EditorDialog title={"Select " + this.props.tileId} 
                          onSelect={()=>{
                              if (this.props.updateCell){
                                  this.props.updateCell("contentRef",this.state.contentRef )
                              }
                          }}
                          canSelect={this.state.canSelect} 
                          isSelect
            >
            
               <ArticleExplorer context={this.props.context} 
                                onArticleSelected={(path)=>{

                                this.setState({contentRef:path,canSelect:path})
                                
                            
                            }}
                />
            </EditorDialog>)
        }
        else
    
            return null
            
    }

}

export  class PeriodicTableEditor  {
    store = null
   
    constructor(store) {
        this.store = store
        
        
      }
    state = {clicked:true}
    clicked = false

    onTileToggle = (tile) => {
        var key = tile && tile.props.celldata && tile.props.celldata.centerData && tile.props.celldata.centerData.key ? tile.props.celldata.centerData.key : null

        console.log("Toggle",key)
    }
    onTileClick = (tile) => {

        console.log("Tile Clicked",tile)
        
        tile.setState({editorClicked:true})
        
      //  this.setState({clicked:true})
    }


    onGroupClicked = (context,group) => {
        console.log("Group Clicked",group)
        var selectOn = !group.state.editorClicked
        

        Jumpto365App.setIsGroupSelecting(context,selectOn)
        Jumpto365App.setGroupInFocus(context,selectOn ? group.props.name : null)   
        
        group.setState({editorClicked:selectOn})
        
      //  this.setState({clicked:true})
    }
    tiles = {}
    registerTile = (tile) => {
        if (!tile && !tile.props && !tile.props.tileid) return

        this.tiles[tile.props.tileid] = tile
       
       
    }
    component = (tile) => {
        if (!tile) return null
        if (this.state.isGroupSelecting){
            return <div style={{}}>XX</div>
        }
        var celldata =  tile.props && tile.props.celldata ? tile.props.celldata  :  null
         
        switch (0) {
            case 2 :

            return (<TablePropertiesEditor />)
            case 1:
            return (
                <Subscribe>
                {context => (
                <PeriodicTableEditorSelector 
                updateCell={(updateType,updateData) => {
                    if (this.store && this.store.onUpdateTile){
                        this.store.onUpdateTile(tile.props,updateType,updateData)
                    }
                   
                }}
                celldata={celldata}
                context={context} 
                clicked={this.clicked} 
                tileId={tile.tileId} 
                tileState={tile? tile.state : null}/>
                )}</Subscribe>)
                break;
        
            default:
            return (
                <Subscribe>
                {context => (
                     <Customizer {...FluentCustomizations}>
                <TileEditor 
                updateCell={(updateType,updateData) => {
                    if (this.store && this.store.onUpdateTile){
                        this.store.onUpdateTile(tile.props,updateType,updateData)
                    }
                   
                }}
                celldata={celldata}
                context={context} 
                clicked={this.clicked} 
                tileId={tile.tileId} 
                tileState={tile? tile.state : null}/>
                </Customizer>
                )}</Subscribe>)
                break;
        }

     
    }
}

export  class PeriodicTableProperties extends Component  {
  
    render() 
    
    { 
        
            return (
                <Subscribe>
                {context => (
                     <Customizer {...FluentCustomizations}>
                <TablePropertiesEditor context={context} 
                onUpdate={(updateType,updateData) => {
                    if (context.editor && context.editor.onUpdateTable){
                        context.editor.onUpdateTable(this,updateType,updateData)
                    }
                   
                }}
                tableProperties={this.props.tableProperties}
                
                onDismiss={this.props.onDismiss}
                />
               </Customizer> )}</Subscribe>)
                
        }
    }
     
    export  class GroupBoxProperties extends Component  {
  
        render() { 
            
                return (
                    <Subscribe>
                    {context => (
                    <GroupPropertiesEditor  context={context} 
                    {...this.props}
                    // onDismiss={this.props.onDismiss} 
                    // updateProperties={this.props.updateProperties}
                    />
                    )}</Subscribe>)
                    
            }
        }
         
       