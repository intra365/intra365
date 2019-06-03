import React from 'react';
import omit from 'lodash.omit';
import objectAssign from 'object-assign';
import  './servicedetails.css'
import _ from 'lodash'

import Marked from 'marked'
import fm from 'front-matter'
import { CompoundButton,DefaultButton, IButtonProps } from 'office-ui-fabric-react/lib/Button';
import PeriodicTableofOffice365 from '../../pages/Beta/PeriodicTableofOffice365'
import { ScrollablePane } from 'office-ui-fabric-react/lib/ScrollablePane';
import $ from "jquery"
import PTO365STORE from '../../util/PTO365STORE'
import {Services,FastTrack} from '../../util/index'
import { RING,isAuthenticated,userName,userId } from '../Auth'
import { Grid, Header,Item, Image, Rail, Segment, Sticky,  Accordion, Icon } from 'semantic-ui-react'
import LicenseInfo from './LicenseInfo'
import { Dropdown, IDropdown, DropdownMenuItemType, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
const Placeholder = () => <Image src='/assets/images/wireframe/paragraph.png' />

var parser = require("../../util/parsemarkdown")

//var unirest = require("unirest");
var axios = require("axios")

var that = null

class LinkTo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {link : props.url}
  }


  goto = ()=> {
    var link = this.state  ? this.state.link : null
    if (!link) {return}else{
    window.location.href = link}
  }
  render() {
    var displayMode = "block"
    return (
<div>
      <CompoundButton
      primary={ false }
      description={this.props.description}
      disabled={ false }
      checked={ false }
      onClick={this.goto}
    >
      {this.props.title}
    </CompoundButton>
</div>    
    )
  }  
}

export default class   ServiceDetails extends React.Component {
  
  constructor(props) {
    super(props);
    that = this
    this.state = {
      PTO:props.appkey ,
      height:"100px",
      pto365height:"100",
      src : props.src,
      key : props.appkey,
      title: props.title,
      image: props.image,
      color: props.color,
      status: "new",
      language : this.props.language,
      linkLanguage : this.props.linkLanguage,
      isSameLanguage : this.props.language === this.props.linkLanguage,
      serviceDetails : Services.get(props.appkey)
    }
    
    console.log("servicedetails initital state",this.state)
    
  }
  calcPtoHeight = () => {
    var width = $(window).width()
    this.setState({w:width})
    var h = $(".pto365").innerHeight()
    return h*0.35
    console.log(h)
// PTO breaks at 374,  500 

    if (width < 375) return (width/6)
    if (width < 501 ) return (width/5)
    if (width > 1100 ) return (1100/5)

    return (width/4.25)
    
  }
  parseGit = (error,md) => { 
       if(error){
    this.setState({gitattributes :null,git:null,gitError:error})
  }
  else
  {
    
    var content = {}
    try {
     content = parser(md)
    } catch (error) {
      content.body = "#Error loading page data\n>Try opening in Full Screen\n"+ error
    }
     

  this.setState({ gitattributes : content.properties,
    git : content.body})


  }
}

  parse = (error,md,state) => {    if(error){
      this.setState({mdattributes :null,md:null,mdError:error})
    }
    else
    {
      
      var content = {}
      try {
       content = parser(md)
      } catch (error) {
        content.body = "#Error loading page data: "+ error
      }
       
    var newStateObject = state ? state : {}
    newStateObject.mdattributes  = content.properties
    newStateObject.md  = content.body
    this.setState(newStateObject)


    }
  }

  getMarkDown = (url,cb) => {
    axios.get(url)
    .then(function (response) {
      cb(null,response.data);
    })
    .catch(function (error) {
      cb(error);
    });
  }

  getMarkDown2 = (url,language,cb) => {
    if (RING(1,'Try getting translated version')){
    if (language && language!=="en"){
      url += ("/" + language + ".md")
    }else{
      url += "/index.md"
    }
    }else
    {
      url += "/index.md"
      
    }
    axios.get(url)
    .then(function (response) {
      cb(null,response.data);
    })
    .catch(function (error) {
      cb(error);
    });
  }
  
