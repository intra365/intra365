import React, { Component } from 'react';
import PropTypes from 'prop-types'
import PageLayoutMain from '../../_Layouts/PageLayoutMain';
import PageHeader from '../../PageHeader';
import Jumpto365Service from '../../../services' 
import { ProgressIndicator } from 'office-ui-fabric-react/lib/ProgressIndicator';
import { Link } from "@reach/router"
import $ from "jquery"
import PageBody from '../../PageBody';
import {isInternalLink} from "../../_Contexts/Jumpto365App"
import "./genericpage.css"
import { PivotLinkSize, PivotLinkFormat, PivotItem, Pivot } from 'office-ui-fabric-react/lib/Pivot';

import { Panel, PanelType } from 'office-ui-fabric-react/lib/Panel';
import { CommandBar } from 'office-ui-fabric-react/lib/CommandBar';
import ReactJson from 'react-json-view'

/**
 * Describe overall purpose of the component
 *
 * @export
 * @class ScenarioPage
 * @extends {Component}
 */
export default class GenericPage extends Component {

    static propTypes  = {
        language : PropTypes.string,
        name : PropTypes.string   
    }
    
    ref = null
    
    constructor(props) {
        super(props);
        this.state = {document: {}}
        this.ref = React.createRef()
    }

    _buildPath = ()=>{
        var path = ""
        var that = this
        var c = (p) =>{
            return that.props[p] ? "/" + that.props[p] : ""
        }
        
        path = path + c("level1")
        path = path + c("level2")
        path = path + c("level3")
        path = path + c("level4")
        path = path + c("level5")
        path = path + c("level6")
        path = path + c("level7")
        return path
    }


    _load = () => {
        var jumpto365Service = new Jumpto365Service()

        var name = this.props.name ? this.props.name : this.props.uri ? this.props.uri.replace("/pages/","") : ""
       
    
        var promise = null
        
        
        switch (this.props.repotype ? this.props.repotype.toLowerCase() : "") {
            case "github.com":
            
                var subpath = this._buildPath()
                promise = jumpto365Service.getGitHubMarkdown(this.props.owner,this.props.repo,this.props.branch,subpath)

                var deeppath = subpath.substring(0,_.lastIndexOf(subpath,"/"))
                var that = this
                jumpto365Service.getGitHubTOC(this.props.owner,this.props.repo,this.props.branch,deeppath).then(toc => {
                    that.setState({toc})
                }).catch(tocError=>{
                    that.setState({tocError})
                })
                break;
            // case "onedrive":
                
            //     break;
            // case "sharepoint":
                
            //     break;
        
            default:
                promise = jumpto365Service.getDialogue(name , this.props.language,"/pages/")
            break;
        }

        promise.then(document => {
            var hideHeader = false
            if (document.properties && document.properties.funclevel==="1"){
            hideHeader = true
            }
          this.setState({
              hideHeader,
            loaded:true,
            document,
            components: document.components
          })
        })
        .catch((error) => {
          this.setState({
            error: error.message
          })
        })
    }
      
    componentDidMount = () => {
        this._load()
      }
  
      jumpTo = (path) => {
        this.props.navigate(path)
        .then(x=>{
            console.log(x)
        })
        .catch(e=>{
            console.error(e)
        })

      }

      
    componentDidUpdate = (previousProps, previousState) => {

        if (previousProps.name !== this.props.name || previousProps.uri !== this.props.uri || this.props.language !== previousProps.language){
          this._load()
        }
        

        var that = this
        $(".internallink").click(function (event,b,c){
            // alert(1)
            event.preventDefault()
            var url = this.href
            if (isInternalLink(url)){
                var basePath = event.target.pathname
                var lastChar = basePath.substring(basePath.length-1)
                if (basePath.length > 1 && lastChar ==="/"){
                    basePath = basePath.substring(0,basePath.length-1)
                }
                that.jumpTo(basePath)
    
            }
            else
            {
                window.open( url,"_blank")
            }
            
            
        })
      }
    /**
     * Required method return the output of the component
     *
     * @returns
     * @memberof ScenarioPage
     */
    render() {
        if (this.state.error){
            return <div>{JSON.stringify(this.state.error)}</div>
        }
        if (!this.state.loaded){
            return <ProgressIndicator />
        }
        
        var toc = this.state.toc && this.state.toc.isYaml ? this.state.toc.document.map((item,ix)=>{
            var childs = item.items ? item.items.map((subitem,ix)=>{ return <li key={ix}><a href={subitem.href}>{subitem.name}</a></li>}) : []
            return <div>{item.name}
            <ul key={ix}>
            {childs}
            </ul></div>
        }) : this.state.toc && this.state.toc.isMarkdown ? 
        <div dangerouslySetInnerHTML={{ __html: this.state.toc ? this.state.toc.document.body:null}} />  
        : []
    
        //var items = this.state.myLinks
        var items = [
            {
                key:"MyLinks",
                name: "Links",
                icon:"Info",
                onClick: () => this.setState({ megamenuOn: true }),
                iconProps: { iconName: 'CollapseMenu' }
              }
        ]


   
        return (

            <PageLayoutMain>
                {!this.state.hideHeader &&
                <PageHeader title={this.state.document.title} color="#2a7ab9"/>
            }

            {this.state.toc &&
                                    <div style={{marginLeft:"-8px",marginRight:"-8px",marginTop:"-8px",marginBottom:"8px"}}>
                <CommandBar

isSearchBoxVisible={ false}
searchPlaceholderText='Search '
elipisisAriaLabel='More options'
items={ items }

/></div>}
                 <PageBody>
                 
                     {this.state.components} 
                  
                 </PageBody>
                 <Panel
          isOpen={this.state.megamenuOn}
          type={PanelType.large}

          isLightDismiss={true}
          
          onDismiss={() => this.setState({ megamenuOn: false })}
          // tslint:disable-next-line:jsx-no-lambda
         
          
          xheaderText="Links"
        >

        {toc}

        
        </Panel>
        {/* <ReactJson src={{props:this.props,state:this.state}} collapsed={1}/>   */}
            </PageLayoutMain>

        )
    }
}

