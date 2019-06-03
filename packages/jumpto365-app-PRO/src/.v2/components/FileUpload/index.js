import React, { Component } from 'react';
import PropTypes from 'prop-types'
/**
 * Describe overall purpose of the component
 *
 * @export
 * @class FileUpload
 * @extends {Component}
 */
export default class FileUpload extends Component { 
    state = {} 

    static propTypes  = {
        onUpload : PropTypes.func
        
    }
    
    updateDimensions = () => {
      //this.setState({ });
      var win = $(window)
      var height = win.height()-170
      var width = win.width()-400
  
  
      this.setState({height,width})
    
  
      
  
  }
  componentDidMount = () => {
    window.addEventListener("resize", this.updateDimensions);
       
    this.updateDimensions()
  

    
}
componentWillUnmount = () => {
  window.removeEventListener("resize", this.updateDimensions);
}
      _read = (file) => { 
        var that = this
      var reader = new FileReader();
      reader.onload = function(event){
        
        if (that.props.onUpload){

          var s = reader.result.split(";")
          var ss = s[1].split(",")


          that.props.onUpload(ss[1],file)
        }
      }
      reader.readAsDataURL(file)
    }
      
      onChange = (e) => {
        if (e.target.files.length<1) return
        var file = e.target.files[0]
        this._read(file)
        
      }
      
    
      render() {
    
        return (
  
          
            <input type="file" id="file" onChange={this.onChange} style={{ cursor:"pointer", fontSize:"0px" , marginLeft:-100,width:this.state.width,height:this.state.height,border:"0px dashed grey"}}/>
      
       )
      }

}

