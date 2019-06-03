import React, { Component } from 'react';
import PropTypes from 'prop-types'
import PageLayoutMain from '../../_Layouts/PageLayoutMain';
import PageHeader from '../../PageHeader';
import Jumpto365App, {getSetting,setSetting,licenseInfo} from '../../_Contexts/Jumpto365App'
import OfficeGraphService,{getWordMarkdown,download2} from '../../../services/OfficeGraph'
import ReactJson from 'react-json-view'
import PageBody from '../../PageBody';
import ScenarioList from '../../ScenarioList';
import "./tool.css"
import { navigate ,Link } from "@reach/router"
import _ from "lodash"
import { CommandBar } from 'office-ui-fabric-react/lib/CommandBar';
import { TextField, DefaultButton, PrimaryButton } from 'office-ui-fabric-react';
import { Dialog, DialogType, DialogFooter } from 'office-ui-fabric-react/lib/Dialog';
import ArticleExplorer from '../../ArticleExplorer';
import GenericItemExplorer from '../../GenericItemExplorer';

var github = require("octonode")



class GitBrowser extends React.PureComponent {
    state = {}

    cache = {}

    contructor(props){
        this.fieldPAT = React.createRef();
    }
    componentDidUpdate = (previousProps, previousState) => {

        if (previousProps.level1 !== this.props.level1){
         this.setState({files:null,body:null})
          this._load()
        }
        
      }
      componentDidMount = () => {

         
          this._load()
      }



    _gitInit = (PAT) => {
        const copyArray = (array) => {
            const newArray = [];
            for (let i = 0; i < array.length; i++) {
                newArray[i] = array[i];
            }
            return newArray;
        }


       
        this.setState({
            PAT
        })
        var client = github.client(PAT);

        var ghme = client.me()

        ghme.info((e, gitMe) => {
            this.setState({
                gitMe
            })
        })


        var parseOrgs = (orgs) => {
            var gitOrganisations = orgs ? orgs.map(o => {
                return {
                    key: o.login,
                    title: o.description
                }
            }) : []

            this.setState({
                gitOrganisations: _.sortBy(gitOrganisations, "key")
            })
        }


        // if (this.cache.orgs) {
        //     parseOrgs(orgs)
        // } else {
            ghme.orgs((e, orgs) => {
                this.cache.orgs = orgs
                parseOrgs(orgs)
            })
        //}
    }


