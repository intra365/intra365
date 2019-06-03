import React, { Component } from 'react';
import PropTypes from 'prop-types'
import PageLayoutMain from '../../_Layouts/PageLayoutMain';
import PageHeader from '../../PageHeader';
import Jumpto365Service from '../../../services' 
import PeriodicTableofOffice365 from '../../../../pages/Beta/PeriodicTableofOffice365'
import ReactPlacerHolder from 'react-placeholder'
import { CommandBar } from 'office-ui-fabric-react/lib/CommandBar';
import TextBlock from 'react-placeholder/lib/placeholders/TextBlock'
import { Link } from "@reach/router"
import "react-placeholder/lib/reactPlaceholder.css";
import _ from "lodash"
import Utility from "../../../utilities"
import { PivotLinkSize, PivotLinkFormat, PivotItem, Pivot } from 'office-ui-fabric-react/lib/Pivot';
import PropertyList from '../../PropertyList';
import ToolScenarioDetails from '../../ToolScenarioDetails';
import ToolImage from '../../ToolImage'
import PeriodicTable from '../../PeriodicTable';
import $ from "jquery"
import "./tool.css"
import PageBody from '../../PageBody';
import Jumpto365App from '../../_Contexts/Jumpto365App';
import Data from '../../_Data';
//import { Document, Page, Text, View, StyleSheet } from '@react-pdf/react-pdf/dist/react-pdf.browser.es.js';

/**
 * Describe overall purpose of the component
 *
 * @export
 * @class UsecasePage
 * @extends {Component}
 */
export default class UsecasePage extends Component {
    
    static propTypes  = {
        language : PropTypes.string,
        name : PropTypes.string.isRequired,
        technology : PropTypes.string,
        domain : PropTypes.string,
        isMobile : PropTypes.string
        
    }
    jumpto365Service = null
   state = {width:100}

    constructor(props) {
        super(props);
        
        this.state = {
            ready:false,
            
            body: <div style={{height:"80%"}} ></div>,
            
        } 
     
    
    }

    _load = () => {
        
        this.setState({ready:false,grid:null})
        var appData = this.jumpto365Service.getApp(this.props.name)

        this.jumpto365Service
        .getJSON(this.props.domain,`${this.props.technology}/usecases`)
        .then(usecase=>{

            var tasks0 =  Utility.GroupTasksBySubject( usecase.tasks)  
            var tasks = Utility.EnsureNameAndApplyKeyValue(tasks0)
    
            
            this.data = new Data()

            var tools = usecase.tools ? usecase.tools : this.state.tools
            var areas = usecase.areas ? usecase.areas : this.state.areas
            
            var task = _.find(tasks,{"subject":this.props.name})

            var focusedtools = task && task.tools ? task.tools.map(t=>{return t.name}) : []

            this.setState({
                foundScenario : true,
                focusedtools,
                task,
                tasks,
                tools,areas,
                originalTasks:tasks,
                scenarioTitle:usecase.title})
        })
        .catch(e=>{
            Jumpto365App.emitError(this,e,"Which tool when loader")
        })

        this.jumpto365Service
        .getUseCaseDocument(this.props.name,this.props.language,this.props.domain,this.props.technology)
        .then(document=>{ 

        
            var contexts = document.properties.contexts ? document.properties.contexts.split(",") : ["office365"] 
            if (contexts){
                this.jumpto365Service.getContext(contexts[0],this.props.language)
                .then(context => {
                    this.setState({grid: context.grid})
                })
                .catch(error => {
                    this.setState({warnings : (this.state.warnings ? this.state.warnings  : []).push(error)} )
                })
            }

            var title = document.properties.title ? document.properties.title : this.state.title
            this.setState({document,
                body:document.body,
                color: document.properties.color ? document.properties.color : this.state.color != null ? this.state.color : "#666666" ,
                icon: document.properties.icon ? document.properties.icon : this.state.icon ,
                inshort: document.properties.inshort,
                byline:  document.properties.byline ,// ? document.properties.byline : "Matt Wade (@thatmattwade)",
                imageurl:  document.properties.imageurl ,//? document.properties.imageurl : "https://placeimg.com/800/240/any",
                imagecopyright:  document.properties.imagecopyright ? document.properties.imagecopyright : "All rights reserved to the copyright owner",
                previewer : document.properties.previewer ,
                
                ready:true,
                title})
        }
        )
        .catch(err=>{
            this.setState({
                body: null,
                documentError: err && err.response ?  err.response.data : err,
                ready:true})
        })


        
        
        this.setState({
        
            color:"#333333",
            icon:"https://jumpto365.com/resources/images/app/jumpto365-Icon-white.png"
        })
    }

    componentDidUpdate = (previousProps, previousState) => {

        if (previousProps.name !== this.props.name){
          this._load()
        }
        
      }

