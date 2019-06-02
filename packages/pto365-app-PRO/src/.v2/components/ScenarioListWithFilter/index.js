import React, { Component } from 'react';
import PropTypes from 'prop-types'
import ScenarioList from '../ScenarioList';
import { Dropdown, IDropdown, DropdownMenuItemType, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
import Utility from '../../utilities'
import Jumpto365App from '../_Contexts/Jumpto365App';
import {
    SearchBox
  } from 'office-ui-fabric-react/lib/SearchBox';

/**
 * Combination of filter and list
 *
 * @export
 * @class ScenarioListWithFilter
 * @extends {Component}
 */
export default class ScenarioListWithFilter extends Component { 

    static propTypes  = {
        /* [
       {
      "area": "Human Resources",
      "subject": "Communicate important news within the company",
      "rating": 5,
      "tool": "Sway"
    }]*/ 
        tasks      : PropTypes.arrayOf(PropTypes.object).isRequired,
        areas : PropTypes.arrayOf(PropTypes.string),
        tools : PropTypes.arrayOf(PropTypes.string),
        onSelection : PropTypes.func,
     //   mapping : PropTypes.arrayOf(PropTypes.object),        
        defaultView : PropTypes.string.isRequired   ,
        globalContext : PropTypes.obj
    }
  
    constructor(props) {
        super(props);
        
        this.state = {}
    }
    _onChangedFilter = (item) => {

        const updatedSelectedItem = this.state.selectedFilterKeys ? Utility.CopyArray(this.state.selectedFilterKeys) : [];
        if (item.selected) {
          // add the option if it's checked
          updatedSelectedItem.push(item.key);
        } else {
          // remove the option if it's unchecked
          const currIndex = updatedSelectedItem.indexOf(item.key);
          if (currIndex > -1) {
            updatedSelectedItem.splice(currIndex, 1);
          }
        }
        
        this.setState({
            selectedFilterKeys: updatedSelectedItem
        });
        
        if (this.props.onFilter) this.props.onFilter(updatedSelectedItem)
       
    
      }
      
    /**
     * Required method return the output of the component
     *
     * @returns
     * @memberof ScenarioListWithFilter
     */
    render() {
        var context = this.props.globalContext
        function prompt(id){
            var text = Jumpto365App.prompt(id,context)
            return text
         } 
        var options = []
        options = options.concat(Utility.BuildOptions(this.props.areas,prompt("50") /* Areas */,"area"))
        options = options.concat(Utility.BuildOptions(this.props.tools,prompt("52") /*"Tools"*/,"tools"))

        
        return (
            <div className="ms-Grid" >
                <div className="ms-Grid-row" >
                    <div className="ms-Grid-col ms-sm6  " >
                    <SearchBox 
                        
                        placeholder={prompt("47") /*'Search' */ }
                        onEscape={ (ev) => {
                            console.log('Custom onEscape Called');
                        } }
                        onClear={ (ev) => {
                            console.log('Custom onClear Called');
                        } }
                        onChange={ (newValue) => {
                            console.log('SearchBox onChange fired: ' + newValue)
                            if (this.props.onSearch ) this.props.onSearch(newValue) }}
                        onSearch={ (newValue) => console.log('SearchBox onSearch fired: ' + newValue) }
                        onFocus={ () => console.log('onFocus called') }
                        onBlur={ () => console.log('onBlur called') }
                        /> 
                    </div>
                    <div className="ms-Grid-col ms-sm6  " >
                        <Dropdown
                            placeHolder={prompt("48") /* 'Filter'*/ }
                            
                            selectedKeys={ this.state.selectedFilterKeys }
                            onChanged={ this._onChangedFilter }
                            multiSelect
                            options={options}/>
                    </div>
                </div>
                
                <div className="ms-Grid-row" >
                    <ScenarioList singleSelection tasks={this.props.tasks} defaultView={this.props.defaultView} onSelectionChanged={this.props.onSelection} />
                </div>
        </div>

        )
    }
}