    _gitOrgSelected = (selection) => {
        console.log(selection)
        if (!selection ) return
        if (selection.length < 1 ) return this.setState({gitRepos:null,gitOrg:null})
        var PAT = this.state.PAT
        var client = github.client(PAT);

        var ghme = client.me()
        var org = client.org(selection[0].key)
        
        org.info((e,gitOrg)=>{
            this.setState({gitOrg})
        })


        org.repos((e,repos)=>{
            
            var  gitRepos = repos ? repos.map(o=>{return {key:selection[0].key + "/" + o.name,  title:o.description,id:o.id} }): []
            
             this.setState({ gitRepos: _.sortBy(gitRepos,"key")})

        
        })
       
    }
    _gitRepoSelected = (selection) => {
        console.log(selection)
        if (!selection ) return
        if (selection.length < 1 ) return this.setState({gitRepo:null})
        var PAT = this.state.PAT
        var client = github.client(PAT);

        var ghme = client.me()
        var repo = client.repo(selection[0].key)


        repo.info((e,repo)=>{
            
           
            
             this.setState({ gitRepo:repo})

            
        })
    }
    canPublish = (file) => {
        if (!file) return false
        if (file.icon === "ExcelDocument") return true
        return false
    } 
    _validatePAT = () => {
        this.setState({validPAT:true})
    }
    _load = () => {
        
        if (!this.props.context) return
        if (!this.props.context.isAuthenticated) return
        var PAT = getSetting("GITPAT","")
        
        this.setState({noPAT:PAT==="",errorGITPAT:""})
        


       this._gitInit(PAT)

    }
    _getErrorMessagePromise = (value) => {
        var that = this
        return new Promise(resolve => {
            if (!value) {
                that.setState({validPAT:false})
                return resolve()
            }
        var client = github.client(value);

        var ghme = client.me()

        ghme.info((e,gitMe)=>{
          //  debugger
           
            that.setState({validPAT:!e,draftPAT:value})
            
            resolve(e ? e.message:"")
        
        });
      })
    }
    _setPAT = (PAT) => {
      
        setSetting("GITPAT",PAT)
        this._load()
    }

    

   
    render() {
        var that = this
        let ctx = this.props.context

        if (!ctx ) return "No context"
        if (!ctx.isAuthenticated ) return "Not authenticated"
        if (!ctx.user ) return "No user object in context"
        

       
    
        function prompt(id){
            return Jumpto365App.prompt(id,ctx)
         } 

        if (this.state.noPAT){
        return(
<div>
<Dialog
          hidden={false}
          onDismiss={this._closeDialog}
          dialogContentProps={{
            type: DialogType.largeHeader,
            title: 'A key is required here',
            subText: `In order to integrated with GitHub we need a GitHub Personal Access token from you. 
            The token will be saved in your browsers cache only.
            `
          }}
          modalProps={{
            isBlocking: true,
            containerClassName: 'ms-dialogMainOverride'
          }}
        >
        <div style={{padding:"8px"}}>
        <div class="ms-font-l" > Checkout the FAQ </div>
        <ul>
        <li>  <a href="https://jumpto365.zendesk.com/knowledge/articles/360020437632/en-us?brand_id=360001651512" tabIndex="-1" target="_blank">How do I get a GitHub account?</a></li>
            <li>  <a href="https://jumpto365.zendesk.com/knowledge/articles/360020437712/en-us?brand_id=360001651512" tabIndex="-1" target="_blank">What is a Personal Access Token and how do I get one?</a></li>
        </ul>
        </div>
        <div style={{padding:"8px"}}>
          <div class="ms-font-l"  >Then proceed and enter your token</div>
          <div style={{marginBottom:"8px"}}></div>
          
            <TextField placeholder="Paste Token here "  
             onGetErrorMessage={this._getErrorMessagePromise}
            errorMessage={this.state.errorGITPAT} />
          <div style={{marginBottom:"8px"}}></div>
            
            <PrimaryButton primary  disabled={!this.state.validPAT} primaryDisabled={!this.state.validPAT}   onClick={(x,y,z) => {
                //debugger
                that._setPAT(this.state.draftPAT)
                }}>Save</PrimaryButton>&nbsp;
            <DefaultButton onClick={()=>{navigate("/")}}>Cancel</DefaultButton>
           
            </div>
            </Dialog>
</div>
        )

        } 

        return (
           

        
                <div>
                 
                        <div style={{display:"flex"}}>
                            <div style={{flexGrow:"1",width:"200px"}}>
                                {this.state.gitOrganisations && 
                                  <ScenarioList singleSelection  onSelectionChanged={this._gitOrgSelected} defaultView="key" tasks={this.state.gitOrganisations}/>
                                }
                            </div>
                            <div style={{flexGrow:"1",width:"200px"}}>
                            {this.state.gitOrg && 
                            <div>
                                <div className="ms-font-su" style={{lineHeight:"42px"}}>
                                    <img style={{height:"42px",width:"auto",verticalAlign:"middle" ,marginRight:"8px"}} src={this.state.gitOrg.avatar_url}></img>
                                    {this.state.gitOrg.login}

                                </div>
                                 <div className="ms-font-s-plus">
                                 {this.state.gitOrg.description}

                             </div><div className="ms-font-xl">
                                 Repositories

                             </div>
                             </div>
                            }
                            {this.state.gitRepos && 
                                  <ScenarioList singleSelection defaultView="key" tasks={this.state.gitRepos} onSelectionChanged={this._gitRepoSelected} />
                                }

                            </div>
                            <div>
                            {this.state.gitRepo && 
                             <div>
                             <div className="ms-font-su" style={{lineHeight:"42px"}}>
                               
                                 {this.state.gitRepo.name}

                             </div>
                              <div className="ms-font-s-plus">
                              {this.state.gitRepo.description}

                          </div><div className="ms-font-xl">
                              Links

                          </div>
                          </div>
                                }
                            </div>
                            <div>
                            {/* <ReactJson src={{ state:this.state,props:this.props}} collapsed={2}/>   */}
                            </div>
                        </div>
            

        

                                

                                
       
</div>

        
        )
        
    }

}
class OneDriveBrowser extends React.PureComponent {
    state = {}
    componentDidUpdate = (previousProps, previousState) => {

        if (previousProps.level1 !== this.props.level1){
         this.setState({files:null,body:null})
          this._load()
        }
        
      }
      componentDidMount = () => {
          this._load()
      }

      _itemSelected = (selection) => {
          var that = this
        console.log(selection)
        if (!selection ) return
        if (selection.length < 1 ) return this.setState({file:null,childlevel1:null,childlevel1Text:null})

        var file = selection[0]
        

        var childlevel1 = null
        var childlevel1Text = file.file.name

        this.setState({file,childlevel1:null,childlevel1Text:null})
        if (!file.file.folder) return
        this._loadSubPath(file.file.name)
        .then(files=>{
            //debugger
            that.setState({childlevel1:files,childlevel1Text})
        })
    }

