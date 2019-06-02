
import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Dialog, DialogType, DialogFooter } from 'office-ui-fabric-react/lib/Dialog';
import { TextField, DefaultButton, PrimaryButton, ContextualMenuItemType } from 'office-ui-fabric-react';
import { MessageBar, MessageBarType } from 'office-ui-fabric-react/lib/MessageBar';
import { MessageBarButton,IconButton } from 'office-ui-fabric-react/lib/Button';
import Jumpto365App, {messageDialogStage,splitHash,setSetting,licenseInfo,ActionTypes}  from '../_Contexts/Jumpto365App'
import { TeachingBubble } from 'office-ui-fabric-react/lib/TeachingBubble';
import { DirectionalHint } from 'office-ui-fabric-react/lib/common/DirectionalHint';
import { Subscribe } from 'react-contextual'
import ReactJson from 'react-json-view'
import "./hello.css"
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { inline } from 'mammoth/lib/images';
import { ResizeGroup } from 'office-ui-fabric-react/lib/ResizeGroup';
import $ from "jquery"

import MarkdownParser from '../../utilities/MarkdownParser'
import { Link } from '@reach/router';
const anime = require('animejs/lib/anime.js');

export default class Hello extends Component {
    _ref = null
    state = {show:false}
    _hide = () =>{
        this.setState({show:false})
        localStorage.setItem("hello","false")
        
    }

    _message1 = () =>{
        this.setState({message1:false})
        localStorage.setItem("message1","false")
        
    }

    componentDidMount (){
        var data = localStorage.getItem("hello")
        var message1 = localStorage.getItem("message1")
        if (!message1 && this.props.context && this.props.context.isAuthenticated) {
            this.setState({message1:false})
        }
        if (!data){
        setTimeout(()=>{
            this.setState({show:false})
            },2000
        )
    }
    }
    render() {
        var _menuButtonElement = null
        var that = this
        return (


            

            <div>
            {this.state.message1 && 
            <div  style={{marginLeft:"-16px",marginRight:"-16px"}}>
                <MessageBar messageBarType={MessageBarType.warning} onDismiss= {this._message1} dismissButtonAriaLabel="Dismiss" >
                Graying out tools which you are not licensed for is now disabled by default. Visit <Link to="/embed" >embed page</Link> to learn how to create a link with the option to turn if on
                </MessageBar>
                </div>
            }
            
            
            
            {this.state.show &&
            <div>    
                <div ref={ref=>{this._ref=ref}}>

                </div>
                <TeachingBubble   
                targetElement={this._ref}
            //   illustrationImage={exampleImageProps}
              calloutProps={{ directionalHint: DirectionalHint.bottomCenter }}
              isWide={false}
              hasSmallHeadline={false}
              hasCloseIcon={true}
              targetElement={_menuButtonElement}
              primaryButtonProps={{
                children: 'Learn more',
                onClick: () => {
                        window.open("https://jum.to/V2Launch","_blank")
                        }
              }}
              secondaryButtonProps={{
                children: 'Dismiss',
                onClick: () => {
                    that._hide()
                        }
              }}
              onDismiss={()=>{ 
                that._hide()
            }}
              headline="Welcome to Version 2.0"
            >
            We hear you! Thanks to your feedback, the Periodic Table now includes some great new features, 
            including a 'which tool when' wizard, tiles that can launch the respective app,
             and the ability to sign in for your personal view of apps you have. 
           
            </TeachingBubble>
            </div>
            }
            </div>
        )
    }
}
