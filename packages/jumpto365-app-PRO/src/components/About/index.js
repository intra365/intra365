import React, { Component } from 'react';
import MattNiels from "../MattNiels"
import Package from "../../../package.json"
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import './about.css'
import Translators from "../../data/translators.json"
import Translate from "../Sidebar/translation"

import 'office-ui-fabric-react/dist/css/fabric.css'
import VersionId from '../../.v2/components/Component';

/**
 * The only about dialogue.
 *
 * @version 1.0.0
 * @author [Niels Gregers Johansen](https://github.com/niegrejoh)
 */
class About extends Component {
    render() {
  
    var translators = [];
    for (let index = 0; index < Translators.length; index++) {
        const translator = Translators[index];
        if (index > 0){
        if (index=== (Translators.length-1)){
            translators.push(' and ')
        }else
        {
            translators.push(', ')
            
        }
    }
        translators.push(<a key={translators.length}  href={translator.link} target="_blank">{translator.author} ({Translate('en',translator.promptId)})</a>)

    }      
var logo = require("../PeriodicSystem/media/Logo color - transparent background.png")
    return (
      <div >
       

        
        <div className="ms-Grid" >
        <div className="ms-Grid-row" >
        
        <div className="ms-Grid-col ms-sm6  " >
        <div style= {{"marginLeft":"10px"}} className="ms-Fabric ms-font-xl">
        
        <h2  className="ms-font-xxl">About</h2>
        <p className="ms-Fabric ms-font-xl">The Periodic Table of Office 365 is a brainchild of Matt Wade, an American  <a target="_blank" href="https://h3s-inc.com/">Office 365 consultant</a>, 
        and was originally published as a flat graphic in PNG format (<a target="_blank" href="https://www.linkedin.com/pulse/how-its-made-periodic-table-office-365-matt-wade/">how it was made</a>). </p>

        <p className="ms-Fabric ms-font-xl">With the expert help of Niels Gregers Johansen, a Danish multidisciplinary collaboration tools geek, we now present a dynamic, 
        web-based version that you can easily access on almost any device, and embed locally on your website, intranet, blog, etc.</p>
        <MattNiels/>
        <h2  className="ms-font-xxl">Ideas?​</h2>
        <p className="ms-Fabric ms-font-xl">
        We are eager to make this the go-to tool for easily explaining Office 365 to anybody. Quickly understand what Office 365 is, 
        which apps are included, how those apps relate, and which app does what. It should also help in figuring out when to use
         what. You can even embed the page into your website or intranet as an always-available, constantly up-to-date resource.
</p>
        <p className="ms-Fabric ms-font-xl">
        If you have suggestions,  please visit our <a href="https://ideas.jumpto365.com" target="_blank">idea portal</a>
        </p>
        </div>
        </div>
        <div className="ms-Grid-col ms-sm6 " >
        <div style= {{"marginLeft":"10px"}} className="ms-Fabric ms-font-xl">
        <p className="ms-Fabric ms-font-xl">
        <h2  className="ms-font-xxl">Legalese​</h2>
        
        You may use this product for free as long as you retain credit to Matt Wade and Niels Gregers Johansen any time you use it, with direct link back to this page. Embedding on your website, intranet, blog etc. is our preferred use case.​
        
        You may not use this product in promotional or marketing material or any profit-bearing way. Licensing will be discussed for such use cases. ​
        
        We are not at all affiliated with Microsoft Corporation. Though we must say, we’re big fans of their work.​        </p>
       
        <h2  className="ms-font-xxl">Special Thanks​</h2>
        <p className="ms-Fabric ms-font-xl">
        
        Cheers to our excellent translators: { translators}</p>
        <img src={logo} style={{height:"auto",width:"50%"}}/>
        <div>
        Version: <VersionId />
        </div>
        </div>
        </div>
      </div>
      </div>
     
     </div>
       );
  }
}

export default About;