  getGitHub = (url,cb) => {
    axios.get(url)
    .then(function (response) {
      cb(null,response.data);
    })
    .catch(function (error) {
      cb(error);
    });
  }
  
  updateDimensions = () => {
    this.setState({width: $(window).innerWidth(), height: $(window).innerHeight()-40,pto365height:this.calcPtoHeight()});
    
}
  componentWillUpdate = () => {
    console.log("servicedetails componentWillUpdate")
    if (PTO365STORE && PTO365STORE.service && PTO365STORE.service.service) {
      console.log("PTO365STORE",PTO365STORE.service.service)
      console.log("this.state.PTO",this.state.PTO)
      if (this.state.PTO !== PTO365STORE.service.service) {
        var service = Services.get(PTO365STORE.service.service)
        if (!service.key) return
        
        var url = service.link.replace("https://hexatown.github.io/docs/","https://raw.githubusercontent.com/Hexatown/docs/master/")
        url += "/index.md"
        var newState = {
          PTO: PTO365STORE.service.service,

          
          src: this.props.src,
          key: PTO365STORE.service.service,
          title: service.title,
          image: service.image,
          color: service.color,
          status: "new",
          language: this.props.language,
        }
        this.setState(newState)
        //this.getMarkDown(url,this.parse,newState)
    
        
      }
    }

}
componentWillMount= () =>  {
    this.updateDimensions();
}
componentDidMount= () =>  {
  this.updateDimensions();
  window.addEventListener("resize", this.updateDimensions);
    var url = this.state.src
    //url = url.replace("https://hexatown.github.io","https://hexatown.azureedge.net")
    //url = url.replace("https://hexatown.github.io","https://hexatowndocs.blob.core.windows.net")
    url = url.replace("https://hexatown.github.io/docs/","https://raw.githubusercontent.com/Hexatown/docs/master/")
    
    //url += "/index.md"
    this.getMarkDown2(url,this.props.language, this.parse)
    //this.getGitHub("https://raw.githubusercontent.com/Hexatown/docs/master/microsoft/licenses/index.md",this.parseGit)

  }
componentWillUnmount= () =>  {
    window.removeEventListener("resize", this.updateDimensions);
}
handleContextRef = contextRef => this.setState({ contextRef })

 gotoRoot = () => {
  window.location="#"
 }
 goto = ()=> {
  var link = this.state && this.state.mdattributes ? this.state.mdattributes.link : null
  if (!link) {return}else{
  window.location.href = link
}
 }

