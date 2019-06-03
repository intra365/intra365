import React, { Component } from 'react';
import './usecase.css'
import { ScrollablePane } from 'office-ui-fabric-react/lib/ScrollablePane';
import { Sticky, StickyPositionType } from 'office-ui-fabric-react/lib/Sticky';

import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { FocusZone } from 'office-ui-fabric-react/lib/FocusZone';
import { MarqueeSelection } from 'office-ui-fabric-react/lib/MarqueeSelection';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';
import { List } from 'office-ui-fabric-react/lib/List';
import {
  DetailsList,
  DetailsListLayoutMode,
  Selection,
  IColumn
} from 'office-ui-fabric-react/lib/DetailsList';
import json from "format-json"
import { METHODS } from 'http';

var _items = []

export class UseCases extends Component {
   _selection = null;
  constructor(props) {
    super(props);
    _items = []
    if (_items.length === 0){
      
      
      props.usecases.forEach(element => {
        _items.push({
          name: element.Title,
          featuring: element.Featuring,
          value: element.id,
        });
          
      });
    }

    const _columns = [
      {
        key: 'column2',
        name: 'Name',
        fieldName: 'name',
        minWidth: 100,
        maxWidth: 350,
        isRowHeader: true,
        isResizable: true,
        isSorted: true,
        isSortedDescending: false,
        onColumnClick: this._onColumnClick,
        data: 'string',
        isPadded: true
      },
      {
        key: 'column3',
        name: 'Featuring',
        fieldName: 'featuring',
        minWidth: 100,
        maxWidth: 350,
        isRowHeader: true,
        isResizable: true,
        isSorted: true,
        isSortedDescending: false,
        onColumnClick: this._onColumnClick,
        data: 'string',
        isPadded: true
      },
      // {
      //   key: 'column2',
      //   name: 'Name',
      //   fieldName: 'icons',
      //   minWidth: 24,
      //   maxWidth: 24,
      //   isRowHeader: true,
      //   isIconOnly: true,
      //   //isResizable: true,
      //   //isSorted: true,
      //   //isSortedDescending: false,
      //   onColumnClick: this._onColumnClick,
      //   data: 'string',
      //   isPadded: true,
      //   onRender: (item) => {
      //     var icon = require("../../components/PeriodicSystem/media/Excel.png")
      //     return (
      //       <div style={{height:"24px",width:"24px",backgroundColor:"#02723B",textAlign:"center",lineHeight:"24px"}}>
      //       <img
      //         src={ icon }
      //         style={{height:"18px",width:"auto",marginTop:"3px"}}
              
      //       />
      //       </div>
      //     );
      //   }
      // },
    ];

    this._selection = new Selection({
      onSelectionChanged: () => {
        this.setState({
          selectionDetails: this._getSelectionDetails(),
          isModalSelection: this._selection.isModal()
        });
      }
    });
    //var filteredItems = props.filter ? _items.filter(i => i.name.toLowerCase().indexOf(props.filter) > -1) : _items
    
    this.state = {
      //filter : props.filter,
      items: _items.sort((a, b) => {
        const sortBy = "Title"
        if (a[sortBy] < b[sortBy]) {
          return -1;
        }
        if (a[sortBy] > b[sortBy]) {
          return 1;
        }
        return 0;
      }),
      columns: _columns,
      selectionDetails: this._getSelectionDetails(),
      isModalSelection: this._selection.isModal(),
      isCompactMode: false
    };
  }

  componentDidUpdate = (previousProps, previousState) => {
    if (previousState.isModalSelection !== this.state.isModalSelection) {
      this._selection.setModal(this.state.isModalSelection);
    }
  }
// componentWillMount    = (a,b,c) => {
//   console.log(a,b,c)
// }
 componentWillUpdate = (newState,b,c) => {
//  this.setState({ items: newState.filter ? _items.filter(i => i.name.toLowerCase().indexOf(newState.filter) > -1) : _items });
  console.log(newState,b,c)
 }
  
  _onChangeCompactMode = (checked) => {
    this.setState({ isCompactMode: checked });
  }

  
   _onChangeModalSelection = (checked) => {
    this.setState({ isModalSelection: checked });
  }

  _onChangeText = (text) => {
    this.setState({ items: text ? _items.filter(i => ((i.name.toLowerCase().indexOf(text) > -1) || (i.featuring.toLowerCase().indexOf(text) > -1)) ) : _items });
  }

  _onItemInvoked = (item) => {
    if (this.props.onItemInvoked) this.props.onItemInvoked(item)
  }

  
   _getSelectionDetails = () => {
    let selectionCount = this._selection.getSelectedCount();

    switch (selectionCount) {
      case 0:
        return 'No items selected';
      case 1:
        return '1 item selected: ' + (this._selection.getSelection()[0]).name;
      default:
        return `${selectionCount} items selected`;
    }
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

  render() {
      let { columns, isCompactMode, items, selectionDetails } = this.state;
    var mapEvents = []
      return (
        <div >
          
          <TextField
            label='Filter by name:'
            placeholder='Enter key word describing your usecase, e.g. hr'
            onChanged={ this._onChangeText }
            default={this.state.filter}
          />
          
            <DetailsList
              rowElementEventMap={mapEvents}
              items={ items }
              compact={ isCompactMode }
              columns={ columns }
              setKey='set'
              layoutMode={ DetailsListLayoutMode.justified }
              isHeaderVisible={ true }
              selection={ this._selection }
              selectionPreservedOnEmptyClick={ true }
              onItemInvoked={ this._onItemInvoked }
              enterModalSelectionOnTouch={ true }
            />
          
          
        </div>
      
    );
  }
}

export default class UseCase extends Component {
  render() {
  
    return (
      "Use case"
    
  );
}
}
