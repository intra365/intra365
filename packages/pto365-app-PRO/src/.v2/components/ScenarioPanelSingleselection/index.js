import React, { Component } from 'react';
import PropTypes from 'prop-types'
import ToolCardLarge  from "../ToolCardLarge"
import { navigate, Link } from "@reach/router"
import Utility from "../../utilities"
import './panel.css'
import Jumpto365Service from '../../services' 
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import PeriodicTable from '../PeriodicTable';
import $ from "jquery"
import AppIconGeneric from '../AppIconGeneric';
import ReactJson from 'react-json-view'
import { Dropdown, DropdownMenuItemType } from 'office-ui-fabric-react/lib/Dropdown';
import { MessageBar, MessageBarType } from 'office-ui-fabric-react/lib/MessageBar';
import { MessageBarButton } from 'office-ui-fabric-react/lib/Button';

const Jumpto365API = require('../../services/Jumpto365API')
/**
 * Describe overall purpose of the component
 *
 * @export
 * @class ToBeRenamed
 * @extends {Component}
 */
export default class ScenarioPanelSingleSelection extends Component {

    static propTypes  = {
        about : PropTypes.string,   // sample - remove or rename
        /**
         *Object {subject: "Collect and analyze social media, web, and print o…", area: "Communication & Media + Sales", tools: Array(3), …}
         * 
         */
        scenario : PropTypes.object.isRequired,
        isMobile : PropTypes.string
    }
    jumpto365Service = null
    onToolClick = (tool) => {
        var scenario = this.props.scenario
        if (tool && tool.data) {
        let url = Utility.LinkToolScenario(tool.data.name,scenario.domain,scenario.area,scenario.subject,scenario.technology)        
        navigate(url)        
    }
    }   
    onUsecaseClick = () => {
        var scenario = this.props.scenario
        var name = scenario.path ? scenario.path : scenario.subject
        let url = Utility.LinkUsecase(name,this.props.domain,this.props.technology,this.props.view)        
        navigate(url)        
    }

    _readTool = (key,language,contentRef) => {
     var that = this

        this.jumpto365Service
        .getToolDocument(key,language,contentRef)
        .then(document=>{ 
        that.setState({document,
       // subject: scenario.subject,
        body:document.body,
        color: document.properties.color ? document.properties.color : this.state.color != null ? this.state.color : "#666666" ,
        icon: document.properties.icon ? document.properties.icon : this.state.icon ,
        inshort: document.properties.inshort,
        byline:  document.properties.byline ,// ? document.properties.byline : "Matt Wade (@thatmattwade)",
        imageurl:  document.properties.imageurl ,//? document.properties.imageurl : "https://placeimg.com/800/240/any",
        imagecopyright:  document.properties.imagecopyright ? document.properties.imagecopyright : "All rights reserved to the copyright owner",
        previewer : document.properties.previewer ,
        ready:true
        })

        })
        .catch(error=>{
            that.setState({noArticle:true, jsontext: error ? error.jsontext : null, error : error ? error.message ? error.message : error : "No document " ,showError:true})
            
        })
    }

    _load = () => {

        var scenario = this.props.scenario

        if (!scenario){
            
            var body = null
            var c = null
            
            if (this.props.cell && this.props.cell.centerData){
                c = this.props.cell.centerData
            body = `<div>
                <div></div>
                </div>`
                
            this._readTool(c.key,"en",c.contentRef)
                
            }






            this.setState({

                body: body,
                subject:  c ? c.title : "Unsupported",
                documentError: "Unsupported",
                ready:true})
        
            return
        }



        var name = scenario.path ? scenario.path : scenario.subject
        this.jumpto365Service
        .getUseCaseDocument(name,this.props.language,this.props.domain,this.props.technology)
        .then(document=>{ 

        
            var contexts = document.properties.contexts ? document.properties.contexts.split(",") : null 
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
                subject: scenario.subject,
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
                noArticle:true,
                body: null,
                documentError: err && err.response ?  err.response.data : err,
                ready:true})
        })


        
    
    }

    constructor(props) {
        super(props);
        this.state = {width:100}
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
    componentDidUpdate = (previousProps, previousState) => {

        if (previousProps.scenario !== this.props.scenario){
          this._load()
        }
        if (previousProps.cell !== this.props.cell){
            this._load()
          }
      }

    componentDidMount() {


        
        this.jumpto365Service = new Jumpto365Service()
        this._load()
        window.addEventListener("resize", this.updateDimensions);
        this.updateDimensions()
     
    }
    /**
     * Required method return the output of the component 
     *
     * @returns
     * @memberof ScenarioPanelSingleSelection  
     */
    render() {
        let scenario = this.props.scenario
        var tools = []
        if (scenario) {

           
            var ix =0
            scenario.tools.forEach(tool => {
                ix++

               
                if (tool.data){            
                    tools.push(<div key={ix} style={{margin:"4px"}}>
                    <AppIconGeneric onClick={this.onToolClick}  
                    title={tool.name}
                    backgroundColor={tool.data.color} item={tool} 
                    name={tool.data.name} 
                    description={tool.data.description} 
                    iconUrl={tool.data.icon} size="64" />
                
                    </div>)
                }
                else
                {
                    // tools.push (<div key={ix} style={{margin:"4px"}}>
                    // <AppIconGeneric  onClick={this.onToolClick}  backgroundColor="#777777" name="" item={tool} iconUrl="" size="64" />
                    // </div>)

                }
            });

        }
  

        return (<div className="Panel">
                {/* <PeriodicTable width={this.state.width} height={this.state.height/4} grid={this.state.grid} language={this.props.language}/> */}
            
             
              {!this.props.titlehidden &&
                <div className={`ms-fontSize-l Title${this.props.isMobile? "-Mobile" : ""}`}>
                        {this.state.subject }
                 </div> 
                 }
                 {this.state.noArticle && this.state.showError &&
        <div style={{marginRight:"-16px",marginTop:"-8px"}}> <MessageBar className="messagedialog"
           
        messageBarType={MessageBarType.error}
        isMultiline={false}
        actions={null}
        onDismiss={()=>{this.setState({showError:false}) }}
        dismissButtonAriaLabel="Dismiss"
      >
     {this.state.error}
   
      </MessageBar></div>
            }
                {/* <ReactJson src={this.state} collapsed="1"></ReactJson>  */}
            


                 {tools.length>0 &&
                 <div style={{borderBottom:"1px solid grey",marginLeft:"-20px",marginRight:"-20px"}}> 
                 <div style={{marginLeft:"16px",marginRight:"16px"}}> 
                     
                     {/* <div className="ms-font-l" style={{marginBottom:"10px",borderBottom:"1px solid grey"}}>Tools</div> */}

                    <div style={{display:"flex",marginTop:"8px",marginBottom:"8px"}}>
                    {tools}
                    </div>
                    </div>
                    </div>
                 }
                  {!this.props.navigateFullScreenHidden &&
                 <div style={{marginTop:"8px"}}>
                 <DefaultButton    style={{marginBottom:"10px"}} onClick={this.onUsecaseClick} text="Full screen" ></DefaultButton> 
                 </div>
                  }
                  {this.state.jsontext &&

                                  <textarea  value={this.state.jsontext}></textarea>
                }
                 <div className="ms-font-m toolbody" 
                        
                        dangerouslySetInnerHTML={{ __html: this.state.body }}></div> 
                {this.props.children}
            </div>

        )
    }
}

