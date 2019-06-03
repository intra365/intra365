import React, { Component } from 'react';
import PropTypes from 'prop-types'
import Excel from '../../utilities/Excel'
import { ChoiceGroup } from 'office-ui-fabric-react/lib/ChoiceGroup'
import ScenarioList from '../ScenarioList';
import Jumpto365App from '../_Contexts/Jumpto365App';


/**
 * Describe overall purpose of the component
 *
 * @export
 * @class ExcelExplorer
 * @extends {Component}
 */
export default class ExcelExplorer extends Component { 
    state = {selection:null} 

    static propTypes  = {
        excel : PropTypes.any   // file or buffer
    }
    

    constructor(props) {
        super(props);
    }

    _load = () => {
        if (!this.props.excel) return

try {
    let excelData = Excel.toJSON(this.props.excel)
    this.setState({excelData})
} catch (error) {
    this.setState({error:error.message})
}

  
    } 

    componentDidMount = () => {
        this._load()
    }

    componentDidUpdate = (previousProps, previousState) => {

        if (previousProps.excel !== this.props.excel){
          this.setState({error: null,selection:null})
          this._load()
        }
        
      }
      selectSheet = (selection) => {
        if (!this.state.excelData) return
        if (selection.length === 0) return
        if (this.props.onSelectSheet){
            var ix = selection[0].key
            var sheetName = this.state.excelData.sheets[ix].name
            var format = Excel.detectFormat(this.props.excel,sheetName)
            switch (format) {

                case "TOOLS" :
                    Excel
                    .parseTools(this.props.excel,sheetName)
                    .then(tools=>{
                        this.props.onSelectSheet(this.state.excelData.sheets[ix],format,tools,sheetName)
        
                    })
                    .catch(err=>{
                        this.props.onSelectSheet(this.state.excelData.sheets[ix],null, {error:Jumpto365App.emitError(this,err,"#PARSER-TOOLS")},sheetName)   
        
                    })    
                    break;
                case "GROUPS" :
                    Excel
                    .parseGroups(this.props.excel,sheetName)
                    .then(groups=>{
                        this.props.onSelectSheet(this.state.excelData.sheets[ix],format,groups,sheetName)
        
                    })
                    .catch(err=>{
                        this.props.onSelectSheet(this.state.excelData.sheets[ix],null, {error:Jumpto365App.emitError(this,err,"#PARSER-GROUPS")},sheetName)   
        
                    })    
                    break;
                case "WTW":
                    Excel
                    .parseWTW(this.props.excel,sheetName)
                    .then(wtw=>{
                        this.props.onSelectSheet(this.state.excelData.sheets[ix],format,wtw,sheetName)
        
                    })
                    .catch(err=>{
                        this.props.onSelectSheet(this.state.excelData.sheets[ix],null, {error:Jumpto365App.emitError(this,err,"#PARSER-WTW")},sheetName)   
        
                    })    
                    break;
                case "PTO": 
                    Excel
                    .parsePTO(this.props.excel,sheetName)
                    .then(pto=>{
                        this.props.onSelectSheet(this.state.excelData.sheets[ix],format,pto,sheetName)
        
                    })
                    .catch(err=>{
                        this.props.onSelectSheet(this.state.excelData.sheets[ix],null, {error:Jumpto365App.emitError(this,err,"#PARSER-PTO")},sheetName)   
        
                    })    
                    break;
                default:
                    var data = Excel.sheetToJSON(this.props.excel,sheetName)
                    this.props.onSelectSheet(this.state.excelData.sheets[ix],null,{"format":"Unknown",data},sheetName)   
                    break;
            }

        


        }


        
    }
     
    /**
     * Required method return the output of the component
     *
     * @returns
     * @memberof ExcelExplorer
     */
    render() {
        if (this.state.error) return JSON.stringify(this.state.errors)
        if (!this.state.excelData) return "no data"

            var sheets = this.state.excelData.sheets.map(function (sheet,ix) {
                return {key:ix,name:sheet.name}
            })
        return (

            
        <div>
             <ScenarioList  selection={this.state.selection} tasks={sheets} defaultView="name"  isCompactMode={true} hideHeader={true} singleSelection={true}  onSelectionChanged={this.selectSheet} />
       
          
        </div>

        )
    }
}

