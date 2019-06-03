import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { CommandBar } from 'office-ui-fabric-react/lib/CommandBar';
import { BaseComponent, memoizeFunction } from 'office-ui-fabric-react/lib/Utilities';
import { mergeStyles } from 'office-ui-fabric-react/lib/Styling';
import { ResizeGroup } from 'office-ui-fabric-react/lib/ResizeGroup';

import Utiltity from '../../utilities';
import TestData from '../../data/TestData';
import AppIconMini from '../AppIconMini'
import { IconButton } from 'office-ui-fabric-react/lib/Button';
import { CommandBarButton } from 'office-ui-fabric-react/lib/Button';
import Data from '../_Data'

let leftRightBoxClassName = mergeStyles({
  display: 'flex',
  justifyContent: 'space-between',
  whiteSpace: 'nowrap'
}) 

 let getNumberedBoxClassName = memoizeFunction((backgroundColor) => {
  return mergeStyles({
    display: 'inline-block',
    textAlign: 'center',
    textHeight:'10px',
    verticalAlign:'top',
    fontSize: '10px',
    lineHeight: '28px',

    height: '28px',
    width: '28px',
    marginLeft: '4px',
    marginRight: '4px',
    backgroundColor
  }) 
});
let BoxWithLabel = (props) => (
  <div className={getNumberedBoxClassName(props.backgroundColor)} title={props.label}><div style={{overflow:"clip"}}>{props.label.substring(0,2)}</div></div>
);

let renderApps = (apps) => {
  const result = [];
  var data = new Data()
  for (let i = 0; i < apps.length; i += 1) {

    var appData = data.getApp(apps[i])
    if (appData){
      result.push(<div className={getNumberedBoxClassName(appData.color)} key={i}>
      <AppIconMini backgroundColor={appData.color} name={appData.name} iconUrl={appData.icon}  />
      </div>);
    }else
    {
   //result.push(<BoxWithLabel backgroundColor="#888888" label={apps[i]} key={i}/>)
    }
  }
  return result;
}


let LeftRightBoxSet = (props) => (

    <div>{renderApps(props.apps)}</div>
)
/**
 * Handle presentation of a group of icons 
 *
 * @export
 * @class AppGroup
 * @extends {Component}
 */
export default class AppGroup extends Component { 

    static propTypes  = {
        about : PropTypes.string ,  // sample - remove or rename
        apps : PropTypes.arrayOf(PropTypes.string).isRequired
    }
    

    constructor(props) {
        super(props);
    }
     
    
    

     onReduceData(props)  {
      if (props.leftCount === 0 && props.rightCount === 0) {
        return undefined
      }
    
      let result
      if (props.leftCount > props.rightCount) {
        result = { ...props, leftCount: props.leftCount - 1 };
      } else {
        result = { ...props, rightCount: props.rightCount - 1 };
      }
    
      // Update the cache key
      return { ...result, cacheKey: `${result.leftCount + result.rightCount}` };
    }
    

    copyArray = (array) => {
      const newArray = [];
      for (let i = 0; i < array.length; i++) {
        newArray[i] = array[i];
      }
      return newArray;
    }
    /**
     * Required method return the output of the component
     *
     * @returns
     * @memberof AppGroup
     */
    render() {


      if(!this.props.apps) return null
        const customButton = (props) => {
            const buttonOnMouseEnter = () => console.log(`${props.text} hovered`);
            return (<div>
              <CommandBarButton
                onMouseEnter={buttonOnMouseEnter}
                {...props}
                styles={{
                  ...props.styles,
                  icon: { color: 'red' }
                }}
              /></div>
            );
          };    
        var tasks = Utiltity.GroupTasksBySubject(TestData.tasks)
        var items = Utiltity.EnsureNameAndApplyKeyValue(tasks,"subject")
        
        const data  = { apps: this.copyArray(this.props.apps),leftCount: 10, rightCount: 0, cacheKey: '10' }
        return (

         
        
            <ResizeGroup
              data={data}
              
              onRenderData={(scaledData) => <LeftRightBoxSet {...scaledData} />}
              onReduceData={this.onReduceData}
            />
        
        
 
        )
    }
}

