import React, { Component } from 'react';
import PropTypes from 'prop-types'
import PageLayoutMain from '../../_Layouts/PageLayoutMain';
import PageHeader from '../../PageHeader';




import FileUpload from '../../FileUpload';
import ScenarioList from '../../ScenarioList';
import ReactJson from 'react-json-view'
import { Dialog, DialogType, DialogFooter } from 'office-ui-fabric-react/lib/Dialog';

import PeriodicTable from '../../PeriodicTable';
import SharingToolbar from '../../SharingToolbar';
import Jumpto365App from '../../_Contexts/Jumpto365App';
import {getSetting,setSetting,licenseInfo} from '../../_Contexts/Jumpto365App'
import $ from "jquery"
import { runInThisContext } from 'vm';
import PageBody from '../../PageBody';
import { __positioningTestPackage } from 'office-ui-fabric-react/lib/utilities/positioning';
import {getExcel} from '../../../services/OfficeGraph'
import Excel from '../../../utilities/Excel'
import { CommandBar } from 'office-ui-fabric-react/lib/CommandBar';
import { navigate } from '@reach/router';
import Clipboard from 'react-clipboard.js';
import json from "format-json" 
import { TextField, DefaultButton, PrimaryButton, ProgressIndicator } from 'office-ui-fabric-react';
import { Dropdown, DropdownMenuItemType } from 'office-ui-fabric-react/lib/Dropdown';
import { TeachingBubble } from 'office-ui-fabric-react/lib/TeachingBubble';
import { Link } from "@reach/router"
import ScenarioPanelSingleSelection from '../../ScenarioPanelSingleselection';
import Jumpto365Service from '../../../services' 
import { Label } from 'office-ui-fabric-react/lib/Label';
import { Spinner, SpinnerSize } from 'office-ui-fabric-react/lib/Spinner';
import ArticleExplorer from '../../ArticleExplorer';
const Jumpto365API = require('../../../services/Jumpto365API')
var XLSX = require("xlsx");
var github = require("octonode")

// import JSONInput from 'react-json-editor-ajrm';
// import locale    from 'react-json-editor-ajrm/locale/en';
const storagename = "jumpto365excel"

var parseSheet = (excel,sheetName) => {
   
    return new Promise((resolve,reject)=>{
    if (!excel) return reject("no excel data")
    if (!sheetName) return reject("no sheetname")

        var format = Excel.detectFormat(excel,sheetName)
        switch (format) {

            case "TOOLS" :
                Excel
                .parseTools(excel,sheetName)
                .then(tools=>{
                   resolve({format,data:tools,sheetName})
    
                })
                .catch(err=>{
                    reject(err)    
                })    
                break;
            case "GROUPS" :
                Excel
                .parseGroups(excel,sheetName)
                .then(groups=>{
                    resolve({format,data:groups,sheetName})
                   
                })
                .catch(err=>{
                    reject(err)  
                })    
                break;
            case "WTW":
                Excel
                .parseWTW(excel,sheetName)
                .then(wtw=>{
                    resolve({format,data:wtw,sheetName})
                 
                })
                .catch(err=>{
                    reject(err)
    
                })    
                break;
            case "PTO": 
                Excel
                .parsePTO(excel,sheetName)
                .then(pto=>{
                    resolve({format,data:pto,sheetName})
                    
                })
                .catch(err=>{
                   reject(err)
    
                })    
                break;
            default:
                var data = Excel.sheetToJSON(excel,sheetName)
                resolve({format:"unknown",data,sheetName})
                
                break;
        }

    


    })
    
}
class Warning extends Component {
    render () {

        return this.props.message
    }
}
var that =  null
/**
 * Describe overall purpose of the component
 *
 * @export
 * @class LoginPage
 * @extends {Component}
 */
export default class ExcelPage2 extends Component {

