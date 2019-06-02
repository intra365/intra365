import React, { Component } from 'react';
import PropTypes from 'prop-types'
import PageLayoutMain from '../../_Layouts/PageLayoutMain';
import PageHeader from '../../PageHeader';
import Login  from '../../Login';

import Jumpto365Service from '../../../services';
import { subscribe, Subscribe } from 'react-contextual';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import Jumpto365App,{getSetting} from "../../_Contexts/Jumpto365App"
import PeriodicTable from '../../PeriodicTable';
import Testdata from "../../../data/TestData"
import $ from 'jquery'
import PageBody from '../../PageBody';
import "./tenant.css"
import ReactJson from 'react-json-view'
import OfficeGraphService,{getWordMarkdown,getWordMarkdownCached, download2} from '../../../services/OfficeGraph'
import { Fabric } from 'office-ui-fabric-react';
import ReactPlacerHolder from 'react-placeholder'
import { CommandBar } from 'office-ui-fabric-react/lib/CommandBar';
import { PivotLinkSize, PivotLinkFormat, PivotItem, Pivot } from 'office-ui-fabric-react/lib/Pivot';
import 'office-ui-fabric-react/dist/css/fabric.css'
import { Panel, PanelType } from 'office-ui-fabric-react/lib/Panel';
import Masonry from 'react-masonry-component';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import json from "format-json"
//import { ToolbarTS } from './ToolbarTS.tsx'
/**
 * Describe overall purpose of the component
 *
 * @export
 * @class TenantPage
 * @extends {Component}
 */

var verbose = false
function log(a,b,c,d,e,f)
{
    if (!verbose) return
    console.log(a,b,c,d,e,f)
}

export default class TenantPage extends React.PureComponent {

    static propTypes = {
        tenantName: PropTypes.string.isRequired,
        context: PropTypes.any,
        isRootPage: PropTypes.any
    }




    constructor(props) {

        super(props);
        this.state = {
            isDebugging : getSetting("debug",false),
            megamenuOn : false,
            publishOn : false,
            color: "#466FAC",
            icon: "https://jumpto365.com/resources/images/app/jumpto365-Icon-white.png"
        }


    }


    _getMegaMenu = (root,level,childState) => {
        if (childState.length < level){
            childState.push(false)
        }
        else
        {
            childState[level-1] = false
        }
        var getStyle = (l) =>{
            
            switch (l) {
                case 0:
                    return {}
                    break;
            
                case 1:
                return {minWidth:"240px",maxWidth:"240px",overflowX:"clip", xborder:"0px solid #888888",margin:"0px",overflow:"hidden"}
                    break;
                case 2:
                return {padding:"8px",minWidth:"240px",maxWidth:"240px",overflowX:"clip", xborder:"0px solid #888888",margin:"0px",overflow:"hidden"}
                break;
                case 3:
                return {}
                break;
                default:
                return {}
                break;
            }
        }
        var getClass = (l) =>{
            
            switch (l) {
                case 0:
                    return ""
                    break;
            
                case 2:
                return "ms-font-l xmegaMenuLevel1 ms-fontWeight-bold"
                    break;
                case 3:
                    return "ms-font-m ms-fontWeight-semibold"
                    break;
                    
                default:
                return ""
                break;
            }
        }
        if (!root ) return []
        if (!root.childrens ) return []
        var getchildren = () => {return root.childrens.map((child,key)=>{

            var links = child.links.map((link,ix)=>{
                childState[level-1] = true // has children
                return <li><a target="_blank" href={link.link} title={link.text}> <span key={ix} dangerouslySetInnerHTML={{ __html: link.text }}></span></a></li>
            })
 
            var children = this._getMegaMenu(child,level+1,childState)
            if ( childState[level] ){
                childState[level-1] = true
            }
            var style = getStyle(level)
            var className = getClass(level)

            log(child,childState)
            if ( !childState[level-1]) return ""
            //childState[level-1] = false
            return <div key={key} style={style} ><div class={className}  > {child.text}</div> 
            <ul>
            {links}
            </ul>
            {children}
            </div>
        }) }
        var getRootchildren = () => {return root.childrens.map((child,key)=>{

            var links = child.links.map((link,ix)=>{
                childState[level-1] = true // has children
                return <li><a target="_blank" href={link.link} title={link.text}> <span key={ix} dangerouslySetInnerHTML={{ __html: link.text }}></span></a></li>
            })
 
            var children = this._getMegaMenu(child,level+1,childState)
            if ( childState[level] ){
                childState[level-1] = true
            }
            var style = getStyle(level)
            var className = getClass(level)

            log(child,childState)
            if ( !childState[level-1]) return ""
            //childState[level-1] = false
            return  <PivotItem linkText={child.text} key={key} >
            <Masonry>
            
            {links}
            
            {children}
            </Masonry>
            </PivotItem>
        }) }

        if (level === 1){
            
            return getRootchildren()
        }else
        {
            return getchildren()
        }
    }

