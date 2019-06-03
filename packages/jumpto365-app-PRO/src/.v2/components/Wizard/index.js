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
import "./wizard.css"
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { inline } from 'mammoth/lib/images';
import { ResizeGroup } from 'office-ui-fabric-react/lib/ResizeGroup';
import $ from "jquery"

import MarkdownParser from '../../utilities/MarkdownParser'
import loadingGif from "../../media/Table Publisher Loading/color together WT BG/1-wt-bg-500-500.gif";

const  firstTablePrompts = require("./firstTablePrompts").prompt
const anime = require('animejs/lib/anime.js');

const Jumpto365API = require('../../services/Jumpto365API')
const Nes = require('nes');

var MessageTypes = {
    "LOG": 1,
    "BROADCAST": 2,
    "CONTROL": 3
}
Object.freeze(MessageTypes)




export  class YooHuu extends Component {
    componentDidMount (){
        var that = this
       // Wrap every letter in a span
$('.ml6 .letters').each(function(){
    $(this).html($(this).text().replace(/([^\x00-\x80]|\w)/g, "<span class='letter'>$&</span>"));
  });
  
  anime.timeline({loop: false})
    .add({
      targets: '.ml6 .letter',
      translateY: ["1.1em", 0],
      translateZ: 0,
      duration: 750,
      delay: function(el, i) {
        return 50 * i;
      }
    }).add({
      targets: '.ml6',
      opacity: 0,
      duration: 2000,
      easing: "easeOutExpo",
      delay: 1000,
      
  complete: function(anim) {
  //  Jumpto365App.setGlobalState(that.props.context,{isCelebrating:false})
  }
    });
    }
  render() {
    return (
      <div>
       <h1 className="ml6">
  <span className="text-wrapper">
    <span className="letters">Good moves!! Now share the table </span>
  </span>
</h1>

      </div>
    )
  }
}

