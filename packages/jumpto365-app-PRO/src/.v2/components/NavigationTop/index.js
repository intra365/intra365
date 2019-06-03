import React, { Component } from 'react';
import { CommandBar } from 'office-ui-fabric-react/lib/CommandBar';
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';

import $ from 'jquery'
import Translate from "../../../../src/components/Sidebar/translation"
import "./nav.css"  
import {
  SearchBox
} from 'office-ui-fabric-react/lib/SearchBox';
var onSearchText = null
import PropTypes from 'prop-types'
import { initializeIcons } from '@uifabric/icons';
import 'office-ui-fabric-react/dist/css/fabric.css'


/**
 * Describe overall purpose of the component
 *
 * @export
 * @class NavigationTop
 * @extends {Component}
 */
export default class NavigationTop extends Component { 

    static propTypes  = {
        about : PropTypes.string,
        language: PropTypes.string  
    }
    

    
        constructor(props) {
            super(props);
            onSearchText = this.props.onSearch
            
          }
        
        
         
        
          render() {
        
            var lastLanguage = this.props.language ? this.props.language : localStorage.getItem("language")
            var homeAddress = lastLanguage ? "/periodictable/" + lastLanguage : "/periodictable/en"
            console.log(homeAddress)
        
            //let { items, overflowItems, farItems } = this.props;
            var 
              userMenu = {
                key:"about",
                name: Translate(lastLanguage,19), //"About",
                icon:"Info",
                href:"/about"
              
              }
        
        
           
          
            const farItems = [
             
        
                    userMenu
        
              
         
            
            ]
        
            var items=
            [
              
              // {
              //   key:"home",
              //   name:  Translate(lastLanguage,24), // "PERIODIC TABLE of Office 365",
              //   icon:"Home",
              //   href:homeAddress
                
              // },           
                     
     {
          key:"wtw",
          name: "Which Tool When",
          icon:"Repair",
          
          subMenuProps: {
            items: [
              {
                key: 'scenario1',
                name: 'Microsoft 365',
                href: '/scenario/microsoft365',
                xtarget: "_blank"
              },
              {
                key: 'scenario2',
                name: 'Have your own custom',
                href: '/upload',
                xtarget: "_blank"
              }]}
        },
        {
          key:"blog",
          name:  "Blog", // "PERIODIC TABLE of Office 365",
          icon:"News",
          href:"https://medium.com/jumpto365/latest/home",
          target:"_blank"
          
        }]
          
          const overflowItems = [
              ]
              overflowItems.push({
                key:"embed",
                name:  Translate(lastLanguage,14), //  "Embed",
                icon:"Embed",
                href:"/embed"
                
              })
        
              overflowItems.push({
                key: 'lang',
                name: Translate(lastLanguage,5), //'Language',
                //onRender: this._renderSplitButtonMenuItem,
                href:"/language",
                icon:"LocaleLanguage",
                subMenuProps: {
                  items: [
                    {
                      key: 'en',
                      name: 'English',
                      href: '/periodictable/en',
                      xtarget: "_blank"
                    },
                    {
                      key: 'da',
                      name: 'Danish',
                      href: '/periodictable/da',
                      xtarget: "_blank"
                    },
                  ]}
              })
        
              overflowItems.push({
                key: 'license',
                name: Translate(lastLanguage,27) ,//'By License'  
                //onRender: this._renderSplitButtonMenuItem,
                icon:"Money",
                className: 'ms-CommandBarItem',
                subMenuProps: {
                  items: [
                    {
                      key: 'BusinessEssentials',
                      name: 'Business Essentials',
                      href: '/license/BusinessEssentials/'+lastLanguage,
                      xtarget: "_blank"
                    },
                    {
                      key: 'Business',
                      name: 'Business',
                      href: '/license/Business/'+lastLanguage,
                      xtarget: "_blank"
                    },
                    {
                      key: 'BusinessPremium',
                      name: 'Business Premium',
                      href: '/license/BusinessPremium/'+lastLanguage,
                      xtarget: "_blank"
                    },
                    {
                      key: 'EnterpriseE1',
                      name: 'Enterprise E1',
                      href: '/license/EnterpriseE1/'+lastLanguage,
                      xtarget: "_blank"
                    },
                    {
                      key: 'EnterpriseE3',
                      name: 'Enterprise E3',
                      href: '/license/EnterpriseE3/'+lastLanguage,
                      xtarget: "_blank"
                    },
                    {
                      key: 'EnterpriseE5',
                      name: 'Enterprise E5',
                      href: '/license/EnterpriseE5/'+lastLanguage,
                      xtarget: "_blank"
                    },
                    {
                      key: 'EnterpriseF1',
                      name: 'Enterprise F1',
                      href: '/license/EnterpriseF1/'+lastLanguage,
                      xtarget: "_blank"
                    },
                    {
                      key: 'EduA1',
                      name: 'Education A1',
                      href: '/license/EduA1/'+lastLanguage,
                      xtarget: "_blank"
                    },
                    {
                      key: 'EduA3',
                      name: 'Education A3',
                      href: '/license/EduA3/'+lastLanguage,
                      xtarget: "_blank"
                    },
                    {
                      key: 'EduA5',
                      name: 'Education A5',
                      href: '/license/EduA5/'+lastLanguage,
                      xtarget: "_blank"
                    },
                    {
                      key: 'USGovG1',
                      name: 'US Government G1',
                      href: '/license/USGovG1/'+lastLanguage,
                      xtarget: "_blank"
                    },
                    {
                      key: 'USGovG5',
                      name: 'US Government G3',
                      href: '/license/USGovG3/'+lastLanguage,
                      xtarget: "_blank"
                    },
                    {
                      key: 'USGovG5',
                      name: 'US Government G5',
                      href: '/license/USGovG5/'+lastLanguage,
                      xtarget: "_blank"
                    },
                    {
                      key: 'USGovF1',
                      name: 'US Government F1',
                      href: '/license/USGovF1/'+lastLanguage,
                      xtarget: "_blank"
                    },
        
                      
                      
                    
                  ],
                },
              })      


          
        
                  
            var topbar = <div className="ms-Grid" >
                <div className="ms-Grid-row" style={{backgroundColor:"#0B559F"}}>
                
                <div className="ms-Grid-col ms-sm3  " >
            
            <div >

            <div  >
                </div>    </div>
                        </div>
                        
                        
                {/* <div className='SearchBoxHeading'> <SearchBox 
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
                
                */}
                
                
                <div className="ms-Grid-col ms-sm8  " style={{width:"100%"}}>
                <CommandBar
                
                isSearchBoxVisible={false }
                elipisisAriaLabel='More options'
                items={ items }
                overflowItems={ overflowItems }
                farItems={ farItems }
              />
                </div></div>
                </div>    
        
                topbar=null
            return (
              <div id="topnav">
                { topbar}    
                <CommandBar
                
                  isSearchBoxVisible={ false}
                  searchPlaceholderText='Search use case'
                  elipisisAriaLabel='More options'
                  items={ items }
                  overflowItems={ overflowItems }
                  farItems={ farItems }
                />
              </div>
            );
          }

 
}

