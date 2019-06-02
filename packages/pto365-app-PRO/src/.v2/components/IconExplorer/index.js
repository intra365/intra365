import React, { Component } from 'react';

import "./IconExplorer.css"

import Masonry from "react-masonry-component"
import { ColorPicker } from 'office-ui-fabric-react';
import { DefaultButton, PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { Panel, PanelType } from 'office-ui-fabric-react/lib/Panel';
import ClipBoard from 'react-clipboard.js'
export default class IconExplorer extends Component {

 
   state = {
    color:"#000000",   
    icons : [
        "https://jumpto365.com/resources/images/Icons/ADP Color.png",
        "https://jumpto365.com/resources/images/Icons/ADP White.png",
        "https://jumpto365.com/resources/images/Icons/AdobeConnect.png",
        "https://jumpto365.com/resources/images/Icons/Blackboard Black.png",
        "https://jumpto365.com/resources/images/Icons/Blackboard White.png",
        "https://jumpto365.com/resources/images/Icons/Bookings Color.png",
        "https://jumpto365.com/resources/images/Icons/Bookings White.png",
        "https://jumpto365.com/resources/images/Icons/Box Color.png",
        "https://jumpto365.com/resources/images/Icons/Box White.png",
        "https://jumpto365.com/resources/images/Icons/Canvas Color.png",
        "https://jumpto365.com/resources/images/Icons/Canvas White.png",
        "https://jumpto365.com/resources/images/Icons/Ceridian.png",
        "https://jumpto365.com/resources/images/Icons/Delve Color.png",
        "https://jumpto365.com/resources/images/Icons/Delve White.png",
        "https://jumpto365.com/resources/images/Icons/Dropbox Color.png",
        "https://jumpto365.com/resources/images/Icons/Dropbox White.png",
        "https://jumpto365.com/resources/images/Icons/Dynamics Color.png",
        "https://jumpto365.com/resources/images/Icons/Dynamics White.png",
        "https://jumpto365.com/resources/images/Icons/Excel New.png",
        "https://jumpto365.com/resources/images/Icons/Excel Old Color.png",
        "https://jumpto365.com/resources/images/Icons/Excel Old White.png",
        "https://jumpto365.com/resources/images/Icons/Flow Color.png",
        "https://jumpto365.com/resources/images/Icons/Flow White.png",
        "https://jumpto365.com/resources/images/Icons/FreshBooks.png",
        "https://jumpto365.com/resources/images/Icons/Freshcaller.png",
        "https://jumpto365.com/resources/images/Icons/Freshchat.png",
        "https://jumpto365.com/resources/images/Icons/Freshconnect.png",
        "https://jumpto365.com/resources/images/Icons/Freshdesk.png",
        "https://jumpto365.com/resources/images/Icons/Freshmarketer.png",
        "https://jumpto365.com/resources/images/Icons/Freshping.png",
        "https://jumpto365.com/resources/images/Icons/Freshsales.png",
        "https://jumpto365.com/resources/images/Icons/Freshservice.png",
        "https://jumpto365.com/resources/images/Icons/Freshteam.png",
        "https://jumpto365.com/resources/images/Icons/Freshworks Suite.png",
        "https://jumpto365.com/resources/images/Icons/G Suite Admin.png",
        "https://jumpto365.com/resources/images/Icons/G Suite Color.png",
        "https://jumpto365.com/resources/images/Icons/G Suite White.png",
        "https://jumpto365.com/resources/images/Icons/GoToMeeting New.png",
        "https://jumpto365.com/resources/images/Icons/GoToMeeting Old.png",
        "https://jumpto365.com/resources/images/Icons/GoToTraining.png",
        "https://jumpto365.com/resources/images/Icons/GoToWebinar New.png",
        "https://jumpto365.com/resources/images/Icons/GoToWebinar Old.png",
        "https://jumpto365.com/resources/images/Icons/Google Calendar.png",
        "https://jumpto365.com/resources/images/Icons/Google Cloud Search.png",
        "https://jumpto365.com/resources/images/Icons/Google Contacts.png",
        "https://jumpto365.com/resources/images/Icons/Google Docs.png",
        "https://jumpto365.com/resources/images/Icons/Google Drive.png",
        "https://jumpto365.com/resources/images/Icons/Google Forms.png",
        "https://jumpto365.com/resources/images/Icons/Google Groups.png",
        "https://jumpto365.com/resources/images/Icons/Google Hangouts.png",
        "https://jumpto365.com/resources/images/Icons/Google Keep.png",
        "https://jumpto365.com/resources/images/Icons/Google Mail.png",
        "https://jumpto365.com/resources/images/Icons/Google Meet.png",
        "https://jumpto365.com/resources/images/Icons/Google Mobile.png",
        "https://jumpto365.com/resources/images/Icons/Google Plus.png",
        "https://jumpto365.com/resources/images/Icons/Google Sheets.png",
        "https://jumpto365.com/resources/images/Icons/Google Sites.png",
        "https://jumpto365.com/resources/images/Icons/Google Slides.png",
        "https://jumpto365.com/resources/images/Icons/Google Vault.png",
        "https://jumpto365.com/resources/images/Icons/Grasshopper.png",
        "https://jumpto365.com/resources/images/Icons/KRONOS Color.png",
        "https://jumpto365.com/resources/images/Icons/KRONOS White.png",
        "https://jumpto365.com/resources/images/Icons/Kaizala Color.png",
        "https://jumpto365.com/resources/images/Icons/Kaizala White.png",
        "https://jumpto365.com/resources/images/Icons/MIcrosoft To-Do White.png",
        "https://jumpto365.com/resources/images/Icons/Microsoft Forms Color.png",
        "https://jumpto365.com/resources/images/Icons/Microsoft Forms White.png",
        "https://jumpto365.com/resources/images/Icons/Microsoft Planner Color.png",
        "https://jumpto365.com/resources/images/Icons/Microsoft Planner White.png",
        "https://jumpto365.com/resources/images/Icons/Microsoft Stream Color.png",
        "https://jumpto365.com/resources/images/Icons/Microsoft Stream White.png",
        "https://jumpto365.com/resources/images/Icons/Microsoft To-Do Color.png",
        "https://jumpto365.com/resources/images/Icons/Microsoft Whiteboard Color.png",
        "https://jumpto365.com/resources/images/Icons/Microsoft Whiteboard White.png",
        "https://jumpto365.com/resources/images/Icons/Moodle Color.png",
        "https://jumpto365.com/resources/images/Icons/Moodle White.png",
        "https://jumpto365.com/resources/images/Icons/MyAnalytics Color.png",
        "https://jumpto365.com/resources/images/Icons/MyAnalytics White.png",
        "https://jumpto365.com/resources/images/Icons/Office 365 Admin Center Color.png",
        "https://jumpto365.com/resources/images/Icons/Office 365 Admin Center White.png",
        "https://jumpto365.com/resources/images/Icons/Office 365 Color.png",
        "https://jumpto365.com/resources/images/Icons/Office 365 Video Portal Color.png",
        "https://jumpto365.com/resources/images/Icons/Office 365 Video Portal White.png",
        "https://jumpto365.com/resources/images/Icons/Office 365 White.png",
        "https://jumpto365.com/resources/images/Icons/Office Lens Color.png",
        "https://jumpto365.com/resources/images/Icons/Office Lens White.png",
        "https://jumpto365.com/resources/images/Icons/OneDrive Color.png",
        "https://jumpto365.com/resources/images/Icons/OneDrive White.png",
        "https://jumpto365.com/resources/images/Icons/OneDrive for Business New.png",
        "https://jumpto365.com/resources/images/Icons/OneDrive for Business Old Color.png",
        "https://jumpto365.com/resources/images/Icons/OneDrive for Business Old White.png",
        "https://jumpto365.com/resources/images/Icons/OneNote New.png",
        "https://jumpto365.com/resources/images/Icons/OneNote Old Color.png",
        "https://jumpto365.com/resources/images/Icons/OneNote Old White.png",
        "https://jumpto365.com/resources/images/Icons/Outlook Calendar Color.png",
        "https://jumpto365.com/resources/images/Icons/Outlook Calendar White.png",
        "https://jumpto365.com/resources/images/Icons/Outlook Groups Color.png",
        "https://jumpto365.com/resources/images/Icons/Outlook Groups White.png",
        "https://jumpto365.com/resources/images/Icons/Outlook Mail Old Color.png",
        "https://jumpto365.com/resources/images/Icons/Outlook Mail Old White.png",
        "https://jumpto365.com/resources/images/Icons/Outlook People Color.png",
        "https://jumpto365.com/resources/images/Icons/Outlook People White.png",
        "https://jumpto365.com/resources/images/Icons/Outlook Tasks Color.png",
        "https://jumpto365.com/resources/images/Icons/Outlook Tasks White.png",
        "https://jumpto365.com/resources/images/Icons/Outlook new.png",
        "https://jumpto365.com/resources/images/Icons/Power BI Color.png",
        "https://jumpto365.com/resources/images/Icons/Power BI White.png",
        "https://jumpto365.com/resources/images/Icons/PowerApps Color.png",
        "https://jumpto365.com/resources/images/Icons/PowerApps White.png",
        "https://jumpto365.com/resources/images/Icons/PowerPoint New.png",
        "https://jumpto365.com/resources/images/Icons/PowerPoint Old Color.png",
        "https://jumpto365.com/resources/images/Icons/PowerPoint Old White.png",
        "https://jumpto365.com/resources/images/Icons/Project Color.png",
        "https://jumpto365.com/resources/images/Icons/Project White.png",
        "https://jumpto365.com/resources/images/Icons/Quickbooks.png",
        "https://jumpto365.com/resources/images/Icons/SAP Color.png",
        "https://jumpto365.com/resources/images/Icons/SAP White.png",
        "https://jumpto365.com/resources/images/Icons/Salesforce Color.png",
        "https://jumpto365.com/resources/images/Icons/Salesforce White.png",
        "https://jumpto365.com/resources/images/Icons/ServiceNow Color.png",
        "https://jumpto365.com/resources/images/Icons/ServiceNow White.png",
        "https://jumpto365.com/resources/images/Icons/SharePoint New.png",
        "https://jumpto365.com/resources/images/Icons/SharePoint Old Color.png",
        "https://jumpto365.com/resources/images/Icons/SharePoint Old White.png",
        "https://jumpto365.com/resources/images/Icons/Skype Color.png",
        "https://jumpto365.com/resources/images/Icons/Skype White.png",
        "https://jumpto365.com/resources/images/Icons/Skype for Business New.png",
        "https://jumpto365.com/resources/images/Icons/Slack.png",
        "https://jumpto365.com/resources/images/Icons/Sway Color.png",
        "https://jumpto365.com/resources/images/Icons/Sway White.png",
        "https://jumpto365.com/resources/images/Icons/Teams New.png",
        "https://jumpto365.com/resources/images/Icons/Teams Old Color.png",
        "https://jumpto365.com/resources/images/Icons/Teams Old White.png",
        "https://jumpto365.com/resources/images/Icons/Trello Color.png",
        "https://jumpto365.com/resources/images/Icons/Trello White.png",
        "https://jumpto365.com/resources/images/Icons/UltiPro Color.png",
        "https://jumpto365.com/resources/images/Icons/UltiPro White.png",
        "https://jumpto365.com/resources/images/Icons/Vimeo Color.png",
        "https://jumpto365.com/resources/images/Icons/Vimeo White.png",
        "https://jumpto365.com/resources/images/Icons/Visio Color.png",
        "https://jumpto365.com/resources/images/Icons/Visio White.png",
        "https://jumpto365.com/resources/images/Icons/Webex Meetings.png",
        "https://jumpto365.com/resources/images/Icons/Webex Teams.png",
        "https://jumpto365.com/resources/images/Icons/Word New.png",
        "https://jumpto365.com/resources/images/Icons/Word Old Color.png",
        "https://jumpto365.com/resources/images/Icons/Word Old White.png",
        "https://jumpto365.com/resources/images/Icons/Workday Color.png",
        "https://jumpto365.com/resources/images/Icons/Workday White.png",
        "https://jumpto365.com/resources/images/Icons/Yammer New.png",
        "https://jumpto365.com/resources/images/Icons/Yammer Old Color.png",
        "https://jumpto365.com/resources/images/Icons/Yammer Old White.png",
        "https://jumpto365.com/resources/images/Icons/YouTube Color.png",
        "https://jumpto365.com/resources/images/Icons/YouTube White.png",
        "https://jumpto365.com/resources/images/Icons/Zendesk Suite Color.png",
        "https://jumpto365.com/resources/images/Icons/Zendesk Suite White.png",
        "https://jumpto365.com/resources/images/Icons/Zendesk Support Color.png",
        "https://jumpto365.com/resources/images/Icons/Zendesk Support White.png",
        "https://jumpto365.com/resources/images/Icons/Zoom Video Conferencing.png",
]}

_init = ()=>{
    
}
componentDidMount = () =>{
    this._init()
}   

render()
{
       
return (           
<div>
<div>
        {this.props.onSelect && 
        <PrimaryButton disabled={!this.state.iconUrl} text="Select" onClick={()=> {if (this.props.onSelect)this.props.onSelect(this.state.iconUrl)}} />
    }
     {!this.props.supressBackgroundTester && 
        <DefaultButton text="Backgrounds" onClick={()=> {this.setState({showPanel:!this.state.showPanel})}} />}
        <Panel
          isBlocking={false}
          isOpen={this.state.showPanel}
          onDismiss={()=>{this.setState({showPanel:false})}}
          type={PanelType.medium}
          headerText="Background color"
          closeButtonAriaLabel="Close"
        >
         <div style={{xdisplay:"flex"}}>
        <div>

            <ColorPicker color={this.state.color} onColorChanged={
                        (color)=>{
                            this.setState({color})
                            if (this.props.onChange) this.props.onChange({color})
                    
                    }}/>
        </div>
        <div>
           

        
        <div style={{backgroundColor:this.state.color,width:"256px",height:"256px"}}>
            {this.state.iconUrl &&
            <img  alt={""} style={{ height:"auto",maxWidth:"256px",maxHeight:"256px", width:"auto"}} src={this.state.iconUrl} />
            }
        </div>
        <div>
            <a href={`https://beta.jumpto365.com/metadata?colorrgb=${ encodeURIComponent(this.state.color)}&iconUrl=${ encodeURIComponent(this.state.iconUrl)}`} target="_blank">jumtag</a>
        </div>
        <div>
       
        </div>
        
        </div>
    </div>          
                 
        </Panel>
      </div>
    
    <div>

         <Masonry>
        
            {this.state.icons.map((icon,index)=>{
                return (
                <div  onClick={()=>{
                                this.setState({iconUrl:icon})
                                if (this.props.onClick)this.props.onClick(icon)
                            }}
                        className="iconFrame" key={index} style={{height:"64px",width:"64px",margin:"8px",xborder:"1px solid #dddddd"}}>

                    <div style={{position:"relative"}}></div>
                    <div className="iconBackground"  style={{position:"absolute",backgroundColor:this.state.color,height:"64px",width:"64px"}}>
                        {this.state.color === "#000000" && 
                            <img  style={{height:"64px",width:"64px"}} src="https://camo.githubusercontent.com/6609e7239d46222bbcbd846155351a8ce06eb11f/687474703a2f2f692e696d6775722e636f6d2f4e577a764a6d6d2e706e67" />
                        }
                    </div>
                    <div style={{position:"absolute",lineHeight:"64px",textAlign:"center"}}>
                        <img  className="iconImage" alt={""} style={{ height:"auto",maxWidth:"64px",maxHeight:"64px", width:"auto"}} src={icon} /></div>
                    </div>)

            })}
        </Masonry>
    </div>
</div>
      )
    }
}