    componentDidMount() {


        
        this.jumpto365Service = new Jumpto365Service()
        
        this._load()
        window.addEventListener("resize", this.updateDimensions);
        this.updateDimensions()
     
    }
    updateDimensions = () => {
        //this.setState({ });
        var win = $(window)
        var h = win.height()
        var mastHead = $("#header")
        var pageHead = $("#pageheader")

        $("iframe").attr("height","100px")
        this.setState({
            
            
            height:h - 40 -  (mastHead ? mastHead.height() : 0) - (pageHead ? pageHead.height() : 0),
            width:(pageHead ? pageHead.width() : 1200)
        });


    }


    componentWillUnmount = () => {
        window.removeEventListener("resize", this.updateDimensions);
    }

    
    /**
     * Required method return the output of the component
     *
     * @returns
     * @memberof UsecasePage
     */
    render() {

        let pivotProperties = !this.state.document ? 1 :       
            <PivotItem linkText="Properties"><div style={{margin:"10px",overflowY:"auto"}}>
              <PropertyList title="Properties" properties={_.toPairs(this.state.document.properties)} /> 
              </div>
             </PivotItem>
        let pivotLink = this.state.document && this.state.document.sourceUrl ?  
        <PivotItem linkText="Source"><div style={{margin:"10px"}}>
        <a href={this.state.document.sourceUrl} >GitHub</a></div>
        </PivotItem>     
        : 1 // null is an object, and <Pivot checks on the type of children

   

        let inshort = this.state.inshort ?  <div className="ms-font-xl" style={{marginBottom:"10px"}} >   {this.state.inshort}</div> : null
        let byline = this.state.byline ?  <div className="ms-font-l" style={{marginBottom:"0px"}} >   By: {this.state.byline}</div> : null
        let headings = this.state.document && this.state.document.headings ?  this.state.document.headings.map((heading,ix)=>{
            return <div><a href={`#${heading.escapedText}`}>{heading.xlevel} {heading.text}</a></div>
        }) : null
        

        var nodocument = this.state.documentError  && this.state.foundScenario ? <div>
            
            {JSON.stringify(this.state.task)}
            {this.state.documentError}

        </div>: null

        var copyrightNotice = this.state && this.state.document && this.state.document.properties && this.state.document.properties.linkfasttrack ? 
        <div style={{xtextAlign:"center"}}>
        Content of this document is property of Microsoft&trade; sourced from <a href={this.state.document.properties.linkfasttrack} target="_blank">source</a>
        </div>
        : null


        copyrightNotice =  this.state && this.state.document && this.state.document.properties && this.state.document.properties.externalref ?    <div style={{xtextAlign:"center"}}>
        Content of this document is property of {this.state.document.properties.copyright}&trade; sourced from <a href={this.state.document.properties.externalref} target="_blank">source</a>
        </div> : copyrightNotice
        return (
            <div>
                {this.props.isMobile &&
            <PageLayoutMain>
                <PeriodicTable focusedtools={this.state.focusedtools}  width={this.state.width} height={this.state.height/2} grid={this.state.grid} language={this.props.language}/>

                <PageHeader icon={this.state.icon} title={this.state.title} color={this.state.color} />
                <Toolbar onCreatePDF={this.onCreatePDF}/>
                 <PageBody>
                    <div className="ms-Grid" >
                        <div className="ms-Grid-row " >
                            <div className="ms-Grid-col ms-sm12  " style={{minHeight:"400px",  marginTop:"-8px" ,borderRight:"1px solid #cccccc"}}  >
                            <ReactPlacerHolder delay={1000} type='text' showLoadingAnimation  rows={7} ready={this.state.ready}>
                            <div style={{height:"16px"}}>&nbsp;</div>
                            {inshort}
                        
                        {byline}
                        { (inshort || byline) && 
                        <div style={{height:"16px",borderTop:"1px solid #777777",marginTop:"4px"}}>&nbsp;</div>
                        }
                        {this.state.previewer && this.state.previewer === "pto" && 
                            <PeriodicTable width={this.state.width/1.5} height={this.state.height} />
                        }

                        {!this.state.previewer  && 
                            <ToolImage imageurl={this.state.imageurl} copyright={this.state.imagecopyright}/>
                        }
                        {nodocument}
                        <div className="ms-font-m toolbody" 
                        
                        dangerouslySetInnerHTML={{ __html: this.state.body }}></div> 
                        </ReactPlacerHolder >    
                            </div>
                            
                        
                        </div>
                        
                    </div>
                    <div>
                        <div >
                        
                            {this.props.scenario &&
                            <div style={{marginTop:"10px",marginLeft:"8px"}}>
                                <div className="ms-font-l">Scenario</div>
                                <Link to={`/scenario/${this.props.technology}/${this.props.domain}`} >Jump to "{this.props.domain}"</Link>
                                
                            </div>}
        

                        </div>
                        {this.state.scenario && 
                        <ToolScenarioDetails    domain={this.state.scenario.domain} 
                                                area={this.state.scenario.area} 
                                                name={this.state.scenario.subject} 
                                                language={this.state.language}   />
                        }
                        <Pivot linkFormat={PivotLinkFormat.links} linkSize={PivotLinkSize.normal}>
                            {pivotLink}
                            {pivotProperties}
                                
                        </Pivot>
                    </div>
                    {copyrightNotice}
                </PageBody>
            </PageLayoutMain>
            }
            {!this.props.isMobile &&
            <PageLayoutMain>
            <PageHeader icon={this.state.icon} title={this.state.title} color={this.state.color} />
<Toolbar onCreatePDF={this.onCreatePDF}/>
             <PageBody>
            <div className="ms-Grid" >
                <div className="ms-Grid-row " >
                    <div className="ms-Grid-col ms-sm8  " style={{minHeight:"400px",  marginTop:"-8px" ,borderRight:"1px solid #cccccc"}}  >
                    <ReactPlacerHolder delay={1000} type='text' showLoadingAnimation  rows={7} ready={this.state.ready}>
                    <div style={{height:"16px"}}>&nbsp;</div>
                    {inshort}
                
                {byline}
                { (inshort || byline) && 
                <div style={{height:"16px",borderTop:"1px solid #777777",marginTop:"4px"}}>&nbsp;</div>
                }
                {this.state.previewer && this.state.previewer === "pto" && 
             <PeriodicTable width={this.state.width/1.5} height={this.state.height} />
            }

            {!this.state.previewer  && 
                <ToolImage imageurl={this.state.imageurl} copyright={this.state.imagecopyright}/>
            }
                        {nodocument}
                <div className="ms-font-m toolbody" 
                
                dangerouslySetInnerHTML={{ __html: this.state.body }}></div> 
                </ReactPlacerHolder >    
                    </div>
                    <div className="ms-Grid-col ms-sm4"    >
                    <div >
                    <div className="xptominiature" style={{margin:"8px"}}  >
                        <PeriodicTable  focusedtools={this.state.focusedtools} width={this.state.width/3.4} height={this.state.height/3} grid={this.state.grid} language={this.props.language}/>
                        {/* <PeriodicTableofOffice365 id="ptomini" onChangeService={this.props.onChangeService} language={this.state.language} onRender={this.onRenderPTO} /> */}
                      </div>
                      
                    <div style={{marginTop:"10px",marginLeft:"8px"}}>
                        <div className="ms-font-l">Scenario</div>
                        <Link to={`/scenario/${this.props.technology}/${this.props.domain}`} >{this.state.scenarioTitle}</Link>
                        
                    </div>
      {headings && 
                      <div style={{marginTop:"10px",marginLeft:"8px"}}>
                        <div className="ms-font-l">Document links</div>
                        {headings}
</div>
}

                      </div>
                    {this.state.scenario && <ToolScenarioDetails domain={this.state.scenario.domain} area={this.state.scenario.area} name={this.state.scenario.subject} language={this.state.language}   />}
                    <Pivot linkFormat={PivotLinkFormat.links} linkSize={PivotLinkSize.normal}>
                    {pivotLink}
                       {pivotProperties}
                        
                     </Pivot>
                    </div>
                   
                </div>
                
            </div>
            {copyrightNotice}
            </PageBody>
            </PageLayoutMain>
            }
            </div>
        )
    }
}

