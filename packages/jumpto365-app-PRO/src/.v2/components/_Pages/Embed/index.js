import React, { Component } from 'react';
import PropTypes from 'prop-types'
import PageLayoutMain from '../../_Layouts/PageLayoutMain';
import PageHeader from '../../PageHeader';


import Jumpto365Service from '../../../services' 

import { ProgressIndicator } from 'office-ui-fabric-react/lib/ProgressIndicator';
import PageBody from '../../PageBody';
import { SpinButton } from 'office-ui-fabric-react';
import {
  ComboBox,
  Fabric,
  IComboBox,
  IComboBoxOption,
  mergeStyles,
  PrimaryButton,
  Toggle,
  SelectableOptionMenuItemType
} from 'office-ui-fabric-react/lib/index';

/**
 * Describe overall purpose of the component
 *
 * @export
 * @class ScenarioPage
 * @extends {Component}
 */
export default class EmbedPage extends Component {
  state = {height:600,width:800,table:""}
    static propTypes  = {
        // set it focus should not be set, usefull when generating design guide so that this component does not pull is focus
        nofocus : PropTypes.bool   
    }
    
    constructor(props) {
        super(props);
        
    }
    componentDidMount = () => {
      return  this.setState({
        loaded:true,
       
      })
  
      var jumpto365Service = new Jumpto365Service()


        jumpto365Service.getDialogue("docs/dialogues/embed" , this.props.language)



        .then(document => {
          this.setState({
            loaded:true,
            components: document.components
          })
        })
        .catch((error) => {
          this.setState({
            error: error.message
          })
        })
      }

  
    /**
     * Required method return the output of the component
     *
     * @returns
     * @memberof ScenarioPage
     */
    render() {
      var that = this
      function languageLink (text,language) {return {
        key:'/periodictable/'+language,
        text:text
    }}    

      var hasTenantVersions = this.props.context && this.props.context.isAuthenticated ? true : false
    
      var tableOptions = []


      if (hasTenantVersions){
        var domain = this.props.context.me.domain
        tableOptions.push({ key: 'Your tenants', text: 'Your tenants', itemType: SelectableOptionMenuItemType.Header })
        tableOptions.push({ key: '/@/'+domain+"/-", text: 'Default' })
      }

      tableOptions.push({ key: 'Translated version', text: 'Translated version', itemType: SelectableOptionMenuItemType.Header })

     
      tableOptions.push(languageLink("🇨🇿 Čeština","cs"))
      tableOptions.push(languageLink("🇩🇰 Dansk","da"))
      tableOptions.push(languageLink("🇩🇪 Deutsch","de"))
      tableOptions.push(languageLink("🇬🇧 English","en"))
      tableOptions.push(languageLink("🇪🇸 Español","es"))
      tableOptions.push(languageLink("🇫🇮 Suomi","fi"))
      tableOptions.push(languageLink("🇫🇷 Française","fr"))
      tableOptions.push(languageLink("🇮🇱 עִברִית","he"))
      tableOptions.push(languageLink("🇭🇺 Magyar","hu"))
      tableOptions.push(languageLink("🇮🇸 Íslensk","is"))
      tableOptions.push(languageLink("🇯🇵 日本語","ja"))
      tableOptions.push(languageLink("🇳🇱 Nederlandse","nl"))
      tableOptions.push(languageLink("🇳🇴 Norsk","no"))
      tableOptions.push(languageLink("🇵🇹 Português","pt"))
      tableOptions.push(languageLink("🇸🇪 Svenska","sv"))
      tableOptions.push(languageLink("🇺🇸 English","en"))
    
      const INITIAL_OPTIONS = [
        { key: 'Your license', text: 'Your license', itemType: SelectableOptionMenuItemType.Header },
        { key: 'on', text: 'Enabled' },
        { key: 'off', text: 'Disabled' },
        { key: 'Small Business', text: 'Small Business', itemType: SelectableOptionMenuItemType.Header },
        { key: 'Business Essentials', text: 'Business Essentials' },
        { key: 'Business', text: 'Business' },
        { key: 'Business Premium', text: 'Business Premium' },
        { key: 'divider', text: '-', itemType: SelectableOptionMenuItemType.Divider },
        { key: 'Header2', text: 'Enterprise', itemType: SelectableOptionMenuItemType.Header },
        { key: 'Enterprise E1', text: 'Enterprise E1' },
        { key: 'Enterprise E3', text: 'Enterprise E3' },
        { key: 'Enterprise E5', text: 'Enterprise E5' },
        { key: 'Enterprise F1', text: 'Enterprise F1' },
        { key: 'Header2', text: 'Educational', itemType: SelectableOptionMenuItemType.Header },
        { key: 'Edu A1', text: 'Edu A1' },
        { key: 'Edu A3', text: 'Edu A3' },
        { key: 'Edu A5', text: 'Edu A5' },
        { key: 'Header2', text: 'US Government', itemType: SelectableOptionMenuItemType.Header },
        { key: 'US Gov G1', text: 'US Gov G1' },
        { key: 'US Gov G3', text: 'US Gov G3' },
        { key: 'US Gov G5', text: 'US Gov G5' },
        { key: 'US Gov F1', text: 'US Gov F1' }
        
      ];
        if (this.state.error){
            return <div>{JSON.stringify(this.state.error)}</div>
        }
        if (!this.state.loaded){
            return <ProgressIndicator />
        }
        var that = this
        var query = ""
        var thispath =""
        if (this.state.appLauncherMode){
          query += ((query ? "&" : "?")  + "appLauncher=1")
        }

        if (this.state.licenseFilter){
          switch (this.state.licenseFilter) {
            case "on":
            query += ((query ? "&" : "?")  + `mylicenses=1`)
              break;
              case "off":
              
                break;
            default:
            query += ((query ? "&" : "?")  + `licenseFilter=${this.state.licenseFilter}`)
            break;
          }
          
        }

        if (this.state.table){
          thispath = this.state.table 
        }

        var url = `https://pro.jumpto365.com${thispath}` + query
        const code = `<center><iframe id="#periodictable" src="${url}" style="overflow:hidden;border-style: hidden;" width="${this.state.width}" height="${this.state.height}"></iframe></center>`
    
        return (

            <PageLayoutMain>
                  <PageHeader title="Embedding" color="#2a7ab9"/>
                  <PageBody>
                    

             
            


          
  

               
              <div style={{display:"flex"}}>
              <div style={{margin:"16px",width:"200px",maxWidth:"200px"}}>
  Table
  <ComboBox
            placeholder="Select a table variant"
            allowFreeform
            xdefaultSelectedKey={this.state.table}
            selectedKey={this.state.table}
            autoComplete="on"
            options={tableOptions}
            componentRef={this._basicComboBox}
            onChanged={(option, pendingIndex, licenseFilter) =>{
              
              that.setState({table:option.key})
            }
            }
          />

                </div>   
             

                <div style={{margin:"16px",width:"200px",maxWidth:"200px"}}>
  License filter
  <ComboBox
            placeholder="Apply a license filter"
            defaultSelectedKey="C"
            xlabel="Single-select ComboBox (uncontrolled, allowFreeform: T, autoComplete: T)"
            allowFreeform
            value={this.state.licenseFilter}
            autoComplete="on"
            options={INITIAL_OPTIONS}
            componentRef={this._basicComboBox}
            onFocus={() => console.log('onFocus called for basic uncontrolled example')}
            onBlur={() => console.log('onBlur called for basic uncontrolled example')}
            onMenuOpen={() => console.log('ComboBox menu opened')}
            onChanged={(option, pendingIndex, licenseFilter) =>{
              
              that.setState({licenseFilter:option.key})
            }
            }
          />

                </div>       
                <div style={{margin:"16px",width:"100px"}}>
              Height
                <SpinButton value={this.state.height} min={200} max={1000} step={50}  
                  onDecrement={(v)=>{
                    if (v < 200) return
                    var newValue = parseInt(v)-50
                    this.setState({height:newValue})
                    return newValue}} 
                  onIncrement={(v)=>{
                    if (v > 1000) return
                      var newValue = parseInt(v)+50
                      this.setState({height:newValue})
                      return newValue}}   />
            </div>



  <div style={{margin:"16px",width:"100px",maxWidth:"100px"}}>
  Width
  <SpinButton value={this.state.width} min={200} max={1000} step={50}  
                  onDecrement={(v)=>{
                    if (v < 200) return
                    var newValue = parseInt(v)-50
                    this.setState({width:newValue})
                    return newValue}} 
                  onIncrement={(v)=>{
                     if (v > 1000) return
                      var newValue = parseInt(v)+50
                      this.setState({width:newValue})
                      return newValue}}   />
                </div>       
{/* <div style={{margin:"16px",width:"200px",maxWidth:"200px"}}>
  App Launcher Mode (PREVIEW)
<Toggle
          defaultChecked={false}
          value={this.state.appLauncherMode}
          onText="On"
          offText="Off"
          onFocus={() => console.log('onFocus called')}
          onBlur={() => console.log('onBlur called')}
          onChange={(e,v)=>{
            
            this.setState({appLauncherMode:v})}
            
            }
        />

</div> */}


              </div>
             
              <div style={{display:"flex"}}>
              
              
              
              
              <div style={{margin:"16px",width:"300px",minWidth:"300px"}}>
              <p>  The Periodic Table of Office 365 can be embedded into other pages using the following embed code:

   </p>

              <textarea readOnly="readonly" autoFocus={true} id="embedCode" style={{width:"100%",resize:"none",height:"120px"}} className="embedcode" value={code}></textarea>
             <a href={url} target="_blank">{url}</a>
             
             
              <h3>Embedding in SharePoint Online?</h3>
<p>Remember to check HTML Field Security settings!</p>
<p>

Specify whether contributors can insert external iframes in Embed web parts on pages in this site. Iframes are commonly used on Web pages to show dynamic content from other web sites, like directions from a mapping site, or a video from a video site.

When using the list of allowed domains, note that all subdomains of the allowed domains are automatically trusted.

These settings do not affect content placed in HTML Fields and Script Editor web parts. Users are permitted to insert iframes from default safe domains into HTML Fields and Script Editor web parts.
</p>

              </div>
              <div><iframe src={url} style={{width:`${this.state.width}px`,height:`${this.state.height}px`}}/></div>
              </div>
              
                </PageBody>
            </PageLayoutMain>

        )
    }
}