class DebuggerDialog extends Component {
    state = {hidePublisher:false}
  render() {
      var that = this
    return (
      <div>
            <Dialog
                    minWidth="540px"
          hidden={this.state.hidePublisher}
          onDismiss={()=>{this.setState({hidePublisher:true}) ;if (that.properties && that.properties._close)that.properties._close() }}
          dialogContentProps={{
            type: DialogType.largeHeader,
            title: "Debugger"
                      }}
          modalProps={{
            isBlocking: false,
            containerClassName: 'ms-dialogMainOverride'
          }}
        >
         
         <ReactJson collapsed="2" src={this.props.src} />      
        
        <DialogFooter>
        
        <DefaultButton onClick={()=>{this.setState({hidePublisher:true});
        
        if (that.props && that.props._close)that.properties._close() }}>Close</DefaultButton>

        </DialogFooter>
        </Dialog>

      </div>
    )
  }
}
class PromptDialog extends Component {
    state = {hidePublisher:false}
  render() {
      var that = this
    return (
      <div>
            <Dialog
                    minWidth="900px"
          hidden={this.state.hidePublisher}
          onDismiss={()=>{this.setState({hidePublisher:true}) ;if (that.props && that.props._close)that.props._close() }}
          dialogContentProps={{
            type: DialogType.largeHeader,
            title: this.props.title
                      }}
          modalProps={{
            isBlocking: false,
            containerClassName: 'ms-dialogMainOverride'
          }}
        >
         
        {this.props.children}
        
        <DialogFooter>
        
          <DefaultButton onClick={()=>{this.setState({hidePublisher:true});if (that.props && that.props._close)that.props._close() }}>Close</DefaultButton>

        </DialogFooter>
        </Dialog>

      </div>
    )
  }
}





    export class Prompter extends Component {
        state = {
            isTeachingBubbleVisible: false,
            isPrompterVisible : false}

        prompts = firstTablePrompts
        _saveState = (status) => {
            var prompts = this.prompts
            var item = {
                key: prompts.name,
                title: prompts.name,
                text1:status,
                step: this.state.step ? this.state.step : 0
            }

            Jumpto365API.itemPatch("dialogues", item)
                .then(() => {

                })

                .catch(error => {

                    this.setState({
                        publishError: error.message,
                        publishState: -99
                    })
                })
        }
        _updateStep(context,state){
            Jumpto365App.setGlobalState(context,{prompterState:state})
            //this.setState(state)
        }
        _init = (context) => {
            
            var prompts = this.prompts

            if (context.prompterState) return

            var step = 0
            this._updateStep(context,{
                message: prompts.steps[step].title,
                waitingForEvidence : prompts.steps[step].evidence,
                body:   MarkdownParser(prompts.steps[step].body).body,

                step 
            })
            this.setState({isInitialized:true})
            
        }

     
        _checkActions(context){
            if (!context) return null
            if (!context.prompterState) return null
            if (!context.actionLogger) return  null
            if (context.actionLogger.length < 1) return  null
            var state = context.prompterState
            

            var lastAction = context.actionLogger[context.actionLogger.length-1]
            console.log("Last action",lastAction.actionType,"waiting for",state.waitingForEvidence)
            if (state.waitingForEvidence === lastAction.actionType){
                
                var step = state.step + 1
                var prompts = this.prompts
            
                if (step >= prompts.steps.length){
                    Jumpto365App.setGlobalState(context,{isPrompterVisible:false,isCelebrating:true})
                    this._saveState("DONE")
                }
                else{
                this._updateStep(context,{
                    message: prompts.steps[step].title,
                    waitingForEvidence : prompts.steps[step].evidence,
                    body:   MarkdownParser(prompts.steps[step].body).body,
                    step 
                })
            }
    
            }
            return null
        }

        componentDidMount() {
            this._init(this.props.context)
            this._saveState()
            
        }
        componentWillUnmount() {
            if (this.props.context) {
            //    Jumpto365App.unmountPrompter(this.props.context)
            }
        }

        register(context){
          
            if (!context) return
            if (context.prompterHasFired) return 
           
            setTimeout(()=>{
                console.log("Prompter firing up")
                Jumpto365App.setGlobalState(context,{prompterHasFired:true,
                                                    isTeachingBubbleVisible:true,
                                                    isCelebrating:false,
                                                    isPrompterVisible:false})
                //that.setState({isTeachingBubbleVisible:true})
                }
                ,1500)
            return null
        }
  render() {
      var context = this.props.context
      var globalState = context && context.prompterState ? context.prompterState : {}
      var that = this
      if (!context) return null
    var userSettings = context && context.me && context.me.JSON ? JSON.parse(context.me.JSON) : {}
    if (!userSettings.canEdit) return null

    var type = MessageBarType.warning

    
    
    var actions = <MessageBarButton  onClick={()=>{Jumpto365App.login(context)}} >Sign In</MessageBarButton>
    actions = null
    var m = context.isPrompterVisible ? 
                                        <div className="prompter" style={{cursor:"pointer"}} onClick={()=>that.setState({promptStateVisible:true})} >
                                            <Icon iconName="DoubleChevronRight8"/> 
                                                <span style={{fontSize:"18px"}}>{context && context.prompterState ? context.prompterState.message : ""}</span> 
                                            <Icon iconName="DoubleChevronLeft8"/> 
                                        </div> : null

      var prompts = this.prompts ? this.prompts  : {} 
      var _menuButtonElement = null
  
      var buttonFeedback = () => {
        return <IconButton
        hidden={ false}
        Xdisabled={true}
        data-automation-id="explore"
        style={{ backgroundColor:"#ffffff",paddingLeft:"0px",paddingRight:"0px"  }}
        iconProps={{ iconName: "Feedback"}}
        text="Feedback"
        onClick ={() => { return false; context.editor.action(EditorActions.Publish ) } } 
        split={ true}
        style={{ paddingLeft:"0px",paddingRight:"0px"  }}
        
        splitButtonMenuButton={{ backgroundColor:"#ffffff" }}
        splitButtonContainer={{ backgroundColor:"#ffffff" }}
        menuProps={{
            items: [
                {
                    itemType: ContextualMenuItemType.Header,
                    text:"Insiders MS Team Channels"
                },
          
               
              {
                key: 'bug',
                text: 'Bugs',
                iconProps: { iconName: 'Bug' },
                onClick:() => { 
                    window.open("https://teams.microsoft.com/l/channel/19%3a7f5941dcd04f484a9572a07dbc03f6f6%40thread.skype/%25F0%259F%2590%259E%2520Bug%2520Reports?groupId=332c14f5-cabc-4587-bedc-e3310e66147d&tenantId=df96b8c9-51a1-40cf-b8b1-4514be8e9668")

                 } 

              },
              {
                key: 'idea',
                text: 'Feature Discussions',
                disabled:false,
                iconProps: { iconName: 'Lightbulb' },
                onClick:() => { 
                    window.open("https://teams.microsoft.com/l/channel/19%3aec15eba7761e4889a8748993bc0ec45d%40thread.skype/%25F0%259F%2592%25A1%2520Feature%2520Discussions?groupId=332c14f5-cabc-4587-bedc-e3310e66147d&tenantId=df96b8c9-51a1-40cf-b8b1-4514be8e9668")

                 } 
              }
            ]
          }}
        />
    }
    return ( 
        <Subscribe>{context => (
       <div className="wizardContainer">
       
       <div className="wizardLeft" onClick={()=>{
            
            that.setState({debuggerVisible:true})}}>

       </div>
       <div className="wizardCenter">

       {this.register(context)}
        {m}
        {context.isCelebrating &&
       <YooHuu context={context}/>
        }
        {context.isTeachingBubbleVisible ? (
          <div>
            <TeachingBubble
            //   illustrationImage={exampleImageProps}
              calloutProps={{ directionalHint: DirectionalHint.bottomCenter }}
              isWide={true}
              hasSmallHeadline={false}
              hasCloseIcon={true}
              targetElement={_menuButtonElement}
              primaryButtonProps={{
                children: 'Try it out',
                onClick: () => {
                    Jumpto365App.setGlobalState(context,{isCelebrating:false, isTeachingBubbleVisible:false,isPrompterVisible:true})
                    that.setState({promptStateVisible:true})
                    that._saveState("Starting")
                        }
              }}
              secondaryButtonProps={{
                children: 'May be later',
                onClick: () => {
                    Jumpto365App.setGlobalState(context,{isTeachingBubbleVisible:false})
                    that._saveState("Dismissed")
                        }
              }}
              onDismiss={()=>{ 
                Jumpto365App.setGlobalState(context,{isTeachingBubbleVisible:false})
                that._saveState("Dismissed")
            }}
              headline={prompts.intro}
            >
            {prompts.body}
            </TeachingBubble>
          </div>
        ) : null}
       </div>
       <div className="wizardRight"   >
       {buttonFeedback()}
       </div>
       {this._checkActions(context)}     
       {this.state.debuggerVisible &&     
        <DebuggerDialog src={{this:this,global:context}} close={()=>{that.setState({debuggerVisible:false})}}/> 
     } {this.state.promptStateVisible &&     
        <PromptDialog title={globalState.message} close={()=>{that.setState({promptStateVisible:false})}}>
            <div className="ms-font-m toolbody"  style={{padding:"16px", height:this.state.height ,overflowY:"auto",overflowX:"hidden"}}
                        dangerouslySetInnerHTML={{ __html: globalState.body }}>
        </div>
        
        </PromptDialog> 
     }
        </div>)}</Subscribe>
        )
  }
}


