import React, { Component } from "react";
import { render } from "react-dom";

import Example, {PageTabs, PageTab,ZoneTag,SharePointControlZone,loadConfig } from "../../src";
import Developer from "../../src/Developer"
var config = {
  global: [
    {
      type: "css",
      style: `
 .sitePage-uservoice-button , 
 .pageTitle_a9be8b45, 
 .root-73, 
 .ms-HubNav, 
 #SuiteNavPlaceHolder{
      display:none !important; 
} 
`
    },
    {
      type: "js",
      script: `
var header = document.querySelector('[data-automationid="pageHeader"]');
if (header){
header.style.display="none"     
}

`
    }
  ],

  section1: [
    {
      type: "parentAction",
      query: { automationId: "ControlZone" },
      script: `
element.style.backgroundImage ="url(https://raw.githubusercontent.com/extranets/cdn/master/media/bgBubbles%402x.png)"
element.style.backgroundPosition= "0% -10%"
element.style.border= "4px dashed red"
  `
    },
    {
      type: "html",
      html: `
<h1>Hello</h1>
  `
    }
  ],

  section2: [
    {
      type: "parentAction",
      query: { automationId: "ControlZone" },
      script: `
element.style.backgroundImage ="url(https://raw.githubusercontent.com/extranets/cdn/master/media/bgBubbles%402x.png)"
element.style.backgroundPosition= "0% 80%"
  `
    }
  ]
};

class Demo extends Component {
  state = { tabs: [] };
  registerHost = pageTabs => {
    this.setState({ pageTabs });
  };

  componentDidMount(){
    var v = 12 
  this.setState({config})
  }
  render() {




    var tabs = this.state && this.state.tabs ? this.state.tabs : [];
    var that = this;
    return (
      <div>
        <h1>PageTabs Edit</h1>

        <PageTabs
          editMode={true}
          registerWithHost={this.registerHost}
          onChanged={tabs => {
            that.setState({ tabs });
          }}
        />


<div>
  <div data-automationId="CanvasZone"> <PageTab data="0" /> <div>
    data 1
    </div></div>
    <div data-automationId="CanvasZone"> <PageTab data="1" /> <div>
    data 2
    </div></div>
    <div data-automationId="CanvasZone"> <PageTab data="2" /> <div>
    data 3
    </div></div>
    <div data-automationId="CanvasZone"> <PageTab data="3" /> <div>
    data 4
    </div></div>
    <div data-automationId="CanvasZone"> <PageTab data="4" /> <div>
    data 5
    </div></div>
</div>
<Developer />

        <div>
          Test ZoneTag12
          <div data-automationId="ControlZone" style={{height:"1000px",border:"1px solid red"}}>

            <div>
              <SharePointControlZone tag="section1" config={this.state.config}>
             </SharePointControlZone>
             <SharePointControlZone tag="global" config={this.state.config}>
             </SharePointControlZone>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

render(<Demo />, document.querySelector("#demo"));