class Toolbar extends Component { 

    static propTypes  = {
        about : PropTypes.string,
        language: PropTypes.string  
    }
    

        
         
        
          render() {
              return <div/>
        
            var lastLanguage = this.props.language ? this.props.language : "en"
          
            const farItems = [{
                key:"help",
                name: "Help",
                icon:"Info",
                disabled:true,
              }
            ]
        
            var items = [



            //   {
            //     key: "fioe",
            //     name: "File",
            //     disabled: false,

            //     subMenuProps: {
            //       items: [{
            //           key: 'open',
            //           name: 'Open',
            //           disabled: true,
            //         },
            //         {
            //           key: 'save',
            //           name: 'Save',
            //           disabled: true,
            //         },
            //         {
            //           key: 'saveas',
            //           name: 'Save as',
            //           disabled: true,
            //         }
            //       ]
            //     }
            //   },
              {
                key: "share",
                name: "Share", 
                icon: "Share",
                disabled: true,

              },
              {
                key: "download",
                name: "Download", 
                icon: "Download",
                disabled: false,
                subMenuProps: {
                    items: [{
                        key: 'pdf',
                        name: 'PDF',
                        icon : "PDF",
                        disabled: true,
                        onClick : this.props.onCreatePDF
                    },
                      {
                        key: 'word',
                        name : "Word",
                        icon: 'WordDocument',
                        disabled: true,
                      },
                      {
                        key: 'excel',
                        name : "Excel",
                        icon: 'ExcelDocument',
                        disabled: true,
                      }
                    ]
                  }
              }
            ]

            const overflowItems = []
            overflowItems.push({
              key: "rename",
              name: "Rename",
              icon: "Rename",
              disabled:true
             

            })
        
          
        
                  
  
            return (
              <div id="toolbar" style={{marginTop:"-8px",marginLeft:"-8px",marginRight:"-8px",marginBottom:"8px"}}>
        
                <CommandBar

                  isSearchBoxVisible={ false}
                  searchPlaceholderText='Search on this page (not implemented)'
                  elipisisAriaLabel='More options'
                  items={ items }
                //   overflowItems={ overflowItems }
                  farItems={ farItems }
                />
              </div>
            );
          }

 
}
