import React, { Component } from 'react';
import Editor from '../../Editor';
import "./EditorPage.css"
import { TileEditor, TileProperties } from '../../../logic/TileEditors';

export default class EditorPage extends Component {

 
   
    render()
    {
      var blankRecord = {
        key: null,
        textcolor: "#ffffff",
        title: "MyAnalytics",
        color: "#377AB9",
        inShort:"Cutting unproductive meeting time to getting better work/life balance",
        icon: "https://jumpto365.com/resources/images/Icons/MyAnalytics White.png",
        isFullyShareable: "",
        isPartlyShareable: "",
        isPremium: "",
        jumpto: null,
        subtitle: "",
        contentRef: "https://blob.jumpto365.com/articles/j/u/m/jumpto365.com/n/niels@jumpto365.com/2019/04/editor-20190429-195708.json"
      };
     

    
      return (
    <div className="EditorPage">
    <div style={{border:"0px solid red"}}>
          <TileEditor
            selectedTab="Article"
            value={blankRecord} // version 2
            context={this.props.context}
            onSelected={(value)=>{
              console.log(value)
            }}
          /></div>
           
      </div>)
    }
}

