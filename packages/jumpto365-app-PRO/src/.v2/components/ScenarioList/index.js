import React, { Component } from 'react';
import PropTypes from 'prop-types'

import {
    DetailsList,
    DetailsListLayoutMode,
    Selection
  } from 'office-ui-fabric-react/lib/DetailsList';

  
import $ from "jquery"
import AppGroup from '../AppGroup';

import Views from "../_Views"

var mapEvents = []


/**
 * Describe overall purpose of the component
 *
 * @export
 * @class ScenarioList
 * @extends {Component}
 */
export default class ScenarioList extends Component {

    static propTypes  = {
        tasks      : PropTypes.arrayOf(PropTypes.object).isRequired,
        defaultView : PropTypes.string   
    }
    me = null
    _selection = null;

    constructor(props) {
      super(props);
      var view = new Views()
      
      this._selection = new Selection({
          onSelectionChanged: () => {
            this.setState({
              selectionDetails: this._getSelectionDetails(),
              isModalSelection: this._selection.isModal(),
            });
          }
        });
    
     
        this.state = {
          //filter : props.filter,
          
          columns : view.scenario(props.defaultView,this.renderToolCell,this._onColumnClick,props.customView),
          items: props.tasks,
      
          selectionDetails: this._getSelectionDetails(),
          isModalSelection: this._selection.isModal(),
          isCompactMode: false
          
        };
    }



    updateDimensions = () => {
      
      this.setState({loaded : true, width: $(window).width(), height: $(window).innerHeight()-40});
      
  
  }
  

    // getSnapshotBeforeUpdate()
  

  
   
  
    componentDidUpdate = (previousProps, previousState) => {
 if (previousProps.defaultView !== this.props.defaultView){
  var view = new Views()
        this.setState({colums: view.scenario(this.props.defaultView,this.renderToolCell,this._onColumnClick)})
        //this._selection.setAllSelected(false)
      }
      if (previousProps.tasks !== this.props.tasks){
        this.setState({items:this.props.tasks})
        //this._selection.setAllSelected(false)
      }
      if (previousState.isModalSelection !== this.state.isModalSelection) {
        this._selection.setModal(this.state.isModalSelection);
      }
    }
   
    _onChangeCompactMode = (checked) => {
      this.setState({ isCompactMode: checked });
    }
  
    
     _onChangeModalSelection = (checked) => {
      this.setState({ isModalSelection: checked });
    }
  
    
    _onItemInvoked = (item) => {
      if (this.props.onItemInvoked) this.props.onItemInvoked(item)
    }
  
    
     _getSelectionDetails = () => {
      let selectionCount = this._selection.getSelectedCount();
  

      var result
      switch (selectionCount) {
        case 0:
          result = null // 'No items selected';
        default:
          result =  this._selection.getSelection()
    
      }
      if (this.props.onSelectionChanged){this.props.onSelectionChanged(result)}
      return result
    }
  
    
    _onColumnClick = (ev, column) => {
      const { columns, items } = this.state;
      
      let newItems = items.slice();
      let newColumns = columns.slice();
      let currColumn= newColumns.filter((currCol, idx) => {
        return column.key === currCol.key;
      })[0];
      newColumns.forEach((newCol) => {
        if (newCol === currColumn) {
          currColumn.isSortedDescending = !currColumn.isSortedDescending;
          currColumn.isSorted = true;
        } else {
          newCol.isSorted = false;
          newCol.isSortedDescending = true;
        }
      });
      newItems = this._sortItems(newItems, currColumn.fieldName, currColumn.isSortedDescending);
      this.setState({
        columns: newColumns,
        items: newItems
      });
    }
  
    
    _sortItems = (items, sortBy, descending) => {
      if (descending) {
        return items.sort((a, b) => {
          if (a[sortBy] < b[sortBy]) {
            return 1;
          }
          if (a[sortBy] > b[sortBy]) {
            return -1;
          }
          return 0;
        });
      } else {
        return items.sort((a, b) => {
          if (a[sortBy] < b[sortBy]) {
            return -1;
          }
          if (a[sortBy] > b[sortBy]) {
            return 1;
          }
          return 0;
        });
      }
    }
  

   renderToolCell = (item, rowId, colData, d) => {

     var tools = []
     if (item.tools) {
       for (let i = 0; i < item.tools.length; i++) {
         var tool = item.tools[i]
         if (tool.rating === colData.fieldName) {
           tools.push(tool.name);
         }

       }
     }

     if (tools.lengths === 0) return null
     return <AppGroup apps = {
       tools
     }
     />      
   }
    render() {
     
      let {  isCompactMode,  selectionDetails,items,columns } = this.state;

      
      var language = this.state.language
  
      
   
  
 
  
    return (
      

  <DetailsList  className={this.props.className}
                rowElementEventMap={mapEvents}
                items={ this.state.items }
                compact={ this.props.isCompactMode ===true}
                columns={ this.state.columns }
                selectionMode = {this.props.singleSelection ?1:2}
                setKey='set'
                layoutMode={ DetailsListLayoutMode.justified }
                isHeaderVisible={ this.props.hideHeader!==true }
                selection={ this._selection }
                selectionPreservedOnEmptyClick={ true }
                onItemInvoked={ this._onItemInvoked }
                enterModalSelectionOnTouch={ true }
              />
    
      );
  
    }
}

