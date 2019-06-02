import React, { Component } from 'react';
import PropTypes from 'prop-types'

import PageHeader from '../../PageHeader';
import Jumpto365Service from '../../../services' 
import { ProgressIndicator } from 'office-ui-fabric-react/lib/ProgressIndicator';
import { Link } from "@reach/router"
import $ from "jquery"
import PageBody from '../../PageBody';
import {isInternalLink} from "../../_Contexts/Jumpto365App"
import "./IconsPage.css"
import { PivotLinkSize, PivotLinkFormat, PivotItem, Pivot } from 'office-ui-fabric-react/lib/Pivot';

import { Panel, PanelType } from 'office-ui-fabric-react/lib/Panel';
import { CommandBar } from 'office-ui-fabric-react/lib/CommandBar';
import ReactJson from 'react-json-view'
import { DocumentConverter } from 'mammoth/lib/document-to-html';
import { Dropdown, IDropdown, DropdownMenuItemType, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
import PageLayoutMain from '../../_Layouts/PageLayoutMain';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import {apiHostGet,apiHostSet,apiVersion} from "../../../services/Jumpto365API"
import Masonry from "react-masonry-component"
import { ColorPicker, Icon } from 'office-ui-fabric-react';
import IconExplorer from '../../IconExplorer'

export default class IconsPage extends Component {

 
   state = {
    }

    _init = ()=>{
       
    }
    componentDidMount = () =>{
        this._init()
    }   
   
    render()
    {
       
      return (
           <PageLayoutMain>
                <PageHeader title="Icons" color="#2a7ab9"/>
<IconExplorer />
            
                </PageLayoutMain>
      )
    }
}