 onRenderPTO = () => {
   if (that && that.state && that.state.key ){
  return ["service-"+that.state.key]
}else
{
  return null
}
 }
 fixProductivitylibraryLink = (link) => {
   return link.replace("https://fasttrack.microsoft.com/microsoft365/productivitylibrary/","https://www.microsoft.com/en-US/microsoft-365/success/productivitylibrary/")
 }
 handleClick = (e, titleProps) => {
  const { index } = titleProps
  const { activeIndex } = this.state
  const newIndex = activeIndex === index ? -1 : index

  this.setState({ activeIndex: newIndex })
}
 copyArray = (array) => {
  const newArray = [];
  for (let i = 0; i < array.length; i++) {
    newArray[i] = array[i];
  }
  return newArray;
}
  onChangeselectedUseCaseCategories = (item) => {
  const updatedSelectedItem = this.state.selectedUseCaseCategories ? this.copyArray(this.state.selectedUseCaseCategories) : [];
  if (item.selected) {
    // add the option if it's checked
    updatedSelectedItem.push(item.key);
  } else {
    // remove the option if it's unchecked
    const currIndex = updatedSelectedItem.indexOf(item.key);
    if (currIndex > -1) {
      updatedSelectedItem.splice(currIndex, 1);
    }
  }
  this.setState({
    selectedItems: updatedSelectedItem
  });
}
  render() {
    var displayMode = "block"
    const { activeIndex } = this.state
    const { contextRef } = this.state
    if (!this.state.isSameLanguage){
      displayMode = "none"
    }
    displayMode = "block"
    const url = this.props.src
    //const url = "/frame.html"
    

      var renderer = new Marked.Renderer()
      renderer.heading = function (text, level) {
        var escapedText = text.toLowerCase().replace(/[^\w]+/g, '-');
       
        return '<h' + level + ' className="ms-font-l"><a name="' +
                      escapedText +
                       '" className="anchor " href="#' +
                       escapedText +
                       '"><span className="header-link"></span></a>' +
                        text + '</h' + level + '>';
      };


      var html = this.state.md ? Marked(this.state.md,{renderer:renderer}) : '<img src="/assets/images/wireframe/paragraph.png" style="width:100%;height:auto"/>' // <img src="/assets/images/wireframe/paragraph.png" />

      var link = this.state && this.state.mdattributes ? this.state.mdattributes.link : null
      var disabled = link ? false : true
      var checked=false
      var properties = this.state ? this.state.mdattributes : null

      var buttons = []
      if (properties){
        buttons.push ({ name:"Administrator", icon:"Info", description:"Relevant for administrators",target:"_blank", href:properties.linkadmin, disabled:!properties.linkadmin} )
        buttons.push ({ name:"Developer", icon:"Info", description:"Relevant for developers",target:"_blank",href:properties.linkdev, disabled:!properties.linkdev} )
        buttons.push ({ name:"PowerShell", icon:"Info", description:"Relevant for PowerShell",target:"_blank",href:properties.powershell, disabled:!properties.powershell} )
        buttons.push ({ name:"Marketing", icon:"Info", description:"Relevant for Marketing",target:"_blank",href:properties.marketing, disabled:!properties.marketing} )

    }
    function nohtml(title) {
      if (title) {
          return title ? title.replace("\\n", " ") : "";
      }
  }
  
    const titleNoHtml = nohtml(this.state.title);

    const img = this.state.image ? require("../../components/PeriodicSystem/media/" + this.state.image) : ""
    const style = {
      backgroundColor: this.state.dimmed ? "#aaaaaa" : this.state.color,
      cursor: this.state.image ?  "pointer" : "default",
      height:"64px",
      width:"100%"
  }
  var licenseInfo = []
    
  
    if (this.state.serviceDetails && this.state.serviceDetails.licenses) {
      licenseInfo.push(<div><h2 className="ms-font-xl">Licensing</h2></div>)
      
      licenseInfo.push(<LicenseInfo title="Included in" licenses={this.state.serviceDetails.licenses.yes} />)
      licenseInfo.push(<LicenseInfo title="Coming to" licenses={this.state.serviceDetails.licenses.soon} />)
    }
    else
    {
      if (this.state.serviceDetails && this.state.serviceDetails.licenseKey === "FREE"){
        licenseInfo.push(<div><h2 className="ms-font-xl">Licensing</h2></div>)
        licenseInfo.push(<div><h3 className="ms-font-l">Free</h3></div>)
      }
    }

    var useCases = []
    var selectedUseCaseCategories = []
    var tool = FastTrack.appToTool(this.state.key)
    if (tool){
    var fastTrackuseCases = FastTrack.useCases(tool.fasttrack)

    if (fastTrackuseCases){
      
      _.sortBy(fastTrackuseCases,"Title").map((useCase,index) => {
        useCases.push(
        <div>
        <Accordion.Title active={activeIndex === index} index={index} onClick={this.handleClick}>
        <Icon name='dropdown' />
        {useCase.Title}

      </Accordion.Title>
      <Accordion.Content active={activeIndex === index}>
          <p>{useCase.Details}</p>
          <p><a href={this.fixProductivitylibraryLink(useCase.Link)} target="_blank">Productivity Library</a> [Microsoft]</p>
      </Accordion.Content>
</div>)

      })
    }
  }
    
    var useCaseMarkup = !RING(1,'Include usecases') ? null :
    
      <div>
        <h1 className="ms-font-xl">Use Cases</h1>
        <b>Experimental - Values in the dropdown is not used for filtering the Accordion of usecases </b>
        <Dropdown
          placeHolder='Select options'
          label='Industry:'
          selectedKeys={ this.state.selectedUseCaseCategories }
          onChanged={ this.onChangeselectedUseCaseCategories }
          multiSelect
          options={
            [
              { key: 'Header4', text: 'Industry', itemType: DropdownMenuItemType.Header },
              { key: 'Hospitality', text: 'Hospitality' },
              { key: 'RETAIL', text: 'Retail' },
              { key: 'HUMAN RESOURCES', text: 'Human Resources' },
              { key: 'COMMUNICATION & MEDIA', text: 'Communication & Media' },
              { key: 'Operations', text: 'Operations' },
              { key: 'FINANCIAL SERVICES', text: 'Financial Services' },
              { key: 'MANUFACTURING', text: 'Manufacturing' },
              { key: 'SALES', text: 'Sales' },
              { key: 'Marketing', text: 'Marketing' },
              { key: 'Header5', text: 'Tools', itemType: DropdownMenuItemType.Header },

            ]
          }
        />
        <Accordion fluid styled>
        {useCases}
    </Accordion>
    </div>



    return (
      <div >
      
      
          <div className='ms-modalExample-header InfoProductTitle ' style={style}>
            <div className="ms-Grid" style={{ marginLeft: "10px" }}>
              <div className="ms-Grid-row">
                <div className="ms-Grid-col ms-sm6 ms-md6 ms-lg6">
                  <img className="InfoProductImage" src={img} alt="" /> <span className="InfoProductTitleText">{titleNoHtml}</span>
                 
                </div>
                <div className="ms-Grid-col ms-sm6 ms-md6 ms-lg6">
                  <div style={{ right: "20px", top: "16px", position: "absolute" }}>
      
      
                    <DefaultButton
                      primary={true}
                      data-automation-id='test'
                      disabled={disabled}
                      checked={checked}
                      text="Start"
                      href={link}
                      target="_blank"
                      style={{ minWidth: '120px' }}
                    />
      
                  </div>
                </div>
              </div>
            </div>
          </div>
      
        <div className="ms-Grid" style={{ marginLeft: "10px" }}>
          <div className="ms-Grid-row">
            <div className="ms-Grid-col ms-sm6 ms-md7 ms-lg8">
            
              <div id="iframeLoader" className="ms-font-m" dangerouslySetInnerHTML={{ __html: html }}></div>
      
            </div>
            <div className="ms-Grid-col ms-sm6 ms-md5 ms-lg4">
      
              <div className="ms-Grid" >
                <div className="ms-Grid-row">
                  <div className="ms-Grid-col ms-lg12">
                    <div style={{ clear: "both", marginLeft: "-20px",marginTop:"20px" }}>
      
                      <div className="ptominiature" style={{}} >
                        <PeriodicTableofOffice365 id="ptomini" onChangeService={this.props.onChangeService} language={this.state.language} onRender={this.onRenderPTO} />
      
                      </div>
                      <div onClick={this.gotoRoot} style={{ cursor: "pointer",
                      width:"100%",
                      position:"relative", 
                      zIndex:"10000", 
                      backgroundColor:"#00000000", 
                      border:"0px solid red",  
                      height: this.state.pto365height }}>
                      &nbsp;
                  </div>
      
                    </div>
      
                    <div style={{ marginTop:"25px", align: "right" }}>
                      <DefaultButton
                        primary={false}
                        data-automation-id='test'
                        disabled={false}
                        checked={false}
                        text="Links"
                        icon="Mail"
                        split={true}
                        style={{ minWidth: '120px' }}
                        menuProps={{ items: buttons }}
                      />
                    
                    </div>
                    <div>
                      {licenseInfo}
                      
                    
                    </div>
      
      
                  </div>
                </div>
                <div className="ms-Grid-row">
                  <div className="ms-Grid-col ms-lg12">
      
      
      
                  </div>
                </div>
              </div>
            </div>
            <div className="ms-Grid-col ms-lg12">
            {useCaseMarkup}

            </div>
          </div>
      
      
          
          {JSON.stringify(this.state.mdError)}
      
        </div>
        
      
      </div>
      );
  }
}

// ResizerManagedIframe.propTypes = {
//   id: React.PropTypes.string.isRequired,
//   children: React.PropTypes.node,
//   src: React.PropTypes.string,
//   options: React.PropTypes.object,
// };

ServiceDetails.defaultProps = {
  options: {},
};