/**
 * Details about the tool
 *
 * @export
 * @class Wizard
 * @extends {Component}
 */
export default class Wizard extends Component { 
    state = {
        messages : [],
        currentStep : {}
    } 

    static propTypes  = {
        title : PropTypes.string,
        byline : PropTypes.string,
        steps : PropTypes.array,
        onDismiss : PropTypes.func,
        
    }
    
    client = null
    
    componentDidMount = () => {
        
        if (this.props.host && this.props.host._wizardLoaded) this.props.host._wizardLoaded(this)
        this._setStep(0)
        var wssPrefix = _.startsWith(Jumpto365API.apiHostGet(),"http://") ? "ws://" : "wss://"
        this.client = new Nes.Client(wssPrefix+Jumpto365API.apiHostGetLessProtocol());
        var that = this
        const start = async () => {

            var bearerToken = localStorage.getItem("pto365auth")
            await that.client.connect({ auth: { headers: { authorization: `Bearer ${bearerToken}` } } });
            
            that.client.onUpdate = (messageText) => {
                var message = JSON.parse(messageText)
                console.log(message)

                that.setState({processing:true})

                switch (message.type) {
                    case MessageTypes.LOG:
                        var msgarray = that.state.messages ? that.state.messages : [] 
                        msgarray.push(message.text)
                        that.setState({messages:msgarray })
                        break;
                    case MessageTypes.CONTROL:
                        switch (message.action) {
                            case "DONE":
                                that.setState({processing:false,processresult:message.result})
                                break;
                        
                            default:

                                break;
                        }
                        break;
                    default:
                        console.log("unknown message")
                        break;
                }

               
            };
           
        };

        start();
    }
    componentWillUnmount = () => {
        if (this.props.host && this.props.host._wizardUnload) this.props.host._wizardUnload()

        if (this.client){
            this.client.disconnect()
        }
    }
    _setStep(index){


        this.setState({
            error:null,
            stepIndex:index, 
            isFirstStep: index===0, 
            nextIsPending:false,
            isLastStep : (index+1) === (this.props.steps.length) ,
            currentStep: this.props.steps && this.props.steps.length >= index+1? this.props.steps[index]: {} 
        })

    }