    jumpTo = (path) => {
        this.props.navigate(path)
            .then(x => {
                log(x)
            })
            .catch(e => {
                console.error(e)
            })

    }
    updateDimensions = () => {
        //this.setState({ });
        var win = $(window)
        var h = win.height()
        var mastHead = $("#header")
        var pageHead = $("#pageheader")
        this.setState({
            color: "#000000",
            height: h - 40 - (mastHead ? mastHead.height() : 0) - (pageHead ? pageHead.height() : 0),
            width: (pageHead ? pageHead.width() : 1200)
        });


    }
   
    componentDidUpdate = (previousProps, previousState) => {

        if (previousProps.tenant !== this.props.tenant) {

            this.init()
        }
        if (previousProps.filename !== this.props.filename) {

            this.init()
        }
        var that = this
        $(".internallink").click(function (event, b, c) {
            // alert(1)
            event.preventDefault()
            var basePath = event.target.pathname
            var lastChar = basePath.substring(basePath.length - 1)
            if (basePath.length > 1 && lastChar === "/") {
                basePath = basePath.substring(0, basePath.length - 1)
            }
            that.jumpTo(basePath)

        })
    }



    init = () => {
        this.updateDimensions()
        var that = this
        this.setState({
        title: this.props.filename === "index.docx" ? this.props.context.user.name   : this.props.filename , // of " + this.props.tenant,

    })
        function onedriveLoad(errorState,filename){

//debugger
            getWordMarkdownCached(filename, localStorage, 1, true)
            .then(document => {
                that.setState({
                    markDown : document.markDown,
                    components: document.components,
                    editLink: document.editLink,
                    links: document.links,
                    state:0,
                    initState: 0
                })
                that._loadMenu(document.links)
            })
            .catch(e => {
                log(e)
                that.setState({
                    errors: [e],
                    initState: 0,
                    state: errorState
                })
            })
            
            getWordMarkdown(filename, localStorage, 1, true)
            .then(document => {
                that.setState({
                    markDown : document.markDown,
                    components: document.components,
                    editLink: document.editLink,
                    links: document.links,
                    state:0,
                    initState: 0
                })
                that._loadMenu(document.links)
            })
            .catch(e => {
                log(e)
                that.setState({
                    errors: (that.state.errors ? that.state.errors : []).push(e.message),
                    initState: 0,
                    state: errorState
                })
            })
        }
        if (this.props.tenant) {
            this.setState({
                initState: 1
            })
            let service = new Jumpto365Service()

            if (this.props.tenant && this.props.tenant.indexOf("@") > -1) {
                if (this.props.context.userId !== this.props.tenant) {
                    this.setState({
                        error: `You need to be signed in as ${this.props.tenant} to get access`,

                        state:5
                    })
                    return
                }

                this.setState({initState:1})
                var filename = this.props.filename ? this.props.filename : "index.docx"
                service.getTenant(this.props.tenant.replace("@", "-"))
                    .then(tenant => {
                       

                        onedriveLoad(4,filename)
                        // this.setState({tenant,title:tenant.title})
                        // if (this.props.context ){

                        //     this.props.context.setState({tenant})
                        // }
                    })
                    .catch(error => {

                        onedriveLoad(7,filename)

                    })
            } else {
                var that = this
                service.getTenant(this.props.tenant)
                    .then(tenant => {
                        that.setState({
                            tenant,
                            title: tenant.title,
                            icon: tenant.properties.icon,
                            color: tenant.properties.color ? tenant.properties.color : that.state.color
                        })
                        if (that.props.context) {

                            that.props.context.setState({
                                tenant,
                                tenantRoot: `/@/${this.props.tenant}`
                            })
                        }
                    })
                    .catch(error => {

                        that.setState({
                            
                            errors: (this.state.errors ? this.state.errors : []).push("Tenant was not found  "),
                            state : 3,
                            tenant: {}
                        })
                    })
            }
        }
    }
    _loadMenu = (links) => {
        // log("toolbar _load", links)

        var items = (node, ix) => {
            //log("Loading links", node)

            
            return {
                key: "link" + ix,
                name: node.text,
                disabled: false,
                target: "_blank",
                href: node.link,
                subMenuProps: !node.childrens ? [] : node.childrens.map((child, ix) => {
                    return items(child, ix)
                })
            }

        }

        var myLinks = []

        if (this.state.links && this.state.links.childrens) {
            // log("Loading root links")
            myLinks = this.state.links.childrens.map((l, ix) => {
                // log("Level 1", l)
                return items(l, ix)
            })
        }

        log("toolbar loaded")
        var megaMenu =   this._getMegaMenu(this.state.links,1,[])
        this.setState({
            megaMenu,
            myLinks
        })
    }

