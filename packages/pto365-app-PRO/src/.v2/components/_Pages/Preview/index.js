import React, { Component } from 'react';
import PropTypes from 'prop-types'
import PageLayoutMain from '../../_Layouts/PageLayoutMain';
import PageHeader from '../../PageHeader';
import Excel from '../../../utilities/Excel'
import ScenarioListWithFilter from '../../ScenarioListWithFilter';
import Utility from '../../../utilities'
import ScenarioPanelSingleSelection from '../../ScenarioPanelSingleselection';
import ScenarioPanelMultiSelection from '../../ScenarioPanelMultiselection';

import Data from '../../_Data';
import "../Scenario/scenario.css"
import PageBody from '../../PageBody';
const storagename = "jumpto365excel"
class SidebarPanel extends Component {
    render() {
        return ( <div className = "SidebarOuterBorder" >
            <div className = "SidebarInnerBorder" >
            <div className = "SidebarContent" >
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
 * @class LoginPage
 * @extends {Component}
 */
export default class PreviewPage extends Component {

    static propTypes  = {
       view : PropTypes.string,
       id :  PropTypes.string,
       subpath : PropTypes.string,
    }
  
    constructor(props) {
        super(props);
        this.state = {}
          
        this.data = new Data()
    }

  
    componentDidMount = () => {
        var dataText = localStorage.getItem(storagename)
        if (!dataText ) return
        this.setState({data: dataText ? JSON.parse(dataText) : []})
        let data = JSON.parse(dataText)

        //TODO : Support other views
        if (this.props.id < data.length){
            let id = this.props.id
            let item = data[id]
            let filedata = item.data
            
            
            var buf = Buffer.from(filedata, 'base64')
            Excel
            .parseWTW(buf,this.props.subpath)
            .then(wtw=>{
                
                var tasks0 =  Utility.GroupTasksBySubject( wtw.mapping)  
                var tasks = Utility.EnsureNameAndApplyKeyValue(tasks0)
                this.setState({tasks,originalTasks:tasks,tools:wtw.tools,areas:wtw.areas,wtw})     
            })
            .catch(err=>{
                this.setState({error:err.message})
                
            })
        }
        else{
            this.setState({error:`Cannot find local data to show`})
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



    /**
     * Required method return the output of the component
     *
     * @returns
     * @memberof ScenarioPage
     */
    render() {

        var count =  this.state.selection ? this.state.selection.length : 0 
        var listClass,sidebarClass,panel = null
        
        switch (count) {
            case 0: 
                listClass = "   "
                sidebarClass = "SidebarNoSelection"
                panel = null
                break;
            
            case 1:
                listClass = "ItemsSelected"
                sidebarClass = "SidebarSingleSelection SidebarSelection"
                var scenario = this.state.selection[0]
                scenario.tools = Utility.ResolveTools(scenario.tools,this.data.getApp)
                scenario.domain = this.props.domain
                panel = <SidebarPanel><ScenarioPanelSingleSelection scenario={scenario}/></SidebarPanel>
                break;
        
            default:
                listClass = "ItemsSelected"
                sidebarClass = "SidebarMultiSelection SidebarSelection"
                var scenarios = this.state.selection.map(scenario=>{
                    scenario.domain = this.props.domain
                    scenario.tools = Utility.ResolveTools(scenario.tools,this.data.getApp)
                    return scenario
                })
                
                
                panel = <SidebarPanel><ScenarioPanelMultiSelection scenarios={scenarios}/></SidebarPanel>
                break;
                
        }


        return (
           
            <PageLayoutMain>
                <PageHeader title="PREVIEWER - if you share this link, it won't work as data is stored locally" color="orange"/>
                <PageBody>
                <div className={listClass}>
                { this.state.tasks != null &&
                <ScenarioListWithFilter defaultView="scenario"  
                                        areas={this.state.areas} 
                                        tools={this.state.tools} 
                                        tasks={this.state.tasks} 
                                        onSearch={this._onSearch} 
                                        onFilter={this._onFilter} 
                                        onSelection  ={this._onSelection}/>}
                        </div>
                <div className={sidebarClass}> 
                {panel}
                </div>
                </PageBody>
            </PageLayoutMain>
            
        )
    }
}

