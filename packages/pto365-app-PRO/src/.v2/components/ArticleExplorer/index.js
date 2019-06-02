import React, { Component } from 'react';
import PropTypes from 'prop-types'
import PageLayoutMain from '../_Layouts/PageLayoutMain';
import PageHeader from '../PageHeader';
import ScenarioList from '../ScenarioList';
import PageBody from '../PageBody';
import Jumpto365Service from '../../services' 
import ReactJson from 'react-json-view'
import {Shimlist} from '../Shims'
import { DefaultButton, PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { Panel, PanelType } from 'office-ui-fabric-react/lib/Panel';
import {
    DetailsList,
    DetailsListLayoutMode,
    Selection
  } from 'office-ui-fabric-react/lib/DetailsList';

  import { Dropdown, DropdownMenuItemType } from 'office-ui-fabric-react/lib/Dropdown';

import $ from "jquery"
import AppGroup from '../AppGroup';
import ReactMde, { ReactMdeTypes } from "react-mde";
import Views from "../_Views"
import './panel.css'
import AppIconGeneric from '../AppIconGeneric';
const Jumpto365API = require('../../services/Jumpto365API')
var mapEvents = []


export default class ArticleExplorer extends Component {

    static propTypes  = {
      UPN : PropTypes.string,
      onSelect : PropTypes.func



    }
   
 state = {loaded:false,
  value: "hello world",
  articlesAreas : [],
  articles: []
 }

 jumpto365Service = null
 _readTool = (key,language,contentRef) => {
  var that = this
this.setState({ documentLoaded : false})
    this.jumpto365Service
     .getToolDocument(key,language,contentRef)
     .then(document=>{ 
       
     that.setState({document,
    // subject: scenario.subject,
     body:document.body,
     markdown:document.markdown,
     color: document.properties.color ? document.properties.color : this.state.color != null ? this.state.color : "#666666" ,
     icon: document.properties.icon ? document.properties.icon : this.state.icon ,
     inshort: document.properties.inshort,
     byline:  document.properties.byline ,// ? document.properties.byline : "Matt Wade (@thatmattwade)",
     imageurl:  document.properties.imageurl ? document.properties.imageurl : document.properties.frontMatter && document.properties.frontMatter.images ?document.properties.frontMatter.images[0] : null ,//? document.properties.imageurl : "https://placeimg.com/800/240/any",
     imagecopyright:  document.properties.imagecopyright ? document.properties.imagecopyright : "All rights reserved to the copyright owner",
     previewer : document.properties.previewer ,
     ready:true,
     documentLoaded : true
     })

     })
     .catch(error=>{
         that.setState({noArticle:true, jsontext: error ? error.jsontext : null, error : error ? error.message ? error.message : error : "No document " ,showError:true})
         
     })
 }
   _init = () => {
     if (this.props.articlePath){
      this._readTool("","en",this.props.articlePath)
     }
    Jumpto365API.articlesAreas()
    .then(articlesAreas => {
      
        this.setState({articlesAreas,loaded:true})
    })
   }
  
    componentDidUpdate = (previousProps, previousState) => {
 
    }
    updateDimensions = () => {
      //this.setState({ });
      var win = $(window)
      var h = win.height()
  
      var navHeight = h - 140
      if (navHeight < 0 ){
          return console.log("skipping at height",navHeight)
      }
  
     
      this.setState({height:navHeight});
     
  
  
      
  
  }
  
    componentDidMount = () => {
      window.addEventListener("resize", this.updateDimensions);

      this.jumpto365Service = new Jumpto365Service()
      this._init()
    }
    componentWillUnmount = () => {
      window.removeEventListener("resize", this.updateDimensions);
  }
  
  _setArea =(selectedArea,articles,body) => {
    this.setState({selectedArea,articles,body})
        
    Jumpto365API.articlesAreas(selectedArea)
    .then(articles => {
        this.setState({articles})
    })
  }

_setArticle = (selectedArticle) => {

  if (!selectedArticle) {
    this.setState({
      selectedArticle: null,
      articles:[]
    })
    if (this.props.onArticleSelected) {
      this.props.onArticleSelected(null)
    }
    return
  }


  
    this.setState({selectedArticle})

    var path = `/@/${this.props.context.me.upn}/-/tool/${this.state.selectedArea}${selectedArticle}`

    var linkpath = `/article/${this.props.context.me.upn}/-/${this.state.selectedArea}${selectedArticle}`

    this.setState({selectedArticle,path,linkpath,body:null})

    if (this.props.onArticleSelected){
        this.props.onArticleSelected(linkpath)
    }
    this._readTool("","en",path)
    }

    render() {


      if (this.props.mini){
        return (
          <div>

           
            {this.props.onArticleSelected &&
             <DefaultButton primary text="Select" style={{marginRight:"8px"}} disabled={!this.state.path} onClick={()=> 
              {
                this.setState({showPanel:false})
                if (this.props.onArticleSelected) this.props.onArticleSelected(this.state.linkpath)}} />
            }
             <DefaultButton text="Change" onClick={()=> {this.setState({showPanel:!this.state.showPanel})}} />

          <div style={{display:"flex",minHeight:"500px"}} >
      
       <div>
        {/* <h2 className="ms-font-xl" style={{marginLeft:"16px"}}>Article</h2> */}
        {this.state.documentLoaded  &&
        <div>
        <div style={{display:"flex", padding:"8px", color:"#ffffff", backgroundColor:this.state.document && this.state.document.frontMatter && this.state.document.frontMatter.metadata && this.state.document.frontMatter.metadata.rgbcolor ? this.state.document.frontMatter.metadata.rgbcolor : "#444444"   }}>
      <div style={{padding:"8px"}}>
        <img style={{height:"64px",width:"auto",padding:"8px"}} src={this.state.document && this.state.document.frontMatter && this.state.document.frontMatter.images ? this.state.document.frontMatter.images[0] : null }/>
        </div>
        <div style={{padding:"8px",lineHeight:"64px",fontSize:"48px"}}>
        {this.state.document && this.state.document.frontMatter && this.state.document.frontMatter.metadata && this.state.document.frontMatter.metadata.title ? this.state.document.frontMatter.metadata.title : this.state.selectedArticle  }
          
        </div>
        </div>
        {/* <div>
        <ReactJson src={{frontMatter: this.state.document ? this.state.document.frontMatter : null ,state:this.state}} collapsed={0}/> 

        </div> */}
        <div className="ms-font-m toolbody"  style={{padding:"16px", height:this.state.height ,overflowY:"auto",overflowX:"hidden"}}
                        dangerouslySetInnerHTML={{ __html: this.state.body }}>
        </div>
        </div> 
        }
        </div>
       
        <Panel
          isBlocking={false}
          isOpen={this.state.showPanel}
          onDismiss={()=>{this.setState({showPanel:false})}}
          type={PanelType.medium}
          headerText="Documents"
          closeButtonAriaLabel="Close"
        >
         <div style={{xdisplay:"flex"}}>
         {!this.state.selectedArea && 
        <div style={{display:"block"}}>

            {this.state.articlesAreas.map((articlesArea,index) => {
              return <div 
              onClick={()=>{
                this._setArea(articlesArea.area)
              }}
              style={{border:"0px dashed red",cursor:"pointer",padding:"8px"}} key={index}>{articlesArea.area}</div>
            })}
        </div>}


        {this.state.selectedArea && this.state.articles && 
        <div style={{display:"block"}}>
             <DefaultButton text="Back" onClick={()=> {this._setArea(null)}} />
            {this.state.articles.map((article,index) => {
              return <div 
              onClick={()=>{
                this._setArticle(article.path)
              }}
              style={{border:"0px dashed red",cursor:"pointer",padding:"8px"}} key={index}>{article.title}</div>
            })}
        </div>}
        
        <div>
           

        
     
        <div>
       
        </div>
        
        </div>
    </div>          
                 
        </Panel>
          <div style={{minWidth:"300px"}}>
          </div>
          </div>
          </div>
        )
      }
    return (
      
      <div style={{display:"flex",minHeight:"500px"}} >
      
        <div style={{minWidth:"300px"}}>
          {/* <h2 className="ms-font-xl">Documents</h2> */}
           <ScenarioList 
           singleSelection 
           customView={ (renderToolCell,_onColumnClick) => {
            var columns = [

                {
                    key: 'column2',
                    name: 'Name',
                    fieldName: 'title',
                    minWidth: 100,
                    maxWidth: 600,
                    isRowHeader: true,
                    isResizable: true,
                    isSorted: false,
                    isSortedDescending: false,
                    onColumnClick: _onColumnClick,
                    data: 'string',
                    isPadded: true,
                    onRender: (item,rowId,colData,d) => {
                      var title = item[colData.fieldName] 
                      return item.isHeading ? <b>{title}</b> : title
                        
                        }
                  }
            
              ];
            
              
              
            return columns
              
              
        }
    
    
    
         }
           defaultView="key" 
           tasks={this.state.articlesAreas ? this.state.articlesAreas.map((area,ix)=>{
             return {key:area.area,title:area.area}
           }) : []} 
           onSelectionChanged={(selection)=>{
             
             if (!selection ) return
             if (selection.length < 1 ) {
                this.setState({selectedArea:null})
                if (this.props.onArticleSelected){
                  this.props.onArticleSelected(null)
                }
               return
             }
             var selectedArea = selection[0].key

             this._setArea(selectedArea,[],null)
           
            
            
            }} />
                {!this.state.loaded && 
       <Shimlist/>}

        </div>
        
        
        
        <div style={{minWidth:"300px"}}>
        {/* <h2 className="ms-font-xl">Headings</h2> */}
        {this.state.selectedArea &&
           <ScenarioList 
           singleSelection 
           customView={ (renderToolCell,_onColumnClick) => {
              var columns = [

                  {
                      key: 'column2',
                      name: 'Name',
                      fieldName: 'title',
                      minWidth: 100,
                      maxWidth: 600,
                      isRowHeader: true,
                      isResizable: true,
                      isSorted: false,
                      isSortedDescending: false,
                      onColumnClick: _onColumnClick,
                      data: 'string',
                      isPadded: true,
                      onRender: (item,rowId,colData,d) => {
                        var title = item[colData.fieldName] 
                        return item.isHeading ? <b>{title}</b> : title
                          
                          }
                    }
              
                ];
              
                
                
              return columns
                
                
          }
      
      
      
           }
           tasks={this.state.articles ? this.state.articles.map((article,ix)=>{
             
             return {key:article.path,title:article.title,index: article.index}
           } ) : []} 
           onSelectionChanged={(selection)=>{
             
             if (!selection ) return
             if (selection.length < 1 ) {
              return this._setArticle(null)
             }

             return this._setArticle(selection[0].key)
            
            
          }} /> }
            {!this.state.articles && this.state.selectedArea &&
            <Shimlist />
          
      }
           
        </div>
        <div>
        {/* <h2 className="ms-font-xl" style={{marginLeft:"16px"}}>Article</h2> */}
        {this.state.selectedArticle &&
        <div>
        {/* <div style={{display:"flex", padding:"8px", color:"#ffffff", backgroundColor:this.state.document && this.state.document.frontMatter && this.state.document.frontMatter.metadata && this.state.document.frontMatter.metadata.rgbcolor ? this.state.document.frontMatter.metadata.rgbcolor : "#444444"   }}>
      <div style={{padding:"8px"}}>
        <img style={{height:"64px",width:"auto",padding:"8px"}} src={this.state.document && this.state.document.frontMatter && this.state.document.frontMatter.images ? this.state.document.frontMatter.images[0] : null }/>
        </div>
        <div style={{padding:"8px",lineHeight:"64px",fontSize:"48px"}}>
        {this.state.document && this.state.document.frontMatter && this.state.document.frontMatter.metadata && this.state.document.frontMatter.metadata.title ? this.state.document.frontMatter.metadata.title : this.state.selectedArticle  }
          
        </div>
        </div> */}
        {/* <div>
        <ReactJson src={{frontMatter: this.state.document ? this.state.document.frontMatter : null ,state:this.state}} collapsed={0}/> 

        </div> */}
        <textarea style={{width:"100%",height:"32px"}} readonly value={this.state.linkpath}></textarea> 
        <div className="ms-font-m toolbody"  style={{padding:"16px",backgroundColor:"#eeeeee" ,height:this.state.height ,overflowY:"auto",overflowX:"hidden"}}
                        dangerouslySetInnerHTML={{ __html: this.state.body }}>
        </div>
        <div>
        {/* <textarea style={{width:"100%",height:"200px"}} value={this.state.markdown}></textarea> */}
        </div> 
        </div> 
        }
        </div>
        </div>
  
    )
    }
}

