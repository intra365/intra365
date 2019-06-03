
import React, { Component } from 'react'
import { DefaultButton } from 'office-ui-fabric-react';
import "./companion.css"
import ToolbarContainer from '.';
export default class ToolbarCompanion extends Component {
    state = {}
  render() {
      var companions = this.props.companions ? this.props.companions : []
    return (
        <div>
            <div  style={{position:"fixed",bottom:"72px",left:"0",backgroundColor:"#ffffffdd",height:this.props.height,width:"100%",marginLeft:"auto",marginRight:"auto"}}>
            <ToolbarContainer
                  onTileClicked={()=>{}}
                  context={this.props.context}
                  height={400}
                  width={300}
                  domain={this.props.context.me.upn}
                  tag={this.state.selectedItem.ToolbarKey}
                />}
          
            </div>
      <div style={{position:"fixed",bottom:"0",left:"0",backgroundColor:"#cccccc",height:"72px",width:"100%"}}>
      {companions.map((item,index)=>{
          
          return (  <DefaultButton className="companionButton" onClick={()=>{if (this.props.onOpenCompanion){
            this.setState({show:item})
        }}} text={item}/>)
      })}
      <DefaultButton  className="companionButton" onClick={()=>{if (this.props.onAddCompanion){
          this.props.onAddCompanion()
      }}} text="Add Companion"/>
      
      </div>
      </div>
    )
  }
}
