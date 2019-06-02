import React, { Component } from 'react';
import { navigate } from "@reach/router"
import ReactJson from 'react-json-view'
import { Subscribe } from 'react-contextual'
import "./column.css"

export default class Column extends Component {
    render (){return  <Subscribe>
        {context => (
            <Column_ {...this.props} context={context}/>
        )}
        
        </Subscribe>

    }
}
class Column_ extends Component {
    state = {}
    componentDidUpdate = (previousProps, previousState) => {

        if (previousProps.path !== this.props.path){
            if (this.props.path){
          console.log("Path changed to ",this.props.path)
          this.setState({changed:true})
          setTimeout(()=>{this.setState({changed:false}),5000})
        }
        }
        
      }

      componentDidMount = () => {
          if (this.props.editor){
              this.props.editor.registerTile(this)
          }
      }
    render () {

        var isGroupInFocus = this.props.context && this.props.context.groupInFocus ? true : false

      var isInGroup = isGroupInFocus && this.props.context.editor &&  this.props.context.editor.isInGroup ? this.props.context.editor.isInGroup( this.props.context.groupInFocus,this.props ? this.props.name : null) : false 

        if (this.props.name === "compmgr"){

            console.log("this.props.onClick",this.props.onClick)
            console.log("this.props.path",this.props.path)

    }

        let onClick = this.props.onClick ? this.props.onClick : this.props.path ? ()=>{
        
            console.log("Cell click",this.props)


            
            //var isVersion1 = !this.props.celldata.centerData.contentRef
            if ( this.props.version < 2) return navigate(this.props.path)
            
            if (this.props.version >= 3 ){
                
                var navTo =  (this.props.contextPath ? this.props.contextPath  : "" ) + `/${this.props.name ? this.props.name  : "-"}`
                navigate( navTo)
                return
            }
            
            var navTo =    (this.props.contextPath ? this.props.contextPath  : "" ) + `/${this.props.name ? this.props.name  : "-"}/${this.props.language ? this.props.language :"en"}` +  this.props.path 
            if (this.props.celldata && this.props.celldata.centerData && this.props.celldata.centerData.isPublished){
                navTo = this.props.celldata.centerData.contentUrl
            }
            navigate( navTo)
        } : null

        if (this.props.editor && this.props.editMode){
            onClick = () => {
                this.props.editor.onTileClick(this)
            }
        }

       
        if (this.props.editor && this.props.editMode && isGroupInFocus ){
            onClick = () => {
                var groupName = this.props.context.groupInFocus
                var toolName = this.props.name 
                if (isInGroup){
                    this.props.context.editor.groupMembershipRemove(groupName,toolName)
                }else
                {
                    this.props.context.editor.groupMembershipAdd(groupName,toolName)

                }
                if (this.props.editor.onTileToggle) this.props.editor.onTileToggle(this)
            }
        }
        var isDimmed = isGroupInFocus && !isInGroup
        return (
      
      
        <div onClick={this.props.debugging ? null : onClick} 
                        className={isDimmed ? "groupDimmed" : null}
                        style={{
                            //backgroundColor: this.state.changed ? "red" : "#ffffff",
                            cursor:"pointer",
                            border: this.props.editMode ? "1px dashed #aaaaaa": null,
                            padding: this.props.editMode ? "0px" : "0px",
                            margin: this.props.editMode ? "0px":"",
                            xmarginTop:this.props.margin,
                            xmarginLeft:this.props.margin,
                            minWidth:this.props.size,
                            minHeight:this.props.size,
                            overflow:"hidden",                        
                            width:this.props.size,
                            height:this.props.size
                            
                        }}
                            onMouseEnter={(e) => {if (this.props.onMouseEnter) this.props.onMouseEnter(e,this)}} 
                            onMouseLeave={(e) => {if (this.props.onMouseLeave) this.props.onMouseLeave(e,this)}}
                            
                            
                            > 
                       
                            {this.props.editor && this.props.editor.component && this.props.editMode ? this.props.editor.component(this)  : null}
                            {this.props.debugging ? <Debugger tileid={this.props.tileid} parentProps={this.props} text={this.props.celldata && this.props.celldata.centerdata ? this.props.celldata.centerdata.title : "no" } parentState={this.state} >
            
                            <ReactJson collapsed="4" src={this.props.celldata} />
                            </Debugger> : this.props.children}
                            
                            </div>

                             
                                  )
    }
}