    _subitemSelected = (selection) => {
        var that = this
      console.log(selection)
      if (!selection ) return
      if (selection.length < 1 ) return

      var file = selection[0]

      this.setState({file})

  }
    _icon = (item) => {

        if (item.folder){
            return "FolderHorizontal"
        }

        var i = _.lastIndexOf(item.name,".")
        
        var extention = item.name.substr(i)  
        switch (extention) {
            case ".xlsx":
                return "ExcelDocument"
                break;
            case ".docx":
                return "WordDocument"
                break;       
            default:
                return "Document"
                break;
        }
    }
    _load = () => {
        
        if (!this.props.context) return
        if (!this.props.context.isAuthenticated) return




        let graph = new OfficeGraphService()
        graph.me_drive()
        .then(me_drive => {
            var files = me_drive.value.map((file,ix)=>{
                return {key:file.name,icon:this._icon(file),title: this._icon(file),   file}
            })
            this.setState({root:files})
        })
        .catch(error => {
            Jumpto365App.emitError(this,error,"Getting drive" )
        })
    }


    _loadSubPath = (subpath) => {
        return new Promise((resolve, reject) => {
            let graph = new OfficeGraphService()
           
            graph.me_drive2(subpath)
            .then(me_drive => {
                var files = me_drive.value.map((file,ix)=>{
                    return {key:file.name,icon:this._icon(file),title: this._icon(file),   file}
                })
                resolve(files)
            })
            .catch(error => {
                Jumpto365App.emitError(this,error,"Getting drive" )
            })
        });
    }
    canPublish = (file) => {
        if (!file) return false
        if (file.icon === "ExcelDocument") return true
        return false
    } 
    render() {

        let ctx = this.props.context

        if (!ctx ) return "No context"
        if (!ctx.isAuthenticated ) return "Not authenticated"
        if (!ctx.user ) return "No user object in context"
        
        function prompt(id){
            return Jumpto365App.prompt(id,ctx)
         } 

     
         const farItems = [
        //      {
        //     key:"help",
        //     name: "Help",
        //     icon:"Info",
        //     disabled:true,
        //   }
        ]
    
        var items = [



          {
            key: "file",
            name: "File",
            disabled: !this.state.file,

            subMenuProps: {
              items: [{
                  key: 'open',
                  name: 'Open',
                  disabled: false,
                  onClick: () => { 
                      window.open(this.state.file.file.webUrl,"_blank")
                    
                    }   
                },
                // {
                //   key: 'save',
                //   name: 'Save',
                //   disabled: true,
                // },
                // {
                //   key: 'saveas',
                //   name: 'Save as',
                //   disabled: true,
                // }
              ]
            }
          },
          {
            key: "publish",
            name: "Publish", 
            icon: "Share",
            disabled: !this.canPublish(this.state.file) ,
            onClick: () => { 
              navigate("/excel/"+ this.state.file.file.name + "/tools")
              }     
          },
        //   {
        //     key: "download",
        //     name: "Download", 
        //     icon: "Download",
        //     disabled: true,

        //   }
        ]

        const overflowItems = []
        overflowItems.push({
          key: "rename",
          name: "Rename",
          icon: "Rename",
          disabled:true
         

        })

        return (
           

        
                <div>
                 <div id="toolbar" style={{marginTop:"-8px",marginLeft:"-8px",marginRight:"-8px",marginBottom:"8px"}}>
        
        <CommandBar
        
          isSearchBoxVisible={ false}
          searchPlaceholderText='Search use case'
          elipisisAriaLabel='More options'
          items={ items }
          overflowItems={ overflowItems }
          farItems={ farItems }
        />
      </div>
                        <div style={{display:"flex"}}>
                            <div style={{flexGrow:"1",width:"200px"}}>
                                {this.state.root && 
                                <div>
                                    <div className="ms-font-xl" style={{padding:"8px"}}>
                                 Your jumpto365 content

                             </div>
                                  <ScenarioList singleSelection  onSelectionChanged={this._itemSelected} defaultView="iconname" tasks={this.state.root}/>
                                </div>
                                }
                            </div>
           
                            <div style={{flexGrow:"1",width:"200px"}}>
                                {this.state.childlevel1 && 
                                <div>
                                    <div className="ms-font-xl" style={{padding:"8px"}}>
                                 {this.state.childlevel1text}

                             </div>
                                  <ScenarioList singleSelection  onSelectionChanged={this._subitemSelected} defaultView="iconname" tasks={this.state.childlevel1}/>
                                </div>
                                }
                            </div>
                            <div style={{flexGrow:"1",width:"200px"}}>
                                {this.state.file && this.state.file.file && this.state.file.file.file && 
                                <div>
                                    <div className="ms-font-xl" style={{padding:"8px"}}>
                               {this.state.file.file.name}

                             </div>
                             <a href={this.state.file.file.webUrl} target="_blank">Open</a>
                                 
                                </div>
                                }
                            </div>                     
                            <div>
                            {/* <ReactJson src={{ state:this.state,props:this.props}} collapsed={2}/>    */}
                            </div>
                        </div>
                    </div>

        
        )
        
    }

}
/**
 * Describe overall purpose of the component
 * 
 * 
 * 
 * 
 * https://graph.microsoft.com/v1.0/users/niels@hexatown.com/drive/root/children
 * 
 * 
 *
 * @export
 * @class ExplorerPage
 * @extends {Component}
 */


