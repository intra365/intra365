import React, { Component } from 'react';
import PropTypes from 'prop-types'
import PageLayoutMain from '../../_Layouts/PageLayoutMain';
import ScenarioListWithFilter from '../../ScenarioListWithFilter';
import TestData from '../../../data/TestData'
import Utility from '../../../utilities'
import PageHeader from '../../PageHeader';
import ScenarioPanelSingleSelection from '../../ScenarioPanelSingleselection';
import ScenarioPanelMultiSelection from '../../ScenarioPanelMultiselection';
import Data from '../../_Data';
import Jumpto365Service from '../../../services' 
import "./scenario.css"
import $ from "jquery"
import Jumpto365App from '../../_Contexts/Jumpto365App';
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';
import PeriodicTable from '../../PeriodicTable';

class SidebarPanel extends Component {
    static propTypes  = {

        isMobile : PropTypes.string



    }
    
    render() {
        var mobile = this.props.isMobile ? "-Mobile" : ""
        return ( <div className = {`SidebarOuterBorder${mobile}`} >
            <div className = {`SidebarInnerBorder${mobile}`} >
            <div className = {`SidebarContent${mobile}`} >
            {
                this.props.children
            } </div> </div> </div>
        )
    }
}
/**
 * Describe overall purpose of the component
 *
 * @export
 * @class ScenarioPage
 * @extends {Component}
 */
export default class ScenarioPage extends Component {

    static propTypes  = {
        domain: PropTypes.string.isRequired,
        islocal : PropTypes.any,
        id : PropTypes.any,
        sheet : PropTypes.any,
        globalContext : PropTypes.obj,
        technology: PropTypes.string,
        isMobile : PropTypes.string



    }
    
//TODO: Remove test data references
    data = null
    jumpto365Service = null
    constructor(props) {
        super(props);

        this.state = {tasks:[],originalTasks:[],areas:TestData.areas,tools:TestData.tools,view : this.props.view,showIntro:true}
    }
    updateDimensions = () => {
        //this.setState({ });
        var win = $(window)
        var h = win.height()
        var mastHead = $("#header")
        var pageHead = $("#pageheader")
        var leftSide = $("#leftside")
        this.setState({
            title: "",
            view : this.props.view, // "toolsInOneColumn",
            height:h - (mastHead ? mastHead.height() : 0) - (pageHead ? pageHead.height() : 0),
            width:(leftSide ? leftSide.width() : 600)
        });


    }
    _load = () => {
        this.jumpto365Service = new Jumpto365Service()
        window.addEventListener("resize", this.updateDimensions);

        var filename = this.props.domain.toLowerCase().replace(/[^\w]+/g, '-')
        var that = this
        function header (components,grid){
            return (
                <div style={{display:"flex"}}>
                    <div style={{width:"50%",height:"300px",overflowX:"auto"}}>
                    {components}
                    </div>
                    <div>
                    <PeriodicTable width={500} height={300} grid={grid} language={that.props.language}/>
                    </div>
                </div>
            )
        }

        this.jumpto365Service
        .getMarkDown("hexatown","docs",`${this.props.technology}/usecases/${filename}`)
        .then(document => {
            this.setState({
              
                introDocument: document,
                introBody : document.body,
                introComponents: document.components
              })
            // this.jumpto365Service.getContext("office365",this.props.language)
            // .then(context => {
            //     this.setState({
              
            //         introDocument: document,
            //         introBody : document.body,
            //         introComponents: header(document.components,context.grid)
            //       })
                
            // })
            // .catch(error => {
            //     this.setState({warnings : (this.state.warnings ? this.state.warnings  : []).push(error)} )
            // })

           
          })
          .catch((error) => {
            this.setState({
              error: error.message
            })
          })


        this.jumpto365Service
        .getJSON(this.props.domain,`${this.props.technology}/usecases`)
        .then(usecase=>{

            var tasks0 =  Utility.GroupTasksBySubject( usecase.tasks)  
            var tasks = Utility.EnsureNameAndApplyKeyValue(tasks0)
    
            
            this.data = new Data()

            var tools = usecase.tools ? usecase.tools : this.state.tools
            var areas = usecase.areas ? usecase.areas : this.state.areas
            
            this.setState({tasks,
                icon : usecase.icon,
                color : usecase.color,
                tools,areas,
                originalTasks:tasks,
                title:usecase.title})
        })
        .catch(e=>{
            Jumpto365App.emitError(this,e,"Which tool when loader")
        })

        this.updateDimensions()
    }
    componentDidMount = () => {
      var stored =  localStorage.getItem("showIntro")

      if (stored !== null){
          this.setState({showIntro: stored === "true" ? true : false})
      }
      this._load()
    }

    componentWillUnmount = () => {
        window.removeEventListener("resize", this.updateDimensions);
    }
    componentDidUpdate = (previousProps, previousState) => {

        if (previousProps !== this.props){
          this._load()
        }
        
      }

    
    _onSearch = (searchTerm) => {
      this.setState({searchTerm})
      this._applyFilters(this.state.filter,searchTerm)
    }
    _onFilter = (filter) => {
      this.setState({filter})
      this._applyFilters(filter,this.state.searchTerm)
    }
  
    _applyFilters(filter,searchTerm){
      Utility.FilterItems(this.state.originalTasks,filter,searchTerm).then(
        tasks => this.setState({tasks})
      )
    }

