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
import { navigate } from "@reach/router"

/**
 * Describe overall purpose of the component
 *
 * @export
 * @class SharingToolbar
 * @extends {Component}
 */
export default class SharingToolbar extends Component { 

    static propTypes  = {
        about : PropTypes.string,
        language: PropTypes.string  
    }
    

    
        constructor(props) {
            super(props);
            onSearchText = this.props.onSearch
            
          }
        
        
         
        
          render() {
            return <div /> 

            //TODO: Implement toolbar
            var lastLanguage = this.props.language ? this.props.language : "en"
          
            const farItems = [{
                key:"help",
                name: "Help",
                icon:"Info",
                disabled:true,
              }
            ]
        
            var items = [



              {
                key: "fioe",
                name: "File",
                disabled: true,

                subMenuProps: {
                  items: [{
                      key: 'open',
                      name: 'Open',
                      disabled: true,
                    },
                    {
                      key: 'save',
                      name: 'Save',
                      disabled: true,
                    },
                    {
                      key: 'saveas',
                      name: 'Save as',
                      disabled: true,
                    }
                  ]
                }
              },
              {
                key: "share",
                name: "Share", 
                icon: "Share",
                disabled: false,
                onClick: () => { 
                  navigate("/share")
                  }     
              },
              {
                key: "download",
                name: "Download", 
                icon: "Download",
                disabled: true,

              }
            ]

            const overflowItems = []
            overflowItems.push({
              key: "rename",
              name: "Rename",
              icon: "Rename",
              disabled:true
             

            })
        
          
        
                  
  
            return (
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
            );
          }

 
}

