import React from 'react';
import PropTypes from 'prop-types'
import omit from 'lodash.omit';
import objectAssign from 'object-assign';
import  './servicedetails.css'
import _ from 'lodash'

import Marked from 'marked'
import fm from 'front-matter'
import { CompoundButton,DefaultButton, IButtonProps } from 'office-ui-fabric-react/lib/Button';
import PeriodicTableofOffice365 from '../../pages/Beta/PeriodicTableofOffice365'
import { ScrollablePane } from 'office-ui-fabric-react/lib/ScrollablePane';
import { Sticky, StickyPositionType } from 'office-ui-fabric-react/lib/Sticky';
import $ from "jquery"
import PTO365STORE from '../../util/PTO365STORE'
import {Services} from '../../util/index'

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

class   AreaDetails extends React.Component {
  static propTypes = {
    appkey: PropTypes.string.isRequired,
    /**
     * Reference to raw Markdown file
     */
    src: PropTypes.string,
    title: PropTypes.string,
    /**
     * URL to picture
     */
    image: PropTypes.string,
    /**
     * The color for the background
     *
     * @see See [Wikipedia](https://en.wikipedia.org/wiki/Web_colors#HTML_color_names) for a list of color names
     * @see See [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value) for a list of color names
     */
    color: PropTypes.string,
    language:PropTypes.string,
    linkLanguage: PropTypes.string
  }
  constructor(props) {
    super(props);
    that = this
    this.state = {
      PTO:props.appkey ,
      height:"100px",
      pto365height:this.calcPtoHeight(),
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
    if (width < 300) return (width/6)
    if (width > 1100) return (1100/5)
    return (width/5)
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
        content.body = "#Error loading page data\n>Try opening in Full Screen\n"+ error
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
    this.setState({width: $(window).width(), height: $(window).height(),pto365height:this.calcPtoHeight()});
    
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

          pto365height: this.calcPtoHeight(),
          src: this.props.src,
          key: PTO365STORE.service.service,
          title: service.title,
          image: service.image,
          color: "#c0c0c0",
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
    window.addEventListener("resize", this.updateDimensions);
    var url = this.state.src
    //url = url.replace("https://hexatown.github.io","https://hexatown.azureedge.net")
    //url = url.replace("https://hexatown.github.io","https://hexatowndocs.blob.core.windows.net")
    url = url.replace("https://hexatown.github.io/docs/","https://raw.githubusercontent.com/Hexatown/docs/master/")
    
    url += "/index.md"
    this.getMarkDown(url,this.parse)
    //this.getGitHub("https://raw.githubusercontent.com/Hexatown/docs/master/microsoft/licenses/index.md",this.parseGit)

  }
componentWillUnmount= () =>  {
    window.removeEventListener("resize", this.updateDimensions);
}

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
  render() {
    var displayMode = "block"
    if (!this.state.isSameLanguage){
      displayMode = "none"
    }
    displayMode = "block"
    const url = this.props.src
    //const url = "/frame.html"
    

      var renderer = new Marked.Renderer()
      renderer.heading = function (text, level) {
        var escapedText = text.toLowerCase().replace(/[^\w]+/g, '-');
       
        return '<h' + level + ' class="ms-font-l"><a name="' +
                      escapedText +
                       '" class="anchor " href="#' +
                       escapedText +
                       '"><span class="header-link"></span></a>' +
                        text + '</h' + level + '>';
      };


      var html = this.state.md ? Marked(this.state.md,{renderer:renderer}) : null
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
      licenseInfo.push(<div><h2>Licensing</h2></div>)
      

      if (this.state.serviceDetails.licenses.yes.length > 0)  licenseInfo.push(<div><h3>Included in</h3></div>)
      this.state.serviceDetails.licenses.yes.forEach(license => {
        licenseInfo.push(<div>{JSON.stringify(license)}</div>)
      });
      if (this.state.serviceDetails.licenses.soon.length > 0) licenseInfo.push(<div><h3>Coming to</h3></div>)
      this.state.serviceDetails.licenses.soon.forEach(license => {
        licenseInfo.push(<div>{JSON.stringify(license)}</div>)
      });
    }
    else
    {
      if (this.state.serviceDetails && this.state.serviceDetails.licenseKey === "FREE"){
        licenseInfo.push(<div><h2>Licensing</h2></div>)
        licenseInfo.push(<div><h3>Free</h3></div>)
      }
    }
    return (

      <div style={{ height: this.state.height }} >
        <ScrollablePane>

            <div className='ms-modalExample-header InfoProductTitle ' style={style}>
              <div class="ms-Grid" style={{ marginLeft: "10px" }}>
                <div class="ms-Grid-row">
                  <div class="ms-Grid-col ms-sm6 ms-md6 ms-lg6">
                    <span className="InfoProductTitleText">{titleNoHtml}</span>
                  </div>
                  <div class="ms-Grid-col ms-sm6 ms-md6 ms-lg6">
                    <div style={{ right: "20px", top: "16px", position: "absolute" }}>



                    </div>
                  </div>
                </div>
              </div>
            </div>
      
          <div class="ms-Grid" style={{ marginLeft: "10px" }}>
            <div class="ms-Grid-row">
              <div class="ms-Grid-col ms-sm6 ms-md7 ms-lg8">

                <div id="iframeLoader" className="ms-font-m" dangerouslySetInnerHTML={{ __html: html }}></div>
              </div>
              <div class="ms-Grid-col ms-sm6 ms-md5 ms-lg4">

                <div class="ms-Grid" >
                  <div class="ms-Grid-row">
                    <div class="ms-Grid-col ms-lg12">
                      <div style={{ clear: "both", marginLeft: "-20px",marginTop:"20px" }}>

                        <div className="ptominiature" style={{}}>
                          <PeriodicTableofOffice365 onChangeService={this.props.onChangeService} language={this.state.language} onRender={this.onRenderPTO} />

                        </div>
                        <div onClick={this.gotoRoot} style={{ cursor: "pointer",width:"100%",position:"relative", zIndex:"10000", backgroundColor:"#00000000", border:"0px solid red",  height: this.state.pto365height }}>&nbsp;
                    </div>

                      </div>

                      <div style={{ marginTop:"25px", align: "right" }}>
                      
                      </div>
                      <div>
                        {licenseInfo}
                      
                      
                      </div>


                    </div>
                  </div>
                  <div class="ms-Grid-row">
                    <div class="ms-Grid-col ms-lg12">



                    </div>
                  </div>
                </div>
              </div>
            </div>


            <a href={url} target="_blank">Full screen</a>
            {JSON.stringify(this.state.mdError)}

          </div>
          <div style={{height:"60px"}}></div>
        </ScrollablePane>
      </div>);
  }
}

// ResizerManagedIframe.propTypes = {
//   id: React.PropTypes.string.isRequired,
//   children: React.PropTypes.node,
//   src: React.PropTypes.string,
//   options: React.PropTypes.object,
// };

AreaDetails.defaultProps = {
  options: {},
};

export default AreaDetails;