    _onSelection  = (selection) => {
        this.setState({selection})
        
      }
      _toggleIntro = () => {
        this.setState({showIntro:!this.state.showIntro})
        localStorage.setItem("showIntro",!this.state.showIntro ? "true":"false")
      }
    /**
     * Required method return the output of the component
     *
     * @returns
     * @memberof ScenarioPage
     */
    render() {

        if (this.state.errors){
            return <div>{JSON.stringify(this.state.errors)}</div>
        }
        var count =  this.state.selection ? this.state.selection.length : 0 
        var listClass,sidebarClass,panel = null
        var style = {}  
        var listStyleMobile = {}      
        var mobile = this.props.isMobile ? "-Mobile" : ""
        switch (count) {
            case 0: 
                listClass = "   "
                sidebarClass = `SidebarNoSelection${mobile}`
                style =  {height: this.state.height}
                panel = null
                break;
            
            case 1:
                listClass = `ItemsSelected${mobile}`
                sidebarClass = `SidebarSingleSelection${mobile} SidebarSelection${mobile}`
                listStyleMobile = {height:"300px",overflowY:"auto",overflowX:"hidden"}
                var scenario = this.state.selection[0]
                style =  {height: this.state.height}
                scenario.tools = Utility.ResolveTools(scenario.tools,this.data.getApp)
                scenario.domain = this.props.domain
                panel = <SidebarPanel isMobile={this.props.isMobile}>
                <ScenarioPanelSingleSelection 
                technology={this.props.technology}
                domain={this.props.domain}
                view={this.props.view}

                isMobile={this.props.isMobile} 
                scenario={scenario}/>
                </SidebarPanel>
                break;
        
            default:
                listClass = `ItemsSelected${mobile}`
                style =  {height: this.state.height}
                sidebarClass = `SidebarMultiSelection${mobile} SidebarSelection${mobile}`
                var scenarios = this.state.selection.map(scenario=>{
                    scenario.domain = this.props.domain
                    scenario.tools = Utility.ResolveTools(scenario.tools,this.data.getApp)
                    return scenario
                })
                
                
                panel = <SidebarPanel isMobile={this.props.isMobile}><ScenarioPanelMultiSelection scenarios={scenarios}/></SidebarPanel>
                break;
                
        }
        var title = this.state.title
        var that = this
        return (
            <div>
            {this.props.isMobile &&
                <PageLayoutMain>
                    <PageHeader  title={title} color={this.state.color} icon={this.state.icon}/>

                    
                    { this.state.introBody &&
                        <div style={{display:"flex",justifyContent:"flex-end",alignItems:"center",border:"0px dashed red"}}>
                        <div style={{lineHeight:"24px",marginRight:"8px"}}>Introduction</div>
                        <div><Toggle
                            onChanged={that._toggleIntro}
                            defaultChecked={this.state.showIntro}
                            xlabel="Introduction"
                            onText="On"
                            offText="Off"
                            onFocus={() => console.log('onFocus called')}
                            onBlur={() => console.log('onBlur called')}
                            /></div>
                        </div>
                       }
                        
                        {(this.state.showIntro && this.state.introBody )  &&  
                        <div style={{marginTop:"8px",marginBottom:"8px",marginLeft:"8px",marginRight:"8px"}}>
                        <div className="markdown" > 
                        {this.state.introComponents}</div> 
                        <div style={{clear:"both"}}></div>
                        </div>
                    }

                    <div className={listClass} style={listStyleMobile}> 
                    
                    <ScenarioListWithFilter defaultView={this.state.view} 
                                            globalContext={this.props.globalContext}
                                            areas={this.state.areas} 
                                            tools={this.state.tools} 
                                            tasks={this.state.tasks} 
                                            onSearch={this._onSearch} 
                                            onFilter={this._onFilter} 
                                            onSelection  ={this._onSelection}/>
                    </div>
                    <div className={sidebarClass}> 
                    {panel}
                    </div>

                </PageLayoutMain>}
                
                {!this.props.isMobile &&
                    <PageLayoutMain>
                        <PageHeader title={title} color={this.state.color} icon={this.state.icon}/>
                   
                        
                       { this.state.introBody &&
                        <div style={{display:"flex",justifyContent:"flex-end",alignItems:"center",color:"#ffffff",border:"0px dashed red",marginTop:"-50px"}}>
                        <div style={{lineHeight:"24px",marginRight:"8px",marginTop:"-5px"}}>Introduction</div>
                        <div><Toggle
                            onChanged={that._toggleIntro}
                            defaultChecked={this.state.showIntro}
                            xlabel="Introduction"
                            onText=""
                            offText=""
                            style={{color:"#ffffff"}}
                            onFocus={() => console.log('onFocus called')}
                            onBlur={() => console.log('onBlur called')}
                            /></div>
                        </div>
                       }
                        
                        <div style={{marginTop:"10px",marginBottom:"8px",marginLeft:"8px",marginRight:"8px"}}>
                        {(this.state.showIntro && this.state.introBody ) &&  
                        <div>
                        <div className="markdown" > 
                        {this.state.introComponents}</div> 
                        <div style={{clear:"both"}}></div>
                        </div>
                    }
                        </div>
                    

                        <div className={listClass} style={style}> 
                        
                        <ScenarioListWithFilter defaultView={this.state.view} 
                                                globalContext={this.props.globalContext}
                                                areas={this.state.areas} 
                                                tools={this.state.tools} 
                                                tasks={this.state.tasks} 
                                                onSearch={this._onSearch} 
                                                onFilter={this._onFilter} 
                                                onSelection  ={this._onSelection}/>
                        </div>
                        <div className={sidebarClass}> 
                        {panel}
                        </div>
    
                    </PageLayoutMain>}
                </div>
        )
    }
}