    componentWillMount = () => {
        if (!this.props.context.isAuthenticated) {
            Jumpto365App.login(this.props.context)
        }

    }
    timer = null
    ticks = 0
    _tick = () => {
        this.ticks++
        //   this.setState({ticks:this.ticks})
    }
    componentDidMount = () => {
        var that = this
        this.timer = setInterval(() => {
            that._tick()
        }, 2000)
        this.init()
       
        //window.addEventListener("resize", this.updateDimensions);
        //this.updateDimensions()
    }


    componentWillUnmount = () => {
        window.removeEventListener("resize", this.updateDimensions);
        clearInterval(this.timer)
    }

    __onPatChanged = (v,newValue,a,b,c) => {
        console.log(v,newValue,a,b,c)
        var f = this.state.publishForm ? this.state.publishForm : {}
        f.PAT = newValue
        this.setState({publishForm,f})
    }
    /**
     * Required method return the output of the component
     *
     * @returns
     * @memberof ScenarioPage
     */
    render() {      
       // if (!this.state.tenant  ) return null
     //   var icon = this.state.tenant && this.state.tenant.properties ? this.state.tenant.properties.logo : null


     
     var pivotHeadings = this.state.links && this.state.links.childrens? this.state.links.childrens.map((heading,ix)=>{
         
         return  <PivotItem key={ix} linkText={heading.text}>
          
         </PivotItem>   
     }): []
     var lastLanguage = this.props.language ? this.props.language : "en"
          
            const farItems = [     {
                key: 'word',
                xname : "Edit in Word Online",
                icon: 'WordDocument',
                disabled: this.state.editLink ? false:true,
                href : this.state.editLink,
                target:"_blank",
                iconProps: { iconName: 'WordDocument' }
              }
            ]
        
            //var items = this.state.myLinks
            var items = [
                {
                    key:"MyLinks",
                    xname: "Links",
                    icon:"Info",
                    onClick: () => this.setState({ megamenuOn: true }),
                    iconProps: { iconName: 'CollapseMenu' }
                  }
            ]


            const overflowItems = []
            overflowItems.push({
                key:"publish",
                name: "Publish",
                icon:"Info",
                onClick: () => this.setState({ publishOn: true }),
                iconProps: { iconName: 'WebPublish' }
              })
            var state = ""
            switch (this.state.state) {
                case 0:
                    
                    break;
                case 1: 
                    state = "Initializing"
                    break;
                case 2: 
                    state = "User not found ."
                    break;
                case 7: 
                    state = "Index.docx not in OneDrive ."
                    break;
                case 3: 
                    state = "Tenant not found .."
                    break;
                default:
                    state = "Checking the solar settings " + this.state.state
                    break;
            }

        
        return (
                this.props.isRootPage   ? 
                <Fabric>
                <PageHeader icon={this.state.icon} title={this.state.title } color={this.state.color}/> 
                {/* <ToolbarTS compiler="1" framework="2" /> */}
                <div style={{marginLeft:"-8px",marginRight:"-8px",marginTop:"-8px",marginBottom:"8px"}}>
                <CommandBar

isSearchBoxVisible={ true}
searchPlaceholderText='Search '
elipisisAriaLabel='More options'
items={ items }
overflowItems={ overflowItems }
farItems={ farItems }
/></div>

                <div  style={{width:"100%",height:"100%", minHeight:"400px", overflowX:"hidden", overflowY:this.props.noscroll ? "hidden" : "auto"}}>
{this.state.xerrors}
 {state}
                                
                

                
                
                <div>
                {/* <PeriodicTable width={this.state.width} height={this.state.height} grid={Testdata.pto} onScale={this._onScale}/> */}





                <ReactPlacerHolder delay={3000} type='text' showLoadingAnimation  rows={14} ready={this.state.components}>
                {this.state.components && 
                    <div>
                <div className="ms-font-m toolbody markdown" style={{marginTop:"0px",marginBottom:"-8px",marginLeft:"0px",marginRight:"-8px"}}>{this.state.components}</div> 
                 
                
                </div>
            }
            </ReactPlacerHolder>
            <Panel
          isOpen={this.state.megamenuOn}
          type={PanelType.large}

          isLightDismiss={true}
          
          onDismiss={() => this.setState({ megamenuOn: false })}
          // tslint:disable-next-line:jsx-no-lambda
         
          
          xheaderText="Links"
        >
        
                  {/* <ReactJson src={{props:this.props,state:this.state}} collapsed={1}/>  */}
         <Pivot>
        {this.state.megaMenu}
        </Pivot>

        </Panel>

               <Panel
          isOpen={this.state.publishOn}
          type={PanelType.medium}

          isLightDismiss={true}
          
          onDismiss={() => this.setState({ publishOn: false })}
          // tslint:disable-next-line:jsx-no-lambda
         
          
          xheaderText="Publish"
        >

         {/* <TextField placeholder="Personal Access Token" ariaLabel="Please enter your GitHub Personal Access Token" 
         onChange={this._onPatChanged}
         
         /> */}
        { this.state && this.state.markDown && 
        <div>
                  
                  <textarea style={{width:"100%",height:this.state.height}} value={this.state.markDown} ></textarea>
                  </div>
         }

        </Panel>
                </div>
                    {/* <ReactJson src={{props:this.props,state:this.state}} collapsed={0}/>    */}
                
                <div style={{textAlign:"center",clear:"both",borderTop:"1px solid #cccccc",marginLeft:"-16px",marginRight:"-16px",marginTop:"8px",padding:"8px"}}>
Copyright &copy;2017-2018 - jumpto365, Inc. - jumpto365.com&trade; - All rights reserved - <a href="https://jumpto365.com/eula/" target="_blank">Terms of Service and End User Licensing Agreement</a>
</div>
</div>
{this.state.isDebugging &&
<ReactJson src={{props:this.props,state:this.state}} collapsed={0}/> 
}
            </Fabric>
            :
                <div>
                    {this.props.children}
                </div> 
                
        
        )
        
    }
}
