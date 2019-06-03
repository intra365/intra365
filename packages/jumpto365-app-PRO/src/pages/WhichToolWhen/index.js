import React, { Component } from 'react';

import json from "format-json"
import _ from "lodash"
import util from "../../util"
import Cell from "../../components/PeriodicSystem/Cell"
import { Apps } from "../../components/Fasttrack"

import { Icon, Label, Menu, Table } from 'semantic-ui-react'
//import wtwmap from '../../data/wtw-map.json'
import { Dropdown, IDropdown, DropdownMenuItemType, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { FocusZone } from 'office-ui-fabric-react/lib/FocusZone';
import { MarqueeSelection } from 'office-ui-fabric-react/lib/MarqueeSelection';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';
import { List } from 'office-ui-fabric-react/lib/List';
import { Panel, PanelType } from 'office-ui-fabric-react/lib/Panel';
import { ProgressIndicator } from 'office-ui-fabric-react/lib/ProgressIndicator';
import { Link } from 'office-ui-fabric-react/lib/Link';
import ProcessPage from '../../components/Process/ProcessPage'
import { MessageBar, MessageBarType } from 'office-ui-fabric-react/lib/MessageBar';
import {
  SearchBox
} from 'office-ui-fabric-react/lib/SearchBox';
import "./wtw.css"
import {
    DetailsList,
    DetailsListLayoutMode,
    Selection,
    IColumn
  } from 'office-ui-fabric-react/lib/DetailsList';

  import {
    GroupedList,
    IGroup
  } from 'office-ui-fabric-react/lib/components/GroupedList/index';
import $ from "jquery"
import ActionWithDescription from '../../components/Process/ActionWithDescription'
import Data from "../../data"
import PropTypes from "prop-types"
import WhichToolWhenPanel from "./WhichToolWhenPanel"
import CaseDetail from "./CaseDetail"
import { ImageFit } from 'office-ui-fabric-react/lib/Image';

// var items = []
// var _items = []
var mapEvents = []
var me = null
class Tool extends Component {
  static propTypes = {
    /**
     * Object send to Data.WhichTool.toolByTag(this.props.tools,this.props.name)
     */
    tools: PropTypes.arrayOf(Object).isRequired,
    /**
     * current tool name 
     */
    tool: PropTypes.string.isRequired,
    /**
     * onClick handler
     */
    onClick:PropTypes.func

  }
  componentDidMount = () =>{
    this.setState({match:   Data.WhichTool.toolByTag(this.props.tools,this.props.name)} )
  }

  onClick = () =>{
    if (!this.props.onClick) return
    this.props.onClick(this.state.match)
  }
render()
    {
      if (!this.state){
        return null
      }        
      var match = this.state.match

      return (
            <div style={{float:"left",cursor:"pointer"}} onClick={this.onClick} >
              <div className="wtwToolBox" style={{float:"left",color:"#ffffff", backgroundColor:match.Color,margin:"1px",height:"36px"}} title={(match.da && match.da !== '')   ? match.da : match.tag}>
                <div >
                  <img src={match.Icon} style={{float:"left",width:"auto",height:"24px",marginLeft:"5px",marginRight:"5px",marginTop:"5px"}}/> 
                  <div className="wtwToolText" > {this.props.name}</div>
                </div>
              </div>
            </div>)

} 
}



export default class WhichToolWhenPage extends Component {
    _selection = null;
  constructor(props) {
    super(props);
    me = this
    this._selection = new Selection({
        onSelectionChanged: () => {
          this.setState({
            selectionDetails: this._getSelectionDetails(),
            isModalSelection: this._selection.isModal()
          });
        }
      });
  
   
      this.state = {
        //filter : props.filter,
        
        
        selectionDetails: this._getSelectionDetails(),
        isModalSelection: this._selection.isModal(),
        isCompactMode: false,
        language : props.language,
        id:props.id
        //selectedUseCaseCategories : props.subject
      };
  }
  updateDimensions = () => {
    
    this.setState({loaded : true, width: $(window).width(), height: $(window).innerHeight()-40});
    

}

parameterError = (errorMessage) => {
  return (

    <MessageBar
    onDismiss={ 
      console.log('Message dismissed')
     }
    messageBarType={ MessageBarType.error }
    isMultiline={ true }
  >
    Error {errorMessage}  <Link href='#'>Try this instead</Link>
  </MessageBar>
  )
}

componentWillMount= () =>  {
    this.updateDimensions();
}


copyArray = (array) => {
    const newArray = [];
    for (let i = 0; i < array.length; i++) {
      newArray[i] = array[i];
    }
    return newArray;
  }

onChangeselectedUseCaseCategories = (item,a,b) => {

    const updatedSelectedItem = me.state.selectedItems ? this.copyArray(me.state.selectedItems) : [];
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
      selectedItems: updatedSelectedItem
    });
    
    Data.WhichTool.filterByTool(me.state.mapping,updatedSelectedItem,(err,items)=>{
      me.setState({items})
    })
    //if (this.props.changeSubject) this.props.changeSubject(updatedSelectedItem)

  }
  

 

  componentDidUpdate = (previousProps, previousState) => {
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

    switch (selectionCount) {
      case 0:
        return null // 'No items selected';
      default:
        return this._selection.getSelection()
  
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

  componentDidMount = () => {
    var self = this

   

    if (this.state.id){
      this.setState({loaded:false})
    Data.WhichTool.All(this.state.id)
    .then(data=>{
      self.setState({items:data.items,
                     allitems:data.items,
                     areas : data.areas,
                     tools : data.tools,
                     mapping: data.mapping,
                     loaded:true})  

    })
    .catch(error => {
      self.setState({error})    
    })
    
  }

  }

  onToolClick = (task,tool) => {
    //this.setState(task,tool)
  }

  onSettingsClick = () => {
    this.setState({actionsVisible : !this.state.actionsVisible})
  }
  render() {
    if (this.state.error){
      return (this.parameterError(JSON.stringify(this.state.error.message)))
  
    }
      
    
    if (!this.state.loaded){
      return <ProgressIndicator />
    }

    let {  isCompactMode,  selectionDetails } = this.state;
    var columns = [
      {
        key: 'column2',
        name: 'Task',
        fieldName: 'subject',
        minWidth: 100,
        maxWidth: 400,
        isRowHeader: true,
        isResizable: true,
        isSorted: false,
        isSortedDescending: false,
        onColumnClick: this._onColumnClick,
        data: 'string',
        isPadded: true,
        onRender: (item,rowId,colData,d) => {
          var title = item[colData.fieldName] 
          return item.isHeading ? <b>{title}</b> : title
            
            }
      }
  
    ];

    var self = this
    for (var xx = 5;xx>1;xx--){
      var name = xx === 5 ? "Best" : xx ===4 ? "Better" : xx ===3 ? "Worse" : "Worst"

    columns.push ( {
        key: 'c'+xx,
        name: name,
        fieldName: xx,
        minWidth: 80,
        maxWidth: 260,
        isRowHeader: true,
        isResizable: true,
        isSorted: false,
        isSortedDescending: false,
        //onColumnClick: this._onColumnClick,
        data: 'string',
        isPadded: true,
        onRender: (item,rowId,colData,d) => {
          var tools = []
          if (item.tools){
            for (let i = 0; i < item.tools.length; i++) {
              const tool = item.tools[i];
              var host = this
              if (tool.rating === colData.fieldName){
                tools.push( <Tool name={tool.tool} tools={self.state.tools} />)
              }
              
            }
          }
          
          
          return   tools
          
            
            }
      })
    }

    var options = [        { key: 'Header4', text: 'Tools', itemType: DropdownMenuItemType.Header }]

    if (this.state.areas){
      var uniqueAreas = _.uniq(this.state.areas)
      for (let index = 0; index < uniqueAreas.length; index++) {
      
        const area = uniqueAreas[index];
        options.push({key:area,text:area})
      }
      
    }
    
    var language = this.state.language

    
  var items = this.state.items ? this.state.items : []
  var actions = []
  actions.push(<ActionWithDescription title="Make Default" description="If you like the current list to be default for your tenant" link={`/#/action/wtw-setdefault?id=${this.state.id}`} />)
  actions.push(<ActionWithDescription title="Share" description="Share your list of tools" link={`/#/action/wtw-share?id=${this.state.id}`} />)
    actions.push(<ActionWithDescription title="Download as template" description="Need to make multiple changes? " link={`/#/action/wtw-template?id=${this.state.id}`} />)
    actions.push(<ActionWithDescription title="Upload" description="Have some fresh data in Excel" link={`/#/action/configure-whichtoolwhen`} />)
    actions.push(<ActionWithDescription title="Delete" description="Like to get rid of this? " link={`/#/action/wtw-delete?id=${this.state.id}`} />)
  
var caseDetails =  []
if (this.state.selectionDetails)  {
  var x = 0
  this.state.selectionDetails.forEach(item=>{
    if (item.tools){

    var actions = [
      {
        iconProps: { iconName: 'Share' },
        onClick: (ev) => {
          console.log('You clicked the share action.');
          ev.preventDefault();
          ev.stopPropagation();
        },
        ariaLabel: 'share action'
      },
      {
        iconProps: { iconName: 'Pin' },
        onClick: (ev) => {
          console.log('You clicked the pin action.');
          ev.preventDefault();
          ev.stopPropagation();
        },
        ariaLabel: 'pin action'
      },
      {
        iconProps: { iconName: 'Ringer' },
        onClick: (ev) => {
          console.log('You clicked the ringer action.');
          ev.preventDefault();
          ev.stopPropagation();
        },
        ariaLabel: 'ringer action'
      }
    ]

    var people = [
      { name: 'Niels Gregers Johansen', profileImageSrc: '' },
      { name: 'Roko Kolar', profileImageSrc: '', initials: 'JH' },
      { name: 'Greta Lundberg', profileImageSrc: ''}
    ]


    var previewProps = {previewImages : [
      {
        name: 'Revenue stream proposal fiscal year 2016 version02.pptx',
        url: item.tools[0].url ,
        previewImageSrc: item.tools[0].preview, //"https://image.freepik.com/free-vector/creative-yellow-corporate-annual-report-design_1201-1424.jpg",
        //iconSrc: TestImages.iconPpt,
        imageFit: ImageFit.cover,
        width: 318,
        height: 196
      }
    ]}
    x++
    caseDetails.push(
    
      <CaseDetail 

      caseTitle={item.subject}
      href={item.tools[0].url} 
      actions={actions}
      people={people}
      previewProps = {previewProps}
      title={item.subject}
      xsubtitle="This is the email content preview, please feel free to give feedback. SharePoint Site Acitivity add conversation card! This is the last."
       views = "123" 
       key={x}
       />

    
    
    )}
    })}

  return (
    
    <ProcessPage 
    title="Which tool when? " 
    options={actions} 
    hideOptions={!this.state.actionsVisible}
    hideTitle
    mastHead = {<div><div style={{float:"left"}}>Tasks for preparing and attending meetings </div>
    <div className="ms-font-l" style={{float:"right"}}>
    <i onClick={this.onToolClick} class="ms-Icon ms-Icon--Settings" aria-hidden="true"></i></div></div> }
    mastHeadStyle = {{backgroundColor:"#000000",color:"#ffffff",height:"48px",padding:"10px"}}
    mastHeadClass = "ms-font-xxl"
    
    >
            
<div class="ms-Grid">
  <div class="ms-Grid-row">
    <div class="ms-Grid-col ms-sm6 ms-md4 ms-lg6">   
     {/* [Task x Best] | [Task x Tool] | [Tool x Best]     [ {language} ]   */}
     <SearchBox 
          placeholder='Search'
          onEscape={ (ev) => {
            console.log('Custom onEscape Called');
          } }
          onClear={ (ev) => {
            console.log('Custom onClear Called');
          } }
          onChange={ (newValue) => console.log('SearchBox onChange fired: ' + newValue) }
          onSearch={ (newValue) => console.log('SearchBox onSearch fired: ' + newValue) }
          onFocus={ () => console.log('onFocus called') }
          onBlur={ () => console.log('onBlur called') }
        /> 
          
</div>
    <div class="ms-Grid-col ms-sm6 ms-md8 ms-lg6">
    <Dropdown
          placeHolder='Filter by tool'
          xlabel='Filter:'
          selectedKeys={ this.state.selectedUseCaseCategories }
          onChanged={ this.onChangeselectedUseCaseCategories }
          multiSelect
          options={options}/>
    </div>
  </div>
</div>
<WhichToolWhenPanel
          isOpen={ this.state.isPanelVisible }
          type={ PanelType.medium }
          onDismiss={ () => {this.setState({"isPanelVisible":false}) }}
          item={this.state.selectedItem }  
        >
        
        </WhichToolWhenPanel>

<div style={this.state.selectionDetails ? {float:"left",width:"60%",overflow:"auto",height:"800px"} : {}}>
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
            <div style={this.state.selectionDetails ? {float:"left",width:"40%"} : {display:"none"}}>

               {caseDetails}
               
            </div>
    </ProcessPage>

    );

  }
}

