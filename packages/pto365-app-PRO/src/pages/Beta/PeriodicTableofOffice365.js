import React, { Component } from 'react';

import '../../App.css';
import FilterablePeriodicSystem from '../../components/PeriodicSystem'
import Sidebar from '../../components/Sidebar'
import { Modal } from 'office-ui-fabric-react/lib/Modal';
import Feedback from '../../components/Feedback'
import About from "../../components/About"
//import Auth from '../../components/Auth';
import { stack as Menu } from 'react-burger-menu'
import './page.css'
import '../burgermenu.css'
import $ from 'jquery'
import { UseCases } from '../../components/UseCase/usecase-components'
import _ from "lodash"
import fasttrack from '../../data/fasttrack.json'

import { Link } from 'react-router-dom'


var links  = _.sortBy(fasttrack.list, [function(o) { return o.Title; }]);
class PeriodicTableofOffice365 extends Component {
    constructor(props) {
        super(props);
        this.state = {
          license:props.license,
          showModal: false,
          showAbout: false,
          language : props.language,
          sponsor :  props.sponsor,
          user:null,
          highlightedTags: props.highlightedTags
        };


        this.showFeedback =  this.showFeedback.bind(this);
        this._closeModal = this._closeModal.bind(this);
        this.showAbout =  this.showAbout.bind(this);
        this._closeAbout = this._closeAbout.bind(this);
        this.languageSelected = this.languageSelected.bind(this);
        this.groupClicked  = this.groupClicked.bind(this);

        this.groupMouseOver = this.groupMouseOver.bind(this)
        this.groupMouseOut = this.groupMouseOut.bind(this)
            
        
      }

      groupClicked(a,b,c){
        this.setState({groupClick:true})
      }

      groupMouseOver(tags){
        // console.log("Mouse over",tags)
        var groupClasses = ""
        if (tags){
          if (tags.length<1) return
          var cells = $(".CellWithTags")
        var cellIds = [];
        cells.each(function (index) {
          cellIds.push({
            id : $(this).attr("id"),
            isMatched : false})
        });
      
          
        tags.forEach(tag => {
          const className = `Grouptag-${tag}`
          cellIds.forEach(cell => {
            const cellId = "#" + cell.id
            //console.log("MATCH",$(cellId))
             if ($(cellId).hasClass(className)){
               cell.isMatched = true;
               //console.log("MATCHED")
             }  
          });

        });}
        if (!cellIds) return
        cellIds.forEach(cell => {
          if (!cell.isMatched){
            const cellId = "#" + cell.id
            $(cellId).addClass("notinfocus")
          }
        });
        $(".notinfocus").animate({opacity:0.3},500,function (){})
        
      }

      groupMouseOut(tags){
        //console.log("Mouse out",tags)
        var groupClasses = ""
        if (tags){
        tags.forEach(tag => {
          const className = `.Grouptag-${tag}`
          const elements  = $(className)
            $(".notinfocus").stop()
            $(".notinfocus").css("opacity","1")
            $(".notinfocus").removeClass("notinfocus")
            
        });}
      }

      showFeedback() {
        this.setState({ showModal: true });
      } 
    
      _closeModal() {
        this.setState({ showModal: false });
      }
      showAbout() {
        this.setState({ showAbout: true });
      } 
    
      _closeAbout() {
        this.setState({ showAbout: false });
      }
      languageSelected(lang) {
        console.log("languageSelected",lang)
        this.setState({language: lang})
      }
      gotProfile = (err,profile)=>{
        console.log(err,profile)
        if (err) console.log(err); 
        this.setState({profile})
      }
      
      
      componentDidMount = () => {

        if (this.props.onRender){
          var highlightedTags = this.props.onRender()
         this.groupMouseOver(highlightedTags)
        }
        if (typeof window.scale === "function") { 
          window.scale()
        }
      
      
      }

      componentDidUpdate = () => {
        if (typeof window.scale === "function") { 
          window.scale()
        }
      }
    render() {
      const profile = this.state && this.state.profile ? this.state.profile : {}
      var sidebarContent = (1==2) ? <UseCases usecases={links}   />:null
    return (
      <div>
        
      <div className="component layoutBorders pto365" >
             
        <div className="outmostframe layoutBorders" >
        
        <FilterablePeriodicSystem name="Niels" 
        onChangeService={this.props.onChangeService}
        onGroupMouseOver = {this.groupMouseOver}
        onGroupMouseOut = {this.groupMouseOut}
        onGroupClicked={this.groupClicked} 
        language={this.props.language} 
        license={this.props.license} 
        sponsor={this.props.sponsor} 
        onFeedback={this.showFeedback} 
        onAbout={this.showAbout}></FilterablePeriodicSystem>

        </div>
        
        <div id="sb" className="creditaside layoutBorders"  >    
        {sidebarContent}
        
    <img style={{height:"auto",width:"32px"}} src={profile.picture}></img>{profile.nickname}
        </div>  
        <Modal isOpen={ this.state.showModal }  onDismiss={ this._closeModal }  isBlocking={ false }   containerClassName='feedbackBox ms-modalExample-container InfoBox' >
          <Feedback onClose={ this._closeModal }/>
        </Modal>
        <Modal isOpen={ this.state.showAbout }  onDismiss={ this._closeAbout }  isBlocking={ false }   containerClassName='aboutBox ms-modalExample-container InfoBox' >
          <About onClose={ this._closeAbout }/>
        </Modal>

      </div>
      {/*
      <Menu isOpen={ false } right width={ 400 } >
          <Link to="/debug"  >Debug </Link> 
          <Link to="/office365/en"  >English </Link> 
          <Link to="/office365/da"  >Danish </Link> 
      </Menu  >
  */}
      
      </div>
    );
  }
}

export default PeriodicTableofOffice365;