    static propTypes  = {
       globalContext : PropTypes.obj
    }
    jumpto365Service = null
    constructor(props) {
        super(props);
        this.state = {sheet: null, 
            publishState:0,
            icon: "https://jumpto365.com/resources/images/app/jumpto365-Icon-white.png",
            type:null,
            hideDialog:true,
            showCode:false}
        that = this
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
    _closeDialog = () => {
        this.setState({ hideDialog: true });
      };
  
      _OpenSheet = (name) => {
        switch (this.props.store) {
            case "session":
                navigate(`/excel/local/${this.props.filename}/${name}`)
                break;
        
            default:
                navigate(`/excel/${this.props.filename}/${name}`)
                break;
        }
        


      }
    _load = (isReload) => {
        var that = this
   
        if (this.props.store === "session"){
            var data = sessionStorage.getItem(storagename)
            var localFiles = JSON.parse(data) 
            var index = parseInt( this.props.filename) > 0 ? parseInt( this.props.filename)  : -1
    
            if (index<1){
                return this.setState({error:"Cannot read from local storage"})
            }
            var buf = Buffer.from(localFiles[index-1].data, 'base64')
            var excel = XLSX.read(buf, {
                type: "buffer"
            })

            var sheetNames = excel ? excel.SheetNames : null
            Excel.excelMap(excel).then(excelMap=>{
                that.setState({excelMap})
                   
               })
            that.setState({loading:true})

            parseSheet(buf,this.props.sheet)
            .then(data=>{
                that.setState({sheet:data.data,type:data.format,isReload:false,sheetNames,loading:false})
                //  if (data && data.data && data.data.grid){ 
                     
                //     this.jumpto365Service.validateGrid(data.data.grid,(gridValidationProgress)=>{
                        
                //         this.setState({gridValidationProgress,validating:true})
                //     })
                //     .then(gridValidationResult=>{
                //         this.setState({gridValidationResult,validating:false})
                //     })
                //     .catch(err=>{
                //         that.setState({error:Jumpto365App.emitError(that,err,"Validating links"),validating:false})
    
                //        })
                //     }
                return
            
            
        })
        .catch(err=>{ 
             console.log("Parser error",err)
             that.setState({error:Jumpto365App.emitError(that,err,"#PARSER-GROUPS")})



            })
    }
    else
{
        if (!this.props.filename) return
       var sheetName = `${this.props.sheet} (${this.props.filename})`
        this.setState({isReload,title: "Previewing Customised Periodic Table ",loading:true})
        getExcel(this.props.filename)
        .then(excel => {
          
          
           var buf = Buffer.from(excel.data2, 'base64')
           var excel = XLSX.read(buf, {
            type: "buffer"
        })
           Excel.excelMap(excel).then(excelMap=>{
            that.setState({excelMap})
               
           })
           that.setState({loading:true})

           parseSheet(buf,that.props.sheet)
               .then(data=>{
                    that.setState({data:[{data:excel.data2,key:0,file:excel.file2}]})
                    that.setState({excelData:buf,selectedFile:0,id:0,type:null,sheet:null})    
      
                   var editLink = excel && excel.file2 && excel.file2.file  ? excel.file2.file.webUrl : null
                   var sheetNames = excel && excel.excel ? excel.excel.SheetNames : null
        
                  that.setState({sheet:data.data,type:data.format,sheetname:that.props.sheet,editLink,sheetNames,isReload:false,loading:false})

                //   if (data && data.data && data.data.grid){ 
                //       that.setState({validating:true})
                //     that.jumpto365Service.validateGrid(data.data.grid,(gridValidationProgress)=>{
                //         debugger
                //     that.setState({gridValidationProgress,validating:false})
                // })
                // .then(gridValidationResult=>{
                //     debugger
                //     this.setState({gridValidationResult,loading:false})
                //     if (this.state.gridStateSetter){
                //         debugger
                //         var newState = gridValidationResult
                //     }
                // })
                // .catch(err=>{
                //     debugger
                //     console.log("Validating links error",err)
                //     that.setState({loading:false,error:Jumpto365App.emitError(that,err,"Validating links")})

                //    })
                // }
                   
               })
               
               .catch(err=>{

                that.setState({error:Jumpto365App.emitError(that,err,"#PARSER-GROUPS")})



               })
   
        })
        
        
        .catch(e => {
          
            console.log(e)
            return
            that.setState({
                errors: (that.state.errors ? that.state.errors : []).push(e.message),
                initState: 0
            })
        })

    }
    }

    componentDidUpdate = (previousProps, previousState) => {
//debugger


//console.log("excel2",this.props)
        if (previousProps.filename !== this.props.filename) {
            
            return this._load(true)
        }


        if (previousProps.sheet !== this.props.sheet) {

            return this._load(true)
        }
        
    }

    componentDidMount = () => {
       

        this.jumpto365Service = new Jumpto365Service()

        window.addEventListener("resize", this.updateDimensions);
        this.updateDimensions()
        this._load()
    }

    componentDidCatch(error, info) {
        // Display fallback UI
        this.setState({error:Jumpto365App.emitError(this,error,"SHARING PAGE")})
        // You can also log the error to an error reporting service
        //logErrorToMyService(error, info);
      }
    
      updateDimensions = (showCode) => {
        //this.setState({ });
        var win = $(window)
        var h = win.height()
        var mastHead = $("#header")
        var pageHead = $("#pageheader")
        var toolbar = $("#toolbar")
        var commandbar = $("#commandbar")
        this.setState({
            //title: "",
          //  showArticlePicker:true,
            height:h  - (mastHead ? mastHead.height() : 0) - (pageHead ? pageHead.height() : 0)- (toolbar ? toolbar.height() : 0)- (commandbar ? commandbar.height() : 0),
            width:pageHead.width() / (showCode ? 2 : 1)

        });


    }

   _validateDestination = () => {

   // https://github.com/pksunkara/octonode#create-a-file-at-a-path-in-repository

   /**
    * 
    * Get the contents of a path in repository
ghrepo.contents('lib/index.js', callback); //path
ghrepo.contents('lib/index.js', 'v0.1.0', callback); //path
Create a file at a path in repository
ghrepo.createContents('lib/index.js', 'commit message', 'content', callback); //path
ghrepo.createContents('lib/index.js', 'commit message', 'content', 'v0.1.0', callback); //path
Update a file at a path in repository
ghrepo.updateContents('lib/index.js', 'commit message', 'content', 'put-sha-here', callback); //path
ghrepo.updateContents('lib/index.js', 'commit message', 'content', 'put-sha-here', 'master', callback); //path
ghrepo.updateContents('lib/index.js', 'commit message', 'content', 'put-sha-here', 'v0.1.0', callback); //path
    */
        var PAT = getSetting("GITPAT","")
        var client = github.client(PAT);

    
        var ghrepo         = client.repo('hexatown/docs');
        var that = this
        ghrepo.contents('contexts',(a,content,c)=>{
            that.setState({publishtoFolders : content})   
        })


   }

    componentWillUnmount = () => {
        window.removeEventListener("resize", this.updateDimensions);
    }

    selectFile = (selection) => {
        if (selection.length === 0) return
        if (!this.state.data) return
        var ix = selection[0].key

        try {
            var buf = Buffer.from(this.state.data[ix].data, 'base64')
            this.setState({excelData:buf,selectedFile:ix,id:ix,type:null,sheet:null})
        } catch (error) {
            
            this.setState({error:Jumpto365App.emitError(this,error,"SELECT FILE")})
        }
 
    }
    _cellEdited = (content) => {
        console.log("cell edited",content)
        if (content.error) return
        that.setState({editedCell:content.jsObject})
    }
    _updateTable = () => {
        var sheet = that.state.sheet
        
        sheet.grid[that.state.activeCell.rowNumber][that.state.activeCell.columnNumber] = that.state.editedCell
        that.setState({sheet})
        
        }

    _prepareStage(level){

        this.setState({publishState:level})
        return
        var PAT = getSetting("GITPAT","")
        var client = github.client(PAT);

        var ghme = client.me()
        ghme.orgs((e, orgs) => {
            var gitOrganisations = orgs ? orgs.map(o => {
                return {
                    key: o.login,
                    text: o.login
                }
            }) : []
            this.setState({gitOrganisations})
        })
    
    }

    _gitOrganisationSelected = () => {

     }


    _getErrorMessagePromise = (value) => {
        var that = this
        return new Promise(resolve => {
            if (!value) {
                that.setState({validDestitationUrl:false})
                return resolve()
            }
    
        var e = null
        that.setState({validDestitationUrl:!e,destitationUrl:value})    
        resolve(e ? e.message:"")
        })
    }

_setContentRef(contentRef){
    console.log("setting ref to",contentRef)
    
    this.state.sheet.grid[this.state.activeCell.rowNumber][this.state.activeCell.columnNumber].centerData.contentRef = contentRef
    this.setState({sheet:this.state.sheet})

} 
    publishToPTO = () => {
        this.setState({publishState:-9})
        var that = this
        debugger
        var tableOf = {
            title: this.state.title,
            version:2,
            settings: {
                byline: `Developed by ${this.props.globalContext.me.displayName}- ${this.props.globalContext.me.upn}`,

                titlegraphics: this.state.titleGraphicUrl ? this.state.titleGraphicUrl : "https://jumpto365.com/resources/images/app/Title-EN.png",
                hideLogo: this.state.bannerHideOurLogo,
                textColor: this.state.bannerTextColor,
                backgroundColor: this.state.bannerBackgroundColor,
            },
            grid: this.state.sheet.grid
        }



        var item = {
            key: "-",
            title: "Default",
            tableOf
        }

       
        Jumpto365API.itemPatch("mytables", item)
    //    Jumpto365API.fileSave("-","default","context","index.json",json.plain( this.state.sheet))
        .then(() => {
            var publishedUrl = "/@/" + this.props.globalContext.me.upn + "/-"
            that.setState({publishedUrl,publishState:-8})
            }
                )
                
        .catch (error => {
            
            this.setState({publishError:error.message,publishState:-99})
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
        
        let storedFiles = this.state.data ? this.state.data.map(function (item,ix){
            return {key:item.key,name:item.file.name}
        }) : []

        var context = this.props.globalContext
        var myDomain = context.me.upn
        function prompt(id){
            return Jumpto365App.prompt(id,context)
         } 
      
         const farItems = [  {
            key: 'excel',
            xname : "Edit in Excel Online",
            icon: 'ExcelDocument',
            disabled: this.state.editLink ? false:true,
            href : this.state.editLink,
            target:"_blank",
            iconProps: { iconName: 'ExcelDocument' }
          }
        ]
    
        //var items = this.state.myLinks
        var subitems =  this.state && this.state.excelMap ? this.state.excelMap.sheets.map((item,ix)=>{
            
            return {
                
                key:ix,
                name : item.map ? item.name + " ("+ item.map.label +")" : item.name,
                icon:"Info",
                onClick: () => this._OpenSheet(item.name),
                iconProps: { iconName: 'BrowserTab' }
              }
        }) : [
            
        ]

        var items = [

              {
                key: 'code',
                disabled:false,
                name : "Save",
                onClick: () => {
                    this._prepareStage(-10)
                    this.setState({showPublisher : !this.state.showPublisher})
                    },
                iconProps: { iconName: 'Save' }
              },
              
        ]

        const overflowItems = []
        overflowItems.push(
                        {
                key: 'sheets',
                name : "Sheets",
                icon: 'Tab',
                iconProps: { iconName: 'Tab' },
                subMenuProps : {items:subitems} 
              },
              {
                key: 'code',
                name : "Debug",
                onClick: () => {this.setState({showCode : !this.state.showCode}),
                    this.updateDimensions(!this.state.showCode)},
                iconProps: { iconName: 'Code' }
              },

        )

        var articlePath = this.state.celldata && this.state.celldata.centerData && this.state.celldata.centerData.contentRef ? this.state.celldata.centerData.contentRef : this.state.celldata ?this.state.celldata.key :""
        return (
           
            <PageLayoutMain>
                <PageHeader icon={this.state.icon} title={this.state.title}  color="#2a7ab9"/>
                <div id="commandbar" style={{marginLeft:"-8px",marginRight:"-8px",marginTop:"-8px",marginBottom:"8px"}}>
                <CommandBar
                isSearchBoxVisible={ true}
                searchPlaceholderText='Search '
                elipisisAriaLabel='More options'
                items={ items }
                overflowItems={ subitems }
                farItems={ farItems }
                />
                </div>
                <PageBody>
                {/* <ReactJson collapsed="0" src={this.state} /> */}

        <Dialog
          hidden={!this.state.showPublisher}
          onDismiss={()=>this.setState({showPublisher:false})}
          dialogContentProps={{
            type: DialogType.largeHeader,
            title: 'Saving your Table',
            subText: ` We will store a copy of the table and generate a link which you can share with your self for now. Soon we will add sharing capabilities.
            `
          }}
          modalProps={{
            isBlocking: true,
            containerClassName: 'ms-dialogMainOverride'
          }}
        >
        {/* <div style={{padding:"8px"}}>
        <div class="ms-font-l" > Checkout the FAQ </div>
        <ul>
        <li>  <a href="https://jumpto365.zendesk.com/knowledge/articles/360020437632/en-us?brand_id=360001651512" tabIndex="-1" target="_blank">How do I get a GitHub account?</a></li>
            <li>  <a href="https://jumpto365.zendesk.com/knowledge/articles/360020437712/en-us?brand_id=360001651512" tabIndex="-1" target="_blank">What is a Personal Access Token and how do I get one?</a></li>
        </ul>
        </div> */}

{/*********************************************************************************************************************************************************************/}
{/*                               -10                                                                                                                                     */}
{/*********************************************************************************************************************************************************************/}
 {this.state.publishState===-10 && 
        <div style={{padding:"8px"}}>
          {/* <div class="ms-font-l"  >Confirm</div> */}
          <div style={{marginBottom:"8px"}}></div>
         
         
           
          <div style={{marginBottom:"8px"}}></div> 
             
            <PrimaryButton primary   onClick={(x,y,z) => {
               
                that.publishToPTO()
                    
                }}>Save</PrimaryButton>&nbsp;
            <DefaultButton onClick={()=>{that.setState({showPublisher:false})}}>Cancel</DefaultButton>
           
            </div>
            }
{/*********************************************************************************************************************************************************************/}
{/*                               -9                                                                                                                                    */}
{/*********************************************************************************************************************************************************************/}
 {this.state.publishState===-9 && 
        <div style={{padding:"8px"}}>
          <div class="ms-font-l"  >Saving ...</div>
          <div style={{marginBottom:"8px"}}></div>
         
         
           
          <div style={{marginBottom:"8px"}}></div> 
            
            <PrimaryButton onClick={()=>{that.setState({showPublisher:false})}}>Cancel</PrimaryButton>
           
            </div>
            }            
{/*********************************************************************************************************************************************************************/}
{/*                               -8                                                                                                                                     */}
{/*********************************************************************************************************************************************************************/}
 {this.state.publishState===-8 && 
        <div style={{padding:"8px"}}>
          <div class="ms-font-l"  >Saved</div>
          <div style={{marginBottom:"8px"}}></div>
        
         
           
          <div style={{marginBottom:"8px"}}></div> 
             
     
            <PrimaryButton primary onClick={()=>{navigate(`/@/${myDomain}/-`)}}>View</PrimaryButton>&nbsp;
            <DefaultButton  onClick={()=>{that.setState({showPublisher:false})}}>Close</DefaultButton>
            </div>
            }
{/*********************************************************************************************************************************************************************/}
{/*                               -99                                                                                                                                */}
{/*********************************************************************************************************************************************************************/}
 {this.state.publishState===-99 && 
        <div style={{padding:"8px"}}>
          <div class="ms-font-l"  >Error</div>
          <div style={{marginBottom:"8px"}}></div>
          <div style={{padding:"20px"}}>
         {this.state.publishError}
         
         </div>
          <div style={{marginBottom:"8px"}}></div> 
             
     
            <PrimaryButton primary onClick={()=>{that.setState({showPublisher:false})}}>Close</PrimaryButton>
           
            </div>
            }
{/*********************************************************************************************************************************************************************/}
{/*                               0                                                                                                                               */}
{/*********************************************************************************************************************************************************************/}

        {this.state.publishState===0 && //************* STEP 0 ********************/
        <div style={{padding:"8px"}}>
          <div class="ms-font-l"  >Select destination</div>
          <div style={{marginBottom:"8px"}}></div>
          <TextField placeholder="Enter name here "  
             onGetErrorMessage={this._getErrorMessagePromise}
            errorMessage={this.state.errorGITPAT} />
          <Dropdown 
          placeHolder="Select GitHub organisation"
          options={this.state.gitOrganisations}
          onChange={(e,selectedgitOrganisations,ix)=>{
             
              this.setState({selectedgitOrganisations})
              var PAT = getSetting("GITPAT","")
              var client = github.client(PAT);
              var org = client.org(selectedgitOrganisations.key)
        
            
      
              org.repos((e,repos)=>{
                  
                  var  gitRepos = repos ? repos.map(o=>{return {key:selectedgitOrganisations.key+ "/" + o.name,  text:o.name} }): []
                  
                   this.setState({ gitRepos})
      
              
              })
      
          }}
          />
        <Dropdown 
          placeHolder="Select GitHub repository"
          disabled={!this.state.selectedgitOrganisations}
          options={this.state.gitRepos}
          onChange={(e,selectedgitRepo,ix)=>{
             
              this.setState({selectedgitRepo})
               var PAT = getSetting("GITPAT","")
               var client = github.client(PAT);
               var repo = client.repo(selectedgitRepo.key)
        
            
      
               repo.branches((e,branches)=>{
                  
                  var  gitBranches = branches ? branches.map(o=>{return {key:o.name,  text:o.name} }): []
                  
                   this.setState({ gitBranches})
      
              
              })
      
          }}
          />
                  <Dropdown 
          placeHolder="Select branch"
          disabled={!this.state.selectedgitRepo}
          options={this.state.gitBranches}
          onChange={(e,selectedBranch,ix)=>{
             
              this.setState({selectedBranch})
            //    var PAT = getSetting("GITPAT","")
            //    var client = github.client(PAT);
            //    var repo = client.repo(selectedgitRepo.key)
        
            
      
            //    repo.branches((e,branches)=>{
                  
            //       var  gitBranches = branches ? branches.map(o=>{return {key:o.name,  text:o.name} }): []
                  
            //        this.setState({ gitBranches})
      
              
            //   })
      
          }}
          />
           
          <div style={{marginBottom:"8px"}}></div> 
             
            <PrimaryButton primary  disabled={!this.state.selectedBranch} primaryDisabled={!this.state.selectedBranch}   onClick={(x,y,z) => {
               
                that.setState({publishState:1})
                that._validateDestination()    
                    
                }}>Next</PrimaryButton>&nbsp;
            <DefaultButton onClick={()=>{that.setState({showPublisher:false})}}>Cancel</DefaultButton>
           
            </div>
            }

{/*********************************************************************************************************************************************************************/}
{/*                               1                                                                                                                                     */}
{/*********************************************************************************************************************************************************************/}

            {this.state.publishState===1 && //************* STEP 1 ********************/
            <div style={{padding:"8px"}}>
            <div class="ms-font-l"  >Destination</div>
            <div style={{marginBottom:"8px"}}>
          
            {this.state.selectedgitRepo.key}/{this.state.selectedBranch.key}
            </div>
            
            <PrimaryButton primary   onClick={(x,y,z) => {
               
                that.setState({publishState:2})

                var PAT = getSetting("GITPAT","")
                var client = github.client(PAT);
                var repo = client.repo(this.state.selectedgitRepo.key)
                repo.createContents("contexts/"+this.state.destitationUrl+"/index.json","Jumpto365 Publisher",json.plain( this.state.sheet),(a,b,c)=>{
                   // debugger
                })

                }}>Publish</PrimaryButton>&nbsp;
            <DefaultButton onClick={()=>{that.setState({publishState:0})}}>Back</DefaultButton>&nbsp;
            <DefaultButton onClick={()=>{that.setState({publishState:0,showPublisher:false})}}>Cancel</DefaultButton>
            </div>
            } 
{/*********************************************************************************************************************************************************************/}
{/*                               2                                                                                                                                     */}
{/*********************************************************************************************************************************************************************/}

            {this.state.publishState===2 && //************* STEP 2 ********************/
            <div style={{padding:"8px"}}>
            <div class="ms-font-l"  >Published</div>
            <div style={{marginBottom:"8px"}}>
            <a href={"/context/"+this.state.destitationUrl} target="_blank">View</a>
  
            </div>
            
            <PrimaryButton primary   onClick={(x,y,z) => {
               
                that.setState({showPublisher:false,publishState:0})

                }}>Close</PrimaryButton>&nbsp;

            </div>
            } 
         </Dialog>
{/*********************************************************************************************************************************************************************/}

{/*                                   M A I N                                                                                                                                                               */}

{/*********************************************************************************************************************************************************************/}


        {this.state.loading && 
        <Spinner size={SpinnerSize.large} label="Loading..." ariaLive="assertive" />
    }

                <div style={{display:"flex"}}>
                <div>
                
        
                    {this.state.isReload &&
                    <div>Reloading...</div>}

                {this.state.errors && false && 
                    <ReactJson collapsed="0" src={this.state.errors} />
                }  
               
                    {this.state.type==="WTW" &&
                    <ScenarioList defaultView="" tasks={this.state.sheet.mapping}/>
                    }
                    {this.state.type==="PTO" &&
                    
                    <PeriodicTable 
                    onAppClick={(stub,rowNumber,columnNumber)=>{
                        var gridState = this.state.gridStateGetter ? this.state.gridStateGetter() : null

                        if (gridState){
                            if (this.state.gridStateSetter){
                                this.state.gridStateSetter(gridState.map(i=>{
                                    i.dashed = true
                                    return i
                                }))
                            }
                        }
                        var celldata = this.state.sheet.grid[rowNumber][columnNumber]
                        console.log("app clicked",celldata,rowNumber,columnNumber)

                        this.setState({gridState,celldata,activeCell:{rowNumber,columnNumber},showArticlePicker:true,
                            previewingArticle:true, browsingArticles:false})


                            this._readTool(celldata.key,"en",celldata.centerData ? celldata.centerData.contentRef :null)
                            
                    }}
                    gridHandler={(gridStateGetter,gridStateSetter) => {
                        
                        this.setState({gridStateGetter,gridStateSetter})
                    }}
                    width={this.state.width} 
                    height={this.state.height} 
                    groups={this.state.sheet.groups} 
                    grid={this.state.sheet.grid} 
                    title={this.state.sheet.title}/> 
                    }
                     {this.state.type==="GROUPS" &&
                    <ScenarioList defaultView="keyname" tasks={this.state.sheet}/> 
                    }
                     {this.state.type==="TOOLS" &&
                    <ScenarioList defaultView="keyname" tasks={this.state.sheet}/> 
                    }
                     {(!this.state.type) &&
                        <Warning message={prompt("41")/*Cannot preview that>*/} /> 
                    
                    }
                    
                       {/* <Clipboard data-clipboard-text={json.plain(this.state.sheet)}>
                       Copy table to Clipboard
                     </Clipboard> */}
 
 {/*********************************************************************************************************************************************************************/}

{/*                                   E N D     M A I N                                                                                                                                                               */}

{/*********************************************************************************************************************************************************************/}

                   
                     {/* <ReactJson src={{signatures:Excel.signatures,map:this.state.excelMap ? this.state.excelMap.sheets :  null}} collapsed="3"></ReactJson>  */}

                     </div>
                     
                     {this.state.showCode &&
                     <div style={{display:"flex"}}>
                     <div>
                         
                        {this.state.celldata &&
                        <div style={{padding:"10px",border:"1px solid #888888 ",overflowX:"hidden",minWidth:"300px", marginTop:"-10px",height:this.state.height}}>
                        <div style={{  marginLeft:"8px",xoverflowX:"hidden",xoverflowY:"auto"}}>
                        <PrimaryButton primary disabled={!that.state.contentRef} 
                        onClick={()=>{that._setContentRef(that.state.contentRef)}} >Map to this</PrimaryButton>
                        <ScenarioPanelSingleSelection  
                        UPN={context && context.me ? context.me.upn : null} 
                        navigateFullScreenHidden 
                        cell={this.state.celldata}
                        onSelectArticle={(contentRef)=>{
                            that.setState({contentRef})
                        }}
                        
                        >
                        {/* <ReactJson src={this.state.celldata} collapsed="1"></ReactJson>  */}
                        </ScenarioPanelSingleSelection>
                        </div></div>
                        }
                     </div>
                     
                     {/* <div style={{padding:"8px"}}>
                     <PrimaryButton  disabled={!this.state.editedCell} onClick={this._updateTable } text="Update Table" />
                     </div> */}
                     </div>
                     }
                     </div>
                     

                     <Dialog
          hidden={!this.state.showArticlePicker}
          onDismiss={()=>{this.setState({showArticlePicker:false})} }
          dialogContentProps={{
            type: DialogType.largeHeader,
            title: this.state.previewingArticle ? 'Preview Article' :  'Select Article',
            xsubText: ""
          }}
          minWidth={this.state.width/1.3}
          modalProps={{
            isBlocking: false,
            containerClassName: 'ms-dialogMainOverride'
          }}
        >
        <div style={{height:"400px",width:"100%",overflow:"auto"}}>
        {this.state.previewingArticle &&
        <div className="ms-font-m toolbody" 
                        
                        dangerouslySetInnerHTML={{ __html: this.state.body }}></div> 
        }
          {this.state.browsingArticles===true && 
        <ArticleExplorer context={this.props.globalContext} onArticleSelected={(path)=>{
            this.setState({contentRef:path})
            
           
        }}/>
    }


        </div>
          <DialogFooter>
{articlePath}
              {this.state.previewingArticle &&
          <PrimaryButton   onClick={() => {

     
            this.setState({browsingArticles:true,previewingArticle:false})
            }} text="Change" />
        }
              {this.state.browsingArticles && 

            <PrimaryButton disabled={!this.state.contentRef}  onClick={() => {

                this._setContentRef(this.state.contentRef)
                this.setState({showArticlePicker:false})
                }} text="Select" />
            }
            <DefaultButton onClick={()=>{this.setState({showArticlePicker:false})} } text="Close" />
          </DialogFooter>
        </Dialog>
            <Dialog
          hidden={this.state.hideDialog}
          onDismiss={this._closeDialog}
          dialogContentProps={this.state.dialog}
          modalProps={{
            isBlocking: true,
            containerClassName: 'ms-dialogMainOverride'
          }}
        >
          <DialogFooter>
            <PrimaryButton onClick={this._closeDialog} text="Close" />
            
          </DialogFooter>
        </Dialog>
         
                    
                   
              
                 </PageBody>
            </PageLayoutMain>
            
        )
    }
}

