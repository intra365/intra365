import React, { Component } from 'react';

import '../../App.css';
import FilterablePeriodicSystem from '../../components/PeriodicSystem'
import Sidebar from '../../components/Sidebar'
import { Modal } from 'office-ui-fabric-react/lib/Modal';
import Feedback from '../../components/Feedback'
import About from "../../components/About"
import './page.css'
import $ from 'jquery'
import { RING,isAuthenticated,userName,userId } from '../../components/Auth'

class FreeVersion extends Component {
    constructor(props) {
        super(props);
        this.state = {
          showModal: false,
          showAbout: false,
          language : this.props.match.params.language 
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
        
        if (RING(1)){
        console.log("Ring 1 group clicked",a,b,c)
      }
      }

      groupMouseOver(tags){
        console.log("Mouse over",tags)
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
               console.log("MATCHED")
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
        console.log("Mouse out",tags)
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

    render() {
    return (
      <div className="component layoutBorders" >
             
        <div className="outmostframe layoutBorders" >
        
        <FilterablePeriodicSystem name="Niels" 
        
        onGroupMouseOver = {this.groupMouseOver}
        onGroupMouseOut = {this.groupMouseOut}
        onGroupClicked={this.groupClicked} 
        language={this.state.language} 
        onFeedback={this.showFeedback} 
        onAbout={this.showAbout}></FilterablePeriodicSystem>

        </div>
        
        <div id="sb" className="creditaside layoutBorders" >  
          <Sidebar version={2} language={this.state.language}  languageSelected = {this.languageSelected} onAbout={this.showAbout}/>

    

        </div>  
        <Modal isOpen={ this.state.showModal }  onDismiss={ this._closeModal }  isBlocking={ false }   containerClassName='feedbackBox ms-modalExample-container InfoBox' >
          <Feedback onClose={ this._closeModal }/>
        </Modal>
        <Modal isOpen={ this.state.showAbout }  onDismiss={ this._closeAbout }  isBlocking={ false }   containerClassName='aboutBox ms-modalExample-container InfoBox' >
          <About onClose={ this._closeAbout }/>
        </Modal>

      </div>  
    );
  }
}

export default FreeVersion;