    _close = () => {
        if (this.props.onDismiss) this.props.onDismiss() 
        
    }
    _next = () => {
        var that = this
        this.setState({processing:false})
        if (this.state.currentStep.onNext ){
            this.setState({nextIsPending: true})
            this.state.currentStep.onNext(this)
            .then(()=>{
                that._setStep(this.state.stepIndex+1)
                that.setState({nextIsPending: false,processing:false})
            })
            .catch(error=>{
                
                that.setState({nextIsPending: false,error})
            })
        }
        else
        {
           this.setState({nextIsPending: false})
           this._setStep(this.state.stepIndex+1)
        }
    }
    _previous = () => {
        this._setStep(this.state.stepIndex-1)
    }

    /**
     * Required method return the output of the component
     *
     * @returns
     * @memberof Wizard
     */
    render() {
        var that = this
        var subText = this.props.byline ? this.props.byline + ` - step ${this.state.stepIndex+1} of ${this.props.steps.length} `: `Step ${this.state.stepIndex+1} of ${this.props.steps.length} `
        return (
        <div>
                    <Dialog
                    minWidth="540px"
          hidden={false}
          onDismiss={()=>{this.setState({showPublisher:false}) ;if (that.properties.onDismiss)that.properties.onDismiss() }}
          dialogContentProps={{
            type: DialogType.largeHeader,
            title: this.props.title
                      }}
          modalProps={{
            isBlocking: true,
            containerClassName: 'ms-dialogMainOverride'
          }}
        >
          {this.state.error &&
        
            <div >
               <img src="https://www.shareicon.net/download/2015/09/07/97506_cloud.ico"></img> 
               {this.state.error}
            </div>
        }
        {!this.state.error && !this.state.isPublishing &&
          <div>
            {this.state.currentStep.body}
          </div>
        }
        {this.state.isPublishing && (
          
              <div xclassName="factory" style={{ margin: "auto" ,display:"flex" }}>
              <div style={{alignItems:"center"}}>
                <img style={{width:"70%",height:"auto",marginLeft:"auto",marginRight:"auto",display:"block"}} src={loadingGif} />
                </div>
            </div>)
        }
        {this.state.processing && false &&
          <div>Connected to server
          <div style={{overflowY:"scroll",overflowX:"hidden",height:"400px",width:"500px",}}>
          <div style={{backgroundColor:"#222222",padding:"0px"}}>
          <div style={{padding:"16px"}}>
                {this.state.messages.map((msg,ix)=>{
                    return <div style={{backgroundColor:"#222222",color:"#39ff14"}} key={ix}>{msg}</div>
                })}
          </div>
          </div>
          </div>
          </div>
        }
        
        <DialogFooter>
            {(!this.state.isFirstStep && !this.state.isLastStep)&& <DefaultButton   onClick={this._previous}>Previous</DefaultButton>}

            {!this.state.isLastStep &&  <PrimaryButton disabled={this.state.nextIsPending} onClick={this._next}> {this.state.currentStep.actionNextLabel ? this.state.currentStep.actionNextLabel : "Next" }</PrimaryButton>}

            {!this.state.isLastStep &&  <DefaultButton onClick={this._close}>Cancel</DefaultButton>}
            {this.state.isLastStep && <DefaultButton onClick={this._close}>Close</DefaultButton>}

<div>{this.state.subText} </div>
        </DialogFooter>
        </Dialog>

            
        </div>

        )
    }
}