export default class ExplorerPage extends React.PureComponent {

    static propTypes  = {
      
        context : PropTypes.any, // todo - Refactor and callit globalContext : PropTypes.obj
        user : PropTypes.any,
        store : PropTypes.any,
        folder : PropTypes.any,
        file : PropTypes.any,
       
    }

    
    
    state = {}
    
    
    constructor(props) {
        super(props);
      
    }

   
    componentDidUpdate = (previousProps, previousState) => {

        if (previousProps.level1 !== this.props.level1){
         this.setState({files:null,body:null})
          this._load()
        }
        
      }
      componentDidMount = () => {
          this._load()
      }





    
    _load = () => {
        var additionalLoading = true
        switch (this.props.store) {
            case "git":
            additionalLoading = false
                break;
           case "onedrive":
           additionalLoading = true
                break;
           case "articles":
                additionalLoading = false
                break;               
            default:
                additionalLoading = false
                break;
        }

        if (!additionalLoading) return
        let graph = new OfficeGraphService()
        //return
        if (!this.props.context) return
        if (!this.props.context.isAuthenticated) return

     



        
      

        var filepath = this.props.uri.replace("/-/", "")

       
       
        graph.me_file(filepath)
            .then(filedata => {
                this.setState({
                    filepath
                })
            })
            .catch(error => {
                Jumpto365App.emitError(this, error, "Getting file")
            })


        graph.drives_root().then(drive => {
                setSetting("drivesRoot", drive)
                this.setState({
                    drive
                })
            })
            .catch(error => {
                Jumpto365App.emitError(this, error, "Getting drives")
            })

        graph.sites_root().then(sites => {
                setSetting("sitesRoot", sites)
                this.setState({
                    sites
                })
            })
            .catch(error => {
                Jumpto365App.emitError(this, error, "Getting SharePoint")
            })




    }
    

   
    
    _getDrive = () => {
        let graph = new OfficeGraphService()
        graph.me_drive()
        .then(me_drive => {
            var files = me_drive.value.map((file,ix)=>{
                return {key:ix,title:file.name,file}
            })
            this.setState({files})
        })
        .catch(error => {
            Jumpto365App.emitError(this,error,"Getting drive" )
        })
    }
    _onSelection  = (selection) => {
        this.setState({selection})

        if (selection && selection.length && selection.length === 1){
            navigate(`me/home/jumpto365/${selection[0].file.name}`)
            //this._download(selection[0].file["@microsoft.graph.downloadUrl"],selection[0].file.name)
        }
        
      }

      _login = () => {
          Jumpto365App.login(this.props.context)
      }
    render() {

        let ctx = this.props.context

        if (!ctx ) return "No context"
        if (!ctx.isAuthenticated ) return "Not authenticated"
        if (!ctx.user ) return "No user object in context"
        
        function prompt(id){
            return Jumpto365App.prompt(id,ctx)
         } 

         var title="Select Repository"
         var body = <div>
             <div>
             <Link to="git"  >Git</Link>
             </div>
             <div>
             <Link to="onedrive"  >OneDrive</Link>
             </div>
         </div>
         switch (this.props.store) {
             case "git":
                 title = "GitHub browser"
                 body = <GitBrowser context={this.props.context}   ></GitBrowser>
                 break;
            case "onedrive":
                 title = "OneDrive browser (jumpto365 folder only)"
                 body = <OneDriveBrowser context={this.props.context}  ></OneDriveBrowser>
                 break;
            case "articles":
                 title = "Article browser "
                 body = <ArticleExplorer    context={this.props.context}  ></ArticleExplorer>
                 break;               
            case "items":
                 title = "Item browser "
                 body = <GenericItemExplorer context={this.props.context}  ></GenericItemExplorer>
                 break;               

             default:
                 break;
         }


        return (
            <PageLayoutMain>
                <PageHeader title={title} color="#2a7ab9"/>
                <PageBody>
                     <div style={{display:"flex"}}>
                        <div style={{flexGrow:"3"}}>
                        {body}         
                      </div>
                     <div>
                            {/* <ReactJson src={{ state:this.state,props:this.props}} collapsed={2}/>   */}
                            </div>
                            </div>
                </PageBody>     
            </PageLayoutMain>
        )
        
    }
}

