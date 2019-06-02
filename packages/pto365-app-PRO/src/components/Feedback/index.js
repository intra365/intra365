import React, { Component } from 'react';
import About from '../About'
import  '../PeriodicSystem/periodicsystem.css'
import './feedback.css'
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';

class Feedback extends Component {
    render() {
    
      return (
        <div>
        <div className='ms-modalExample-header InfoProductTitle' style={{backgroundColor:"#2B579A"}} >
         <div style= {{"margin-left":"10px"}}>
          We are in Beta and need your opinion 
          </div>
          </div>
          <div className="ms-Fabric ms-font-xl" style= {{"margin-left":"10px"}}>
            <h2 >Known issues</h2>
            We’re interested in what you think! Complete the form below to provide us some much-needed feedback. We have plans for improving this tool, but also want to know what can make it better for you, so don’t hold back!
            <ul>
                <li>Selecting a different language opens that version in a new tab, rather than switching within the same tab </li>
                <li>You will experience a "blink" as we redirect you to http if you use https when linking </li> 
                <li>When embeddeding in another app which is accessed using IE: You will experience that the table is positioned wrong </li> 
             </ul>
        </div>
          <div style= {{"margin-left":"10px"}}>
          
              <iframe title="feedback" width="100%" height= "480px" 
              src= "https://forms.office.com/Pages/ResponsePage.aspx?id=zSI7IbfWs0i7I97NaFISVkCdKozhXS1NuIOEI7ED-fdUODlDTTZWSEEzQVNaWEdLRFdFS0EwTFlXUi4u&embed=true" 
              frameborder= "0" marginwidth= "0" marginheight= "0" 
              
              style={{ "border": "none", "max-width":"100%", "max-height":"100vh"}} allowfullscreen webkitallowfullscreen mozallowfullscreen msallowfullscreen> </iframe>
              
              </div>
        </div>
    );
  }
}

export default Feedback;
