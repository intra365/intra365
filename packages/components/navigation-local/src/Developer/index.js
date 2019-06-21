
import React, { Component } from 'react'
import { DefaultButton } from 'office-ui-fabric-react';
import MonacoEditor from 'react-monaco-editor';


export default class Developer extends Component {
    ref = React.createRef()
    state= {minimized:true}
    editorDidMount(editor, monaco) {
        console.log('editorDidMount', editor);
        editor.focus();
      }
      onChange(newValue, e) {
        console.log('onChange', newValue, e);
      }
    
    componentDidMount() {
        this.setState({code:localStorage.getItem("code")})
        if (this.ref.current){
            var a = 1
        }
    }
    logError = (error) =>{
        var errors = this.state.errors ? this.state.errors  : []
        console.log("error",error)
        errors.push(error)
        this.setState({errors})
    }
    exec = (code) =>{
        try {
            var context = {
                version : 1
            }
            
            var log = (txt)=>{console.log("code",txt)}
            eval(code)
        } catch (error) {
            this.logError({code,error})
        }
    }
    render() {
        const code = this.state.code;
        const options = {
          selectOnLineNumbers: true
        };
        var width = this.state.maximized ? "100%":"400px"
        var height = this.state.minimized ? "16px":"800px"
        return (
            <div ref={this.ref} style={{ backgroundColor:"#ff00ff88" ,position:"fixed",bottom:"0",left:"0",height,width}}> 
            <div style={{display:"flex"}}>
            <div onClick={()=>{this.setState({maximized:!this.state.maximized})}}>Toogle width</div>&nbsp;<div onClick={()=>{this.setState({minimized:!this.state.minimized})}}>Toogle height</div>
            </div>
             <MonacoEditor
        width={width}
        height="600"
        language="javascript"
        theme="vs-dark"
        value={code}
        options={options}
        onChange={this.onChange}
        editorDidMount={this.editorDidMount}
      />
                {/* <textarea value={this.state.code}
                
                
                style={{height:"200px",width:"394px",minWidth:"394px"}} onChange={(e)=>{
                    var code = e.target.value
                    this.setState({code})
                    localStorage.setItem("code",code)
                }}>


                </textarea> */}
                <DefaultButton text="Run" style={{margin:"8px"}} onClick={()=>{
                    this.exec(this.state.code)
                }}></DefaultButton>
                <DefaultButton text="Copy" style={{margin:"8px"}} ></DefaultButton>
                <div>
                <DefaultButton text="Top left" style={{margin:"8px"}} ></DefaultButton>
                <DefaultButton text="Top right" style={{margin:"8px"}} ></DefaultButton>
                </div><div>
                <DefaultButton text="Bottom left" style={{margin:"8px"}} ></DefaultButton>
                <DefaultButton text="Bottom right" style={{margin:"8px"}} ></DefaultButton>
Errors : {this.state.errors ? this.state.errors.length : 0}

                </div>
            </div>
        )
    }
}
