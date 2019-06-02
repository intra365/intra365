import React, { Component } from 'react'

import { Dialog, DialogType, DialogFooter } from 'office-ui-fabric-react/lib/Dialog';
import { DefaultButton, PrimaryButton} from 'office-ui-fabric-react';

import "./editor.css"
import $ from "jquery"
import _ from "lodash"


export class EditorDialog extends Component {
    state = {hidden:false}
    componentDidMount = () => {
        window.addEventListener("resize", this.updateDimensions);
        this.updateDimensions()
    }
    componentWillUnmount = () => {
        window.removeEventListener("resize", this.updateDimensions);
    }
 
      updateDimensions = (small) => {
        //this.setState({ });
        var win = $(window)
        var h = win.height()
        var mastHead = $("#header")
        var pageHead = $("#pageheader")
        var toolbar = $("#toolbar")
        var commandbar = $("#commandbar")
        this.setState({
            //title: "",
          //  showArticlePicker:true,
            height:h  - (mastHead ? mastHead.height() : 0) - (pageHead ? pageHead.height() : 0)- (toolbar ? toolbar.height() : 0)- (commandbar ? commandbar.height() : 0),
            width:pageHead.width() / (small ? 2 : 1)

        });


    }
  render() {
    var width = this.props.width ? this.props.width  : "880px"
      //return (<div>Click</div>)
    return (
        <Dialog
        hidden={this.state.hidden}
        onDismiss={()=>{this.setState({hidden:true})} }
        dialogContentProps={{
          type: DialogType.largeHeader,
          title: this.props.title,
          xsubText: ""
        }}
        minWidth={width}
        width={width}
        maxWidth={width}
        modalProps={{
          isBlocking: true,
          containerClassName: 'ms-dialogMainOverride'
        }}
      >
   <div style={{height:this.state.height * 0.8,width:"834px",overflow:"auto"}}>
{this.props.children}
</div>
    
        <DialogFooter>
         
          <PrimaryButton text={this.props.buttonSelectText} disabled={!this.props.canSelect}  
           onClick={() => {
               
            this.setState({hidden:true})
                if (this.props.onSelect){
                    this.props.onSelect()
                }
              }}  />
           {this.props.onClear &&
        <DefaultButton text="Delete"  
           onClick={() => {
               this.props.onClear()
               if (this.props.onSelect){
                this.props.onSelect()
            }
              }}  />
            }   
          <DefaultButton onClick={()=>{
               if (this.props.onDismiss){
                this.props.onDismiss()
            }
              this.setState({hidden:true})
              
              } } text="Close" />
        </DialogFooter>
      </Dialog>
    )
  }
}

